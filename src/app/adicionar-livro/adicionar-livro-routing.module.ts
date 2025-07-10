import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdicionarLivroComponent } from "./adicionar-livro.component";

const routes: Routes = [
  { path: '', component: AdicionarLivroComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdicionarLivroRoutingModule {}