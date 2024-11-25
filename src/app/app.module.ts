import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MainModule } from './main/main.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { provideHttpClient } from '@angular/common/http';
import { EditProfileComponent } from './sharedModule/edit-profile/edit-profile.component';
// export function apiConfigFactory(): Configuration {
//   const params: ConfigurationParameters = {
//     basePath: 'https://csol.creedleads.com',
//     apiKeys: { bearer: '' }
//   };
//   return new Configuration(params);
// }

@NgModule({
  declarations: [
    AppComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    AngularEditorModule,
    // ApiModule.forRoot(apiConfigFactory),
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient()

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
