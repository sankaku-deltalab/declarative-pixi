/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Context,
  Conversion,
  Declaration,
  DeclarationId,
  PixiObject,
} from '../../core';
import {FakePixiGraphic} from '../fake-objects';
import {Cfg} from '../usage';

type CType = 'line';

export class ConversionLine implements Conversion<Cfg, CType> {
  createPixiObject(
    id: DeclarationId,
    declaration: Declaration<Cfg, CType>,
    context: Context<Cfg>
  ): PixiObject<Cfg, CType> {
    const pixiObj = new FakePixiGraphic();
    pixiObj.drawLine(declaration.start, declaration.end);
    return pixiObj;
  }

  shouldUpdate(
    id: DeclarationId,
    newDeclaration: Declaration<Cfg, CType>,
    oldDeclaration: Declaration<Cfg, CType>,
    pixiObj: PixiObject<Cfg, CType>,
    context: Context<Cfg>
  ): boolean {
    return !Object.is(newDeclaration, oldDeclaration);
  }

  update(
    id: DeclarationId,
    newDeclaration: Declaration<Cfg, CType>,
    oldDeclaration: Declaration<Cfg, CType>,
    pixiObj: PixiObject<Cfg, CType>,
    context: Context<Cfg>
  ): void {
    pixiObj.clearLine();
    pixiObj.drawLine(newDeclaration.start, newDeclaration.end);
  }

  destroyed(
    id: DeclarationId,
    oldDeclaration: Declaration<Cfg, CType>,
    pixiObj: PixiObject<Cfg, CType>,
    context: Context<Cfg>
  ): void {}
}
