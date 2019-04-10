export interface Velocity {
  x: number;
  y: number;
}

export class Degrees {

  public readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  static fromRadians(radians: number): Degrees {
    return new Degrees(radians * (180 / Math.PI));
  };

  static fromVelocity(velocity: Velocity): Degrees {
    const degs = Math.abs(Math.atan(velocity.x / velocity.y) * (180 / Math.PI));
    if (velocity.x >= 0 && velocity.y >= 0) return new Degrees(degs);
    if (velocity.x >= 0 && velocity.y <= 0) return new Degrees(degs + 180);
    if (velocity.x <= 0 && velocity.y <= 0) return new Degrees(degs + 90);
    if (velocity.x <= 0 && velocity.y >= 0) return new Degrees(degs + 270);
  }

  toRadians = (): number => {
    return this.value * (Math.PI / 180);
  };

  toVelocity = (speed: number): Velocity => {
    const sin = Math.sin(this.toRadians());
    const opp = speed * sin;
    const cos = Math.cos(this.toRadians());
    const adj = speed * cos;
    return {
      x: adj,
      y: opp
    }
  };

}

export interface Coords {
  x: number;
  y: number;
}

export interface Bounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface Option<A> {
  isNone: boolean;
  value: A|null;
  map: <B>(f: (A) => B) => Option<B>;
  flatMap: <B>(f: (A) => Option<B>) => Option<B>;
  getOrElse: (defaultValue: A) => A
}

export function none<A>(): Option<A> {
  return {
    isNone: true,
    value: null,
    map: <B>(_: (A) => B) => none<B>(),
    flatMap: <B>(_: (A) => Option<B>) => none<B>(),
    getOrElse: (defaultValue: A) => defaultValue
  }
}

export function some<A>(value: A): Option<A> {
  return {
    isNone: false,
    value: value,
    map: <B>(f: (A) => B) => option(f(value)),
    flatMap: <B>(f: (A) => Option<B>) => f(value),
    getOrElse: (_: A) => value
  }
}

export function option<A>(value: A|undefined|null): Option<A> {
  return typeof value === 'undefined' || value === null
    ? none<A>()
    : some<A>(value);
}

export interface ReadWriter {
  fromJson: (input: string) => ReadWriter;
  isEmpty: boolean;
  into: (key: string|number) => ReadWriter;
  read: <B>() => B;
  readAsOpt: <B>() => Option<B>;
  toJson: () => string;
  write: <B>(value: B) => any;
  writePath: <B>(path: (string|number)[], value: B) => any;
}

export function readWriter(original: any): ReadWriter {

  function rw(current: any, path: (string|number)[]): ReadWriter {

    function readAsOpt<B>(): Option<B> {
      return option(read());
    }

    function into(key: string|number): ReadWriter {
      if (!!current) {
        return rw(current[key] || null, [...path, key]);
      } else {
        return rw(null, [...path, key]);
      }
    }

    function read<B>(): B|null {
      return current || null;
    }

    function write<B>(value: B): any {
      return writePath(path, value);
    }

    function writePath<B>(p: (string|number)[], value: B): any {
      const origIsArray = Array.isArray(original);
      let updated = origIsArray ? [...original] : {...original};
      let cursor = updated;

      for (let i = 0; i < p.length - 1; i++) {
        if (!cursor.hasOwnProperty(p[i]) || typeof cursor[p[i]] !== 'object') {
          cursor[p[i]] = {};
        }

        if (Array.isArray(cursor[p[i]])) {
          cursor[p[i]] = [...cursor[p[i]]];
        } else {
          cursor[p[i]] = {...cursor[p[i]]};
        }

        cursor = cursor[p[i]];
      }

      if (p.length > 0) {
        cursor[p[p.length - 1]] = value;
      } else {
        updated = value;
      }

      return readWriter(origIsArray ? [...updated] : {...updated}).read<any>();
    }

    function fromJson(input: string): ReadWriter {
      return readWriter(JSON.parse(input));
    }

    function toJson(): string {
      return JSON.stringify(current);
    }

    return {
      fromJson,
      isEmpty: (!!original),
      into,
      read,
      readAsOpt,
      toJson,
      write,
      writePath
    }
  }

  return rw(original, []);
}

