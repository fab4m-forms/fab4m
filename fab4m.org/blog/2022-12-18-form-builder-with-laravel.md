# Fab4m and Laravel: Creating a simple form builder

In the [previous blog post](/blog/2022/12/16/fab4m-and-laravel) we got started
with Laravel and Inertia and showed how we can use Fab4m inside of
this environment to generate our forms.

Now let's flex our muscles a bit more and create a form builder. This
is were fab4m really shines!

<!--truncate-->

## Create a new model, migration and controller

We start by setting up a new form controller:

```bash
php artisan make:model Form -c -m -r
```

We start with defining our migration (`database/migrations/[date]_create_forms_table.php`):

```php
public function up()
{
    Schema::create('forms', function (Blueprint $table) {
        $table->id();
        $table->text('title');
        $table->json('form');
        $table->text('schema');
        $table->timestamps();
    });
}
```

We want to store a title, the form structure and the schema. Notice that we're storing
the schema as a string. This is because it's easier to store it as a json string, Laravel converts data that comes in to php arrays, which will mess up the schema in certain situations.

Let's apply the migration, you need to run it through Laravel Sail:

```bash
vendor/bin/sail artisan migrate
```

We also need to adjust our model (`app/Models/Form.php`) to allow us to fill in some fields:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    protected $fillable = ['title', 'schema', 'form'];

    protected $casts = [
        'form' => 'json',
    ];
    use HasFactory;
}
```

Let's move on to the controller and set it up to render an Inertia view for creating forms:

```php
public function create()
{
    return Inertia::render('Form/Create', []);
}
```

## Creating a form for creating forms

Now for something fun! We're going to create a fab4m form for definining
other fab4m forms!

Fab4m is designed to be easily composed together from different parts.

Here's a "Form builder form" that exposes some of the options that are available
in fab4m:

```jsx
import {
    createForm,
    textFieldType,
    textField,
    booleanField,
    textFieldWidgetType,
    textAreaWidgetType,
    integerFieldType,
    booleanFieldType,
    selectWidget,
    group,
} from "@fab4m/fab4m";

const fieldTypes = [textFieldType, integerFieldType, booleanFieldType];
export default createForm({
    title: textField({ label: "Title", required: true }),
    fields: group(
        {
            label: "Fields",
            minItems: 1,
            multiple: true,
        },
        {
            name: textField({ label: "Field name", required: true }),
            label: textField({ label: "Label", required: true }),
            field: textField({
                label: "Field type",
                required: true,
                widget: selectWidget(
                    fieldTypes.map((field) => [field.name, field.title])
                ),
            }),
            required: booleanField({ label: "Required" }),
            multiple: booleanField({ label: "Multiple" }),
        }
    ),
});
```

Some things to unpack here:

We start with importing some component **types** from fab4m. The
component type definition is what drives each fab4m component under
the hood. We're going to use these definitions to build our final forms.

We then proceed with creating our form based on these component types. We
define a fab4m group field which represents each field in the form we
are creating.  Each field has a name, label field type and options for
if the field is required and multiple.

Let's get back to our Inertia view (`resources/js/Pages/Form/Create.jsx`):

```jsx
import GuestLayout from "@/Layouts/GuestLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import "@fab4m/fab4m/css/basic/basic.css";
import form from "../../Forms/Form";
import { StatefulFormView } from "@fab4m/fab4m";

