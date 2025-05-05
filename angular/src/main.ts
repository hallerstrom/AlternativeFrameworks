import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http'; // Lägg till denna import

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient() // Lägg till detta i providers-arrayen
  ]
})
  .catch((err) => console.error(err));