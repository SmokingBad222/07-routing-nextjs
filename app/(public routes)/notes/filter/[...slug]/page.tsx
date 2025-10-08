import { QueryClient, dehydrate } from '@tanstack/react-query';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import css from './NotePage.module.css'

type Props = {
  params: { slug?: string[] }; 
}

export default async function FilteredNotesPage({ params }: Props) {
  
  const tag = params?.slug?.[0] === 'All' ? '' : params?.slug?.[0] || '';
  
  const queryClient = new QueryClient();
  

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: tag }),
  });

  const dehydrated = dehydrate(queryClient);

  return (
    <TanStackProvider dehydratedState={dehydrated}>
      <NotesClient tag={tag} />
    </TanStackProvider>
  );
}
