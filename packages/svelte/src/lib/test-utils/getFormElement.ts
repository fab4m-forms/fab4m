/**
 * Finds the first <form> element inside a container and returns it.
 * Throws if no form is found.
 */
export function getFormElement(container: Element): HTMLFormElement {
  const form = container.querySelector("form");
  if (!form) {
    throw new Error("Could not find form");
  }
  return form;
}
