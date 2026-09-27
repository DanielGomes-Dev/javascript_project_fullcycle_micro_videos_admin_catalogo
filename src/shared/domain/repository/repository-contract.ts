import type Entity from "../entity/entity.ts";
import type UniqueEntityId from "../value-objects/unique-entity-id.vo.ts";


export interface RepositoryInterface<T extends Entity> {
  insert(entity: T): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<T>;
  findAll(): Promise<T[]>;
  update(entity: T): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;

}

export interface SeachableRepositoryInterface<E extends Entity, SearchParams, SearchResult> extends RepositoryInterface<E> {
  search(props: SearchParams): Promise<SearchResult>;
}
