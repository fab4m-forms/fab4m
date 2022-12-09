import {
  createForm,
  basic,
  textField,
  integerField,
  unserialize,
  serialize,
} from "@fab4m/fab4m";

const form = createForm(basic, {
  name: textField({ title: "Name" }),
  age: integerField({ title: "Age" }),
});

const serialized = serialize(form);
