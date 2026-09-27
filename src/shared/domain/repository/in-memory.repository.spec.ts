import Entity from "../entity/entity.ts";
import NotFoundError from "../errors/not-found.error.ts";
import { InMemoryRepository } from "./in-memory.repository.ts";

type StubEntityProps = {
  name: string,
  price: number;
}

class StubEntity extends Entity<StubEntityProps> {

}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> { }

describe('InMemoryRepository Unit Tests', () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => {
    repository = new StubInMemoryRepository();

  })

  describe('Insert', () => {
    it('should inserts a new entity', async () => {

      expect(repository.items).toHaveLength(0);

      const entity = new StubEntity({ name: "name value", price: 5 })
      await repository.insert(entity)

      expect(repository.items).toHaveLength(1);
      expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
      expect(repository.items[0].props.name).toBe("name value");
      expect(repository.items[0].props.price).toBe(5);
    });
  });

  describe('FindById', () => {
    const uuid = "d6a12be6-ebca-4d7f-8048-38a45f51c65c"
    it('should  throw error on find by id when entity not found', async () => {
      await expect(repository.findById(uuid)).rejects.toThrow();
      await expect(repository.findById(uuid)).rejects.toThrow(new NotFoundError(`Entity Not Found using ID ${uuid}`));

    });

    it('should finds a entity by id', async () => {
      const entity = new StubEntity({ name: "name value", price: 5 })
      await repository.insert(entity);
      const entityFound = await repository.findById(entity.id);
      expect(entityFound).toStrictEqual(entity);
      expect(entityFound.toJSON()).toStrictEqual(entity.toJSON());
    });

    it('should finds a entity by uniqueEntityId', async () => {
      const entity = new StubEntity({ name: "name value", price: 5 })
      await repository.insert(entity);
      const entityFound = await repository.findById(entity.uniqueEntityId);
      expect(entityFound).toStrictEqual(entity);
      expect(entityFound.toJSON()).toStrictEqual(entity.toJSON());
    });
  });

  describe('FindAll', () => {
    it('should returns all entity', async () => {
      const entity_00 = new StubEntity({ name: "name value 01", price: 5 })
      const entity_01 = new StubEntity({ name: "name value 02", price: 10 })

      await repository.insert(entity_00);
      await repository.insert(entity_01);

      const entities = await repository.findAll()

      expect(entities).toHaveLength(2);
      expect(entities).toStrictEqual([entity_00, entity_01]);


    });
  });

  describe('Update', () => {
    it('should throw erros on update when entity not found', async () => {
      const entity = new StubEntity({ name: "name value 01", price: 5 })

      await expect(repository.update(entity)).rejects.toThrow();
      await expect(repository.update(entity)).rejects.toThrow(new NotFoundError(`Entity Not Found using ID ${entity.id}`));
    });

    it('should update when entity found', async () => {
      const entity = new StubEntity({ name: "name value 01", price: 5 })
      await repository.insert(entity);
      expect(repository.items[0]).toStrictEqual(entity);

      const entity_updated = new StubEntity({ name: "name value updated", price: 0 }, entity.uniqueEntityId);
      await repository.update(entity_updated);
      expect(repository.items[0]).toStrictEqual(entity_updated);
      expect(repository.items[0].toJSON()).toStrictEqual(entity_updated.toJSON());

    });
  });

  describe('Delete', () => {
    it('should throw erros on delete when entity not found', async () => {
      const entity = new StubEntity({ name: "name value 01", price: 5 })

      await expect(repository.delete(entity.id)).rejects.toThrow();
      await expect(repository.delete("FakeID")).rejects.toThrow(new NotFoundError(`Entity Not Found using ID FakeID`));

      await expect(repository.delete(entity.uniqueEntityId)).rejects.toThrow(new NotFoundError(`Entity Not Found using ID ${entity.id}`));
    });

    it('should delete when entity found with id', async () => {
      const entity = new StubEntity({ name: "name value 01", price: 5 })
      await repository.insert(entity);
      expect(repository.items[0]).toStrictEqual(entity);
      await repository.delete(entity.id);
      expect(repository.items).toHaveLength(0);
      expect(repository.items[0]).toBeUndefined();
    });



    it('should delete when entity found with uniqueid', async () => {
      const entity = new StubEntity({ name: "name value 01", price: 5 })
      await repository.insert(entity);
      expect(repository.items[0]).toStrictEqual(entity);
      await repository.delete(entity.uniqueEntityId);
      expect(repository.items).toHaveLength(0);
      expect(repository.items[0]).toBeUndefined();
    });
  });


});
