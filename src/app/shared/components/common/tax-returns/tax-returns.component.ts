import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-tax-returns',
  templateUrl: './tax-returns.component.html',
  imports:[CommonModule]
})
export class TaxReturnsComponent {
  data: any;
  returns: Returns | null = null;

  constructor(private dataService: DataService) {
    this.dataService.data$.subscribe(data => {
      this.data = data;
      this.calculateReturns();
    });
  }
  

  private calculateReturns() {
    if (!this.data) {
      this.returns = null;
      return;
    }

    /*
    
    Federal Income Tax Rates:
    Use the ‘Filing Status and Federal Income Tax Rates on Taxable Income’ table to assist you in estimating your federal tax rate.

    Filing Status and Federal Income Tax Rates on Taxable Income for 2025*
    Tax Rate	Married Filing Jointly or Qualified Widow(er)	Single	Head of Household	Married Filing Separately
    10%	$0 - $23,850	$0 - $11,925	$0 - $17,000	$0 - $11,925
    12%	$23,850 - $96,950	$11,925 - $48,475	$17,000 - $64,850	$11,925 - $48,475
    22%	$96,950 - $206,700	$48,475 - $103,350	$64,850 - $103,350	$48,475 - $103,350
    24%	$206,700 - $394,600	$103,350 - $197,300	$103,350 - $197,300	$103,350 - $197,300
    32%	$394,600 - $501,050	$197,300 - $250,525	$197,300 - $250,500	$197,300 - $250,525
    35%	$501,050 - $751,600	$250,525 - $626,350	$250,500 - $626,350	$250,525 - $375,800
    37%	Over  $751,600	Over  $626,350	Over  $626,350	Over  $375,800
    *Caution: Do not use these tax rate schedules to figure 2024 taxes. Use only to figure 2025 estimates. Source: Rev. Proc. 2024-40

    */

    // 2025 Standard Deduction by filing status
    const STANDARD_DEDUCTION: Record<string, number> = {
      single: 15750,
      married_filing_jointly: 31500,
      married_filing_separately: 15750, // MFS uses single for base, adjust if needed
      head_of_household: 23625
    };

    const income = this.data.income || { w2: 0, interest: 0, other: 0 };
    const grossIncome = (income.w2 || 0) + (income.interest || 0) + (income.other || 0);

    // Deductions: sum itemized, but use standard if higher
    const itemizedDeductions = (this.data.deductions || []).reduce((sum: any, d:any) => sum + d.amount, 0);
    const filingStatus = this.data.filingStatus || 'single';
    const standardDeduction = STANDARD_DEDUCTION[filingStatus] || STANDARD_DEDUCTION['single'];
    const deductions = Math.max(itemizedDeductions, standardDeduction);

    // Credits
    const credits = (this.data.credits || []).reduce((sum: any, c:any) => sum + c.amount, 0);

    // Taxable income
    const taxableIncome = Math.max(0, grossIncome - deductions);

    // 2025 Federal Tax Brackets
    const BRACKETS: Record<string, { rate: number, min: number, max: number }[]> = {
      single: [
        { rate: 0.10, min: 0, max: 11925 },
        { rate: 0.12, min: 11925, max: 48475 },
        { rate: 0.22, min: 48475, max: 103350 },
        { rate: 0.24, min: 103350, max: 197300 },
        { rate: 0.32, min: 197300, max: 250525 },
        { rate: 0.35, min: 250525, max: 626350 },
        { rate: 0.37, min: 626350, max: Infinity }
      ],
      married_filing_jointly: [
        { rate: 0.10, min: 0, max: 23850 },
        { rate: 0.12, min: 23850, max: 96950 },
        { rate: 0.22, min: 96950, max: 206700 },
        { rate: 0.24, min: 206700, max: 394600 },
        { rate: 0.32, min: 394600, max: 501050 },
        { rate: 0.35, min: 501050, max: 751600 },
        { rate: 0.37, min: 751600, max: Infinity }
      ],
      head_of_household: [
        { rate: 0.10, min: 0, max: 17000 },
        { rate: 0.12, min: 17000, max: 64850 },
        { rate: 0.22, min: 64850, max: 103350 },
        { rate: 0.24, min: 103350, max: 197300 },
        { rate: 0.32, min: 197300, max: 250500 },
        { rate: 0.35, min: 250500, max: 626350 },
        { rate: 0.37, min: 626350, max: Infinity }
      ],
      married_filing_separately: [
        { rate: 0.10, min: 0, max: 11925 },
        { rate: 0.12, min: 11925, max: 48475 },
        { rate: 0.22, min: 48475, max: 103350 },
        { rate: 0.24, min: 103350, max: 197300 },
        { rate: 0.32, min: 197300, max: 250525 },
        { rate: 0.35, min: 250525, max: 375800 },
        { rate: 0.37, min: 375800, max: Infinity }
      ]
    };

    function calculateTax(income: number, status: string): number {
      const brackets = BRACKETS[status] || BRACKETS['single'];
      let tax = 0;
      for (let i = 0; i < brackets.length; i++) {
        const { rate, min, max } = brackets[i];
        if (income > min) {
          const taxableAtThisRate = Math.min(income, max) - min;
          tax += taxableAtThisRate * rate;
        } else {
          break;
        }
      }
      return tax;
    }

    const federalTaxBeforeCredits = calculateTax(taxableIncome, filingStatus);
    const federalTaxLiability = Math.max(0, federalTaxBeforeCredits - credits);

    // State logic placeholder (copying federal for now)
    const stateIncome = income.w2 || 0;
    const stateDeductions = (this.data.deductions || []).reduce((sum: any, d:any) => sum + d.amount, 0);
    const stateCredits = (this.data.credits || []).reduce((sum: any, c:any) => sum + c.amount, 0);
    const stateTaxLiability = stateIncome - stateDeductions - stateCredits;

    this.returns = {
      federal: {
        income: grossIncome,
        deductions,
        credits,
        taxLiability: federalTaxLiability
      },
      state: {
        income: stateIncome,
        deductions: stateDeductions,
        credits: stateCredits,
        taxLiability: stateTaxLiability
      }
    };
  }


}

interface Returns {
  federal: {
    income: number;
    deductions: number;
    credits: number;
    taxLiability: number;
  };
  state: {
    income: number;
    deductions: number;
    credits: number;
    taxLiability: number;
  };
}