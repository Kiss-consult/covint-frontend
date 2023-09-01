export type Result<T> = Ok<T> | Err<T>;

export function fromJSON<T>(json: string): Result<T> {
  console.log(json);
  const obj = JSON.parse(json);
  if (obj["Ok"]) {
    return new Ok(obj["Value"]);
  }
  return new Err(obj["Error"]);
}

export class Ok<T> {
  constructor(private value: T) {}

  isOk(): boolean {
    return true;
  }

  isErr(): boolean {
    return false;
  }

  unwrap(): T {
    return this.value;
  }

  unwrapErr(): any {
    throw new Error("Cannot unwrapErr on Ok value");
  }
}

export class Err<T> {
  constructor(private error: any) {}

  isOk(): boolean {
    return false;
  }

  isErr(): boolean {
    return true;
  }

  unwrap(): T {
    throw new Error("Cannot unwrap on Err value");
  }

  unwrapErr(): any {
    return this.error;
  }
}
