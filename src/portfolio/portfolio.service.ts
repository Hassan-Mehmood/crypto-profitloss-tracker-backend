import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePortfolioDto } from './dto/createPortfolioDto';
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
}
