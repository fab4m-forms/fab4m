# Working with fab4m in Laravel

This is the first part in a blog series about how you can use fab4m together
with different backend frameworks.

At my current workplace ([Leanlab.co](https://leanlab.co/)) we use Laravel as our web framework and we are veryhappy with it. That's why it's only natural to start there!

In this blog post we are going to set up a laravel installation with
[Laravel
breeze](https://laravel.com/docs/9.x/starter-kits#laravel-breeze), a
starter kit for laravel that provides you with a solid boilerplate to
start building any app.

To get things integrated with react we are using [Inertja.js](https://inertiajs.com/), a way to easily tie your react frontend together with your backend.

## Installing laravel

Have a look at the [Laravel installation guide](https://laravel.com/docs/9.x/installation) for the full details,
but in short, if you have [php](https://php.net), [composer](https://getcomposer.org/) and [node](https://nodejs.org/en/) installed you can go ahead:

```bash
composer create-project laravel/laravel fab4m-example
```

This will get you started with a blank laravel project.

## Getting everything in place with docker

I usually work with docker to get things like mysql and other related services going.
    Luckily laravel provides us with an easy way to do that called [laravel sail](https://laravel.com/docs/9.x/sail):

```bash
composer require laravel/sail --dev
php artisan sail:install
```

This will install laravel sail and get everything configured for you!

Now you can run:

```bash
vendor/bin/sail up -d
```

To get your full environment up and running.

Now, browse to http://localhost you should see your environment up and running!

## Setting up laravel breeze

Laravel breeze gives us a flying start with authentication and a nice setup
to get you going with React. The starter kit gets you going with all the tooling
you need, pretty neat!

```bash
composer require laravel/breeze --dev
php artisan breeze:install react
```

## Running the migrations

Laravel breeze provides you with a user model for authentication.
You can get the schema installed by migrating:

```bash
vendor/bin/sail artisan migrate
```

## Try it out

Visit: [http://localhost/register](http://localhost/register)

You should see a form to register and you can perform the registration process!

## Install fab4m

Now it's time for the fun part, let's see how we can use fab4m to complement
our already amazing stack! Let's begin by installing it:

```bash
npm install --save @fab4m/fab4m
```

## Make a diary model, migration and controller

Laravel provides us with a nice way of generating a lot of boilerplate code.

The following command creates:
* A [Laravel model](https://laravel.com/docs/9.x/eloquent) for our diary posts
* A [Laravel migration](https://laravel.com/docs/9.x/migrations) for setting up the diary schema
* A [Laravel resource controller](https://laravel.com/docs/9.x/controllers#resource-controllers) for handling our CRUD operations.

```bash
php artisan make:model Diary -c -m -r
```

## Let's fill in the blanks!

Now we have some actual coding to do, finally!

Let's start with our migration,there should be a file called [date]-create_diaries_table.php in your database/migrations folder, edit the `up()` function to this:

```php
public function up()
{
    Schema::create('diaries', function (Blueprint $table) {
        $table->id();
        $table->text('title');
        $table->text('body');
        $table->json('tags')->nullable();
        $table->timestamps();
    });
}
```

This will create a database table with a title and body text field and a json field for storing tags for the diaries.

Next up, edit your model (`app/Models/Diary.php`) a bit:

```php
class Diary extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'body', 'tags'];
    protected $casts = ['tags' => 'json'];
}
```

This will make the title, body and tags fillable when saving data.
We also indicate that the tags is json data so that it will be properly handled.

Then edit our controller to render an inertia javascript page for showing our form:

```php
public function create()
{
    return Inertia::render('Diary/Create', []);
}
```

Finally we need to register our new resource controller among our routes, this is done in routes/web.php file:

```php
Route::resource('diaries', DiaryController::class);
```

We're ready to render our form on the client side!

## Setting up the fab4m form

Let's start with creating a fab4m form, create a file in resources/js/Forms/Diary.js:

```jsx
import {
    createForm,
    textField,
    textAreaWidget,
    tagsWidget,
} from "@fab4m/fab4m";

export default createForm({
    title: textField({ label: "Title", required: true }),
    body: textField({
        label: "Body",
        required: true,
        widget: textAreaWidget(),
    }),
    tags: textField({
        label: "Tags",
        multiple: true,
        multipleWidget: tagsWidget(),
    }),
});
```

We create a simple form with a title and a body field, and we spice it up
with an autocomplete tags field. This allows us to re-use the form wherever we like.

With the form in hand we can now create our first Inertia page. Create the file `resources/js/Pages/Diary/Create.jsx`:

```jsx
import GuestLayout from "@/Layouts/GuestLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import "@fab4m/fab4m/css/basic/basic.css";
import form from "../../Forms/Diary";
import { StatefulFormView } from "@fab4m/fab4m";

export default function Create() {
    form.onSubmit((e, data) => {
        e.preventDefault();
        Inertia.post(route("diaries.store"), data);
    });
    return (
        <GuestLayout>
            <Head title="Create new diary" />
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Create new diary
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

Notice that we add an `onSubmit()` handler on the form. That handler is then used
to submit our data back to laravel.

The GuestLayout is provided by the breeze boilerplate and provides
a basic header and footer. The real magic happens in our StatefulFormView where
we render the form. We use the `StatefulFormView` component to render the form.
The state is then handled internally.

Visit [http://localhost/diaries/create](http://localhost/diaries/create)

You should see our newly created form in action, and if you submit the
form you will be presented with an error that your method for creating
your diary isn't returning anything.

## Saving your laravel model

Head over to `app/Http/Controllers/DiaryController.php`and add the following to your `store` method:

```php
use use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

...

public function store(Request $request)
{
    $diary = Diary::create($request->validate([
          'title' => ['required', 'string'],
          'body' => ['required', 'string'],
          'tags' => ['nullable', 'array'],
       ]));
     return Redirect::route('diaries.show', [$diary->id]);
}
```

Once the form is saved you will be redirected to the show page. That page can be implemented the same way as the create page:

```php
public function show(Diary $diary)
{
    return Inertia::render('Diary/Show', ['diary' => $diary]);
}
```

Notice that we're sending the diary along. This diary is then available in the page component, `resources/views/js/Pages/Show.jsx`:

```jsx
import GuestLayout from "@/Layouts/GuestLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/inertia-react";

export default function Show({ diary }) {
    return (
        <GuestLayout>
            <Head title={diary.title} />
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Diary: {diary.title}
            </h2>
            <div className="py-12">
                <article className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <h3 class="font-bold">Entry</h3>
                    <p className="mb-4">{diary.body}</p>
                    <h3 class="font-bold">Tags</h3>
                    <ul className="list-disc ml-8 mt-1">
                        {diary.tags.map((tag, i) => (
                            <li key={i}>{tag}</li>
                        ))}
                    </ul>
                    <Link
                        className="text-blue-700"
                        href={route("diaries.edit", [diary.id])}
                    >
                        Edit
                    </Link>
                </article>
            </div>
        </GuestLayout>
    );
}
```

## And that's it!

We have a working example. If the form is this basic, you probably want to
stick with Laravel validation, but if you want to utilize the full power of fab4m,
you can use JSON schema instead to validate your submission. Let's explode how that would look like.

## Generating the JSON Schema

You can generate a json schema from any form by using the `generateSchema` function:

```jsx
console.log(JSON.stringify(generateSchema(form)));
```

The output from this function will be the json schema that you can use to validate your form anywhere.

Add the schema to your function:
```php
class DiaryController extends Controller
{
    private string $schema = <<<JSON
{"title":"Form data","description":"A form submission","type":"object","properties":{"title":{"type":"string","title":"Title","minLength":1},"body":{"type":"string","title":"Title","minLength":1},"tags":{"type":"array","title":"Tags","items":{"type":"string","title":"Tags"},"minItems":0}},"required":["title","body"],"dependencies":{}}
JSON;

...

}
```

With the schema in place, you can use any json schema validator to validate it. Here we use the [opis json-schema package](https://opis.io/json-schema):

```bash
composer require opis/json-schema
```

## Using the JSON schema for validation

Now that we have our schema available we can use the json schema validator
instead of the native laravel validation to do the work for us:

```php
public function store(Request $request)
{
  $validator = new Validator();
  $result = $validator->validate((object)$request->all(), $this->schema);
  if (!$result->isValid()) {
    abort(422, (new ErrorFormatter())->format($result->error()));
  }
  $diary = Diary::create(
    $request->all();
  );
  return Redirect::route("diaries.show", [$diary->id]);
}
```

## That's a wrap!

This is an example of how to integrate fab4m into a Laravel app.
This example wasn't particularly exciting in terms of form building,
so in the next blog post I will expand on this application to include
something that would be more of a challenge!

The full source code for this blog post is available [here](https://github.com/fab4m-forms/fab4m-laravel-example)
