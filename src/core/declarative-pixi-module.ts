import {AnyDeclarationObject, Config, Context} from './config';
import {State} from './state';

export class TDeclarativePixi {
  static update<Cfg extends Config>(
    state: State<Cfg>,
    decObjs: AnyDeclarationObject<Cfg>[],
    context: Context<Cfg>
  ): State<Cfg> {
    const newDecObjects = Object.fromEntries(decObjs.map(obj => [obj.id, obj]));
    const oldObjects = state.objects;
    const oldIds = new Set(oldObjects.keys());
    const newIds = new Set(decObjs.map(obj => obj.id));
    const allIds = mergeSet(oldIds, newIds);

    const newObjects = new Map();
    for (const id of allIds) {
      const newDecObj: AnyDeclarationObject<Cfg> | undefined =
        newDecObjects[id];
      const oldObj = oldObjects.get(id);
      if (newDecObj !== undefined && oldObj === undefined) {
        // new comer
        const conversion = state.conversions[newDecObj.type];

        const pixiObj = conversion.createPixiObject(
          id,
          newDecObj.declaration,
          context
        );
        state.root.addChild(pixiObj);
        newObjects.set(newDecObj.id, {decObj: newDecObj, pixiObj});
      } else if (newDecObj === undefined && oldObj !== undefined) {
        // removed
        const conversion = state.conversions[oldObj.decObj.type];

        state.root.removeChild(oldObj.pixiObj);
        conversion.destroyed(
          id,
          oldObj.decObj.declaration,
          oldObj.pixiObj,
          context
        );
      } else if (newDecObj !== undefined && oldObj !== undefined) {
        // maybe should update
        const conversion = state.conversions[newDecObj.type];

        const shouldUpdate = conversion.shouldUpdate(
          id,
          newDecObj.declaration,
          oldObj.decObj.declaration,
          oldObj.pixiObj,
          context
        );
        if (!shouldUpdate) continue;
        conversion.update(
          id,
          newDecObj.declaration,
          oldObj.decObj.declaration,
          oldObj.pixiObj,
          context
        );
        newObjects.set(newDecObj.id, {
          decObj: newDecObj,
          pixiObj: oldObj.pixiObj,
        });
      } else {
        throw new Error('Unknown error');
      }
    }
    return {
      ...state,
      objects: newObjects,
    };
  }

  static clear<Cfg extends Config>(
    state: State<Cfg>,
    context: Context<Cfg>
  ): State<Cfg> {
    for (const [id, obj] of state.objects) {
      const conversion = state.conversions[obj.decObj.type];

      state.root.removeChild(obj.pixiObj);
      conversion.destroyed(id, obj.decObj.declaration, obj.pixiObj, context);
    }
    return {
      ...state,
      objects: new Map(),
    };
  }
}

const mergeSet = <T>(set1: Set<T>, set2: Set<T>): Set<T> => {
  const merged = new Set<T>();
  set1.forEach(v => {
    merged.add(v);
  });
  set2.forEach(v => {
    merged.add(v);
  });
  return merged;
};
