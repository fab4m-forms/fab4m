<script lang="ts">
  import type { WidgetProps } from "@fab4m/fab4m";

  type Props = WidgetProps<boolean, unknown>;

  let { component, value, onChange, name, id }: Props = $props();

  let isOn = $state(value ?? false);

  function toggle() {
    isOn = !isOn;
    onChange(isOn);
  }
</script>

<div class="toggle-widget">
  <label for={id}>{component.label}</label>
  {#if component.description}
    <p class="description">{component.description}</p>
  {/if}
  <div class="toggle-container">
    <button
      type="button"
      id={id}
      class="toggle-switch {isOn ? 'on' : 'off'}"
      onclick={toggle}
      role="switch"
      aria-checked={isOn}
      aria-label={component.label}
    >
      <span class="toggle-slider"></span>
    </button>
    <span class="toggle-label">{isOn ? 'ON' : 'OFF'}</span>
  </div>
  <input type="hidden" {name} value={isOn ? 'true' : 'false'} />
</div>

<style>
  .toggle-widget {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .description {
    font-size: 0.875rem;
    color: #666;
    margin: 0 0 0.5rem 0;
  }
  
  .toggle-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .toggle-switch {
    position: relative;
    width: 52px;
    height: 28px;
    border: none;
    border-radius: 14px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    padding: 0;
  }
  
  .toggle-switch.off {
    background-color: #ccc;
  }
  
  .toggle-switch.on {
    background-color: #0066cc;
  }
  
  .toggle-slider {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease;
  }
  
  .toggle-switch.on .toggle-slider {
    transform: translateX(24px);
  }
  
  .toggle-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #666;
  }
  
  .toggle-switch.on + .toggle-label {
    color: #0066cc;
  }
</style>
