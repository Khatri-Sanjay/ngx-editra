import type { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withNoIncrementalHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
	// Preserve standard hydration; deferred demos render only after interaction.
	providers: [provideRouter(routes), provideClientHydration(withNoIncrementalHydration())],
};
