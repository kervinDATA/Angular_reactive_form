import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function isRequiredValidator(controlName1: string, controlName2: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const control1 = group.get(controlName1);
    const control2 = group.get(controlName2);

    if ((control1?.value && control1.value.trim() !== '') || (control2?.value && control2.value.trim() !== '')) {
      return null; // Valid
    }

    return { isRequired: true }; // Invalid
  };
}

export function rangeDateValidator(minYear: number, maxYear: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const year = control.value;
    if (year >= minYear && year <= maxYear) {
      return null; // Valid
    }
    return { range: { min: minYear, max: maxYear } }; // Invalid
  };
}
