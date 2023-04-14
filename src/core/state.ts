import {
  Config,
  ConversionType,
  DeclarationId,
  DeclarationObject,
  PixiObject,
} from './config';
import {Conversion} from './conversion';
import {PixiRoot} from './pixi-root';

export type State<Cfg extends Config> = {
  root: PixiRoot<Cfg>;
  conversions: Conversions<Cfg>;
  objects: Map<DeclarationId, ObjectState<Cfg, ConversionType<Cfg>>>;
};

export type ObjectState<Cfg extends Config, CT extends ConversionType<Cfg>> = {
  decObj: DeclarationObject<Cfg, CT>;
  pixiObj: PixiObject<Cfg, CT>;
};

export type Conversions<Cfg extends Config> = {
  [CType in ConversionType<Cfg>]: Conversion<Cfg, CType>;
};
