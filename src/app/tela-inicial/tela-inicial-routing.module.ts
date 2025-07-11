import { RouterModule, Routes } from "@angular/router";
import { TelaInicialComponent } from "./tela-inicial.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  { path: '', component: TelaInicialComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelaInicialRoutingModule {}