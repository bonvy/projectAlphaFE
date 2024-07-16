import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { ApproutingModule } from './approuting.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    ApproutingModule
  ],
};
