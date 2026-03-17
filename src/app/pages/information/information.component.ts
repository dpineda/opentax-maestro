import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
  imports: [RouterLink]
})
export class InformationComponent {
  items = [
    {
      title: 'Individual Information',
      description: 'Fill in your personal details such as name, date of birth, SSN, and address.',
      completed: false
    },
    {
      title: 'Spouse Information',
      description: 'Provide spouse details if applicable, including name, date of birth, SSN.',
      completed: false
    },
    {
      title: 'Dependents Information',
      description: 'List dependents with their names, dates of birth, SSNs, and relationship.',
      completed: true
    },
    {
      title: 'Filing Status',
      description: 'Select your filing status: Single, Married Filing Jointly, Married Filing Separately, Head of Household, or Qualifying Widow(er).',
      completed: false
    }
  ];

  editItem(index: number) {
    // Redirect to edit page for each item
    const editRoutes = [
      '/information/individual',
      '/information/spouse',
      '/information/dependents',
      '/information/filing-status'
    ];
    window.location.href = editRoutes[index];
  }
}
