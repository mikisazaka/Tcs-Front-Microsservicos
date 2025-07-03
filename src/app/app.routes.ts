import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        loadChildren: () =>
            import('./home-page/home-page.module').then((m) => m.HomePageModule)
    },

    {
        path: 'menubar',
        loadChildren: () => import("./shared/shared.module").then(m => m.SharedModule)
    },
];
