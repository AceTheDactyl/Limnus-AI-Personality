import { z } from "zod";
import { publicProcedure } from "../../../create-context";

export default publicProcedure
  .input(z.object({ name: z.string() }))
  .query(({ input }) => {
    console.log('Hi route called with:', input);
    return {
      hello: input.name,
      date: new Date(),
      message: `Hello ${input.name}! Backend is working correctly.`,
    };
  });