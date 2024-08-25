import { Component } from "@angular/core";

@Component({
  templateUrl: "./library.component.html",
  styleUrls: ["./library.component.scss"]
})
export class LibraryComponent {
  onClickImportLibrary(event: Event): void {
    event.preventDefault();
    window.electron.ipcRenderer.invoke("import-library");
  }
}