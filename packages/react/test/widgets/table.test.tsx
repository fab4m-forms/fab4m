import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import {
  textField,
  createForm,
  group,
  StatefulFormView,
  equals,
  booleanField,
  selectWidget,
  tableWidget,
  TableSettings,
  defaultMultipleWidget,
  integerField,
} from "../../src";

describe("Table widget", () => {
  const fieldGroup = group<Record<string, any>>(
    {
      label: "Multiple group",
      multiple: true,
      multipleWidget: tableWidget(),
    },
    {
      first: textField({
        label: "First",
        required: true,
      }),
      second: textField({
        label: "Second",
        widget: selectWidget(["option 1", "option 2"]),
      }),
      // The header needs to be rendered even though its'
      third: [
        [
          "group.$.first",
          equals("first"),
          booleanField({
            label: "Third",
          }),
        ],
        [
          "group.$.first",
          equals("int"),
          integerField({
            label: "Integer field",
          }),
        ],
      ],
      fourth: textField({ label: "Fourth" }),
      multiple: textField({
        label: "Multiple",
        multiple: true,
        multipleWidget: defaultMultipleWidget({
          addItemLabel: "Add item inside table",
        }),
      }),
    },
  );
  const form = createForm({
    group: fieldGroup,
  });
  test("Table label", async () => {
    render(<StatefulFormView form={form} />);
    const text = await screen.findByText("Multiple group");
    expect(text).toBeDefined();
  });
  test("Table header", async () => {
    const data = { group: [{}] };
    render(<StatefulFormView form={form} data={data} />);
    await screen.findByRole("table");
    expect(screen.queryAllByRole("columnheader")).toHaveLength(6);
  });
  test("required field in header", async () => {
    const data = { group: [{}] };
    render(<StatefulFormView form={form} data={data} />);
    await screen.findByRole("table");
    expect(
      screen.getByRole("columnheader", { name: "First *" }),
    ).toBeInTheDocument();
  });
  test("Table row", async () => {
    const data = { group: [{}] };
    render(<StatefulFormView form={form} data={data} />);
    await screen.findByRole("table");
    expect(screen.queryAllByRole("row")).toHaveLength(2);
    expect(screen.getByLabelText("First")).toBeInTheDocument();
  });
  test("Conditional field missing", async () => {
    const data = { group: [{}] };
    render(<StatefulFormView form={form} data={data} />);
    await screen.findByRole("table");
    expect(screen.queryByLabelText("Third")).toBeNull();
  });
  test("Conditional field exists", async () => {
    const data = { group: [{ first: "first" }] };
    render(<StatefulFormView form={form} data={data} />);
    await screen.findByRole("table");
    expect(screen.getByLabelText("Third")).toBeInTheDocument();
  });
  test("Add a new row to the table", async () => {
    render(<StatefulFormView form={form} />);
    const button = await screen.findByRole("button", { name: "Add" });
    fireEvent.click(button);
    await screen.findByRole("table");
    expect(screen.getByLabelText("First")).toBeInTheDocument();
  });
  test("Remove a row from the table", async () => {
    render(
      <StatefulFormView
        form={form}
        data={{
          group: [
            { first: "A value" },
            { first: "Value to remove" },
            { first: "A third value" },
          ],
        }}
      />,
    );
    const buttons = await screen.findAllByRole("button", { name: "Remove" });
    fireEvent.click(buttons[1]);
    await waitFor(() => {
      const inputs = screen.getAllByRole("textbox", { name: "First" });
      expect(inputs).toHaveLength(2);
      expect(inputs[0]).toHaveValue("A value");
      expect(inputs[1]).toHaveValue("A third value");
    });
  });
  test("Data manipulation", async () => {
    let group: Array<Record<string, unknown>> = [];
    form.onDataChange((newData) => {
      if (newData.group) {
        group = newData.group as Array<Record<string, unknown>>;
      }
    });
    render(<StatefulFormView form={form} />);
    const button = await screen.findByRole("button", { name: "Add" });
    fireEvent.click(button);
    const text = await screen.findByRole("textbox", { name: "First" });
    fireEvent.input(text, { target: { value: "new text" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(group).toHaveLength(2);
      expect(group[0].first).toBe("new text");
      expect(text).toHaveValue("new text");
    });
    const texts = await screen.findAllByRole("textbox", { name: "First" });
    fireEvent.input(texts[1], { target: { value: "other text" } });
    await waitFor(() => {
      expect(group[1].first).toBe("other text");
      expect(texts[1]).toHaveValue("other text");
    });
  });
  test("Header customization", async () => {
    const settings: TableSettings = {
      headerColumn: (args) => (
        <th {...args.props} className={`override index-${args.index}`}>
          {args.component.name === "first"
            ? "Other column name"
            : args.props.children}
        </th>
      ),
    };
    if (fieldGroup.multipleWidget) {
      fieldGroup.multipleWidget.settings = settings;
    }
    render(<StatefulFormView form={form} data={{ group: [{}] }} />);
    const columns = await screen.findAllByRole("columnheader");
    expect(columns[0]).toHaveClass("override index-0");
    expect(columns[0]).toHaveTextContent("Other column name");
    expect(columns[1]).toHaveClass("override index-1");
    expect(columns[2]).toHaveClass("override index-2");
  });
  test("Row customization", async () => {
    const settings: TableSettings = {
      rowColumn: (args) => (
        <td {...args.props} className={`override index-${args.index}`}>
          {args.component.type.name === "integer"
            ? "Not rendering the component"
            : args.props.children}
        </td>
      ),
    };
    if (fieldGroup.multipleWidget) {
      fieldGroup.multipleWidget.settings = settings;
    }
    render(
      <StatefulFormView form={form} data={{ group: [{ first: "int" }] }} />,
    );
    const columns = await screen.findAllByRole("cell");
    expect(columns[0]).toHaveClass("override index-0");

    expect(columns[1]).toHaveClass("override index-1");
    expect(columns[2]).toHaveClass("override index-2");
    // The right component variant should be sent to the rendering function.
    expect(columns[2]).toHaveTextContent("Not rendering the component");
  });

  test("Multiple field", async () => {
    render(<StatefulFormView form={form} data={{ group: [{}] }} />);
    await screen.findByRole("table");
    expect(
      screen.getByRole("button", { name: "Add item inside table" }),
    ).toBeInTheDocument();
  });
});
