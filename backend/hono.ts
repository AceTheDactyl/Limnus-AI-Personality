import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server";
import { cors } from "hono/cors";
import { appRouter } from "./trpc/app-router";
import { createContext } from "./trpc/create-context";

// app will be mounted at /api
const app = new Hono();

// Enable CORS for all routes
app.use("*", cors());

// Mount tRPC router at /trpc
app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext,
    onError: ({ error, path }) => {
      console.error('tRPC Error:', { path, error: error.message, stack: error.stack });
    },
  })
);

// Debug endpoint to test tRPC mounting
app.get("/trpc", (c) => {
  console.log('tRPC base endpoint hit');
  return c.json({ 
    message: "tRPC server is mounted",
    timestamp: new Date().toISOString()
  });
});

// Simple health check endpoint
app.get("/", (c) => {
  console.log('Health check endpoint hit');
  return c.json({ 
    status: "ok", 
    message: "API is running",
    timestamp: new Date().toISOString(),
    endpoints: {
      trpc: "/api/trpc",
      health: "/api"
    }
  });
});

// Test endpoint for debugging
app.get("/test", (c) => {
  return c.json({ 
    message: "Backend test successful",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

export default app;