export default function Create() {
    form.onSubmit((e, data) => {
        e.preventDefault();
    });
    return (
        <GuestLayout>
            <Head title="Create new diary" />
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Create a new form
            </h2>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <StatefulFormView form={form} />
                </div>
            </div>
        </GuestLayout>
    );
}
```

Go to [http://localhost/forms/create](http://localhost/forms/create)
You should see our simple form builder!

## Saving our form

We now have a form that can generate the form. The next step is to transform
the data from the form into something we can store and then render.

We can accomplish this by creating a fab4m form from the form data we are saving.

Let's go back to our form file and make a function to transform
our data into a full fab4m form:

```jsx
export function fab4mFromData(data) {
    const form = createForm();
    for (const field of data.fields) {
        const fieldType = fieldTypes.find(
            (type) => type.name === field.fieldType
        );
        form.add(
            formComponent({
                type: fieldType,
                name: `field_${form.components.length}`,
                label: field.label,
                required: field.required,
                widget: widgets[fieldType.name](),
            })
        );
    }
    return serialize(form);
}
```

This function takes the data from our form and transforms it into a fab4m form.
Notice that we serialize the form on the last line. This translates the form
into a format that can be stored as a json structure anywhere and then
deserialized back into a form later.

Over in our Create view we can now add our code to save the form back
to our endpoint:

```jsx
...
import { StatefulFormView, generateSchema, serialize } from "@fab4m/fab4m";
...
export default function Create() {
    form.onSubmit((e, data) => {
        e.preventDefault();
        const form = fab4mFromData(data);
        Inertia.post(route("forms.store"), {
            title: data.title,
            schema: JSON.stringify(generateSchema(form)),
            form: serialize(form),
        });
    });
...
```

Note that we generate the JSON schema here and send it along to the backend. Note the following:

* We are generating the schema for the form above so that it can be
  used for validation later.
* We use the serialize() function to serialize the form into something that can be
stored as a JSON object.

Let's implement the store function in `app/Http/Controllers/FormController.php` to handle our request:

```php
public function store(Request $request)
{
    $form = Form::create($request->validate([
        'title' => ['required', 'string'],
        'schema' => ['required', 'array'],
        'form' => ['required', 'array'],
    ]));
    return Redirect::route('forms.show', [$form->id]);
}
```

This will save our form into the database.

:::caution
You need more strict validation than this! This is good enough for a demo,
but it doesn't guarantee that the provided data is valid.
:::

## Viewing the form

Now that we saved our form, it's time to render it!

Let's stay in our FormController and add the following to the show function:

```php
public function show(Form $form)
{
    return Inertia::render("Form/Show", ['form' => $form]);
}
```

Before we dive into our Page component, let's add a new helper function to the Form.jsx file:

```jsx
export async function unserializeForm(form) {
    return await unserialize(
        form,
        [textFieldType, booleanFieldType, integerFieldType],
        [basic],
        [textFieldWidgetType, checkboxWidgetType, numberFieldWidgetType],
        [],
        [],
        []
    );
}
```

Now we can render the form in the `resources/js/Pages/Form/Show.jsx`:

```jsx
import { useState, useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import "@fab4m/fab4m/css/basic/basic.css";
import { unserializeForm } from "../../Forms/Form";
import { StatefulFormView, useForm } from "@fab4m/fab4m";

export default function Show({ form }) {
    const [unserializedForm, changeUnserializedForm] = useState(null);
    useEffect(() => {
        unserializeForm(form.form).then(changeUnserializedForm);
    }, []);
    return (
        <GuestLayout>
            <Head title="Show form" />
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Create a new form
            </h2>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {unserializedForm && (
                        <StatefulFormView form={unserializedForm} />
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
```

Normally you wouldn't want to unserialize the form within the
 component, but since this is the entry point for inertia I don't
 think we have a choice.

Now, if you head over to
[http://localhost/forms/create](http://localhost/forms/create) and
create a form, you should be redirect to the show page, where your
form is shown. That's pretty neat!

## Saving submissions

We can now render the form, but let's take this a step further. Why not deal with handling submissions from any form you fancy creating with our new builder?

We start the usual way, by creating a new model for our submissions:

```bash
php artisan make:model FormSubmission -c -m -r
```

Let's start with setting up the migration
(`database/migrations/[date]-create_form_submissions_table.php`):

```php
public function up()
{
    Schema::create('form_submissions', function (Blueprint $table) {
        $table->id();
        $table->foreignId('form_id')->constrained();
        $table->json('submission');
        $table->timestamps();
    });
}
```

And then we set up the model (`app/Models/FormSubmission.php`):

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormSubmission extends Model
{
    use HasFactory;
    protected $fillable = ['form_id', 'submission'];
    protected $casts = [
        'submission' => 'json',
    ];
}
```

Then, for our controller, let's implement the store and show methods:

```php
...
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Opis\JsonSchema\Validator;
use Opis\JsonSchema\Errors\ErrorFormatter;
...
public function store(Request $request, Form $form, FormSubmission $formSubmission)
{
    $validator = new Validator();
    $result = $validator->validate((object)$request->get('submission'), $form->schema);
    if (!$result->isValid()) {
        abort(422, (new ErrorFormatter())->format($result->error()));
    }
    $submission = FormSubmission::create([
        'form_id' => $form->id,
        'submission' => $request->get('submission'),
    ]);
    return Redirect::route('forms.submissions.show', [$form->id, $submission->id]);
}

public function show(Form $form, FormSubmission $submission)
{
    return Inertia::render("FormSubmission/Show", ['submission' => $submission]);
}
```

The magic happens in the `store` method. We validate our incoming request using our
JSON Schema validator, and then save our submission.

The `show` method renders an Inertia view to show our submission.

## Taking care of our submissions on the frontend

Let's expand on our `Show` component a bit:

```jsx
...
export default function Show({ form }) {
    const [unserializedForm, changeUnserializedForm] = useState(null);
    useEffect(() => {
        unserializeForm(form.form).then(changeUnserializedForm);
    }, []);
    unserializedForm?.onSubmit((e, data) => {
        e.preventDefault();
        Inertia.post(route("forms.submissions.store", [form.id]), {
            submission: data,
        });
    });
...
```

We add an onSubmit function to the form, and store the data coming through
from the form.

Then in the `resources/js/Pages/FormSubmission/Show.jsx` we add the following:

```jsx
import GuestLayout from "@/Layouts/GuestLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/inertia-react";

export default function Show({ submission }) {
    const data = [];
    for (const key in submission.submission) {
        data.push(
            <li key={key}>
                <strong>{`${key}: `}</strong>
                {submission.submission[key]}
            </li>
        );
    }
    return (
        <GuestLayout>
            <Head title="Submission" />
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Submission
            </h2>
            <div className="py-12">
                <ul>{data}</ul>
            </div>
        </GuestLayout>
    );
}
```

This will render the data that was just submitted!

## That's it

That was a long post! But we accomplished a lot:

* We made it possible to create any form and save it along with a schema to validate it.
* We made it possible to save submissions for that form.

There are of course tons of features we didn't expose here, but it's still a nice
demo of how to construct any form you'd like and validate easily.

The source is available in the [fab4m laravel example repository](https://github.com/fab4m-forms/fab4m-laravel-example).
