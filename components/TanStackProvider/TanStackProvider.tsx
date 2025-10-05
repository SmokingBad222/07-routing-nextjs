'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider, DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query'; 

interface TanStackProviderProps {
  children: ReactNode;
  dehydratedState?: DehydratedState;
}

export default function TanStackProvider({ children, dehydratedState }: TanStackProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  );
}



