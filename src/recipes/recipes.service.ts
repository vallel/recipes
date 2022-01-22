import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
  ) {}

  create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const recipe = new Recipe();
    recipe.name = createRecipeDto.name;
    recipe.description = createRecipeDto.description;

    return this.recipesRepository.save(recipe);
  }

  findAll(): Promise<Recipe[]> {
    return this.recipesRepository.find();
  }

  async findOne(id: number): Promise<Recipe> {
    const recipe = await this.recipesRepository.findOne(id);

    if (!recipe) {
      throw new NotFoundException(`Recipe ${id} not found.`);
    }

    return recipe;
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return this.recipesRepository.update(id, updateRecipeDto);
  }

  remove(id: number) {
    return this.recipesRepository.delete(id);
  }
}
