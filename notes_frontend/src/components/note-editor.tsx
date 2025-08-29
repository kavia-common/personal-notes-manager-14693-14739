import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";
import type { Note } from "../lib/api/types";

// PUBLIC_INTERFACE
export interface NoteEditorProps {
  note: Note | null;
  onChange$: PropFunction<(draft: { title: string; content: string }) => void>;
}

export const NoteEditor = component$<NoteEditorProps>(({ note, onChange$ }) => {
  const title = useSignal(note?.title ?? "");
  const content = useSignal(note?.content ?? "");

  useTask$(({ track }) => {
    track(() => note?.id);
    title.value = note?.title ?? "";
    content.value = note?.content ?? "";
  });

  return (
    <div class="content">
      <div class="editor card">
        <div class="row" style={{ padding: "1rem" }}>
          <input
            class="title-input"
            placeholder="Note title"
            value={title.value}
            onInput$={(e) => {
              title.value = (e.target as HTMLInputElement).value;
              onChange$({ title: title.value, content: content.value });
            }}
            aria-label="Note title"
          />
        </div>
        <div class="row" style={{ padding: "0 1rem 1rem" }}>
          <textarea
            class="content-input"
            placeholder="Start typing your note..."
            value={content.value}
            onInput$={(e) => {
              content.value = (e.target as HTMLTextAreaElement).value;
              onChange$({ title: title.value, content: content.value });
            }}
            aria-label="Note content"
          />
        </div>
      </div>
    </div>
  );
});
