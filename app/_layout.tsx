import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ConsciousnessProvider } from "@/contexts/ConsciousnessContext";
import { trpc } from "@/lib/trpc";
import { httpLink, loggerLink } from "@trpc/client";
import superjson from "superjson";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const getBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_RORK_API_BASE_URL) {
    return process.env.EXPO_PUBLIC_RORK_API_BASE_URL;
  }

  // For Rork platform, use the current origin
  if (typeof window !== 'undefined') {
    return window.location.origin;
  } else {
    // React Native environment - use the tunnel URL
    return process.env.EXPO_PUBLIC_API_URL || 'https://rork.com';
  }
};

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  }));

  const [trpcClient] = useState(() =>
    trpc.createClient({
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
    })
  );

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ConsciousnessProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RootLayoutNav />
          </GestureHandlerRootView>
        </ConsciousnessProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
