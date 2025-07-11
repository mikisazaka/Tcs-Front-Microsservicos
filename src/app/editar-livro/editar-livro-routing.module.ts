import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditarLivroComponent } from "./editar-livro.component";

const routes: Routes = [
  { path: '', component: EditarLivroComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarLivroRoutingModule {}