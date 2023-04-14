import {AnyDeclarationObject, DeclarativePixi, DefineConfig} from '../core';

import {ConversionLine} from './conversions/conversion-line';
import {ConversionSprite} from './conversions/conversion-sprite';
import {
  DeclarationLine,
  DeclarationSprite,
  FakePixiContainer,
  FakePixiGraphic,
  FakePixiSprite,
} from './fake-objects';

// 1. Define config (should at other file)
export type Cfg = DefineConfig<{
  context: {};
  objects: {
    line: {
      declaration: DeclarationLine;
      pixiObj: FakePixiGraphic;
    };
    sprite: {
      declaration: DeclarationSprite;
      pixiObj: FakePixiSprite;
    };
  };
}>;

// 2. Create instance
const dec = new DeclarativePixi<Cfg>({
  root: new FakePixiContainer(),
  conversions: {
    line: new ConversionLine(),
    sprite: new ConversionSprite(),
  },
});

// 3. Get declaration objects from your system.
const decObjects: AnyDeclarationObject<Cfg>[] = [
  {
    id: '1',
    type: 'line',
    declaration: {start: {x: 0, y: 0}, end: {x: 1, y: 2}},
  },
  {id: '2', type: 'sprite', declaration: {key: 'texture-a'}},
];

// 4. Setup context
const context = {};

// 5. Update pixi object
dec.update(decObjects, context);

// 6. (Optional) Remove all children from root
dec.clear(context);
