import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-federal',
  templateUrl: './federal.component.html',
  styleUrls: ['./federal.component.css'],
  imports: [RouterLink]
})
export class FederalComponent {
  items = [
    {
      name: 'Wages',
      path: '/federal/wages',
      description: 'Report your wage income from employment.',
      completed: false
    },
    {
      name: 'Salaries',
      path: '/federal/salaries',
      description: 'Enter salary income received during the year.',
      completed: false
    },
    {
      name: 'Unemployment',
      path: '/federal/unemployment',
      description: 'Include unemployment compensation received.',
      completed: false
    },
    {
      name: '1099-MISC',
      path: '/federal/1099-misc',
      description: 'Report miscellaneous income from Form 1099-MISC.',
      completed: false
    },
    {
      name: 'Other Income',
      path: '/federal/other-income',
      description: 'Add any other income not listed elsewhere.',
      completed: false
    },
    {
      name: 'Interest and Dividends',
      path: '/federal/interest-dividends',
      description: 'Enter interest and dividend income from investments.',
      completed: false
    },
    {
      name: 'Investments Income',
      path: '/federal/investments-income',
      description: 'Report income from stocks, bonds, and other investments.',
      completed: false
    },
    {
      name: 'Retirement Plans',
      path: '/federal/retirement-plans',
      description: 'Include distributions from retirement plans.',
      completed: false
    },
    {
      name: 'Social Security Benefits',
      path: '/federal/social-security-benefits',
      description: 'Report Social Security benefits received.',
      completed: false
    },
    {
      name: 'Rental Income',
      path: '/federal/rental-income',
      description: 'Enter income from rental properties.',
      completed: false
    },
    {
      name: 'Royalties',
      path: '/federal/royalties',
      description: 'Report royalty income from intellectual property.',
      completed: false
    },
    {
      name: 'Business Income',
      path: '/federal/business-income',
      description: 'Include income from self-employment or business.',
      completed: true
    },
    {
      name: 'Uncommon Income',
      path: '/federal/uncommon-income',
      description: 'Add any uncommon or special income sources.',
      completed: false
    }
  ];
}
