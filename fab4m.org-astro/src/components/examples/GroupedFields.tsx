import React, { useState } from "react";
import { createForm, textField, integerField, group } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  name: textField({ label: "Band name" }),
  info: group(
    { label: "Band info" },
    {
      genre: textField({
        label: "Genre",
        description: "Genre",
        required: true,
      }),
      active_since: integerField({
        label: "Active since",
        description: "Enter the year from which the band has been active",
      }),
    },
  ),
  performances: group(
    { label: "Performances", multiple: true, minItems: 1 },
    {
      city: textField({
        label: "City",
        description: "Enter the city",
        required: true,
      }),
      audience_count: integerField({
        label: "People in the audience",
        required: true,
      }),
    },
  ),
});

export default function GroupedFields() {
  const [band, changeBand] = useState(undefined);

  form.onSubmit((e, submittedData) => {
    e.preventDefault();
    changeBand(submittedData);
  });

  return (
    <div className="example-container">
      <style>{`
        .example-container {
          padding: 1rem;
          border: 1px solid var(--sl-color-gray-3);
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          background: var(--sl-color-black);
        }
        .result-card {
          margin-top: 1rem;
          padding: 1rem;
          border: 1px solid var(--sl-color-gray-3);
          border-radius: 0.5rem;
          background: var(--sl-color-gray-7);
        }
        .result-card h4 {
          margin: 0 0 0.5rem 0;
        }
        .result-card h5 {
          margin: 0.75rem 0 0.25rem 0;
        }
        .result-card dl {
          margin: 0;
        }
        .result-card dt {
          font-weight: 600;
          margin-top: 0.25rem;
        }
        .result-card dd {
          margin: 0;
        }
        .result-card ul {
          margin: 0;
          padding-left: 1.25rem;
        }
      `}</style>
      <FormProvider renderer={allWidgetsRenderer}>
        <StatefulFormView form={form} />
      </FormProvider>
      {band && (
        <div className="result-card">
          <h4>{band.name}</h4>
          <dl>
            <dt>Genre</dt>
            <dd>{band.info.genre}</dd>
            <dt>Active since</dt>
            <dd>{band.info.active_since}</dd>
          </dl>
          <h5>Performances</h5>
          <ul>
            {band.performances.map((performance, i) => (
              <li key={i}>
                {performance.city} (audience: {performance.audience_count})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
