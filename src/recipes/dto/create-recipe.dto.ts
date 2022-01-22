import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly description: string;
}
