import { component$ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";
import type { Note } from "../lib/api/types";

// PUBLIC_INTERFACE
export interface NoteListProps {
  notes: Note[];
  activeId?: string | null;
  onSelect$: PropFunction<(note: Note) => void>;
  onDelete$: PropFunction<(note: Note) => void>;
}

export const NoteList = component$<NoteListProps>(
  ({ notes, activeId, onSelect$, onDelete$ }) => {
    if (!notes.length) {
      return <div class="muted">No notes yet.</div>;
    }
    return (
      <div class="sidebar-list">
        {notes.map((n) => (
          <div
            key={n.id}
            class="note-item"
            style={{
              borderColor: activeId === n.id ? "var(--color-secondary)" : "",
            }}
          >
            <div onClick$={() => onSelect$(n)} style={{ cursor: "pointer" }}>
              <div class="title">{n.title || "Untitled note"}</div>
              <div class="meta">
                {new Date(n.updated_at).toLocaleString()}
              </div>
            </div>
            <div>
              <button
                class="ghost"
                aria-label={`Delete ${n.title}`}
                onClick$={() => onDelete$(n)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  },
);
