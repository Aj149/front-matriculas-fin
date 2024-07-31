import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { routesDashboard } from './components/dashboard/app_dashboard.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routesAuth } from './components/auth/app_auth.routes';

import { loggerInter } from './interceptors/cruds.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideRouter(routesDashboard),
    provideRouter(routesAuth),
    provideClientHydration(),
    provideHttpClient(withFetch(),withInterceptors([loggerInter])),
    provideAnimations(),
    provideToastr(),
  ],
};
