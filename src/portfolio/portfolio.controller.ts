import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import {
  AddCoinDto,
  AddTransactionDto,
  CreatePortfolioDto,
} from './dto/portfolioControllerDto';
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

  @Get('get-all-portfolios')
  async getAll(@Request() req) {
    const userId = req.user.userId;
    return await this.portfolioService.getAll(userId);
  }

  @Get('get-portfolio/:id')
  async getPortfolio(@Request() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return await this.portfolioService.getPortfolioById(id, userId);
  }

  // Implement edit portfolio name
  // Implement delete portfolio

  @Post('add-coin')
  async addCoin(@Body() body: AddCoinDto, @Request() req) {
    const userId = req.user.userId;
    return await this.portfolioService.addCoin(body, userId);
  }

  @Post('add-transaction')
  async addTransaction(@Body() body: AddTransactionDto) {
    return await this.portfolioService.addTransaction(body);
  }
}
