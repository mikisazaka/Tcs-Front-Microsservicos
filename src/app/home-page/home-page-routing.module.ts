import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomePageComponent } from "./home-page.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  { path: 'homepage', component: HomePageComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}