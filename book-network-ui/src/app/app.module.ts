import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';


import { CodeInputModule } from 'angular-code-input';
import { HttpTokenInterceptor } from './services/interceptor/http-token.interceptor';
import { KeycloakService } from './services/keycloak/keycloak.service';
import { HomeComponent } from './pages/home/home.component';

import { SharedModule } from './shared/shared.module';

  export function kcFactory(kcService: KeycloakService) {
    return () => kcService.init();
  }

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CodeInputModule,
    RouterModule,
    SharedModule
  ],
  providers: [
   HttpClient,
   {
           provide: HTTP_INTERCEPTORS,
           useClass: HttpTokenInterceptor,
           multi: true
   },
        {
           provide: APP_INITIALIZER,
           deps: [KeycloakService],
           useFactory: kcFactory,
           multi: true
         }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
