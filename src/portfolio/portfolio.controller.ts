import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { AddCoinDto, CreatePortfolioDto } from './dto/portfolioControllerDto';
import { AuthenticatedGuard } from 'src/auth/gaurds/authenticated.gaurd';

@Controller('portfolio')
@UseGuards(AuthenticatedGuard)
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post('create')
  async create(@Body() body: CreatePortfolioDto, @Request() req) {
    const userId = req.user.userId;
    return await this.portfolioService.create(body, userId);
  }

  @Get('get-all')
  async getAll(@Request() req) {
    const userId = req.user.userId;
    return await this.portfolioService.getAll(userId);
  }

  // Implement edit portfolio name
  // Implement delete portfolio

  @Post('add-coin')
  async addCoin(@Body() body: AddCoinDto, @Request() req) {
    const userId = req.user.userId;
    return await this.portfolioService.addCoin(body, userId);
  }
}
