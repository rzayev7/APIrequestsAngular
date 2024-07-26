import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import {NzI18nInterface,az_AZ,provideNzI18n} from 'ng-zorro-antd/i18n';
import '@angular/common/locales/az';

bootstrapApplication(AppComponent,{providers:[provideHttpClient(),
  provideNzI18n(az_AZ as unknown as NzI18nInterface),
]})
  .catch((err) => console.error(err));

