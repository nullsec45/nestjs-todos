import { Transform } from 'class-transformer'
// import { ApiProperty } from '@nestjs/swagger'

export class PaginationDTO {
//   @ApiProperty({
//     example: '1',
//     required: true
//   })
  @Transform(({ value }) => parseInt(value))
  page?: number

//   @ApiProperty({
//     example: '10',
//     required: true
//   })
  @Transform(({ value }) => parseInt(value))
  perPage?: number
}

export class Paginate {
  page: number
  take: number
  skip: number

  constructor({ page, perPage }: PaginationDTO) {
    this.page = page ?? 1
    this.take = perPage ?? 10
    this.skip = this.page <= 1 ? 0 : this.page * this.take - perPage
  }
}