import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

//Modulos para utilizar google Maps no Angular
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBxPygC3tBioOdXGfLnj9Q6gT-QGKGLXhk&libraries',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule.forRoot(),
    AgmDirectionModule,//Módulo pacote agmr Rotas
    MaterialModule//Módulo Componentes Angular Material
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
