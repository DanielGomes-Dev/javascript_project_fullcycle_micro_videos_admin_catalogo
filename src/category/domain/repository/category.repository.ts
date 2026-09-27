import type { SeachableRepositoryInterface } from "../../../shared/domain/repository/repository-contract.ts";
import type { Category } from "../entities/category.ts";

export default interface CategoryRepository extends SeachableRepositoryInterface<Category, any, any> {

}
