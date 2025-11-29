import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
  HttpStatus,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthenticatedGuard } from 'src/auth/authentication.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationDTO } from 'src/utils/paginate';
import { Response } from 'express'

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @Req() request,
    @Res() response:Response,
  ) {
    const result=await this.todosService.create(createTodoDto, request.user.id);
    return response.status(result.statusCode).json(result);
  }

  @Get()
  async findAll(
    @Query() paginationDTO: PaginationDTO,
    @Res() response:Response,
    @Req() request,
  ) {
    const result=await  this.todosService.findAll(paginationDTO, request.user.id);
    return response.status(result.statusCode).json(result);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string, 
    @Res() response:Response,
    @Req() request, 
  ) {
    const result=await this.todosService.findOne(id, request.user.id);
    return response.status(result.statusCode).json(result);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateTodoDto: UpdateTodoDto,
    @Res() response:Response,
    @Req() request,
  ) {
    const result=await this.todosService.update(id, updateTodoDto, request.user.id);
    return response.status(result.statusCode).json(result);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() response:Response,
    @Req() request,
  ) {
    const result=await this.todosService.remove(id, request.user.id);
    return response.status(result.statusCode).json(result);
  }
}
