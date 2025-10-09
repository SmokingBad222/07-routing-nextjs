'use client';

import css from './Notes.client.module.css';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes, FetchNotesResponse } from '@/lib/api';
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';

export default function NotesClient({ slug }: { slug?: string[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page] = useState(1);
  const tag = slug?.[0] === 'All' ? undefined : slug?.[0];

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchTerm(value);
  }, 500);

  
  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, tag, searchTerm],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        tag,
        search: searchTerm || undefined,
      }),
    
    placeholderData: (prevData) => prevData,
  });

  const notes = data?.notes ?? [];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load notes</p>;

  return (
    <div className={css.container}>
      <div className={css.topBar}>
        <SearchBox
          value={searchTerm}
          onChange={(value) => debouncedSearch(value)}
        />
        <button
          className={css.createButton}
          onClick={() => setModalOpen(true)}
        >
          + Add Note
        </button>
      </div>

      <NoteList notes={notes} />

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <NoteForm
            onClose={() => setModalOpen(false)}
            onCreated={() => {}}
          />
        </Modal>
      )}
    </div>
  );
}
