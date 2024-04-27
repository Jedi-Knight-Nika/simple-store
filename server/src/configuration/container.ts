import "reflect-metadata";
import { Container, BindingScopeEnum, decorate, injectable, inject as inversifyInject } from "inversify";

export const container = new Container({
  defaultScope: BindingScopeEnum.Request,
  skipBaseClassChecks: true,
});

export enum Scope {
  Request,
  Transient,
  Singleton,
}

export function Injectable(idOrScope?: symbol | Scope, scope: Scope = Scope.Singleton): ClassDecorator {
  return (target) => {
    const identifier = typeof idOrScope === "symbol" ? idOrScope : target;
    const effectiveScope = typeof idOrScope === "symbol" ? scope : idOrScope;

    if (container.isBound(identifier)) {
      throw new Error(`A binding conflict occurred when trying to bind ${identifier.toString()}.`);
    }

    decorate(injectable(), target);

    // @ts-expect-error disable-next-line
    const binding = container.bind(identifier).to(target);
    switch (effectiveScope) {
      case Scope.Transient:
        binding.inTransientScope();
        break;
      case Scope.Singleton:
        binding.inSingletonScope();
        break;
      default:
        binding.inRequestScope();
        break;
    }
  };
}

export const inject = inversifyInject;
