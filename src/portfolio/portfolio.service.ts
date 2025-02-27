import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AddCoinDto, CreatePortfolioDto } from './dto/portfolioControllerDto';
import { PrismaService } from 'src/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name }: CreatePortfolioDto, userId: string) {
    try {
      const newPortfolio = await this.prisma.portfolio.create({
        data: {
          name: name,
          userId: userId,
        },
      });

      return newPortfolio;
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Portfolio with this name already exists');
      }

      console.error('Error creating portfolio:', error);
      throw new InternalServerErrorException(
        'Portfolio creation failed due to an unknown error.',
      );
    }
  }

  async getAll(userId: string) {
    try {
      return await this.prisma.portfolio.findMany({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      console.log('Error fetching portfolios for user', error);
      throw new InternalServerErrorException(
        'Error fetching portfolios for user',
      );
    }
  }

  async addCoin(body: AddCoinDto, userId: string) {
    try {
      const [portfolio, coin] = await Promise.all([
        this.prisma.portfolio.findUnique({
          where: {
            id: body.portfolioId,
          },
        }),

        this.prisma.coin.upsert({
          where: {
            coinGeckoId: body.coinGeckoId,
          },
          create: {
            name: body.name,
            coinGeckoId: body.coinGeckoId,
            symbol: body.name,
            image: body.image,
          },
          update: {
            name: body.name,
            coinGeckoId: body.coinGeckoId,
            symbol: body.name,
            image: body.image,
          },
        }),
      ]);

      if (!portfolio) {
        throw new ConflictException('Portfolio not found');
      }

      if (portfolio.userId !== userId) {
        throw new ConflictException('Portfolio does not belong to user');
      }

      const coinInPortfolio = await this.prisma.portfolioHolding.create({
        data: {
          portfolioId: portfolio.id,
          coinId: coin.coinGeckoId,
          quantity: 0,
          transactions: {},
        },
      });

      return coinInPortfolio;
    } catch (error) {
      console.log('Error adding coin to portfolio', error);
      throw new InternalServerErrorException('Error adding coin to portfolio');
    }
  }
}
