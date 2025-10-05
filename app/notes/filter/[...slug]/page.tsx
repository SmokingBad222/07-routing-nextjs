import { QueryClient, dehydrate } from '@tanstack/react-query';
import TanStackProvider from '../../../../components/TanStackProvider/TanStackProvider';
import { fetchNotes } from '../../../../lib/api';
import NotesClient from './Notes.client';

type Props = {
  params: { slug?: string[] }; 
}

export default async function FilteredNotesPage({ params }: Props) {
  const queryClient = new QueryClient();
  

  const tag = params.slug?.[0] ?? '';

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '', tag: tag || undefined }),
  });

  const dehydrated = dehydrate(queryClient);

  return (
    <TanStackProvider dehydratedState={dehydrated}>
      <NotesClient tag={tag} />
    </TanStackProvider>
  );
}
