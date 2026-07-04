<script lang="ts">
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
  } from "@fab4m/svelte";

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

  let profile = $state<ProfileForm | undefined>(undefined);
  let image = $state<string | undefined>(undefined);

  form.onSubmit((e, submittedData) => {
    e.preventDefault();
    profile = submittedData;
    if (submittedData.picture?.type?.startsWith("image")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target) {
          image = e.target.result as string;
        }
      };
      reader.readAsDataURL(submittedData.picture);
    }
  });
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} />
</FormProvider>

{#if profile}
  <div class="result-card">
    <h4>Submitted Data:</h4>
    {#if image}
      <img class="avatar" src={image} alt="Profile" />
    {/if}
    <div class="result-item">
      <strong>Name:</strong> {profile.name}
    </div>
    <div class="result-item">
      <strong>Email:</strong> {profile.email}
    </div>
    <div class="result-item">
      <strong>Website:</strong> {profile.website}
    </div>
  </div>
{/if}
