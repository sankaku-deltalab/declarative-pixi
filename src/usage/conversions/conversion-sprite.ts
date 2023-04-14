/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Context,
  Conversion,
  Declaration,
  DeclarationId,
  PixiObject,
} from '../../core';
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
