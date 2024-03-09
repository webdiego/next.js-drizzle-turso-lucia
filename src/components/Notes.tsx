import React from "react";
import DeleteForm from "./DeleteForm";

type NoteProps = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export default function Notes({ notes }: { notes: NoteProps[] }) {
  return (
    <div className="space-y-2 mt-2">
      {notes &&
        notes
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          .map((note) => (
            <div
              key={note.id}
              className="bg-slate-100 rounded-lg p-2 ring-1 ring-inset ring-gray-200 "
            >
              <div className="flex space-x-3">
                <h1 className="block text-sm font-medium leading-6 text-gray-900">
                  Title:
                </h1>
                <p className="block text-sm leading-6 text-gray-900">
                  {note.title}
                </p>
              </div>
              <div className="flex space-x-3">
                <h1 className="block text-sm font-medium leading-6 text-gray-900">
                  Content:
                </h1>
                <p className="block text-sm leading-6 text-gray-900">
                  {note.content}
                </p>
              </div>
              <div className="flex space-x-3">
                <h1 className="block text-sm font-medium leading-6 text-gray-900">
                  Created at:
                </h1>
                <p className="block text-sm leading-6 text-gray-900">
                  {note.created_at}
                </p>
              </div>

              <DeleteForm {...{ note }} />
            </div>
          ))}
    </div>
  );
}
