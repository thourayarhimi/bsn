import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { CodeInputModule } from 'angular-code-input';

  export function kcFactory(kcService: KeycloakService) {
    return () => kcService.init();
  }

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CodeInputModule,
    apiModule.forRoot({rootUrl:'http://57.129.114.49:8088/api/v1'})

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
