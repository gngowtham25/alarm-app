import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ModalModule } from '../../node_modules/ng2-bootstrap/ng2-bootstrap';
import { routing } from './app.routing';
import { RoutesComponent } from './routes.component';
import {AlarmComponent} from './alarm/alarm.component';
import {CalendarModule} from 'primeng/primeng';
import { TimepickerModule } from 'ng2-bootstrap';
import {GrowlModule} from 'primeng/primeng';





@NgModule({
  declarations: [
    AppComponent,
    RoutesComponent,
    AlarmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule,
    RouterModule,
    routing,
    CalendarModule,
    TimepickerModule,
    GrowlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
