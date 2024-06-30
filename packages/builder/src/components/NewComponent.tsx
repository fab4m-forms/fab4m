import React from "react";
import { useFormBuilder, useFormBuilderActions } from "../context";
import styles from "../styles";
import { FormComponent, serializeComponent } from "@fab4m/fab4m";

type NewComponentProps = {
  /** The name of the component. A random name will be generated if you don't specify this. */
  attributes: Partial<FormComponent>;
};

/**
 * Shows a gallery of available components to the user where they can select
 * a new one to add to the form.
 */
export function NewComponent(props: NewComponentProps) {
  const { changeForm } = useFormBuilderActions();
  const { plugins, icons, form } = useFormBuilder();

  return (
    <div className="p-4 mt-4 bg-slate-100 border rounded dark:border-slate-400 dark:bg-slate-700">
      <form className="flex flex-wrap" method="post">
        {plugins.types.map((type, i) => (
          <button
            name="type"
            value={type.type.name}
            type="button"
            onClick={() =>
              changeForm({
                ...form,
                components: [
                  ...form.components,
                  serializeComponent(
                    type.init({
                      ...props.attributes,
                      name:
                        props.attributes.name ??
                        form.components.length.toString(),
                    }),
                  ),
                ],
              })
            }
            className={`${styles.insetBtn} mr-4 py-2 w-40 mb-4 text-base flex font-bold rounded`}
            key={i}
          >
            {icons && icons[type.type.name] && (
              <span className="text-3xl mr-2">{icons[type.type.name]}</span>
            )}
            <span className="my-auto">{type.type.title}</span>
          </button>
        ))}
      </form>
    </div>
  );
}
