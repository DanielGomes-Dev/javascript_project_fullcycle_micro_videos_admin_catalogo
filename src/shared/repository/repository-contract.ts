import type Entity from "../domain/entity/entity.ts";
import type UniqueEntityId from "../domain/value-objects/unique-entity-id.vo.ts";

export interface RepositoryInterface<T extends Entity> {
  insert(entity: T): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<T>;
  findAll(): Promise<T[]>;
  update(entity: T): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;

}

// geralmente passamos a instancia da entidade ou o id
