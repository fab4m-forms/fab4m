import * as React from "react";
import { Link } from "react-router-dom";

export function Home() {
  const examples = [
    {
      href: "/simple",
      title: "Simple Form",
      description: "Basic form with text, email, and number fields",
    },
    {
      href: "/validation",
      title: "Validation",
      description: "Form with various validation rules",
    },
    {
      href: "/multipage",
      title: "Multipage Form",
      description: "Form split across multiple pages",
    },
    {
      href: "/conditional",
      title: "Conditional Rules",
      description: "Fields that show/hide based on other field values",
    },
    {
      href: "/group",
      title: "Group Fields",
      description: "Nested field groups",
    },
    {
      href: "/widgets",
      title: "Widgets",
      description: "Every built-in widget side by side",
    },
    {
      href: "/stateful",
      title: "Stateful Form",
      description: "Form that manages its own state",
    },
    {
      href: "/custom-widget",
      title: "Custom Widget",
      description: "Using custom widgets with forms",
    },
  ];
  return (
    <div className="example-page">
      <h1>Fab4m React Integration Examples</h1>
      <p className="page-description">
        Select an example from the sidebar to see the fab4m form library in
        action with React.
      </p>
      <ul className="example-list">
        {examples.map((example) => (
          <li key={example.href}>
            <Link to={example.href}>
              <strong>{example.title}</strong>
            </Link>
            <p>{example.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
