import { component$ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";

// PUBLIC_INTERFACE
export interface ToolbarProps {
  onNew$: PropFunction<() => void>;
  onSave$: PropFunction<() => void>;
  onRefresh$: PropFunction<() => void>;
  saving?: boolean;
  canSave?: boolean;
}

export const Toolbar = component$<ToolbarProps>(
  ({ onNew$, onSave$, onRefresh$, saving, canSave }) => {
    return (
      <div class="toolbar">
        <button class="secondary" onClick$={onRefresh$}>Refresh</button>
        <div class="spacer" />
        <button onClick$={onNew$}>New</button>
        <button disabled={!canSave || saving} onClick$={onSave$}>
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    );
  },
);
