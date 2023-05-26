import Example from "@site/src/components/Example";
// Date field example
import DateFieldExample from "@site/src/components/Date/DateFields";
import DateFieldExampleSource from "!!raw-loader!@site/src/components/Date/DateFields";
// Single locale example
import SingleLocale from "@site/src/components/Date/SingleLocale";
import SingleLocaleSource from "!!raw-loader!@site/src/components/Date/SingleLocale";
// Browser locale example
import BrowserLocale from "@site/src/components/Date/BrowserLocale";
import BrowserLocaleSource from "!!raw-loader!@site/src/components/Date/BrowserLocale";
// Custom format example
import CustomFormat from "@site/src/components/Date/CustomFormat";
import CustomFormatSource from "!!raw-loader!@site/src/components/Date/CustomFormat";
// Datepickerprops example
import DatePickerProps from "@site/src/components/Date/DatePickerProps";
import DatePickerPropsSource from "!!raw-loader!@site/src/components/Date/DatePickerProps";


# Date and time

The `@fab4m/date` packages provides date and datetime components using the popular
[react-datepicker](https://reactdatepicker.com/) package.

## Installing

Install @fab4m/date and react-datepicker (4.2.x)

```bash
npm install --save @fab4m/date react-datepicker
```

## Using the date fields

`@fab4m/date` provides three field types: `dateField`, `dateTimeField` and `dateRangeField`.

The following example shows them in action:

<Example source={DateFieldExampleSource} example={<DateFieldExample />} />

## The datepicker widget

The datepicker widget is used by default on all date and datetime fields. It has several
settings that let's you customize how it works.

### Date format

You can customize the format of the date when it's displayed inside of the input field.
The formatting options are provided by the [date-fns](https://date-fns.org/v2.29.3/docs/format) package.

<Example source={CustomFormatSource} example={<CustomFormat />} />

### Fixed locale

You can set a fixed locale for your datepicker field by providing a [date-fns locale](https://date-fns.org/v2.29.3/docs/Locale/). This will make the datepicker format the dates according to the specified
locale, no matter what locale the browser has:

<Example source={SingleLocaleSource} example={<SingleLocale />} />

### Using the browser locale

If you want to support multiple locales you can provide a list of all supported locales as a setting.
The datepicker widget will try to find out the browser locale and use the locale if it's provided in the list.

The first locale in the list will be used as a default.

<Example source={BrowserLocaleSource} example={<BrowserLocale />} />

### Customizing React datepicker properties

react-datepicker supports many options and you might want to customize them according to your needs. You can do this by passing in the properties you want in the datePicker widget settings:

<Example source={DatePickerPropsSource} example={<DatePickerProps />} />

:::caution
Properties passed to react datepicker aren't serialized with your form, since we can't
possibly support serializing all of the possible configurations!
:::
# The date range widget

The date range widget is used with the date range field. It supports all settings from the date picker
widget above and the following additional settings:

* **fromLabel**: The text that is displayed inside of the from input field.
* **toLabel**: The text that is is displayed inside of the to input field.
* **optionalEndDate**: This makes the end date optional.
* **withTime**: If this is true, then you get the option to specify the time in the date range, not just the dates.

# Unserializing date widget settings

The locale and locales settings are stored just as a language code when a date widget is serialized. In order to unserialize the widget properly, you need to provide
the available locales, so that the language codes can be converted to locale objects.

This is done by calling the `setLocales()` function before unserializing:

```jsx
import { enUS, sv } from "date-fns/locale";
import { setLocales } from "@fab4m/date"
setLocales([enUS, sv]);
```

Now it's safe to go on and unserialize your forms.
