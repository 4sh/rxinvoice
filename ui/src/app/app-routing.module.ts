import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './pages/login/login.component';
import {AppContentComponent} from './app-content/app-content.component';
import {GuideRoutes} from './style-guide-module/guide.routes';
import {AnalyzeComponent} from './pages/analyze/analyze.component';
import {LoggedInGuard} from './common/guards/logged-in.guard';

const routes: Routes = [
    {
        path: 'login', pathMatch: 'full', component: LoginComponent
    },
    {
        path: '', canActivate: [LoggedInGuard], component: AppContentComponent,
        children: [
            {
                path: 'dashboard',
                data: {title: 'navigation.menu.home'},
                loadChildren: () => import('./modules/dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule)
            },
            {
                path: 'invoices',
                data: {title: 'navigation.menu.invoices'},
                loadChildren: () => import('./modules/invoice/invoice-routing.module').then(m => m.InvoiceRoutingModule)
            },
            {
                path: 'drafts',
                data: {title: 'navigation.menu.drafts'},
                loadChildren: () => import('./modules/draft/draft-routing.module').then(m => m.DraftRoutingModule)
            },
            {
                path: 'customers',
                data: {title: 'navigation.menu.customers'},
                loadChildren: () => import('./modules/customer/customer-routing.module').then(m => m.CustomerRoutingModule)
            },
            {
                path: 'analyze', component: AnalyzeComponent, data: {title: 'navigation.menu.analyze'}
            },
            {
                path: 'seller-settings',
                data: {title: 'navigation.menu.seller.settings'},
                loadChildren: () => import('./modules/referential/referential-routing.module').then(m => m.ReferentialRoutingModule)
            },
            {
                path: '**', redirectTo: '/dashboard'
            }
        ]
    },
    {
        path: '', redirectTo: '/dashboard', pathMatch: 'full'
    },
    {
        path: 'style', children: GuideRoutes
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

