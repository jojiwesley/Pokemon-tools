import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreatePokemonDto {
  @IsInt()
  pokemonNumber: number;

  @IsString()
  name: string;

  @IsString()
  url: string;

  @IsString()
  description: string;

  @IsInt()
  level: number;

  @IsString()
  element: string;

  @IsString()
  abilities: string;

  @IsString()
  boost: string;

  @IsString()
  material: string;

  @IsString()
  evolutionStone: string;

  @IsOptional()
  evolutions: string[];

  @IsOptional()
  moves: object;

  @IsOptional()
  effectiveness: object;
}
