import React, { useState } from "react";
import {
  createForm,
  textField,
  integerField,
  group,
  StatefulFormView,
} from "@fab4m/fab4m";

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
    }
  ),
  // Groups can be multiple.
  performances: group(
    { label: "Performances", multiple: true, minItems: 1 },
    {
      city: textField({
        label: "City",
        description: "Enter your full name",
        required: true,
      }),
      audience_count: integerField({
        label: "People in the audience",
        required: true,
      }),
    }
  ),
});

export default function GroupedFields() {
  const [band, changeBand] = useState(undefined);
  form.onSubmit((e, submittedData) => {
    e.preventDefault();
    changeBand(submittedData);
  });
  return (
    <div>
      <StatefulFormView form={form} />
      {band && (
        <>
          <h4>{band.name}</h4>
          <dl>
            {/*The band info group data is represented as an object*/}
            <dt>Genre</dt>
            <dd>{band.info.genre}</dd>
            <dt>Active since</dt>
            <dd>{band.info.active_since}</dd>
          </dl>
          <h5>Performances</h5>
          <ul>
            {/*Multiple groups are represented as an array of objects.*/}
            {band.performances.map((performance, i) => (
              <li key={i}>
                {performance.city} (in the audience: {performance.count})
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
