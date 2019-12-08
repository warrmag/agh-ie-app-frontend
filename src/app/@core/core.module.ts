import { ApiService } from './data';
import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { TodoService } from './data/todo.service';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';

const DATA_SERVICES = [
    ApiService,
    TodoService
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
