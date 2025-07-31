import { createTRPCReact } from "@trpc/react-query";
import { httpLink, loggerLink, createTRPCClient } from "@trpc/client";
import type { AppRouter } from "@/backend/trpc/app-router";
import superjson from "superjson";

const getBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_RORK_API_BASE_URL) {
    console.log('Using EXPO_PUBLIC_RORK_API_BASE_URL:', process.env.EXPO_PUBLIC_RORK_API_BASE_URL);
    return process.env.EXPO_PUBLIC_RORK_API_BASE_URL;
  }

  // For Rork platform, use the current origin
  if (typeof window !== 'undefined') {
    // Web environment - use current origin
    const baseUrl = window.location.origin;
    console.log('Using web origin as base URL:', baseUrl);
    return baseUrl;
  } else {
    // React Native environment - use the tunnel URL
    // This should be set by the Rork platform
    const baseUrl = process.env.EXPO_PUBLIC_API_URL || 'https://rork.com';
    console.log('Using React Native API URL:', baseUrl);
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
        console.log('Request options:', {
          method: options?.method,
          headers: options?.headers,
          body: options?.body ? 'present' : 'none'
        });
        
        try {
          const response = await fetch(url, {
            ...options,
            headers: {
              'Content-Type': 'application/json',
              ...options?.headers,
            },
          });
          
          console.log('tRPC response status:', response.status);
          console.log('tRPC response headers:', Object.fromEntries(response.headers.entries()));
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error('tRPC error response body:', errorText);
            throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
          }
          
          return response;
        } catch (error: unknown) {
          console.error('tRPC fetch error:', error);
          const errorDetails = error instanceof Error ? {
            name: error.name,
            message: error.message,
            stack: error.stack
          } : {
            name: 'Unknown',
            message: String(error),
            stack: undefined
          };
          console.error('Error details:', errorDetails);
          throw error;
        }
      },
    }),
  ],
});