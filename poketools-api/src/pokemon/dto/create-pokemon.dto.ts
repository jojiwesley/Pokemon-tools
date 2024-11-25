import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePokemonDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;
}
