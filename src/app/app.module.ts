import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './@core/core.module';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { TodoComponent } from './components/todo/todo.component';
import { CommonModule } from '@angular/common';

import { MatCardModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const MATERIAL_MODULES = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatListModule,
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
    TodoComponent
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
