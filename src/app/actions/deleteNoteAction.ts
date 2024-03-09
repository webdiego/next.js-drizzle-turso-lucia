"use server";

import { db } from "@/db/index";
import { notes } from "@/db/schema/notes";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteNoteAction(formData: FormData) {
  const rawFormData = {
    id: formData.get("id"),
  };
  if (!rawFormData.id) {
    throw new Error("id is required to delete note.");
  }

  let noteId = Number(rawFormData.id);

  const noteDeleted = await db
    .delete(notes)
    .where(eq(notes.id, noteId))
    .returning();

  revalidatePath("/");

  return noteDeleted;
}
