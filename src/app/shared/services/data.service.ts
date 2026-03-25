import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Persona {
  firstName: string;
  lastName: string;
  ssn: string;
  dateOfBirth: string;
}

export interface Dependent extends Persona {
  relationship: string;
}

export interface IndividualData extends Persona {
  filingStatus: 'single' | 'married_filing_jointly' | 'married_filing_separately' | 'head_of_household';
  email: string;
  spouse?: Persona;
  dependents?: Dependent[];
  income?: {
    w2: number;
    interest: number;
    other: number;
  };
  deductions?: { type: string; amount: number; }[];
  credits: { type: string; amount: number }[];
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly STORAGE_KEY = 'data';
  private dataSubject = new BehaviorSubject<IndividualData | null>(this.loadData());
  data$ = this.dataSubject.asObservable();

  private loadData(): IndividualData | null {
    const json = localStorage.getItem(this.STORAGE_KEY);
    return json ? JSON.parse(json) : null;
  }

  getData(): IndividualData {
    return this.dataSubject.getValue()  || {} as IndividualData;
  }

  saveData(data: IndividualData) {
    const existingData = this.dataSubject.getValue();
    data = { ...existingData, ...data }; // Extend existing data with new data
    this.dataSubject.next(data);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  clearData() {
    this.dataSubject.next(null);
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
