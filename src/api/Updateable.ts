export type Update = (updateable: Updateable, deltaTime: number) => Updateable;

export interface Updateable {
  update(update: Update, deltaTime: number): Updateable;
}


