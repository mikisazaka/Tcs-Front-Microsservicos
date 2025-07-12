import { Component, AfterViewInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-select-books',
  templateUrl: './select-books.component.html',
  styleUrl: './select-books.component.css',
  standalone : false,
})
export class SelectBooksComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    initFlowbite();
  }

}