import { z } from "zod";
import { publicProcedure } from "../../create-context";

export default publicProcedure
  .input(z.object({ name: z.string().optional() }).optional())
  .query(({ input }: { input?: { name?: string } | undefined }) => {
    const name = input?.name || 'World';
    return {
      hello: name,
      date: new Date(),
      message: `Hello ${name}! Backend is working correctly.`,
    };
  });