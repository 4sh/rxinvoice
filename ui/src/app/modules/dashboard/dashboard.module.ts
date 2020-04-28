import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardColumnComponent} from './components/dashboard-column/dashboard-column.component';
import {DashboardSelectComponent} from './components/dashboard-select/dashboard-select.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DashboardTicketComponent} from './components/dashboard-ticket/dashboard-ticket.component';
import {DashboardResolver} from './resolvers/dashboard.resolver';
import {DashboardEventBusService} from './services/dashboard-event-bus.service';
import {DndModule} from 'ngx-drag-drop';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DashboardService} from './services/dashboard.service';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [
        DashboardColumnComponent,
        DashboardSelectComponent,
        DashboardComponent,
        DashboardTicketComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        FormsModule,
        DndModule,
        NgSelectModule,
        SharedModule
    ],
    providers: [
        DashboardService,
        DashboardEventBusService,
        DashboardResolver
    ]
})
export class DashboardModule {
}
