import { deepFreeze } from "./objects.ts";

deepFreeze

describe('object Unite Tests', () => {
  it('should imutable string', () => {
    const objFreezed = deepFreeze("string test");
    expect(typeof objFreezed).toBe("string");
  });

  it('should freeze a scalar value', () => {

    const objFreeze_stringd = deepFreeze("string test");
    expect(typeof objFreeze_stringd).toBe("string");

    const objFreezed_boolean_true = deepFreeze(true);
    expect(typeof objFreezed_boolean_true).toBe("boolean");

    const objFreezed_boolean_false = deepFreeze(false);
    expect(typeof objFreezed_boolean_false).toBe("boolean");

    const objFreezed_num = deepFreeze(5);
    expect(typeof objFreezed_num).toBe("number");
  });

  it('should imutable object', () => {
    const date = new Date()
    const objFreezed = deepFreeze(
      {
        prop1: "test",
        deep: {
          prop2: "test2",
          prop3: date,
        }
      });

    expect(() => { objFreezed.prop1 = "1" }).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'")
    expect(() => { objFreezed.deep = { prop2: "oi", prop3: new Date() } }).toThrow("Cannot assign to read only property 'deep' of object '#<Object>'")
    expect(() => { objFreezed.deep.prop2 = "1" }).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'")
    expect(() => { objFreezed.deep.prop3 = new Date() }).toThrow("Cannot assign to read only property 'prop3' of object '#<Object>'")

    expect(objFreezed.deep.prop3).toBeInstanceOf(Date);

  });

});
