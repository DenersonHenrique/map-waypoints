import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBxPygC3tBioOdXGfLnj9Q6gT-QGKGLXhk&libraries'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
