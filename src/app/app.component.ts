import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {forbiddenValidation, userNameForbiddenValidation} from './static/password-forbidden-validator';
import {passwordValidation} from './static/password-validator';
import {RegistrationService} from './registration.service';

/*import {FormControl, FormGroup} from '@angular/forms'; */


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ReactiveFormInAngularExample';
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private registerationService: RegistrationService) {
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), userNameForbiddenValidation(/admin/)]],
      email: [''],
      subscribe: [false],
      password: ['', [Validators.minLength(8)]],
      confirmPassword: [''],
      address: this.formBuilder.group({
        city: [''],
        state: [''],
        pincode: ['']
      }),
      alternateEmailIds: this.formBuilder.array([])
    }, {validator: passwordValidation});
    this.registrationForm.get('subscribe').valueChanges.subscribe(checkedValue => {
      const email = this.registrationForm.get('email');
      if (checkedValue) {
        email.setValidators(Validators.required);
      } else {
        email.clearValidators();
      }
      email.updateValueAndValidity();
    });
  }

  get username() {
    return this.registrationForm.get('username');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }

  get alternateEmailIds() {
    return this.registrationForm.get('alternateEmailIds') as FormArray;
  }

  addNewEmailId() {
    this.alternateEmailIds.push(this.formBuilder.control(''));
  }

  removeEmailId(i: number) {
    this.alternateEmailIds.removeAt(i);
  }

  /*registrationForm: FormGroup = new FormGroup({
    username: new FormControl('Amsidh'),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      pincode: new FormControl('')
    })
  });*/

  registerUser() {

  }

  loadFormData() {
    this.registrationForm.patchValue({
      username: 'Amsidh',
      password: 'abcdefgh',
      confirmPassword: 'abcdefgh'
    });
  }

  onSubmitRegister() {
    console.log(this.registrationForm.value);
    this.registerationService.register(this.registrationForm.value).subscribe(
      response => console.log('User registered successfully!', response),
      error => console.error('Error', error));
  }

}
