import {AnyPixiObject, Config} from './config';

/**
 * Root of pixi object like `PIXI.Container`.
 */
export type PixiRoot<Cfg extends Config> = {
  addChild(child: AnyPixiObject<Cfg>): unknown;
  removeChild(child: AnyPixiObject<Cfg>): unknown;
};
