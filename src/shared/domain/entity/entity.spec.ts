import UniqueEntityId from "../value-objects/unique-entity-id.vo.ts";
import Entity from "./entity.ts";

import { validate as uuidValidate } from 'uuid'

class StubEntity extends Entity<{ prop1: string; prop2: number }> {

}

describe('Entity unit tests', () => {
  it('should set props and id', () => {
    const arrange = {
      prop1: "prop1 value",
      prop2: 10,
    }
    const entity = new StubEntity(arrange);

    expect(entity.props).toStrictEqual(arrange);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).not.toBeNull();
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it('should accept a valid uuif', () => {
    const arrange = {
      prop1: "prop1 value",
      prop2: 10,
    }
    const uuid = new UniqueEntityId()
    const entity = new StubEntity(arrange, uuid);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe(uuid.value)
  });

  it('should convert a entity to a javascript Object', () => {
    const arrange = {
      prop1: "prop1 value",
      prop2: 10,
    }
    const uuid = new UniqueEntityId()
    const entity = new StubEntity(arrange, uuid);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.toJSON()).toStrictEqual({ "id": uuid.value, ...arrange })
  });


});
