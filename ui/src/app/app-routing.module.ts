import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CustomersComponent} from './pages/customers/customers.component';
import {LoginComponent} from './pages/login/login.component';
import {AppContentComponent} from './app-content/app-content.component';
import {CustomerDetailComponent} from './pages/customer-detail/customer-detail.component';
import {GuideRoutes} from './style-guide-module/guide.routes';
import {AnalyzeComponent} from './pages/analyze/analyze.component';
import {LoggedInGuard} from './common/guards/logged-in.guard';

const routes: Routes = [
    {path: 'login', pathMatch: 'full', component: LoginComponent},
    {
        path: 'app',
        canActivate: [LoggedInGuard],
        component: AppContentComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./modules/dashboard/dashboard-routing.module')
                    .then(m => m.DashboardRoutingModule),
                data: {title: 'nav.home'}
            },
            {
                path: 'invoices',
                loadChildren: () => import('./modules/invoice/invoice-routing.module')
                    .then(m => m.InvoiceRoutingModule),
                data: {title: 'nav.invoices'}
            },
            {
                path: 'drafts',
                loadChildren: () => import('./modules/draft/draft-routing.module')
                    .then(m => m.DraftRoutingModule),
                data: {title: 'nav.drafts'}
            },
            {path: 'customers', component: CustomersComponent, data: {title: 'nav.customers'}},
            {path: 'customers/new', component: CustomerDetailComponent},
            {path: 'customers/detail/:id', component: CustomerDetailComponent},
            {path: 'analyze', component: AnalyzeComponent, data: {title: 'nav.analyze'}},
            {
                path: 'seller-settings', loadChildren: () => import('./modules/referential/referential-routing.module')
                    .then(m => m.ReferentialRoutingModule),
                data: {title: 'nav.seller.settings'}
            },
            {path: '**', redirectTo: '/app/dashboard'}

        ]
    },
    {path: '', redirectTo: '/app/dashboard', pathMatch: 'full'},
    {path: 'style', children: GuideRoutes}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

