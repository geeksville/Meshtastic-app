enum Type {
    OPAQUE = 0,
    CLEAR_TEXT = 1,
    CLEAR_READACK = 2,
  }

export class Data {
    type: Type;
    payload: String;
}