export type Config = {
  context: Record<string, unknown>;
  objects: Record<string, {declaration: unknown; pixiObj: unknown}>;
};

export type Context<Cfg extends Config> = Cfg['context'];

export type ConversionType<Cfg extends Config> = keyof Cfg['objects'] & string;

export type Declaration<
  Cfg extends Config,
  Type extends ConversionType<Cfg>
> = Cfg['objects'][Type]['declaration'];

export type PixiObject<
  Cfg extends Config,
  Type extends ConversionType<Cfg>
> = Cfg['objects'][Type]['pixiObj'];
export type AnyPixiObject<Cfg extends Config> = PixiObject<
  Cfg,
  ConversionType<Cfg>
>;

export type DeclarationId = string;
export type DeclarationObject<
  Cfg extends Config,
  CType extends ConversionType<Cfg>
> = {
  id: DeclarationId;
  type: CType;
  declaration: Declaration<Cfg, CType>;
};

export type AnyDeclarationObject<Cfg extends Config> = DeclarationObject<
  Cfg,
  ConversionType<Cfg>
>;

export type DefineConfig<T extends Config> = T;
