import { widget, WidgetType } from "../widget";

type HiddenType = string | number;
/**
 * The Hidden widget renders a hidden field inside of your form.
 * @group Widgets
 */
export const hiddenFieldWidgetType: WidgetType<string | number, undefined> = {
  name: "hidden",
  title: "Hidden",
  components: ["text", "integer", "float"],
  init: () => hiddenFieldWidget(),
};

/**
 * The hidden widget renders a hidden field inside of your form.
 * @group Widgets
 */
export function hiddenFieldWidget<Type extends HiddenType>() {
  return widget<Type, undefined>({
    type: hiddenFieldWidgetType as unknown as WidgetType<Type, undefined>,
    settings: undefined,
  });
}
