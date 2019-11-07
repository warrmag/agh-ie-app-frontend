import { ApiService } from './data'
import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { throwIfAlreadyLoaded } from './module-import-guard';

const DATA_SERVICES = [
    ApiService
]

@NgModule({
    imports: [CommonModule]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }

    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: CoreModule,
            providers: [...DATA_SERVICES]
        }
    }
}