"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/app/@modal/default";
import css from "./NotePreview.module.css";

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
      <div className={css.noteContainer}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
      </div>
    </Modal>
  );
}


