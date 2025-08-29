import { component$, $, useSignal } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";

// PUBLIC_INTERFACE
export interface SearchBarProps {
  placeholder?: string;
  onSearch$: PropFunction<(text: string) => void>;
}

export const SearchBar = component$<SearchBarProps>(({ onSearch$, placeholder }) => {
  const value = useSignal("");

  const onInput = $((e: Event) => {
    const v = (e.target as HTMLInputElement).value;
    value.value = v;
    onSearch$(v);
  });

  return (
    <div class="search">
      <input
        type="search"
        value={value.value}
        onInput$={onInput}
        placeholder={placeholder ?? "Search notes..."}
        aria-label="Search notes"
      />
    </div>
  );
});
