import React from 'react';
import { render, screen  } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import Posts from './Posts';

const endpoint = (uri) => new URL(uri, 'https://jsonplaceholder.typicode.com').toString();

const handlers = [
  http.get(endpoint('/posts'), () => {
    return HttpResponse.json([
      { id: '1' },
      { id: '2' },
    ]);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Posts Component', () => {
  it('displays posts', async () => {
    render(<Posts />, { wrapper: MockProviders });

    const post = await screen.findByText('Post 1');

    expect(post).toBeInTheDocument();
  });
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const MockProviders = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);
