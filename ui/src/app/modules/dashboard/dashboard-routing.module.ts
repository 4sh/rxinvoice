import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashboardModule} from './dashboard.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DashboardResolver} from './resolvers/dashboard.resolver';

@NgModule({
    imports: [
        DashboardModule,
        RouterModule.forChild([
                {
                    path: '',
                    component: DashboardComponent,
                    resolve: {dashboards: DashboardResolver},
                    data: {title: 'sdfsdfsdfsdfdfsdf'}
                }
            ]
        )
    ]
})
export class DashboardRoutingModule {
}
