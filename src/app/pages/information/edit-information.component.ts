
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from "../../shared/components/common/component-card/component-card.component";
import { LabelComponent } from '../../shared/components/form/label/label.component';
import { InputFieldComponent } from '../../shared/components/form/input/input-field.component';
import { SelectComponent } from '../../shared/components/form/select/select.component';
import { DatePickerComponent } from '../../shared/components/form/date-picker/date-picker.component';
import { CheckboxComponent } from '../../shared/components/form/input/checkbox.component';
import { RadioComponent } from '../../shared/components/form/input/radio.component';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-edit-information',
  templateUrl: './edit-information.component.html',
  styleUrls: ['./edit-information.component.css'],
  imports: [
    ReactiveFormsModule,
    PageBreadcrumbComponent,
    ComponentCardComponent,
    LabelComponent,
    InputFieldComponent,
    SelectComponent,
    DatePickerComponent,
    CheckboxComponent,
    RadioComponent,
    FormsModule
],
})
export class EditInformationComponent {

  item: string | null = null;
  form: FormGroup;
  formSchema = [
    { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'Enter first name', validators: [Validators.required] },
    { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Enter last name', validators: [Validators.required] },
    { name: 'middleInitial', label: 'Middle Initial', type: 'text', placeholder: 'M', inputType: 'text', validators: [Validators.maxLength(1)] },
    { name: 'suffix', label: 'Suffix', type: 'text', placeholder: 'Jr, Sr, III', inputType: 'text' },
    { name: 'birthDate', label: 'Birth Date', type: 'date', placeholder: 'YYYY-MM-DD', validators: [Validators.required] },
    { name: 'ssn', label: 'Social Security Number', type: 'text', placeholder: 'XXX-XX-XXXX', inputType: 'text', validators: [Validators.required, Validators.pattern(/^\d{3}-\d{2}-\d{4}$/)] },
    { name: 'ssnNotValidForWork', label: 'Check if Social is not valid for work', type: 'checkbox' },
    { name: 'occupation', label: 'Occupation', type: 'text', placeholder: 'Enter occupation' },
    { name: 'state', label: 'State', type: 'select', options: [
      { value: '', label: 'Select state' },
      { value: 'AL', label: 'Alabama' },
      { value: 'AK', label: 'Alaska' },
      { value: 'AZ', label: 'Arizona' },
      { value: 'AR', label: 'Arkansas' },
      { value: 'CA', label: 'California' },
      { value: 'CO', label: 'Colorado' },
      { value: 'CT', label: 'Connecticut' },
      { value: 'DE', label: 'Delaware' },
      { value: 'FL', label: 'Florida' },
      { value: 'GA', label: 'Georgia' },
      { value: 'HI', label: 'Hawaii' },
      { value: 'ID', label: 'Idaho' },
      { value: 'IL', label: 'Illinois' },
      { value: 'IN', label: 'Indiana' },
      { value: 'IA', label: 'Iowa' },
      { value: 'KS', label: 'Kansas' },
      { value: 'KY', label: 'Kentucky' },
      { value: 'LA', label: 'Louisiana' },
      { value: 'ME', label: 'Maine' },
      { value: 'MD', label: 'Maryland' },
      { value: 'MA', label: 'Massachusetts' },
      { value: 'MI', label: 'Michigan' },
      { value: 'MN', label: 'Minnesota' },
      { value: 'MS', label: 'Mississippi' },
      { value: 'MO', label: 'Missouri' },
      { value: 'MT', label: 'Montana' },
      { value: 'NE', label: 'Nebraska' },
      { value: 'NV', label: 'Nevada' },
      { value: 'NH', label: 'New Hampshire' },
      { value: 'NJ', label: 'New Jersey' },
      { value: 'NM', label: 'New Mexico' },
      { value: 'NY', label: 'New York' },
      { value: 'NC', label: 'North Carolina' },
      { value: 'ND', label: 'North Dakota' },
      { value: 'OH', label: 'Ohio' },
      { value: 'OK', label: 'Oklahoma' },
      { value: 'OR', label: 'Oregon' },
      { value: 'PA', label: 'Pennsylvania' },
      { value: 'RI', label: 'Rhode Island' },
      { value: 'SC', label: 'South Carolina' },
      { value: 'SD', label: 'South Dakota' },
      { value: 'TN', label: 'Tennessee' },
      { value: 'TX', label: 'Texas' },
      { value: 'UT', label: 'Utah' },
      { value: 'VT', label: 'Vermont' },
      { value: 'VA', label: 'Virginia' },
      { value: 'WA', label: 'Washington' },
      { value: 'WV', label: 'West Virginia' },
      { value: 'WI', label: 'Wisconsin' },
      { value: 'WY', label: 'Wyoming' }
    ], validators: [Validators.required] },
    { name: 'liveInAnotherState', label: 'Did you live in another state in 2025?', type: 'radio', options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ], validators: [Validators.required] },
    { name: 'servedInArmedForces', label: 'Did you serve in the US Armed Forces in 2025?', type: 'radio', options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ], validators: [Validators.required] },
  ];

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private dataService: DataService) {
    this.route.paramMap.subscribe(params => {
      this.item = params.get('item');
    });
    this.form = this.fb.group({});
    this.buildForm();
  }

  buildForm() {
    for (const field of this.formSchema) {
      this.form.addControl(
        field.name,
        this.fb.control('', field.validators || [])
      );
    }
  }

  onSubmit() {
    if (this.form.valid) {
      // Handle form submission (e.g., send to API or update state)
      this.dataService.saveData(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
