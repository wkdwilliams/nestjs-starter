import { ApiProperty } from '@nestjs/swagger';
export class FilterDto {
    @ApiProperty({ description: 'The name of the field to filter on.' })
    field: string;
    @ApiProperty({ description: 'The value to filter for.' })
    value: any;
}
