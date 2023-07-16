import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import console from "console";
import { Roles } from "src/common/decorators/roles.decorator";
import { ResponseError, ResponseSuccess } from "src/common/dto/response.dto";
import { RolesGuard } from "src/common/guards/roles.guard";
import { LoggingInterceptor } from "src/common/interceptors/logging.interceptor";
import { TransformInterceptor } from "src/common/interceptors/transform.interceptor";
import { IResponse } from "src/common/interfaces/response.interface";
import { role } from "../auth/constants";
import { CategoryServices } from "./categories.services";
import { CategoryDto } from "./dto/category.dto";

@Controller("categories")
@UseGuards(AuthGuard("jwt"))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class CategoriesController {
  constructor(private readonly categoryServices: CategoryServices) {}

  @Get("get")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async getCategories(): Promise<IResponse> {
    try {
      const categories = await this.categoryServices.getAllCategories();
      return new ResponseSuccess("Success", categories);
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("create")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async createCategory(@Body() body): Promise<IResponse> {
    try {
      const category = await this.categoryServices.createCategory(body);
      return new ResponseSuccess("Success", new CategoryDto(category));
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("update")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async updateCategory(@Body() body): Promise<IResponse> {
    try {
      const category = await this.categoryServices.updateCategory(body);
      return new ResponseSuccess("Success", category);
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("delete")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async deleteCategory(@Body() body): Promise<IResponse> {
    try {
      await this.categoryServices.deleteCategory(body);
      return new ResponseSuccess("Delete category successfully!", null);
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }
}
