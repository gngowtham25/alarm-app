import { Component, OnInit, ViewContainerRef, HostListener } from '../../node_modules/@angular/core';
import { Router, ActivatedRoute, Params } from '../../node_modules/@angular/router';

@Component({
    selector: 'my-route',
    templateUrl: 'routes.component.html',
})
export class RoutesComponent {
    private routerOutlet: string;
    private parameter: Params;

    public constructor(private activatedRoute: ActivatedRoute, private router: Router) {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            let path = params['page'];
            this.parameter = params;
            this.routerOutlet = path != undefined ? path : undefined;
        });
    }
}

