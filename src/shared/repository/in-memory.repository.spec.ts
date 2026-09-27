import Entity from "../domain/entity/entity.ts";
import NotFoundError from "../errors/not-found.error.ts";
import InMemoryRepository from "./in-memory.repository.ts";

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
    it('should  throw error on find by id when entity not found', () => {
      expect(repository.findById(uuid)).rejects.toThrow();
      expect(repository.findById(uuid)).rejects.toThrow(new NotFoundError(`Entity Not Found using ID ${uuid}`));

    });
  });




});
