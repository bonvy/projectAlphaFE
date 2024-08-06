import { HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { TranslocoModule, TranslocoConfig, provideTransloco } from '@ngneat/transloco';
import { TranslocoHttpLoader } from './transloco.loader';



@NgModule({
  exports: [TranslocoModule],
  imports: [
    HttpClientModule,
    TranslocoModule
  ],
  providers: [
    provideTransloco({
      config: {
        availableLangs: ['it', 'en'],
        defaultLang: 'it',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    }),
  ],
})
export class TranslocoRootModule { }
