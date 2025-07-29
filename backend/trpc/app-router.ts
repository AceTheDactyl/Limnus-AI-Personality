import { createTRPCRouter } from "./create-context";
import hiRoute from "./routes/example/hi/route";
import limnusChatRoute from "./routes/limnus/chat/route";
import limnusEnhancedChatRoute from "./routes/limnus/enhanced-chat/route";

export const appRouter = createTRPCRouter({
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  limnus: createTRPCRouter({
    chat: limnusChatRoute,
    enhancedChat: limnusEnhancedChatRoute,
  }),
});

export type AppRouter = typeof appRouter;