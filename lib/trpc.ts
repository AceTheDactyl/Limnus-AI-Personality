import { createTRPCReact } from "@trpc/react-query";
import { httpLink, loggerLink, createTRPCClient } from "@trpc/client";
import type { AppRouter } from "@/backend/trpc/app-router";
import superjson from "superjson";

const getBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_RORK_API_BASE_URL) {
    console.log('Using EXPO_PUBLIC_RORK_API_BASE_URL:', process.env.EXPO_PUBLIC_RORK_API_BASE_URL);
    return process.env.EXPO_PUBLIC_RORK_API_BASE_URL;
  }

  // Fallback to localhost for development
  if (typeof window !== 'undefined') {
    // Web environment
    const baseUrl = window.location.origin;
    console.log('Using web origin as base URL:', baseUrl);
    return baseUrl;
  } else {
    // React Native environment - use localhost
    const baseUrl = 'http://localhost:8081';
    console.log('Using React Native localhost:', baseUrl);
    return baseUrl;
  }
};

export const trpc = createTRPCReact<AppRouter>();

// Create a vanilla tRPC client for non-React usage
export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === 'development' ||
        (opts.direction === 'down' && opts.result instanceof Error),
    }),
    httpLink({
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
      fetch: async (url, options) => {
        console.log('tRPC request to:', url);
        try {
          const response = await fetch(url, {
            ...options,
            headers: {
              'Content-Type': 'application/json',
              ...options?.headers,
            },
          });
          console.log('tRPC response status:', response.status);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          return response;
        } catch (error) {
          console.error('tRPC fetch error:', error);
          throw error;
        }
      },
    }),
  ],
});