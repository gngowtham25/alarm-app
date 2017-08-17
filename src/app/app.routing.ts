import { ModuleWithProviders } from '../../node_modules/@angular/core'
import { Routes, RouterModule, RouterOutlet, RouterLink, RouterLinkWithHref, RouterLinkActive }
    from '../../node_modules/@angular/router'

import {RoutesComponent} from './routes.component'
 
const appRoutes: Routes = [
    {
        path:'alarm',
        component:RoutesComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);