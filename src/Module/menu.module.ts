import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuController } from 'src/Controller/menu.controller';
import { Menu, MenuSchema } from 'src/Schema/menu.schema';
import { CategoryService } from 'src/Service/category.service';
import { MenuService } from 'src/Service/menu.service';
import { Category, CategorySchema } from 'src/Schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Menu.name, schema: MenuSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [MenuController],
  providers: [MenuService, CategoryService],
})
export class MenuModule {}
