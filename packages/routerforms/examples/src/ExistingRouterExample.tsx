import {
  emailField,
  textField,
  textAreaField,
  pageBreak,
  createForm,
  content,
  booleanField,
  allowedValues,
} from "fab4m";
import { FormRoute } from "../../src";
import * as React from "react";
import {
  Link,
  useLoaderData,
  createBrowserRouter,
  RouterProvider,
  Navigate,
  redirect,
  useRouteError,
} from "react-router-dom";

const registerForm = createForm({
  username: textField({
    label: "Username",
  }),
  email: emailField({ label: "Email" }),
  break: pageBreak(),
  bio: textAreaField({ label: "Bio" }),
  break2: pageBreak(),
  terms: content({}, () => <p>These are our terms!</p>),
  agree: booleanField({ label: "I agree to the terms!" }),
});

export default function ExistingRouterExample() {
  const [profiles, changeProfiles] = React.useState([]);
  const saveUser = (user) => {
    profiles.push({ ...user, id: profiles.length + 1 });
  };
  const router = createBrowserRouter([
    { path: "/", element: <Welcome /> },
    {
      path: "register",
      element: <Navigate to="/register/0" />,
    },
    {
      path: "/register/:part",
      element: <Register saveUser={saveUser} />,
      errorElement: <Wat />,
      action: async ({ request }) => {
        const data = Object.fromEntries(await request.formData());
        saveUser(data);
        return redirect("/profiles");
      },
    },
    {
      path: "profiles",
      element: <Profiles profiles={profiles} />,
    },
    {
      path: "profiles/:id",
      loader: async (request) => {
        const id = parseInt(request.params.id, 10);
        const profile = profiles.find((profile) => profile.id === id);
        if (profile) {
          return profile;
        }
        throw new Response("Not found", { status: 404 });
      },
      element: <Profile />,
    },
  ]);
  return <RouterProvider router={router} />;
}

function Welcome() {
  return (
    <div>
      <p>Welcome!</p>
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/profiles">Profiles</Link>
        </li>
      </ul>
    </div>
  );
}

function Profiles(props) {
  return (
    <div>
      <Link to="/">Back</Link>
      <h2>Profiles</h2>
      <ul>
        {props.profiles.map((profile, i) => (
          <li key={i}>
            <Link to={`/profiles/${profile.id}`}>{profile.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Profile() {
  const profile = useLoaderData();
  return (
    <div>
      <Link to="/profiles">Back</Link>
      <h2>{profile.username}</h2>
      <strong>{profile.email}</strong>
      <p>{profile.bio}</p>
    </div>
  );
}

function Register(props) {
  const [registerData, changeRegisterData] = React.useState({});
  registerForm.onDataChange(changeRegisterData);
  return (
    <FormRoute
      useRouteAction={true}
      basePath={"/register"}
      form={registerForm}
      data={registerData}
    />
  );
}

function Wat(props) {
  let error = useRouteError();
  console.error(error);
  return <div>wät</div>;
}
