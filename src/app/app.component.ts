import { Component, OnInit, ViewContainerRef, HostListener } from '../../node_modules/@angular/core';
import { ComponentsHelper } from '../../node_modules/ng2-bootstrap/ng2-bootstrap'
import { Router, ActivatedRoute, Params } from '../../node_modules/@angular/router';



@Component({
  selector: 'my-app',
  template: "<router-outlet></router-outlet>",
  providers: [{ provide: ComponentsHelper, useClass: ComponentsHelper }]
})
export class AppComponent {
  private viewContainerRef: ViewContainerRef;
  private routerOutlet: string;

  public constructor(componentsHelper: ComponentsHelper, viewContainerRef: ViewContainerRef, private activatedRoute: ActivatedRoute, private router: Router) {
    this.viewContainerRef = viewContainerRef;
    componentsHelper.setRootViewContainerRef(viewContainerRef);
  }

}