import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max } from 'class-validator';

export class PaginationDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @ApiProperty({
        type: Number,
        default: 1,
        required: false,
    })
    page = 1;

    @IsOptional()
    @Max(100)
    @IsInt()
    @Type(() => Number)
    @ApiProperty({
        type: Number,
        default: 10,
        required: false,
    })
    limit = 10;

    @IsOptional()
    @IsIn(['asc','desc','ASC','DESC'])
    @Transform(sort_id => sort_id.value.toUpperCase())
    @ApiProperty({
        type: String,
        default: 'DESC',
        required: false,
    })
    sort_id: 'ASC'|'DESC' = 'ASC';

    @IsOptional()
    @Type(() => String)
    @IsString()
    @ApiProperty({
        type: String,
        default: 'id',
        required: false,
    })
    order_by = "id";
}
