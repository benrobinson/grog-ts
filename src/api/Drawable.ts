import {DrawingOutput} from "./DrawingOutput";


export interface Drawable {
  draw(output: DrawingOutput): Drawable|void;
}

export class DrawableGroup implements Drawable {
  private drawables: Set<Drawable>;

  add(drawable: Drawable): DrawableGroup {
    this.drawables.add(drawable);
    return this;
  };

  remove(drawable: Drawable): DrawableGroup {
    this.drawables.delete(drawable);
    return this;
  };

  removeAll(): DrawableGroup {
    this.drawables.clear();
    return this;
  }

  draw(output: DrawingOutput): DrawableGroup {
    this.drawables.forEach(drawable => drawable.draw(output));
    return this;
  }
}

export class DrawableGroupLayers {
  private layers: {
    [key: string]: DrawableGroup
  };
  private order: string[];

  private swap = (a, b): void => {
    const temp = this.layers[a];
    this.layers[a] = this.layers[b];
    this.layers[b] = temp;
  };

  private getOrderKeyIndex(key: string) {
    const keyIndex = this.order.indexOf(key);
    if (keyIndex === -1) throw new Error(`Invalid key ${key} referenced in drawing layers.`);
    return keyIndex;
  }

  add = (key: string, group: DrawableGroup): DrawableGroupLayers => {
    this.order.push(key);
    this.layers[key] = group;
    return this;
  };

  remove = (key: string): DrawableGroupLayers => {
    this.order.filter(k => key !== k);
    delete this.layers[key];
    return this;
  };

  sortUp = (key: string): DrawableGroupLayers => {
    const keyIndex = this.getOrderKeyIndex(key);
    const nextIndex = keyIndex + 1;
    if (nextIndex <= this.order.length - 1) this.swap(nextIndex, keyIndex);
    return this;
  };

  sortDown = (key: string): DrawableGroupLayers => {
    const keyIndex = this.getOrderKeyIndex(key);
    const prevIndex = keyIndex - 1;
    if (prevIndex >= 0) this.swap(prevIndex, keyIndex);
    return this;
  };

  forEach = (fn: (group: DrawableGroup) => any): DrawableGroupLayers => {
    this.order.forEach(key => fn(this.layers[key]));
    return this;
  }
}



