---
title: Remix and fab4m
description: Remix and fab4m work great together thanks to it's compatibility with react router. Let's dive in!
---
# Remix and fab4m

[Remix](https://remix.run/) is a great node framework to render react components server side. It
comes with some really great ways of handling loading and saving data and
it has recently become completely compatible with the popular [React Router](https://reactrouter.com/en/main) library.

Fab4m comes with a support package to support react router which means
it also works with remix. This let's you offload a lot of the work
that is normally done on the client to the server side!

This blog post illustrates how fab4m can be used together with Remix.
I won't go into great detail on how remix works, for that you can
check their excellent documentation!

<!--truncate-->

## Set up a new remix project

Remix comes with a few different stacks. We're going to use the indie stack
here which is really easy to get started with since it relies only on sqlite.

npx create-remix@latest --template remix-run/indie-stack fab4m-remix

## Clean up the boiler plate

The boilerplate code comes with some neat things that we don't need in this simple app, like an example entry model and authentication. We're going to start with stripping that out.

```bash
rm -r app/routes/notes/
app/routes/notes.tsx
app/routes/join.tsx
app/routes/login.tsx
app/routes/logout.tsx
app/models/note.server.ts
app/models/user.server.ts
app/session.server.ts
app/utils.ts
app/utils.test.ts
```

change root.tsx so that it looks like this, not that we also added the fab4m stylesheet:

```jsx
import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import fab4mStyleUrl from "@fab4m/fab4m/css/basic/basic.css";
import tailwindStylesheetUrl from "./styles/tailwind.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    // We add the fab4m style here.
    { rel: "stylesheet", href: fab4mStyleUrl },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

Then change the index.tsx to look like this:

```
import { Link } from "@remix-run/react";
export default function Index() {
  const diaries = useLoaderData<Diary[]>();
  return (
    <main className="relative m-auto mt-10 min-h-screen w-1/2 rounded bg-slate-200 bg-white p-4 sm:items-center">
      <h1 className="mb-4 text-3xl font-bold">Diaries</h1>
      <Link
        to="diaries/new"
        className="mb-4 inline-block rounded bg-sky-500 px-4 py-2 font-bold font-medium text-white hover:bg-sky-800"
      >
        Create new diary
      </Link>
    </main>
  );
}
```

Now you should be able to start your app with:

```bash
npm run dev
```

And you should see a fairly boring page with a link to a page to create a diary which doesn't exist yet.

# Set up your diary model with prisma

The indie stack comes with [Prisma](https://www.prisma.io/), a pretty neat Node ORM.

Open your prisma/prisma.schema file. There are some models in there which we won't
use, that you can remove if you want. Add our diary model:

```prisma
model Diary {
  id    String @id @default(cuid())
  title String
  body  String
  tags  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Then you can migrate and generate code for the model:

```bash
npx prisma db push
npx prisma migrate dev
```

## Set up your diary server model

Now that we have our prisma model we can create an intermediary model to talk to it.

Create `app/models/diary.server.ts` and open it.

Then add the following:

```jsx
import { Diary as DiaryModel } from "@prisma/client";
import { prisma } from "~/db.server";

// We export our own Diary interface which is our representation
// of the diary that will used inside of our components.
export interface Diary {
  id: string;
  body: string;
  title: string;
  tags: string[];
}

// We export some helper functions to load data from the prisma data layer here.
// This allows us to change how this works by only changing this file.
export async function getDiary({
  id,
}: Pick<DiaryModel, "id">): Promise<Diary | undefined> {
  const diary = await prisma.diary.findFirst({
    select: { id: true, body: true, title: true, tags: true },
    where: { id },
  });
  return diary
    ? {
        ...diary,
        tags: JSON.parse(diary?.tags),
      }
    : undefined;
}

export function getDiaries() {
  return prisma.diary.findMany({
    select: { id: true, title: true, body: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createDiary({
  body,
  title,
  tags,
}: Pick<Diary, "body" | "title"> & {
  tags: string[];
}) {
  return prisma.diary.create({
    data: {
      title,
      body,
      tags: JSON.stringify(tags),
    },
  });
}
```

We export a few helper functions that we can use to interface with the
database across our application.

# Set up the diary routes

Remix has an automatic routing system that picks up components in the app/routes directory. Let's create a new component for representing our form.

Create the file `app/routes/diaries/new.tsx` with the following contents:

```bash
import { createForm, tagsWidget, textAreaField, textField } from "@fab4m/fab4m";
import { StatefulFormRoute } from "@fab4m/routerforms";
import { Diary } from "~/models/diary.server";

const form = createForm<Diary>({
  title: textField({
    label: "Title",
    required: true,
  }),
  body: textAreaField({
    label: "Body",
    required: true,
  }),
  tags: textField({
    label: "Tags",
    multiple: true,
    multipleWidget: tagsWidget(),
  }),
});

export default function NewDiaryPage() {
  return (
    <main className="relative m-auto mt-10 min-h-screen w-1/2 rounded bg-slate-200 bg-white p-4 sm:items-center">
      <h1 className="mb-2 text-3xl font-bold">Create new diary</h1>
      // We use the StatefulFormRoute component here.
      // When we set useRouteAction={true} we tell remix to
      // manage form submissions from this form.
      <StatefulFormRoute form={form} useRouteAction={true} />
    </main>
  );
}
```

Here we create a basic form to fit our diary model. We type the form with the Diary interface so that we can be sure that the data matches.

You should now be able to visit http://localhost/diaries/new and see the new form!

## Saving a diary

Now that we have the form in place, we can use a remix action to save it. Make some changes to the new.tsx file:

```jsx
import {
  createForm,
  tagsWidget,
  textAreaField,
  textField,
  fromFormData,
} from "@fab4m/fab4m";
import { StatefulFormRoute } from "@fab4m/routerforms";
import { useActionData } from "@remix-run/react";
import { ActionArgs, json } from "@remix-run/server-runtime";
import { createDiary, Diary } from "~/models/diary.server";

const form = createForm<Diary>({
  title: textField({
    label: "Title",
    required: true,
  }),
  body: textAreaField({
    label: "Body",
    required: true,
  }),
  tags: textField({
    label: "Tags",
    multiple: true,
    multipleWidget: tagsWidget(),
  }),
});

// This is our new action function.
export async function action({ request }: ActionArgs) {
  // The fromFormData transforms the postdata from fab4m into
  // the format for our form.
  const formData = fromFormData(form, await request.formData());
  const diary = await createDiary(formData);
  // The diary is passed to the component.
  return json(diary);
}

export default function NewDiaryPage() {
  const diary = useActionData<Diary>();
  return (
    <main className="relative m-auto mt-10 min-h-screen w-1/2 rounded bg-slate-200 bg-white p-4 sm:items-center">
      {// Notify the user that the diary has been created.}
      {diary && <p>The diary {diary.title} was saved!</p>}
      <h1 className="mb-2 text-3xl font-bold">Create new diary</h1>
      <StatefulFormRoute form={form} useRouteAction={true} />
    </main>
  );
}

```

## Viewing a diary

The diary has now been saved to the database, so let's create a page to view it!

Create the file `app/routes/diaries/$diaryId.tsx`:

```
import { Link, useLoaderData } from "@remix-run/react";
import { getDiary, Diary } from "~/models/diary.server";

export async function loader({ params }: { params: { diaryId: string } }) {
  const diary = await getDiary({ id: params.diaryId });
  if (!diary) {
    throw new Response("Not Found", { status: 404 });
  }
  return diary;
}

export default function DiaryView() {
  const diary = useLoaderData<Diary>();
  return (
    <article className="relative m-auto mt-10 min-h-screen w-1/2 rounded bg-slate-200 bg-white p-4 sm:items-center">
      <Link to="../../" className="mb-4 inline-block text-sky-400">
        Back
      </Link>
      <h1 className="mb-2 text-3xl font-bold">{diary.title}</h1>
      <p className="mb-2">{diary.body}</p>
      <ul className="flex flex-wrap">
        {diary.tags.map((tag, i) => (
          <li
            className="mr-2 rounded bg-sky-500 px-2 px-4 text-sm text-white"
            key={i}
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
```

Now we have a way of viewing our diary! Let's change the `app/diaries/new.tsx` to redirect to the new page after creating a diary:

```jsx
// ...
import { ActionArgs, redirect } from "@remix-run/server-runtime";
// ...
export async function action({ request }: ActionArgs) {
  const formData = fromFormData(form, await request.formData());
  const diary = await createDiary(formData);
  return redirect(`/diaries/${diary.id}`);
}
```

Now, when you create a diary, you will be redirected to the diary page.

## Indexing all diaries

Let's change our app/routes/index.tsx to show a list of all diaries:

```jsx
import { Link, useLoaderData } from "@remix-run/react";
import { Diary, getDiaries } from "~/models/diary.server";

export function loader() {
  return getDiaries();
}

export default function Index() {
  const diaries = useLoaderData<Diary[]>();
  return (
    <main className="relative m-auto mt-10 min-h-screen w-1/2 rounded bg-slate-200 bg-white p-4 sm:items-center">
      <h1 className="mb-4 text-3xl font-bold">Diaries</h1>
      <Link
        to="diaries/new"
        className="mb-4 inline-block rounded bg-sky-500 px-4 py-2 font-bold font-medium text-white hover:bg-sky-800"
      >
        Create new diary
      </Link>
      {diaries.map((diary, i) => (
        <article key={i}>
          <h2 className="mb-2 text-2xl font-bold">
            <Link to={`diaries/${diary.id}`} className="hover:underline">
              {diary.title}
            </Link>
          </h2>
          <p className="mb-2">{diary.body}</p>
        </article>
      ))}
    </main>
  );
}
```

## Adding server side validation

You can't be sure the data you receive is fully valid. Luckily fab4m has support
for json schema, which makes validation easy.

Let's start by installing ajv, a json schema validator:

```bash
npm install --save ajv
```

Now we can add validation to our new.tsx component:

```jsx
import {
  createForm,
  fromFormData,
  tagsWidget,
  textAreaField,
  textField,
  generateSchema,
} from "@fab4m/fab4m";
import Ajv from "ajv";
import { StatefulFormRoute } from "@fab4m/routerforms";
import { ActionArgs, json, redirect } from "@remix-run/server-runtime";
import { createDiary, Diary } from "~/models/diary.server";
import { useActionData } from "@remix-run/react";

const form = createForm<Diary>({
  title: textField({
    label: "Title",
    required: true,
  }),
  body: textAreaField({
    label: "Body",
    required: true,
  }),
  tags: textField({
    label: "Tags",
    multiple: true,
    multipleWidget: tagsWidget(),
  }),
});

// Initialize ajv and generate the schema for our form.
const ajv = new Ajv();
const validate = ajv.compile(generateSchema(form));

export async function action({ request }: ActionArgs) {
  const formData = fromFormData<Diary>(form, await request.formData());
  // Validate our form submission, and send back any errors to then
  // component if there were any.
  const valid = validate(formData);
  if (!valid && validate.errors) {
    return json({ errors: validate.errors, data: formData });
  }
  const diary = await createDiary(formData);
  return redirect(`/diaries/${diary.id}`);
}

export default function NewDiaryPage() {
  const actionData = useActionData<typeof action>();

  return (
    <main className="relative m-auto mt-10 min-h-screen w-1/2 rounded bg-slate-200 bg-white p-4 sm:items-center">
      <h1 className="mb-2 text-3xl font-bold">Create new diary</h1>
      // If we have any action data here, then we have errors to print out.
      {actionData && (
        <ul>
          {actionData.errors.map((error, i) => (
            <li key={i} className="text-red mb-2">
              {error.message}
            </li>
          ))}
        </ul>
      )}
      // Provide the invalid data to the form when it renders.
      <StatefulFormRoute
        form={form}
        data={actionData?.data}
        useRouteAction={true}
      />
    </main>
  );
}
```

And that's it. We now have a fully working remix app with the fab4m goodness built in.
The full source code is available in the [example repository.](https://github.com/fab4m-forms/fab4m-remix-example)
