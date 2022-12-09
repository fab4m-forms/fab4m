import React, { useState } from "react";
import { useForm, textField, basic } from "@fab4m/fab4m";
import { definitions } from "./form";
import clsx from "clsx";
import Structure from "./Structure";
import Complex from "./Complex";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

const FeatureList = [
  {
    title: "A common structure for all your forms",
    Component: Structure,
    description: (
      <>
        Fab4m provides a simple API for defining your forms, so you can avoid
        repeating yourself with lots of tedious markup. Fab4m lets you define
        the form structure and the representation at the same time.
      </>
    ),
  },
  {
    title: "Built for complex forms",
    Component: Complex,
    description: (
      <>
        Fab4m makes it easy to build complex forms. We provide rules, validators
        and widgets to make form building a breeze.
      </>
    ),
  },
];

function Feature({
  Svg,
  title,
  description,
  Component,
  form,
  components,
  formComponents,
  changeComponents,
}) {
  return (
    <div className={styles.centered}>
      <div className="text--center padding-horiz--md">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div>
        {Component && (
          <Component
            form={form}
            components={components}
            formComponents={formComponents}
            changeComponents={changeComponents}
          />
        )}
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  const [components, changeComponents] = useState([]);
  const formComponents = {
    name: textField({
      label: "Name",
      description: "Enter your full name",
      required: true,
    }),
    location: textField({
      label: "Location",
    }),
  };
  for (const component of components) {
    formComponents[component] = definitions.get(component).component;
  }
  const form = useForm(
    () => ({
      theme: basic,
      components: formComponents,
    }),
    [components.join(",")]
  );

  return (
    <section className={styles.features}>
      {FeatureList.map((props, idx) => (
        <Feature
          key={idx}
          {...props}
          components={components}
          changeComponents={changeComponents}
          formComponents={formComponents}
          form={form}
        />
      ))}
      <div className="text--center padding-horiz--lg intro">
        <Link className="button button--primary" to="/docs/intro">
          Give Fab4m a try
        </Link>
      </div>
    </section>
  );
}
