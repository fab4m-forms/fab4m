import React, { useState } from "react";
import {
  createForm,
  textField,
  booleanField,
  emailField,
  fileField,
  urlField,
  StatefulFormView,
} from "@fab4m/fab4m";

const form = createForm({
  name: textField({
    label: "Your name",
    description: "Enter your full name",
    required: true,
  }),
  email: emailField({
    label: "Your email",
    description: "Enter your email address",
  }),
  website: urlField({
    label: "Show us your beautiful website",
  }),
  picture: fileField({
    label: "Upload a picture",
  }),
  agree: booleanField({
    label: "I agree to the terms and conditons",
    required: true,
  }),
});

export default function FormFields() {
  // We will store the submitted profile in this state.
  const [profile, changeProfile] = useState(undefined);
  // As an added bonus we will load any uploaded images so we can display them.
  const [image, changeImage] = useState(undefined);
  // The data provided is a validated object with the data.
  form.onSubmit((e, submittedData) => {
    e.preventDefault();
    changeProfile(submittedData);
    // Fab4m provides us with a file object that we can then load.
    if (submittedData.picture.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        changeImage(e.target.result);
      };
      reader.readAsDataURL(submittedData.picture);
    }
  });
  return (
    <div>
      <StatefulFormView form={form} />
      {profile && (
        <div className="card">
          <div className="card__header">
            <h3>{profile.name}</h3>
          </div>
          <div className="card__body">
            <div>
              {image && (
                <img
                  className="avatar__photo avatar__photo--xl"
                  src={image}
                  width="120"
                  height="120"
                />
              )}
            </div>
            <div>
              <strong>{profile.name}</strong>
            </div>
            <div>
              <strong>{profile.email}</strong>
            </div>
            <div>
              <strong>{profile.website}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
