import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {DashboardConfiguration} from '../../../../domain/company/dashboard/dashboard-configuration';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DashboardSelectComponent),
    multi: true
};

@Component({
    selector: 'dashboard-select',
    templateUrl: './dashboard-select.component.html',
    styleUrls: ['./dashboard-select.component.sass'],
    providers: [VALUE_ACCESSOR]
})
export class DashboardSelectComponent implements OnInit, ControlValueAccessor {

    public dashboard: DashboardConfiguration;

    @Input()
    public dashboards: Array<DashboardConfiguration>;

    private onNgChange: (dashboard: DashboardConfiguration) => void;
    private onNgTouched: () => void;

    ngOnInit(): void {
    }

    registerOnChange(fn: any): void {
        this.onNgChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onNgTouched = fn;
    }

    writeValue(dashboardConfiguration: DashboardConfiguration): void {
        this.dashboard = dashboardConfiguration;
    }

    onChange(dashboardConfiguration: DashboardConfiguration): void {
        this.dashboard = dashboardConfiguration;
        this.onNgChange(dashboardConfiguration);
    }
}
