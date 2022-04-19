import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { SearchComponent } from './pages/search/search.component';
import { ContributeComponent } from './pages/contribute/contribute.component';
import { LibraryComponent } from './pages/library/library.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,

    ContributeComponent,
     LibraryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
