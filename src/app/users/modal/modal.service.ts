import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  TemplateRef,
  Type,
  ViewContainerRef,
  createComponent,
} from '@angular/core';
import { ModalComponent } from './modal.component';
import { Options } from './options.interface';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  newModalComponent!: ComponentRef<ModalComponent>;
  options!: Options | undefined;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  open<C>(vcrOrComponent: Type<C>, options?: Options): ComponentRef<C> | undefined;

  open<C>(
    vcrOrComponent: ViewContainerRef | Type<C>,
    param2?: TemplateRef<Element> | Options,
    options?: Options
  ): ComponentRef<any> | undefined {
    if (vcrOrComponent instanceof ViewContainerRef) {
      this.options = options;
      return undefined;
    } else {
      return this.openWithComponent(vcrOrComponent);
    }
  }

  openWithComponent(vcrOrComponent: Type<any>): ComponentRef<any> {
    const componentRef = createComponent(vcrOrComponent, {
      environmentInjector: this.injector,
    });
    this.newModalComponent = componentRef;
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    return componentRef;
  }
}

export interface OptionS {
  animations?: {
    modal?: {
      enter?: string;
      leave?: string;
    };
    overlay?: {
      enter?: string;
      leave?: string;
    };
  };
  size?: {
    minWidth?: string;
    width?: string;
    maxWidth?: string;
    minHeight?: string;
    height?: string;
    maxHeight?: string;
  };
}
