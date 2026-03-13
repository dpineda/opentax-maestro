import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from "./dashboard-header.component";

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, DashboardHeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  steps = [
    { label: 'Overview', icon: '🏠' },
    { label: 'Profile', icon: '👤' },
    { label: 'Documents', icon: '📄' },
    { label: 'Review', icon: '✅' }
  ];
  currentStep = 0;

  goToStep(idx: number) {
    this.currentStep = idx;
  }
}
