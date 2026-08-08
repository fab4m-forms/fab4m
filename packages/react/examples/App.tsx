import * as React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { useTheme } from "./theme";
import { Conditional } from "./routes/Conditional";
import { CustomWidget } from "./routes/CustomWidget";
import { Group } from "./routes/Group";
import { Home } from "./routes/Home";
import { Multipage } from "./routes/Multipage";
import { Simple } from "./routes/Simple";
import { Stateful } from "./routes/Stateful";
import { Validation } from "./routes/Validation";
import { Widgets } from "./routes/Widgets";

const examples = [
  { path: "/", title: "Home", description: "Overview of the examples" },
  {
    path: "/simple",
    title: "Simple Form",
    description: "Basic form with text, email, and number fields",
  },
  {
    path: "/validation",
    title: "Validation",
    description: "Form with various validation rules",
  },
  {
    path: "/multipage",
    title: "Multipage Form",
    description: "Form split across multiple pages",
  },
  {
    path: "/conditional",
    title: "Conditional Rules",
    description: "Fields that show/hide based on other field values",
  },
  { path: "/group", title: "Group Fields", description: "Nested field groups" },
  {
    path: "/widgets",
    title: "Widgets",
    description: "All built-in widgets side by side",
  },
  {
    path: "/stateful",
    title: "Stateful Form",
    description: "Form that manages its own state",
  },
  {
    path: "/custom-widget",
    title: "Custom Widget",
    description: "Using custom widgets with forms",
  },
];

export function App() {
  const { themeName, setThemeName } = useTheme();
  return (
    <div className="app">
      <nav className="sidebar">
        <h2>Fab4m React Examples</h2>
        <div className="theme-switcher">
          <span>Theme:</span>
          <button
            type="button"
            className={themeName === "basic" ? "active" : undefined}
            onClick={() => setThemeName("basic")}
          >
            Basic
          </button>
          <button
            type="button"
            className={themeName === "tailwind" ? "active" : undefined}
            onClick={() => setThemeName("tailwind")}
          >
            Tailwind
          </button>
        </div>
        <ul>
          {examples.map((example) => (
            <li key={example.path}>
              <NavLink
                to={example.path}
                end={example.path === "/"}
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                {example.title}
              </NavLink>
              <p>{example.description}</p>
            </li>
          ))}
        </ul>
      </nav>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simple" element={<Simple />} />
          <Route path="/validation" element={<Validation />} />
          <Route path="/multipage" element={<Multipage />} />
          <Route path="/conditional" element={<Conditional />} />
          <Route path="/group" element={<Group />} />
          <Route path="/widgets" element={<Widgets />} />
          <Route path="/stateful" element={<Stateful />} />
          <Route path="/custom-widget" element={<CustomWidget />} />
        </Routes>
      </main>
    </div>
  );
}
