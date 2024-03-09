"use client";
import React from "react";
import { deleteNoteAction } from "../app/actions/deleteNoteAction";
import ButtonDelete from "./ButtonDelete";

export default function DeleteForm({ note }: { note: any }) {
  const { id } = note;

  return (
    <form action={deleteNoteAction} className="mt-2">
      <input type="hidden" name="id" value={id} />
      <ButtonDelete />
    </form>
  );
}
