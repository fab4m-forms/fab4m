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

type ProfileForm = {
  name: string;
  email: string;
  website: string;
  picture: File;
  agree: boolean;
};

const form = createForm<ProfileForm>({
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
  const [profile, changeProfile] = useState<ProfileForm | undefined>(undefined);
  const [image, changeImage] = useState<string | undefined>(undefined);

  form.onSubmit((e, submittedData) => {
    e.preventDefault();
    changeProfile(submittedData);
    if (submittedData.picture?.type?.startsWith("image")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target) {
          changeImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(submittedData.picture);
    }
  });

  return (
    <>
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
    </>
  );
}
