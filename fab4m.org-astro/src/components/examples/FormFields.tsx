import React, { useState } from "react";
import {
  createForm,
  textField,
  booleanField,
  emailField,
  fileField,
  urlField,
} from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

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
    label: "I agree to the terms and conditions",
    required: true,
  }),
});

export default function FormFields() {
  const [profile, changeProfile] = useState(undefined);
  const [image, changeImage] = useState(undefined);

  form.onSubmit((e, submittedData) => {
    console.log(e);
    e.preventDefault();
    changeProfile(submittedData);
    if (submittedData.picture?.type?.startsWith("image")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        changeImage(e.target.result);
      };
      reader.readAsDataURL(submittedData.picture);
    }
  });

  return (
    <div className="example-container">
      <FormProvider renderer={allWidgetsRenderer}>
        <StatefulFormView form={form} />
      </FormProvider>
      {profile && (
        <div className="result-card">
          <h4>Submitted Data:</h4>
          {image && <img className="avatar" src={image} alt="Profile" />}
          <div className="result-item">
            <strong>Name:</strong> {profile.name}
          </div>
          <div className="result-item">
            <strong>Email:</strong> {profile.email}
          </div>
          <div className="result-item">
            <strong>Website:</strong> {profile.website}
          </div>
        </div>
      )}
    </div>
  );
}
