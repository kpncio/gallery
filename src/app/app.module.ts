import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UnknownComponent } from './components/unknown/unknown.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HomeComponent } from './components/home/home.component';
import { TripComponent } from './components/trip/trip.component';
import { TripDirective } from './components/trip/trip.directive';
import { AppComponent } from './app.component';
import { VideoComponent } from './components/video/video.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TripComponent,
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    UnknownComponent,
    TripDirective,
    VideoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
