import {AnyDeclarationObject, Config, Context} from './config';
import {TDeclarativePixi} from './declarative-pixi-module';
import {PixiRoot} from './pixi-root';
import {Conversions, State} from './state';

export class DeclarativePixi<Cfg extends Config> {
  private state: State<Cfg>;

  constructor(args: {root: PixiRoot<Cfg>; conversions: Conversions<Cfg>}) {
    this.state = {
      root: args.root,
      conversions: args.conversions,
      objects: new Map(),
    };
  }

  update(decObjs: AnyDeclarationObject<Cfg>[], context: Context<Cfg>): void {
    this.state = TDeclarativePixi.update(this.state, decObjs, context);
  }

  clear(context: Context<Cfg>): void {
    this.state = TDeclarativePixi.clear(this.state, context);
  }
}
