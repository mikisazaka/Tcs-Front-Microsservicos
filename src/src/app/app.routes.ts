import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'home-page',
        loadComponent: () => import("./home-page/home-page.component").then(c => c.HomePageComponent)
    },
    {
        path: 'menubar',
        loadComponent: () => import("./shared/menubar/menubar.component").then(c => c.MenubarComponent)
    },
];
