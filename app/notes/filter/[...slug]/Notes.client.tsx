'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox'; 
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import { useDebouncedCallback } from 'use-debounce'; 
import css from './Notes.client.module.css';

type Props = { tag: string };

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, tag, search],
    queryFn: () => fetchNotes({ page, perPage: 12, search: search || tag }),
    placeholderData: (prev) => prev,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes.</p>;

  return (
    <div className={css.container}>
      <div className={css.topBar}>
        <SearchBox onSearch={debouncedSearch} />
        <button className={css.createButton} onClick={() => setModalOpen(true)}>
          + Add Note
        </button>
      </div>

      {data?.notes?.length ? (
        <>
          <NoteList notes={data.notes} />
          <Pagination
            currentPage={page}
            pageCount={data?.totalPages || 1}
            onPageChange={setPage}
          />
        </>
      ) : (
        <p>No notes found.</p> 
      )}

      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <NoteForm onClose={() => setModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}




 