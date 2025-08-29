import { component$, Slot } from "@builder.io/qwik";

export const Sidebar = component$(() => {
  return (
    <aside class="sidebar">
      <Slot />
    </aside>
  );
});
