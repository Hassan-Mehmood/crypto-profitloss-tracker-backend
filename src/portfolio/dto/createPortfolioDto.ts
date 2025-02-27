import { z } from 'zod';

export const createPortfolioDto = z
  .object({
    name: z.string(),
  })
  .required();

export type CreatePortfolioDto = z.infer<typeof createPortfolioDto>;
