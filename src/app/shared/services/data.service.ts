import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Dependent {
  firstName: string;
  lastName: string;
  ssn: string;
  relationship: string;
  dateOfBirth: string;
}

export interface IndividualInfo {
  firstName: string;
  lastName: string;
  ssn: string;
  dateOfBirth: string;
  spouse?: {
    firstName: string;
    lastName: string;
    ssn: string;
    dateOfBirth: string;
  };
  dependents?: Dependent[];
  wagesIncome?: {
    w2Wages: number;
    interestIncome: number;
    otherIncome: number;
  };
  deductionsCredits?: {
    deductionType: string;
    deductionAmount: number;
    credits: { [key: string]: number };
  };
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly STORAGE_KEY = 'data';
  private dataSubject = new BehaviorSubject<IndividualInfo | null>(this.loadData());
  data$ = this.dataSubject.asObservable();

  private loadData(): IndividualInfo | null {
    const json = localStorage.getItem(this.STORAGE_KEY);
    return json ? JSON.parse(json) : null;
  }

  saveData(data: IndividualInfo) {
    this.dataSubject.next(data);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  clearData() {
    this.dataSubject.next(null);
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
