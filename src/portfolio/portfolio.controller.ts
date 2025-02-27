import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/createPortfolioDto';
import { AuthenticatedGuard } from 'src/auth/gaurds/authenticated.gaurd';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @UseGuards(AuthenticatedGuard)
  @Post('create')
  create(@Body() body: CreatePortfolioDto, @Request() req) {
    const userId = req.user.userId;
    return this.portfolioService.create(body, userId);
  }
}
