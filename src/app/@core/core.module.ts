import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { HttpClientModule } from '@angular/common/http';
import {
    ApiService,
    TodoService,
    SidebarService
} from '@agh-app/service'

const DATA_SERVICES = [
    ApiService,
    TodoService,
    SidebarService
];

@NgModule({
    imports: [CommonModule, HttpClientModule]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [...DATA_SERVICES]
        } as ModuleWithProviders;
    }
}
