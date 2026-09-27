
import type Entity from "../entity/entity.ts";
import type UniqueEntityId from "../value-objects/unique-entity-id.vo.ts";
import NotFoundError from "../errors/not-found.error.ts";
import type { RepositoryInterface, SeachableRepositoryInterface } from "./repository-contract.ts";

export abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E> {
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity)
  }

  async findById(id: string | UniqueEntityId): Promise<E> {
    // const _id = id.toString()
    const _id = `${id}`;
    const item = await this._get(_id);
    return item;
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<void> {
    await this._get(entity.id);
    const indexFound = this.items.findIndex(i => i.id === entity.id);
    this.items[indexFound] = entity
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);
    const indexFound = this.items.findIndex(i => i.id === _id);
    this.items.splice(indexFound, 1);

  }

  protected async _get(id: string): Promise<E> {
    const item = this.items.find(i => i.id == id);
    if (!item) {
      throw new NotFoundError(`Entity Not Found using ID ${id}`)
    }
    return item;
  }

}

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SeachableRepositoryInterface<E, any, any> {
  search(props: any): Promise<any> {
    throw new Error("Method not implemented.");
  }

}
