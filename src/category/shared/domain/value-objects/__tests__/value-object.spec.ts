import ValueObeject from "../value-object.ts"

class StubValueObject extends ValueObeject {

}

describe('ValueObject Unit Tests', () => {
  it('should set value', () => {
    var vo = new StubValueObject('string value')
    expect(vo.value).toBe('string value')

    var vo = new StubValueObject({ prop1: 'value1' })
    expect(vo.value).toStrictEqual({ prop1: 'value1' })

  });
});
