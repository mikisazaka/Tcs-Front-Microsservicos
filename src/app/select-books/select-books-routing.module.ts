import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SelectBooksComponent } from "./select-books.component";

const routes: Routes = [
  { path: '', component: SelectBooksComponent }
];  

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectBooksRoutingModule {}