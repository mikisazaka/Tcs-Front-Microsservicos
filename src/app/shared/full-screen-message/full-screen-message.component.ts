import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-full-screen-message',
  standalone: false,
  templateUrl: './full-screen-message.component.html',
  styleUrl: './full-screen-message.component.css'
})
export class FullScreenMessageComponent {

  constructor(
    public location: Location,
    public router: Router
  ){}

  goBack() {
    this.location.back()
  }
}
