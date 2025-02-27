import { z } from 'zod';

export const createPortfolioDto = z
  .object({
    name: z.string(),
  })
  .required();

export const addCoinDto = z.object({
  name: z.string(),
  image: z.string(),
  symbol: z.string(),
  portfolioId: z.string(),
  coinGeckoId: z.string(),
});

export type CreatePortfolioDto = z.infer<typeof createPortfolioDto>;
export type AddCoinDto = z.infer<typeof addCoinDto>;
