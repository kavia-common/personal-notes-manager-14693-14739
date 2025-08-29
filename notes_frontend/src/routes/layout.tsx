import { component$, useStyles$, useTask$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { Sidebar } from "~/components/sidebar";
import { NoteList } from "~/components/note-list";
import { SearchBar } from "~/components/search-bar";
import { NoteEditor } from "~/components/note-editor";
import { Toolbar } from "~/components/toolbar";
import { useNotesState } from "~/lib/state";
import { notesApi } from "~/lib/api/client";
import styles from "./styles.css?inline";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

// PUBLIC_INTERFACE
export default component$(() => {
  useStyles$(styles);

  const state = useNotesState();

  useTask$(() => {
    state.refresh();
  });

  return (
    <div class="app">
      <Sidebar>
        <div class="brand">
          <div class="brand-badge" />
          <span>Notes</span>
        </div>
        <SearchBar onSearch$={state.search} />
        <NoteList
          notes={state.filtered.value}
          activeId={state.activeNote.value?.id}
          onSelect$={state.setActive}
          onDelete$={async (note) => {
            try {
              await notesApi.deleteNote(note.id);
              state.removeFromState(note.id);
            } catch (e) {
              console.error("Failed to delete note:", e);
            }
          }}
        />
        <div class="sidebar-footer">
          {state.filtered.value.length} note{state.filtered.value.length !== 1 ? "s" : ""}
        </div>
      </Sidebar>

      <div class="main">
        <Toolbar
          onNew$={() => state.setActive(null)}
          onSave$={async () => {
            if (!state.activeNote.value) return;
            try {
              const note = state.activeNote.value;
              if (!note.id) {
                // Create new note
                const created = await notesApi.createNote({
                  title: note.title,
                  content: note.content,
                });
                state.upsertInState(created);
              } else {
                // Update existing note
                const updated = await notesApi.updateNote(note.id, {
                  title: note.title,
                  content: note.content,
                });
                state.upsertInState(updated);
              }
            } catch (e) {
              console.error("Failed to save note:", e);
            }
          }}
          onRefresh$={state.refresh}
          canSave={!!state.activeNote.value?.title || !!state.activeNote.value?.content}
        />
        {state.loading.value ? (
          <div class="content">Loading...</div>
        ) : state.error.value ? (
          <div class="content">Error: {state.error.value}</div>
        ) : (
          <NoteEditor
            note={state.activeNote.value ?? { id: "", title: "", content: "", created_at: "", updated_at: "" }}
            onChange$={(draft) => {
              state.activeNote.value = {
                ...state.activeNote.value ?? { id: "", created_at: "", updated_at: "" },
                ...draft,
              };
            }}
          />
        )}
      </div>
    </div>
  );
});
