import {AbstractControl, ValidatorFn} from '@angular/forms';
import {ValidateFn} from 'codelyzer/walkerFactory/walkerFn';

function userNameForbiddenValidation2(control: AbstractControl): { [key: string]: any } | null {
  const forbidden = /admin/.test(control.value);
  return forbidden ? {forbiddenName: {value: control.value}} : null;
}

export function userNameForbiddenValidation(forbiddenName: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = forbiddenName.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}

export function forbiddenValidation(forbiddenName: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = forbiddenName.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}
