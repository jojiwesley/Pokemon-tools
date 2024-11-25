import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) {}

  create(createPokemonDto: CreatePokemonDto) {
    return this.prisma.pokemon.create({
      data: {
        name: createPokemonDto.name,
      },
    });
  }

  findAll() {
    return this.prisma.pokemon.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.pokemon.findUniqueOrThrow({
      where: {
        id,
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
