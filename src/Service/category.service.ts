import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Category } from '../Schema/category.schema';
import { CategoryViewDTO } from '../DTO/Category/category.view.dto';
import { CategoryCreateDTO } from '../DTO/Category/category.create.dto';
import { CategoryUpdateDTO } from '../DTO/Category/category.update.dto';
import { ForbiddenException } from '../Exception/forbidden.exception';
import { ICategoryService } from 'src/Interface/ICategory.service';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @InjectModel(Category.name) private CategoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<CategoryViewDTO[]> {
    const findAll = await this.CategoryModel.find().exec();
    if (findAll.length === 0) {
      throw new ForbiddenException('Não existe nenhuma categoria criada', 204);
    }
    return findAll;
  }

  async findName(name: string): Promise<Category> {
    const findNameExist = await this.CategoryModel.findOne({
      name: name,
    }).exec();
    if (!findNameExist) {
      throw new ForbiddenException('Essa categoria não existe', 409);
    }
    return findNameExist;
  }

  async findId(id: string): Promise<CategoryViewDTO> {
    const findIdExist = await this.CategoryModel.findById(id).exec();
    if (!findIdExist) {
      throw new ForbiddenException('O id da categoria não existe', 404);
    }
    return findIdExist;
  }

  async create(category: CategoryCreateDTO) {
    const findNameExist = await this.CategoryModel.findOne({
      name: category.name,
    });
    if (findNameExist) {
      throw new ForbiddenException('Essa categoria já existe', 409);
    }
    return this.CategoryModel.create(category);
  }

  async deleteOne(id: string): Promise<CategoryViewDTO> {
    const findId = await this.findId(id);
    await this.CategoryModel.deleteOne({ _id: id }).exec();
    return findId;
  }

  async findUpdateId(
    id: string,
    menu: CategoryUpdateDTO,
  ): Promise<CategoryUpdateDTO> {
    const findId = await this.findId(id);
    await this.CategoryModel.findByIdAndUpdate({ _id: id }, menu).exec();
    return findId;
  }
}
