import { InMemorySearchableRepository } from "../../../shared/domain/repository/in-memory.repository.ts";
import type { Category } from "../../domain/entities/category.ts";
import type CategoryRepository from "../../domain/repository/category.repository.ts";

export default class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository {

}
