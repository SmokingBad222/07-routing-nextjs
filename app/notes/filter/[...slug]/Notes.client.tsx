'use client';

import { useState } from 'react';
import { useQuery} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import css from './Notes.client.module.css';

type Props = { tag: string};

export default function NotesClient({tag}: Props) {

  const [page, setPage] = useState(1);
  
  const { data, isLoading, isError} = useQuery({
    queryKey: ['notes', page, tag],
    queryFn: () => fetchNotes({ page, perPage: 12, search: tag }),
    placeholderData: (prev) => prev,   
  });

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading notes.</p>

  return (
    <div className={css.container}>
      <NoteList notes={data?.notes || []} />
      <Pagination
      currentPage={page}
      pageCount={data?.totalPages || 1}
      onPageChange={setPage}
      />
    </div>
  );
}



 