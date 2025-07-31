import { createTRPCReact } from "@trpc/react-query";
import { httpLink, createTRPCClient } from "@trpc/client";
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
    httpLink({
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
      fetch: async (url, options) => {
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            console.warn(`tRPC request failed: ${response.status} ${response.statusText}`);
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          return response;
        } catch (error) {
          console.warn('tRPC fetch error:', error);
          throw error;
        }
      },
    }),
  ],
});