'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal'; 
import { fetchNoteById } from '@/lib/api'; 
import css from './NotePreview.module.css'; 

interface Note {
  id: string;
  title: string;
  content: string;
  tag?: string;
  createdAt?: string;
}



export default function NotePreviewClient({ noteId }: { noteId: string }) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: 'always', 
  });

  const handleClose = () => router.back();

  if (isLoading)
    return <Modal onClose={handleClose}>Loading...</Modal>;

  if (isError || !note)
    return <Modal onClose={handleClose}>Note not found.</Modal>;

  return (
    <Modal onClose={handleClose}>
      <div className={css.note}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        {note.tag && <p className={css.tag}>#{note.tag}</p>}
        {note.createdAt && (
          <p className={css.date}>
            Created: {new Date(note.createdAt).toLocaleDateString()}
          </p>
        )}
        <button onClick={handleClose} className={css.close}>
          Close
        </button>
      </div>
    </Modal>
  );
}


