import { Component } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  login(event: Event) {
    event.preventDefault();
    console.log(window.electron);
    window.electron.ipcRenderer.invoke('sign-in-with-apple');
  }
}