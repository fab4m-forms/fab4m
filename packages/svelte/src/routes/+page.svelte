<script lang="ts">
  const examples = [
    { href: "/simple", title: "Simple Form", description: "Basic form with text, email, and number fields" },
    { href: "/validation", title: "Validation", description: "Form with various validation rules" },
    { href: "/multipage", title: "Multipage Form", description: "Form split across multiple pages" },
    { href: "/conditional", title: "Conditional Rules", description: "Fields that show/hide based on other field values" },
    { href: "/group", title: "Group Fields", description: "Nested field groups" },
    { href: "/stateful", title: "Stateful Form", description: "Form that manages its own state" },
    { href: "/custom-widget", title: "Custom Widget", description: "Using custom widgets with forms" },
  ];
</script>

<svelte:head>
  <title>Fab4m Svelte Examples</title>
</svelte:head>

<h1>Fab4m Svelte Integration Examples</h1>

<p>Select an example below to see the fab4m form library in action with Svelte.</p>

<ul>
  {#each examples as example}
    <li>
      <a href={example.href}><strong>{example.title}</strong></a>
      <p>{example.description}</p>
    </li>
  {/each}
</ul>

<style>
  h1 {
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    margin-bottom: 1.5rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 1rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  li:hover {
    background-color: #f9f9f9;
  }
  
  a {
    color: #0066cc;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  li p {
    margin: 0.5rem 0 0 0;
    font-size: 0.9rem;
  }
</style>
