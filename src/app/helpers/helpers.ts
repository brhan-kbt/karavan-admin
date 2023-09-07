import { AbstractControl, ValidatorFn } from '@angular/forms';

// Custom validator function for branchId based on role
export function branchIdRequiredValidator(roleControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const role = roleControl.value;
      const branchId = control.value;

      if (role === 'Branch_Admin' && !branchId) {
        return { branchIdRequired: true };
      }

      return null; // Return null if validation passes
    };
}


export function formatTitle(title: string): string {
  const words = title.toLowerCase().split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substring(1);
  }
  return words.join(' ');
}
