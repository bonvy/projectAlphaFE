import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-mylib',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mylib.component.html',
  styleUrl: './mylib.component.css',
})
export class MylibComponent {}
