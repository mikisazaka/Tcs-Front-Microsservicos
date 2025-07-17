import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from 'app/app.module';
import 'flowbite';

platformBrowser()
  .bootstrapModule(AppModule)
  .catch((err: any) => console.error(err));