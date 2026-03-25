import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioComponent } from './input/radio.component';
import { CheckboxComponent } from './input/checkbox.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { SelectComponent } from './select/select.component';
import { InputFieldComponent } from './input/input-field.component';
import { LabelComponent } from './label/label.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LabelComponent,
    InputFieldComponent,
    SelectComponent,
    DatePickerComponent,
    CheckboxComponent,
    RadioComponent,
    FormsModule
  ]
})
export class FormComponent {
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  form: FormGroup;
  @Input() formSchema: FormSchema[] = [];
  @Output() onSubmit: EventEmitter<string> = new EventEmitter<string>();

  ngOnChanges() {
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

  submit() {
    if (this.form.valid) {
      // Handle form submission (e.g., send to API or update state)
      this.onSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

}

export interface FormSchema { 
  name: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'checkbox' | 'radio';
  placeholder?: string;
  inputType?: string; // e.g., for text inputs, could be 'text', 'email', 'number', etc.
  options?: { value: string; label: string }[]; // For select and radio types
  validators?: any[];
}