import {
  FormComponentType,
  FormComponent,
  CreateFormComponentType,
  formComponent,
} from "../../component";
import { Widget, widget, WidgetType } from "../../widget";
/**
 * The page break component type allows you to break the form up into separate
 * pages.
 * @group Components
 */
export const pageBreakType: FormComponentType = {
  name: "pagebreak",
  title: "Page break",
  splitsForm: true,
  description: "A page break",
};

/**
 * The page break component allows you to break the form up into separate
 * pages.
 * @group Components
 */
export function pageBreak(
  attributes?: CreateFormComponentType<unknown>
): FormComponent<unknown> {
  return formComponent({
    settings: undefined,
    type: pageBreakType,
    widget: pageBreakWidget(),
    ...attributes,
  });
}

/**
 * The page break widget type renders a page break.
 * @group Widgets
 */
export const pageBreakWidgetType: WidgetType<unknown, undefined> = {
  name: "pagebreak",
  title: "Page break",
  components: ["pagebreak"],
  widget: () => null,
  init: pageBreakWidget,
};

/**
 * The page break widget renders a page break.
 * See the [page break field components](/docs/components/pagebreak) for an example.
 * @group Widgets
 */
export function pageBreakWidget(): Widget<unknown, undefined> {
  return widget({
    type: pageBreakWidgetType,
    settings: undefined,
  });
}
