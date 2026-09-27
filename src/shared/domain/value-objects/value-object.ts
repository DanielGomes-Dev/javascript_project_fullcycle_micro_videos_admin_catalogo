import { deepFreeze } from "../utils/objects.ts";

export default abstract class ValueObject<Value = any> {
  protected readonly _value: Value;

  constructor(value: Value) {
    this._value = deepFreeze(Object.freeze(value));
  }

  get value(): Value {
    return this._value;
  }

  toString = () => {
    if (typeof this.value !== "object" || this.value == null) {
      try {
        return this.value.toString()
      } catch (e) {
        return this.value + ""
      }
    } else {
      const valueStr = this.value.toString();
      const valueJson = valueStr === "[object Object]" ? JSON.stringify(this.value) : valueStr
      return valueJson;

    }
  }

}
