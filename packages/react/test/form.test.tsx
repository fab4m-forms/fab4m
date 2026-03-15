import * as React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { getFormElement } from "./util";
import {
  createForm,
  textField,
  textFieldWidget,
  fileField,
  group,
  ValidationError,
} from "@fab4m/fab4m";
import {
  FormView,
  FormProvider,
  createFormRenderer,
  TextField,
  UploadField,
  Group,
} from "../src/index";

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
    },
  );
  form.add(
    textField({
      name: "required_text",
      label: "Required text",
      required: true,
      widget: textFieldWidget(),
      validators: [],
    }),
  );
  form.add(
    textField({
      name: "other_text",
      label: "Other text field",
      widget: textFieldWidget(),
      required: false,
      validators: [],
    }),
  );
  form.add(
    textField({
      name: "multiple",
      label: "Multiple field",
      required: true,
      multiple: true,
      minItems: 2,
      maxItems: 3,
    }),
  );
  form.add(
    fileField({
      name: "field_without_schema",
      label: "field without schema",
      required: true,
    }),
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
      },
    ),
  );

  it("Form rendering", () => {
    const { container, queryByText } = render(
      <Provider>
        <FormView form={form} data={{}} className="custom-form-class" />
      </Provider>,
    );
    expect(container.querySelector(".custom-form-class")).not.toBeNull();
    // The submit label should be "Save this form"
    expect(queryByText("Save this form")).not.toBeNull();
    // Labels should be rendered.
    expect(
      container.querySelector("label[for='required_text']")?.innerHTML,
    ).toContain("Required text");
    // Required field
    expect(container.querySelector(".fab4m-required-indicator")).not.toBe(null);
    expect(
      container.querySelector("label[for='other_text']")?.innerHTML,
    ).toContain("Other text field");
  });

  it("Disabled submit", async () => {
    const { findByText } = render(
      <Provider>
        <FormView disabled={true} form={form} data={{}} />
      </Provider>,
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

    let screen = render(
      <Provider>
        <FormView form={form} data={data} />
      </Provider>,
    );
    let formElement = screen.container.querySelector("form");
    if (formElement) {
      fireEvent.submit(formElement);
    }
    await waitFor(() => {
      expect(
        screen.queryByText("Multiple field must have at least 2 items."),
      ).not.toBeNull();
    });

    screen.unmount();
    data.multiple = ["one", "two", "three", "four"];
    screen = render(
      <Provider>
        <FormView form={form} data={data} />
      </Provider>,
    );
    formElement = screen.container.querySelector("form");
    if (formElement) {
      fireEvent.submit(formElement);
    }
    await waitFor(() => {
      expect(
        screen.queryByText("Multiple field can only have up to 3 items."),
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

    const { container } = render(
      <Provider>
        <FormView form={eventForm} data={{}} />
      </Provider>,
    );
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
      <Provider>
        <FormView data={{}} form={form} extra={{ test: "test", test2: 1 }} />
      </Provider>,
    );
    expect(
      (container.querySelector("input[name='test']") as HTMLInputElement | null)
        ?.value,
    ).toBe("test");
    expect(
      (
        container.querySelector(
          "input[name='test2']",
        ) as HTMLInputElement | null
      )?.value,
    ).toBe("1");
  });

  it("Form custom errors", () => {
    const errors: ValidationError[] = [
      { path: "/required_text", message: "This is a custom error" },
    ];

    const { queryByText } = render(
      <Provider>
        <FormView
          data={{ required_text: "hello" }}
          form={form}
          errors={errors}
        />
      </Provider>,
    );
    expect(queryByText("This is a custom error")).not.toBeNull();
  });

  it("No form error classes if no errors are present", () => {
    const { container } = render(
      <Provider>
        <FormView data={{ required_text: "hello" }} form={form} />
      </Provider>,
    );
    expect(container.querySelectorAll(".fab4m-error-list").length).toBe(0);
  });

  it("Hide submit", () => {
    const { container } = render(
      <Provider>
        <FormView
          hideSubmit={true}
          data={{ required_text: "hello" }}
          form={form}
        />
      </Provider>,
    );
    expect(container.querySelector("input[type='submit']")).toBeNull();
  });

  it("ID Prefix", () => {
    const { container } = render(
      <Provider>
        <FormView
          idPrefix="prefix_"
          data={{ required_text: "hello" }}
          form={form}
        />
      </Provider>,
    );
    expect(container.querySelector("#prefix_required_text")).not.toBe(null);
    expect(container.querySelector("#prefix_multiple-0")).not.toBe(null);
    expect(container.querySelector("#prefix_multiple-1")).not.toBe(null);
    expect(
      container.querySelector("#prefix_group_required_group_text_field"),
    ).not.toBe(null);
  });

  function Provider(props: { children: JSX.Element }) {
    const renderer = createFormRenderer({
      widgetComponents: {
        textfield: TextField,
        file: UploadField,
        group: Group,
      },
    });
    return <FormProvider renderer={renderer}>{props.children}</FormProvider>;
  }
});
