import * as React from "react";
import {
  createForm,
  fileSize,
  fileField,
  FormView,
  fileExtension,
  FormComponentWithName,
  mimeType,
} from "../../src/index";
import { vi } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";

describe("Size validator", () => {
  window.HTMLFormElement.prototype.submit = () => {
    // No-op polyfill.
  };
  const form = createForm();
  const validator = fileSize(5, {
    message: "Custom error message %size %fileSize",
    maxSizeInfo: "Size: %size",
  });
  form.add(
    fileField({
      name: "size_validator",
      label: "With size validator",
      validators: [validator],
    }) as FormComponentWithName,
  );

  const data: Record<string, unknown> = {};
  test("undefined value", async () => {
    const { getByText, queryByText } = render(
      <FormView form={form} data={{}} />,
    );
    const submit = getByText("Save");
    fireEvent.click(submit);
    await waitFor(() => {
      expect(queryByText("The file mimetype is not valid!")).toBeNull();
    });
  });
  test("File size validator info", async () => {
    validator.settings.size = 5242880;
    const { queryByText } = render(<FormView form={form} data={{}} />);
    expect(queryByText("Size: 5MB")).not.toBe(null);
    validator.settings.size = 5;
  });
  test("Large files arent allowed", async () => {
    data.size_validator = new File(["It's too long to handle"], "value.png");
    const { getByText, queryByText } = render(
      <FormView form={form} data={data} />,
    );
    const submit = getByText("Save");
    fireEvent.click(submit);
    await waitFor(() => {
      expect(queryByText("Custom error message 5B 23B")).not.toBeNull();
    });
  });
  test("Small files passes", async () => {
    data.size_validator = new File(["I"], "value.png");
    const { getByText, queryByText } = render(
      <FormView form={form} data={data} />,
    );
    const submit = getByText("Save");
    fireEvent.click(submit);
    await waitFor(() => {
      expect(queryByText("Custom error message 0.005MB 0.005MB")).toBeNull();
    });
  });
});

describe("File extension validator", () => {
  window.HTMLFormElement.prototype.submit = () => {
    // No-op polyfill.
  };
  const form = createForm();
  const message = "The file extension is not allowed!";
  form.add(
    fileField({
      name: "extension_validator",
      label: "Extensions",
      validators: [
        fileExtension(["jpg", "png"], {
          message,
        }),
      ],
    }),
  );
  const data: Record<string, unknown> = {};
  test("undefined value", async () => {
    const { getByText, queryByText } = render(
      <FormView form={form} data={{}} />,
    );
    const submit = getByText("Save");
    fireEvent.click(submit);
    await waitFor(() => {
      expect(queryByText(message)).toBeNull();
    });
  });

  test("Disallowed file extension", async () => {
    data.extension_validator = new File(["exe file"], "value.exe");
    const { getByText, queryByText } = render(
      <FormView form={form} data={data} />,
    );
    const submit = getByText("Save");
    fireEvent.click(submit);
    await waitFor(() => {
      expect(queryByText(message)).not.toBeNull();
    });
  });

  test("Allowed file extension", async () => {
    const spy = vi.fn();
    form.onSubmit(spy);
    data.extension_validator = new File(["png file"], "value.png");
    const { getByText, queryByText } = render(
      <FormView form={form} data={data} />,
    );
    const submit = getByText("Save");
    fireEvent.click(submit);
    await waitFor(() => {
      expect(queryByText(message)).toBeNull();
      expect(spy).toHaveBeenCalled();
    });
  });
});

describe("Mime type validator", () => {
  window.HTMLFormElement.prototype.submit = () => {
    // No-op polyfill.
  };
  const form = createForm();
  form.add(
    fileField({
      name: "mime_validator",
      label: "Mime types",
      validators: [
        mimeType(["image/jpeg", "image/png"], {
          message: "The file mimetype is not valid!",
        }),
      ],
    }),
  );
  const data: Record<string, unknown> = {};
  test("undefined value", async () => {
    const { getByText, queryByText } = render(
      <FormView form={form} data={{}} />,
    );
    const submit = getByText("Save");
    fireEvent.click(submit);
    await waitFor(() => {
      expect(queryByText("The file mimetype is not valid!")).toBeNull();
    });
  });
  test("Disallowed mime type", async () => {
    data.mime_validator = new File(["exe file"], "value.exe", {
      type: "application/vnd.microsoft.portable-executable.",
    });
    const { getByText, queryByText } = render(
      <FormView form={form} data={data} />,
    );
    const submit = getByText("Save");
    fireEvent.click(submit);
    await waitFor(() => {
      expect(queryByText("The file mimetype is not valid!")).not.toBeNull();
    });
  });
  test("Allowed mime type", async () => {
    data.mime_validator = new File(["png file"], "value.png", {
      type: "image/png",
    });
    const { getByText, queryByText } = render(
      <FormView form={form} data={data} />,
    );
    const submit = getByText("Save");
    fireEvent.click(submit);
    await waitFor(() => {
      expect(queryByText("The file mimetype is not valid!")).toBeNull();
    });
  });
});
