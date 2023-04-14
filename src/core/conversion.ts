import {
  Config,
  Context,
  ConversionType,
  Declaration,
  DeclarationId,
  PixiObject,
} from './config';

/**
 * The part that can not be declarative.
 */
export interface Conversion<
  Cfg extends Config,
  CType extends ConversionType<Cfg>
> {
  createPixiObject(
    id: DeclarationId,
    declaration: Declaration<Cfg, CType>,
    context: Context<Cfg>
  ): PixiObject<Cfg, CType>;

  shouldUpdate(
    id: DeclarationId,
    newDeclaration: Declaration<Cfg, CType>,
    oldDeclaration: Declaration<Cfg, CType>,
    pixiObj: PixiObject<Cfg, CType>,
    context: Context<Cfg>
  ): boolean;

  update(
    id: DeclarationId,
    newDeclaration: Declaration<Cfg, CType>,
    oldDeclaration: Declaration<Cfg, CType>,
    pixiObj: PixiObject<Cfg, CType>,
    context: Context<Cfg>
  ): void;

  destroyed(
    id: DeclarationId,
    oldDeclaration: Declaration<Cfg, CType>,
    pixiObj: PixiObject<Cfg, CType>,
    context: Context<Cfg>
  ): void;
}
