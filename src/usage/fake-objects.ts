/* eslint-disable @typescript-eslint/no-unused-vars */
// dec obj
type Vec2d = {x: number; y: number};
export type DeclarationLine = {start: Vec2d; end: Vec2d};
export type DeclarationSprite = {key: string};

// pixi obj
export class FakePixiContainer {
  private readonly children = new Set<unknown>();

  addChild(child: unknown): void {
    this.children.add(child);
  }

  removeChild(child: unknown): void {
    this.children.delete(child);
  }
}

export class FakePixiGraphic {
  drawLine(start: Vec2d, end: Vec2d) {}
  clearLine() {}
}

export class FakePixiSprite {
  setSprite(key: string) {}
  free() {}
}
