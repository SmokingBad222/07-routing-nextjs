'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';

export default function NoteModalPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const noteId = params.id;

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => getNoteById(noteId),
  });

  const handleClose = () => router.back();

  if (isLoading) return <Modal onClose={handleClose}>Loading...</Modal>;
  if (isError || !note) return <Modal onClose={handleClose}>Note not found.</Modal>;

  return (
    <Modal onClose={handleClose}>
      <NotePreview note={note} />
    </Modal>
  );
}

