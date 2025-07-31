import { createTRPCReact } from "@trpc/react-query";
import { httpLink, createTRPCClient } from "@trpc/client";
import type { AppRouter } from "@/backend/trpc/app-router";
import superjson from "superjson";

const getBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_RORK_API_BASE_URL) {
    return process.env.EXPO_PUBLIC_RORK_API_BASE_URL;
  }

  // For Rork platform, use the current origin
  if (typeof window !== 'undefined') {
    // Web environment - use current origin
    return window.location.origin;
  } else {
    // React Native environment - use the tunnel URL
    // This should be set by the Rork platform
    return process.env.EXPO_PUBLIC_API_URL || 'https://rork.com';
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
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          return response;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
});