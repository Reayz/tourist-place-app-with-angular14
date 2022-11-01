import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { PlaceDetailsComponent } from './component/place-details/place-details.component';
import { NotFoundPageComponent } from './component/not-found-page/not-found-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPlacesPipe } from './filter/filter-places.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PlaceDetailsComponent,
    NotFoundPageComponent,
    FilterPlacesPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
