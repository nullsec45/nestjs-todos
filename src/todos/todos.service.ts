import { Injectable,HttpStatus } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/common/prisma.service';
import { ResponseData } from 'src/types/response';
import { responseValue, responseValueWithData,} from 'src/utils/response';
import { Paginate, PaginationDTO } from 'src/utils/paginate';
import { isRecordNotFound } from 'src/utils/check-record';
import {  Prisma } from "@prisma/client";

@Injectable()
export class TodosService {
  constructor(
    private readonly prismaService:PrismaService,
  ){

  }

  async checkTodoMustExist(id:string, userId:string, type:string='check'){
      const todo=await this.prismaService.todo.findFirst({
          where:{
              id,
              user_id:userId,
          },
          include:type ===  'detail' ? {  user:true  } : undefined,
      });

      return todo;
  }

  async isUnique(where:Prisma.TodoWhereInput): Promise<boolean> {
      const found = await this.prismaService.todo.findFirst({
          where,
          select: { id: true },
      });

      return !Boolean(found);
  }

  async create(createTodoDto: CreateTodoDto, userId: string): Promise<ResponseData> {
      try {
        console.log('User ID:', userId); // Debugging line to check userId value
        const isUniqueTitle = await this.isUnique({
          AND: [{ user_id: userId }, { title: createTodoDto.title }],
        });

        if (!isUniqueTitle) {
          return responseValue(false, HttpStatus.CONFLICT, 'Todo Already Exist');
        }

        const todo = await this.prismaService.todo.create({
          data: {
            title: createTodoDto.title,
            description: createTodoDto.description,
            is_done: createTodoDto.is_done,
            user: {
              connect: { id: userId },
            },
          },
        });

        return responseValueWithData(true, HttpStatus.OK, 'Success Create Todo', todo);
      } catch (error) {
        return responseValue(false, HttpStatus.INTERNAL_SERVER_ERROR, error.message ?? 'Internal Server Error.');
      }
  }


  async findAll(paginationDTO: PaginationDTO, userId: string): Promise<ResponseData> {
    try {
      const { page, skip, take } = new Paginate({ ...paginationDTO });

      const todo = await this.prismaService.todo.findMany({
        where: { user_id: userId },
        skip: page ? skip : undefined,
        take: page ? take : undefined,
      });

      if (todo.length <= 0) {
        return responseValue(false, HttpStatus.NOT_FOUND, 'Data Todo Not Found');
      }

      return responseValueWithData(true, HttpStatus.OK, 'Success Get Data Todo', todo);
    } catch (error) {
      return responseValue(false, HttpStatus.INTERNAL_SERVER_ERROR, error.message ?? 'Internal Server Error.');
    }
  }


  async findOne(id: string, userId:string) : Promise<ResponseData> {
    try{
      const todo=await this.checkTodoMustExist(id, userId, 'detail');

      if (isRecordNotFound(todo)) {
          return responseValue(false, HttpStatus.NOT_FOUND, 'Todo Not Found')
      }

      return responseValueWithData(true, HttpStatus.OK, 'Success Get Data Todo',todo);
    }catch(error){
        return responseValue(false, HttpStatus.INTERNAL_SERVER_ERROR, error.message ?? 'Internal Server Error.');
    }
  }

  async update(id:string, updateTodoDto: UpdateTodoDto, userId:string) : Promise<ResponseData> {
    try{
        const todo=await this.checkTodoMustExist(id, userId);

         if (isRecordNotFound(todo)) {
          return responseValue(false, HttpStatus.NOT_FOUND, 'Todo Not Found')
        }

        const result = await this.prismaService.todo.update({
          where: { id, user_id:userId },
          data:{
            ...updateTodoDto
          }
        });

        return responseValueWithData(true, HttpStatus.OK,'Success Update Todo',result);
    }catch(error){  
        return responseValue(false, HttpStatus.INTERNAL_SERVER_ERROR, error.message ?? 'Internal Server Error.');
    }
  }

  async remove(id: string, userId:string ) : Promise<ResponseData> {
    try{
      const todo=await this.checkTodoMustExist(id, userId);
        
      if (isRecordNotFound(todo)) {
        return responseValue(false, HttpStatus.NOT_FOUND, 'Todo Not Found')
      }

      await this.prismaService.todo.delete({
        where:{
          id,
          user_id:userId,
        }
      });

      return responseValue(false, HttpStatus.OK, 'Success Delete Todo')
    }catch(error){
        return responseValue(false, HttpStatus.INTERNAL_SERVER_ERROR, error.message ?? 'Internal Server Error.');
    }
  }
}
