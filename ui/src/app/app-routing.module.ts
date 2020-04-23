import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CustomersComponent} from './pages/customers/customers.component';
import {LoginComponent} from './pages/login/login.component';
import {AppContentComponent} from './app-content/app-content.component';
import {InvoicesComponent} from './pages/invoices/invoices.component';
import {CustomerDetailComponent} from './pages/customer-detail/customer-detail.component';
import {InvoiceDetailComponent} from './pages/invoice-detail/invoice-detail.component';
import {GuideRoutes} from './style-guide-module/guide.routes';
import {DraftsComponent} from './pages/drafts/drafts.component';
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
                    .then(m => m.DashboardRoutingModule)
            },
            {path: 'invoices', component: InvoicesComponent},
            {path: 'invoices/new', component: InvoiceDetailComponent},
            {path: 'invoices/detail/:id', component: InvoiceDetailComponent},
            {path: 'customers', component: CustomersComponent},
            {path: 'customers/new', component: CustomerDetailComponent},
            {path: 'customers/detail/:id', component: CustomerDetailComponent},
            {path: 'analyze', component: AnalyzeComponent},
            {
                path: 'seller-settings', loadChildren: () => import('./modules/referential/referential-routing.module')
                    .then(m => m.ReferentialRoutingModule)
            },
            {path: 'drafts', component: DraftsComponent},
            {path: '**', redirectTo: '/app/dashboard'}

        ]
    },
    {path: '', redirectTo: '/app/dashboard', pathMatch: 'full'},
    {path: 'style', children: GuideRoutes},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

