import { Injectable, Logger } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PokemonService {
  private readonly logger = new Logger(PokemonService.name);
  constructor(private prisma: PrismaService) {}

  create(createPokemonDto: CreatePokemonDto) {
    this.logger.log('Dados recebidos:', createPokemonDto);
    try {
      const pokemon = this.prisma.pokemon.create({
        data: createPokemonDto,
      });
      this.logger.log('Pokémon criado:', pokemon);
      return pokemon;
    } catch (error) {
      this.logger.error('Erro ao criar Pokémon:', error);
      throw new Error('Erro ao criar Pokémon');
    }
  }

  findAllPokemons() {
    return this.prisma.pokemon.findMany();
  }

  findPokemonByIdOrName(id: string) {
    const isNumber = !isNaN(Number(id));
    return this.prisma.pokemon.findFirst({
      where: {
        OR: [isNumber ? { id: parseInt(id, 10) } : { name: id }].filter(
          Boolean
        ),
      },
    });
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return this.prisma.pokemon.update({
      where: {
        id,
      },
      data: updatePokemonDto,
    });
  }

  remove(id: number) {
    return this.prisma.pokemon.delete({
      where: {
        id,
      },
    });
  }
}
