import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from '../../shared/components/common/component-card/component-card.component';
import { FormComponent, FormSchema } from '../../shared/components/form/form.component';
import { Validators } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-wages-income',
  imports: [
    PageBreadcrumbComponent,
    ComponentCardComponent,
    FormComponent
],
  templateUrl: './wages-income.component.html'
})
export class WagesIncomeComponent {
  constructor(private dataService: DataService) {
  }

  formSchema: FormSchema[] = [
    { name: 'w2', label: 'W-2 Wages', type: 'text', placeholder: 'Enter W-2 wages', validators: [Validators.required] },
    { name: 'interest', label: 'Interest Income (1099-INT)', type: 'text', placeholder: 'Enter interest income', validators: [Validators.required] },
    { name: 'other', label: 'Other Income', type: 'text', placeholder: 'Enter other income', validators: [Validators.required] },
  ];

  onSubmit(formData: any) {
    console.log('Form submitted with data:', formData);
    let data = this.dataService.getData();
    data.income = {
        w2: formData.w2,
        interest: formData.interest,
        other: formData.other
    };
    this.dataService.saveData(data);
  }
}
