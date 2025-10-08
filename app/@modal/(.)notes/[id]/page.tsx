"use client";

import NotePreview from "./NotePreview.client";
import { useEffect, useState } from "react";
import { fetchNoteById } from "@/lib/api"; 

interface Note {
  id: string;
  title: string;
  content: string;
}

interface PageProps {
  params: { id: string };
}

export default function NoteModalPage({ params }: PageProps) {
  const { id } = params;
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    fetchNoteById(id).then(setNote);
  }, [id]);

  if (!note) return null;

  return <NotePreview note={note} />;
}
