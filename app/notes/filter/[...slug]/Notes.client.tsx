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
import Pagination from '@/components/Pagination/Pagination';


interface NotesClientProps {
  slug?: string[];
}

export default function NotesClient({ slug }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const tag = slug?.[0] === 'All' ? undefined : slug?.[0];

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchTerm(value);
    setPage(1);
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
    
    placeholderData: (prev) => prev,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;


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

      {notes.length > 0 ? (
        <>
          <NoteList notes={notes} />
          <Pagination currentPage={page} pageCount={totalPages} onPageChange={setPage} />
        </>
      ) : (
        <p>No notes found</p>
      )}

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
