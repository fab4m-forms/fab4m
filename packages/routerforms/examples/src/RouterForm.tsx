import { createForm, textField, pageBreak } from "fab4m";
import { RouteObject } from "react-router-dom";
import { StatefulFormRoute } from "../../src";

const form = createForm({
  text: textField({ label: "First field", required: true }),
  pagebreak: pageBreak(),
  nextText: textField({ label: "Second field" }),
});

export const route: RouteObject = {
  path: "/route-forms/:part",
  action: async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);
  },
  element: (
    <StatefulFormRoute
      form={form}
      basePath="/route-forms"
      useRouteAction={true}
    />
  ),
};
