import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core';
import { AuthModule } from './auth';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCER, metaReducers} from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx//store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HttpInterCeptorService } from './core/services/http-interceptor.service';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    CommonModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule, // ** 가 포함된 라우팅 모듈 마지막에 배치 해야 한다
    StoreModule.forRoot(ROOT_REDUCER, {
      metaReducers
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'angular-template'
    }),
    EffectsModule.forRoot([]),
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterCeptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
