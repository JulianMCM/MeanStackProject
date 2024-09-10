import { Component, OnInit, Provider } from '@angular/core';
import { ProviderClass } from '../../models/providers.class';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProviderService } from '../../services/provider.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-providers',
  templateUrl: './add-providers.component.html',
  styles: ``
})
export class AddProvidersComponent implements OnInit {
  submitted = false;
  emailError: boolean = false;
  emailErrorMsg: string = 'Invalid email. Try again or contact us.';

  providers: ProviderClass[] = [];
  provider = new ProviderClass();
  providersForm: FormGroup = new FormGroup({});

  constructor(private providerService: ProviderService, private router: Router) {}

  ngOnInit(): void {
    this.buildFormControls();
    this.loadData();
  }

  handleSubmit() {
    this.buildProvider();
    if (!this.isInvalidEmail()) {
      this.providerService.addProvider(this.provider).subscribe({
        next: (data) => {
          this.submitted = true;
          this.emailError = false; // Reset the flag in case of success
          setTimeout(() => {
            this.router.navigate(['/providers']);
          },3000)
        },
        error: (error) => {
          console.log(error);
          // Handle different types of errors accordingly
          // For example, if the backend returns a specific error for duplicate emails:
          if (
            error.status === 400 &&
            error.error.message.includes('duplicate email')
          ) {
            this.emailError = true;
            this.emailErrorMsg =
              'This email is already in use. Please use a different email.';
          } else {
            // Handle other errors
            this.emailErrorMsg =
              'An unexpected error occurred. Please try again later.';
          }
        },
      });
    } else {
      // In case of invalid email (duplicate detected on the client side)
      this.emailErrorMsg =
        'This email is already in use. Please use a different email.';
    }
  }

  //Get all records from database
  loadData(): void {
    this.providerService.getProviders().subscribe({
      next: (data) => {
        this.providers = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  //Check for duplicate email
  isInvalidEmail() {
    let email = this.providersForm.get('email')?.value;
    if (this.providers.filter((el) => el.company.email === email).length > 0) {
      this.emailError = true;
      return true;
    }
    return false;
  }

  //Generate new Id
  getNewId() {
    let newId: number;
    while (true) {
      newId = Math.floor(Math.random() * 10000) + 99999;
      if (this.providers.findIndex((el) => el.id === newId) === -1) {
        return newId;
      }
    }
  }

  //Build new provider Object
  buildProvider() {
    const p = this.providersForm.value; // Grab the form values
    this.provider.id = this.getNewId();
    this.provider.firstname = p.firstname;
    this.provider.lastname = p.lastname;
    this.provider.position = p.position;
    this.provider.company = {
      // Correctly access and assign to the provider's company property
      company_name: p.company.company_name,
      address: p.company.address,
      address2: p.company.address2,
      city: p.company.city,
      state: p.company.state,
      postal_code: p.company.postal_code,
      phone: p.phone, // Ensure this and email are correctly placed
      email: p.email,
      description: p.company.description,
      tagline: p.company.tagline,
    };
  }

  //Build form controls
  buildFormControls() {
    this.providersForm = new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
      ]),
      position: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+?2?\d{12}$/),
      ]),
      company: new FormGroup({
        company_name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ]),
        address: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ]),
        address2: new FormControl('', [Validators.maxLength(100)]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ]),
        state: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ]),
        postal_code: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
        ]),
        description: new FormControl('', [Validators.maxLength(500)]),
        tagline: new FormControl('', [Validators.maxLength(100)]),
      }),
    });
  }
}
