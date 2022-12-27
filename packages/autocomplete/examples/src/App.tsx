import "./App.css";
import "../../../core/css/basic/basic.css";
import "../../src/style.css";
import {
  createForm,
  integerField,
  StatefulFormView,
  textField,
  bulma,
  setDefaultTheme,
} from "@fab4m/fab4m";

import { autocompleteWidget } from "../../src";

function App() {
  setDefaultTheme(bulma);
  const fakeItems = [];
  const profiles = [];
  for (let i = 0; i < 30; i++) {
    fakeItems.push([`Item ${i}`, i + 1]);
    profiles.push({
      name: `Person ${i + 1}`,
      picture:
        "https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg",
      description: `This is person ${i + 1}`,
    });
  }
  const form = createForm({
    text: textField({
      label: "wat",
    }),
    autocomplete: textField({
      label: "Autocomplete label",
      widget: autocompleteWidget({ items: ["test", "test2"] }),
    }),
    autocompleteLabel: textField({
      label: "Autocomplete value and label",
      widget: autocompleteWidget({
        items: [
          ["Test label", "test"],
          ["Test label 2", "test2"],
        ],
      }),
    }),
    autocompleteNumber: integerField({
      label: "Autocomplete number",
      widget: autocompleteWidget({ items: [1, 2] }),
    }),
    autocompleteCallback: integerField({
      label: "Autocomplete callback",
      widget: autocompleteWidget({
        items: async (search) =>
          !search
            ? []
            : fakeItems.filter((item) =>
                item[0].toLowerCase().includes(search.toLowerCase())
              ),
      }),
    }),
    autocompleteElement: integerField({
      label: "Autocomplete callback",
      widget: autocompleteWidget({
        itemElement: (value) => {
          const profile = profiles[value - 1];
          return (
            <div>
              <div style={{ display: "flex" }}>
                <img width="30" height="30" src={profile.picture} />
                <h3 style={{ margin: "auto .2em" }}>{profile.name}</h3>
              </div>
              <div>{profile.description}</div>
            </div>
          );
        },
        items: async (search) =>
          !search
            ? []
            : fakeItems.filter((item) =>
                item[0].toLowerCase().includes(search.toLowerCase())
              ),
      }),
    }),
  }).onDataChange((data) => {
    console.log(data);
  });
  return (
    <div className="App">
      <StatefulFormView form={form} />
    </div>
  );
}

export default App;
