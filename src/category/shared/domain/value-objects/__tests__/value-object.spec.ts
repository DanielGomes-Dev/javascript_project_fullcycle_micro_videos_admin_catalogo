import ValueObeject from "../value-object.ts"

class StubValueObject extends ValueObeject {

}

describe('ValueObject Unit Tests', () => {
  it('should set value string', () => {
    const vo = new StubValueObject('string value')
    expect(vo.value).toBe('string value')


  });

  it('should set value object', () => {
    const vo = new StubValueObject({ prop1: 'value1' })
    expect(vo.value).toStrictEqual({ prop1: 'value1' })

  });

  it('should convert null to a string', () => {
    const vo = new StubValueObject(null)
    expect(vo + "").toBe("null")
    expect(vo.toString()).toBe("null")
  });

  it('should convert undefined to a string', () => {
    const vo = new StubValueObject(undefined)
    expect(vo + "").toBe("undefined")
    expect(vo.toString()).toBe("undefined")
  });

  it('should convert all to a string', () => {
    const date = new Date()
    const arrange = [
      { received: null, expected: "null" },
      { received: undefined, expected: "undefined" },
      { received: "", expected: "" },
      { received: "fake test", expected: "fake test" },
      { received: 0, expected: "0" },
      { received: 1, expected: "1" },
      { received: 5, expected: "5" },
      { received: true, expected: "true" },
      { received: false, expected: "false" },
      { received: date, expected: date.toString() },
      { received: { prop1: 'value1', expected: "null" }, expected: JSON.stringify({ prop1: 'value1', expected: "null" }) }
    ]

    for (const value of arrange) {
      const vo = new StubValueObject(value.received)
      expect(vo.toString()).toBe(value.expected);
    }
  });



});
