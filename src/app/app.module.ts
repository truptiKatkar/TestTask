import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { jwtInterceptor } from './components/helpers/jwt.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [
    provideAnimationsAsync('noop'),
    { provide: HTTP_INTERCEPTORS, useFactory: jwtInterceptor, multi: true },
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
