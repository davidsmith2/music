import { NgModule } from "@angular/core";
import { LibraryComponent } from "./library.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [LibraryComponent],
  imports: [CommonModule],
  exports: [LibraryComponent]
})
export class LibraryModule { }