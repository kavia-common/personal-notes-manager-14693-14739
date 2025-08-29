import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// PUBLIC_INTERFACE
export default component$(() => {
  return null;
});

export const head: DocumentHead = {
  title: "Personal Notes",
  meta: [
    {
      name: "description",
      content: "Personal notes management application",
    },
  ],
};
