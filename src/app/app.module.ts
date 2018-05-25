import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Settings, Api } from '../providers';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { UserDataControll, UserDataControllFake } from '../models/userDataControll';
import { JogadoresControll, JogadoresControllFake } from '../models/jogadoresControll';
import { MercadoControll, MercadoControllFake } from '../models/mercadoControll';
import { LigaControllFake } from '../models/ligasControll';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'cartolino'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    SplashScreen,
    StatusBar,
    Api,
    {provide: 'IUserDataControll', useClass: UserDataControllFake},
    { provide: 'IMercadoControll', useClass: MercadoControllFake },
    { provide: 'IJogadoresControll', useClass: JogadoresControllFake },
    { provide: 'ILigasControll', useClass: LigaControllFake },
    // { provide: 'ILigasControll', useClass: LigaControll },
    // { provide: 'IUserDataControll', useClass: UserDataControll },
    // { provide: 'IMercadoControll', useClass: MercadoControll },
    // { provide: 'IJogadoresControll', useClass: JogadoresControll },    
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
