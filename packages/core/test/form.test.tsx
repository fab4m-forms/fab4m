import * as React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { getFormElement } from "./util";
import {
  generateSchema,
  createForm,
  textField,
  textFieldWidget,
  fileField,
  group,
  FormView,
  ValidationError,
} from "../src";

describe("Form", () => {
  window.HTMLFormElement.prototype.submit = () => {
    // No-op polyfill.
  };
  const form = createForm(
    {},
    {
      labels: { submit: "Save this form", required: "Required text" },
      description: "description",
      title: "title",
    }
  );
  form.add(
    textField({
      name: "required_text",
      label: "Required text",
      required: true,
      widget: textFieldWidget(),
      validators: [],
    })
  );
  form.add(
    textField({
      name: "other_text",
      label: "Other text field",
      widget: textFieldWidget(),
      required: false,
      validators: [],
    })
  );
  form.add(
    textField({
      name: "multiple",
      label: "Multiple field",
      required: true,
      multiple: true,
      minItems: 2,
      maxItems: 3,
    })
  );
  form.add(
    fileField({
      name: "field_without_schema",
      label: "field without schema",
      required: true,
    })
  );
  form.add(
    group(
      { name: "group", label: "Group" },
      {
        required_group_text_field: textField({
          name: "required_group_text_field",
          label: "Required group text field",
          required: true,
        }),
        group_field_without_schema: fileField({
          label: "Group field without schema",
          required: true,
        }),
      }
    )
  );

  it("Form error when adding component with the same name", () => {
    const testForm = createForm({});
    const field = textField({
      name: "otherfield",
      label: "other field",
    });
    testForm.add(field);
    expect(() => testForm.add(field)).toThrowError(
      "A component with the same name already exists."
    );
  });

  it("Form shema", () => {
    const schema = generateSchema(form);
    expect(schema.description).toBe("description");
    expect(schema.title).toBe("title");
    expect(schema.properties).toHaveProperty("required_text");
    expect(schema.properties.required_text.type).toBe("string");
    expect(schema.properties.other_text.type).toBe("string");
    expect(schema.properties).not.toHaveProperty("field_without_schema");
    expect(schema.properties).toHaveProperty("group");
    if (schema.properties.group && schema.properties.group.type === "object") {
      expect(schema.properties.group.properties).not.toHaveProperty(
        "required_field_without_schema"
      );
      expect(schema.properties.group.properties).toHaveProperty(
        "required_group_text_field"
      );
      expect(schema.properties.group.type).toBe("object");

      expect(schema.properties.group.required).toContain(
        "required_group_text_field"
      );

      expect(schema.properties.group.required).not.toContain(
        "group_field_without_schema"
      );
    }
    expect(schema.properties).toHaveProperty("multiple");
    if (schema.properties.multiple) {
      expect(schema.properties.multiple.type).toBe("array");
      if (schema.properties.multiple.type === "array") {
        expect(schema.properties.multiple.minItems).toBe(2);
        expect(schema.properties.multiple.maxItems).toBe(3);
        if (!Array.isArray(schema.properties.multiple.items)) {
          expect(schema.properties.multiple.items.type).toBe("string");
        }
      }
    }
    expect(schema.required).toContain("required_text");
    expect(schema.required).not.toContain("other_text");
    expect(schema.required).not.toContain("field_without_schema");
  });

  it("Form rendering", () => {
    const { container, queryByText } = render(
      <FormView form={form} data={{}} className="custom-form-class" />
    );
    expect(container.querySelector(".custom-form-class")).not.toBeNull();
    // The submit label should be "Save this form"
    expect(queryByText("Save this form")).not.toBeNull();
    // Labels should be rendered.
    expect(
      container.querySelector("label[for='required_text']")?.innerHTML
    ).toContain("Required text");
    // Required field
    expect(container.querySelector(".fab4m-required-indicator")).not.toBe(null);
    expect(
      container.querySelector("label[for='other_text']")?.innerHTML
    ).toContain("Other text field");
  });
  it("Disabled submit", async () => {
    const { findByText } = render(
      <FormView disabled={true} form={form} data={{}} />
    );
    const submit = (await findByText("Save this form")) as HTMLInputElement;
    expect(submit.disabled).toBe(true);
  });
  it("Form validation", async () => {
    let data: Record<string, unknown> = {
      required_text: "text",
      other_text: "text",
      multiple: ["one"],
    };
    form.onComponentChange((key: string, value: unknown) => {
      data = { ...data, [key]: value };
    });

    let screen = render(<FormView form={form} data={data} />);
    let formElement = screen.container.querySelector("form");
    if (formElement) {
      fireEvent.submit(formElement);
    }
    await waitFor(() => {
      expect(
        screen.queryByText("Multiple field must have at least 2 items.")
      ).not.toBeNull();
    });
    screen.unmount();
    data.multiple = ["one", "two", "three", "four"];
    screen = render(<FormView form={form} data={data} />);
    formElement = screen.container.querySelector("form");
    if (formElement) {
      fireEvent.submit(formElement);
    }
    await waitFor(() => {
      expect(
        screen.queryByText("Multiple field can only have up to 3 items.")
      ).not.toBeNull();
    });
  });
  it("Event handlers", () => {
    const first = vi.fn();
    const second = vi.fn();
    const eventForm = createForm({
      text: textField({
        name: "text",
        label: "text",
      }),
    });
    eventForm.onDataChange(first);
    eventForm.onDataChange(second);
    eventForm.onSubmit(first);
    eventForm.onSubmit(second);
    const { container } = render(<FormView form={eventForm} data={{}} />);
    const element = getFormElement(container);
    fireEvent.submit(element);
    // By default we overwrite the handlers.
    waitFor(() => {
      expect(first).not.toHaveBeenCalled();
      expect(second).toHaveBeenCalled();
    });
    first.mockReset();
    second.mockReset();
    eventForm.onSubmit(first, true);
    fireEvent.submit(element);
    // By default we overwrite the handlers.
    waitFor(() => {
      expect(first).toHaveBeenCalled();
      expect(second).toHaveBeenCalled();
    });
  });
  it("Extra info", () => {
    const { container } = render(
      <FormView data={{}} form={form} extra={{ test: "test", test2: 1 }} />
    );
    expect(
      (container.querySelector("input[name='test']") as HTMLInputElement | null)
        ?.value
    ).toBe("test");
    expect(
      (
        container.querySelector(
          "input[name='test2']"
        ) as HTMLInputElement | null
      )?.value
    ).toBe("1");
  });
  it("Form custom errors", () => {
    const errors: ValidationError[] = [
      { path: "/required_text", message: "This is a custom error" },
    ];

    const { queryByText } = render(
      <FormView data={{ required_text: "hello" }} form={form} errors={errors} />
    );
    expect(queryByText("This is a custom error")).not.toBeNull();
  });

  it("No form error classes if no errors are present", () => {
    const { container } = render(
      <FormView data={{ required_text: "hello" }} form={form} />
    );
    expect(container.querySelectorAll(".fab4m-error-list").length).toBe(0);
  });

  it("Hide submit", () => {
    const { container } = render(
      <FormView
        hideSubmit={true}
        data={{ required_text: "hello" }}
        form={form}
      />
    );
    expect(container.querySelector("input[type='submit']")).toBeNull();
  });

  it("ID Prefix", () => {
    const { container } = render(
      <FormView
        idPrefix="prefix_"
        data={{ required_text: "hello" }}
        form={form}
      />
    );
    expect(container.querySelector("#prefix_required_text")).not.toBe(null);
    expect(container.querySelector("#prefix_multiple-0")).not.toBe(null);
    expect(container.querySelector("#prefix_multiple-1")).not.toBe(null);
    expect(
      container.querySelector("#prefix_group_required_group_text_field")
    ).not.toBe(null);
  });
});
