import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './@core/core.module';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { CommonModule } from '@angular/common';

import { MatCardModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatListModule, MatSidenavModule, MatRadioModule, MatMenuModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

// AGH App components
import { TodoComponent } from './components/todo/todo.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const MATERIAL_MODULES = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatListModule,
  MatSidenavModule,
  MatRadioModule,
  MatMenuModule
]

const ANGULAR_MODULES = [
  FormsModule,
  CommonModule,
  BrowserAnimationsModule,
  BrowserModule,
]

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    SidebarComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule.forRoot(),
    StorageServiceModule,
    ...MATERIAL_MODULES,
    ...ANGULAR_MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
