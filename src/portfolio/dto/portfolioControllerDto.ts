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

export const addTransaction = z.object({
  type: z.enum(['BUY', 'SELL']),
  quantity: z.number(),
  price: z.number(),
  portfolioHoldingId: z.string(),
  coinId: z.string(),
  date: z.string().datetime(),
});

export type CreatePortfolioDto = z.infer<typeof createPortfolioDto>;
export type AddCoinDto = z.infer<typeof addCoinDto>;
export type AddTransactionDto = z.infer<typeof addTransaction>;

export type TransactionType = 'BUY' | 'SELL';
