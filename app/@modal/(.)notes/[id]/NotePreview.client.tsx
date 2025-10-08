"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/app/@modal/default";


interface Note {
  id: string;
  title: string;
  content: string;
}

interface Props {
  note: Note;
}

export default function NotePreview({ note }: Props) {
  const router = useRouter();

  const handleClose = () => router.back();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <Modal onClose={handleClose}>
      <div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>
    </Modal>
  );
}


