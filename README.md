# declarative-pixi

Split pixi.js objects management to declarative part and non-declarative part.

## Usage

### Declarative part

```typescript
import {AnyDeclarationObject, DeclarativePixi, DefineConfig} from 'declarative-pixi';

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

```

### Non-Declarative part

```typescript
import {
  Context,
  Conversion,
  Declaration,
  DeclarationId,
  PixiObject,
} from 'declarative-pixi';
import {FakePixiSprite} from '../fake-objects';
import {Cfg} from '../usage';

type CType = 'sprite';

export class ConversionSprite implements Conversion<Cfg, CType> {
  createPixiObject(
    id: DeclarationId,
    declaration: Declaration<Cfg, CType>,
    context: Context<Cfg>
  ): PixiObject<Cfg, CType> {
    const pixiObj = new FakePixiSprite();
    pixiObj.setSprite(declaration.key);
    return pixiObj;
  }

  shouldUpdate(
    id: DeclarationId,
    newDeclaration: Declaration<Cfg, CType>,
    oldDeclaration: Declaration<Cfg, CType>,
    pixiObj: PixiObject<Cfg, CType>,
    context: Context<Cfg>
  ): boolean {
    return newDeclaration.key !== oldDeclaration.key;
  }

  update(
    id: DeclarationId,
    newDeclaration: Declaration<Cfg, CType>,
    oldDeclaration: Declaration<Cfg, CType>,
    pixiObj: PixiObject<Cfg, CType>,
    context: Context<Cfg>
  ): void {
    pixiObj.setSprite(newDeclaration.key);
  }

  destroyed(
    id: DeclarationId,
    oldDeclaration: Declaration<Cfg, CType>,
    pixiObj: PixiObject<Cfg, CType>,
    context: Context<Cfg>
  ): void {
    pixiObj.free();
  }
}
```