"use server";

import { db } from "@/db/index";
import { notes } from "@/db/schema/notes";
import { revalidatePath } from "next/cache";

export async function addNoteAction(formData: FormData) {
  const rawFormData = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  if (!rawFormData.title || !rawFormData.content) {
    throw new Error("Title and content are required");
  }
  const newNote = await db.insert(notes).values(rawFormData);

  revalidatePath("/");
  return newNote;
}
