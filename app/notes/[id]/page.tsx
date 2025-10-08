"use client";

import NotePreview from "@/components/NotePreview/NotePreview";

interface Note {
  id: string;
  title: string;
  content: string;
}


interface PageProps {
  params: {
    id: string;
  };
}

export default function NoteModalPage({ params }: PageProps) {
  const { id } = params;


  const fakeNote: Note = {
    id,
    title: `Note ${id}`,
    content: `This is the content of note ${id}.`,
  };

  return <NotePreview note={fakeNote} />;
}
