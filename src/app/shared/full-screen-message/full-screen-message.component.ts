import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-full-screen-message',
  imports: [],
  templateUrl: './full-screen-message.component.html',
  styleUrl: './full-screen-message.component.css'
})
export class FullScreenMessageComponent {

  constructor(public location: Location, public router: Router){}

  goBack() {
    this.router.navigate(['/paginaInicial'])
  }
}
