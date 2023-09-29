# @fab4m/date

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

```jsx
import * as React from "react";
import { dateField, dateTimeField, dateRangeField } from "@fab4m/date";
import { StatefulFormView, createForm } from "@fab4m/fab4m";
import "react-datepicker/dist/react-datepicker.css";

const form = createForm({
  birthday: dateField({
    label: "Your birthday",
  }),
  appointment: dateTimeField({
    label: "Your appointment time",
  }),
  vacation: dateRangeField({
    label: "Enter your desired vacation",
  }),
});

export default function DateExamples() {
  const [result, changeResult] = React.useState(null);
  form.onSubmit((e, data) => {
    e.preventDefault();
    changeResult(data);
  });
  return (
    <div>
      <StatefulFormView form={form} />
      {/* The data that comes out of the form are dates. */}
      {result && (
        <dl>
          <dt>Birthday</dt>
          <dd>{result.birthday?.toLocaleString()}</dd>
          <dt>Appointment</dt>
          <dd>{result.appointment?.toLocaleString()}</dd>
          <dt>Vacation</dt>
          {/* The date range is two dates, from and to.*/}
          <dd>
            {result.vacation?.from.toLocaleString()} -{" "}
            {result.vacation?.to.toLocaleString()}
          </dd>
        </dl>
      )}
    </div>
  );
}
```

## The datepicker widget

The datepicker widget is used by default on all date and datetime fields. It has several
settings that let's you customize how it works.

### Date format

You can customize the format of the date when it's displayed inside of the input field.
The formatting options are provided by the [date-fns](https://date-fns.org/v2.29.3/docs/format) package.

```jsx
import * as React from "react";
import { dateField, datePickerWidget } from "@fab4m/date";
import { StatefulFormView, createForm } from "@fab4m/fab4m";
import "react-datepicker/dist/react-datepicker.css";

const form = createForm({
  birthday: dateField({
    label: "Your birthday",
    widget: datePickerWidget({
      format: "yyyy-MM-dd",
    }),
  }),
});

export default function CustomFormat() {
  return (
    <div>
      <StatefulFormView form={form} hideSubmit={true} />
    </div>
  );
}
```

### Fixed locale

You can set a fixed locale for your datepicker field by providing a [date-fns locale](https://date-fns.org/v2.29.3/docs/Locale/). This will make the datepicker format the dates according to the specified
locale, no matter what locale the browser has:

```jsx
import * as React from "react";
import { dateField, datePickerWidget } from "@fab4m/date";
import { sv } from "date-fns/locale";
import { StatefulFormView, createForm } from "@fab4m/fab4m";
import "react-datepicker/dist/react-datepicker.css";

const form = createForm({
  birthday: dateField({
    label: "Your birthday",
    widget: datePickerWidget({
      locale: sv,
    }),
  }),
});

export default function SingleLocale() {
  return (
    <div>
      <StatefulFormView form={form} hideSubmit={true} />
    </div>
  );
}
```

### Using the browser locale

If you want to support multiple locales you can provide a list of all supported locales as a setting.
The datepicker widget will try to find out the browser locale and use the locale if it's provided in the list.

The first locale in the list will be used as a default.

```jsx
import * as React from "react";
import { dateField, datePickerWidget } from "@fab4m/date";
import { sv, de, fi } from "date-fns/locale";
import { StatefulFormView, createForm } from "@fab4m/fab4m";
import "react-datepicker/dist/react-datepicker.css";

const form = createForm({
  birthday: dateField({
    label: "Your birthday",
    widget: datePickerWidget({
      locales: [sv, de, fi],
      useBrowserLocale: true,
    }),
  }),
});

export default function BrowserLocale() {
  return (
    <div>
      <StatefulFormView form={form} hideSubmit={true} />
    </div>
  );
}
```

# The date range widget

The date range widget is used with the date range field. It supports all settings from the date picker
widget above and the following additional settings:

- **fromLabel**: The text that is displayed inside of the from input field.
- **toLabel**: The text that is is displayed inside of the to input field.
- **optionalEndDate**: This makes the end date optional.
- **withTime**: If this is true, then you get the option to specify the time in the date range, not just the dates.

# License

All the code is licensed under the [MIT License.](LICENSE)
