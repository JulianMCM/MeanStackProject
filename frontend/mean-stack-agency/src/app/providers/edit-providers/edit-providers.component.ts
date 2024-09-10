import { Component, OnInit } from '@angular/core';
import { ProviderClass } from '../../models/providers.class';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProviderService } from '../../services/provider.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-providers',
  templateUrl: './edit-providers.component.html',
  styles: ``
})
export class EditProvidersComponent implements OnInit {
  submitted = false;
  emailError = false;
  emailErrorMsg = "Invalid email. Try again or contact us."
  providers: ProviderClass[] = [];
  provider = new ProviderClass();
  providersForm: FormGroup = new FormGroup({});
  originalValues: any;

  id!: number; //Service provider's id from URL
  email!: string; //Service provider's default email
  ready = false; //Load form only when data are present

  constructor(private providerService: ProviderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.buildFormControls();
    this.loadData();
    this.route.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id')!, 10);

      this.providerService.getProvider(this.id).subscribe({
        next: (data) => {
          this.provider = data[0];
          console.log(data);

          // Directamente llenar el formulario con los valores del objeto `provider`
          this.providersForm.patchValue(this.provider);
          this.providersForm.patchValue({
            phone: this.provider.company.phone,
            email: this.provider.company.email
          })

          this.ready = true;
        },
        error: (error) => {
          console.log(error);
        }
      });
    });
    this.originalValues = this.providersForm.getRawValue();
    this.providersForm.valueChanges
      .subscribe(() => {
        this.checkForChanges();
      });
  }

  checkForChanges(): void {
    const currentValues = this.providersForm.getRawValue();
    const formIsModified = JSON.stringify(currentValues) !== JSON.stringify(this.originalValues);

    if (formIsModified) {
      this.providersForm.markAsDirty();
    } else {
      this.providersForm.markAsPristine();
    }
  }

  // Method to easy access form controls

  get f() { return this.providersForm.controls; }

  handleSubmit() {
    this.buildProvider();
    if (!this.isInvalidEmail()) {
      this.providerService.updateProvider(this.id, this.provider).subscribe({
        next: (data) => {
          this.submitted = true;
          this.emailError = false; // Reset the flag in case of success
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

  //Check for duplicate emails
  isInvalidEmail() {
    let email = this.providersForm.get('email')?.value;
    if (this.email == email && this.providers.filter(el => el.company.email == email).length > 0) {
      this.emailError = true;
      return true;
    }
    return false;
  }

  //Generate new id
  getNewId() {
    let newId: number;
    while (true) {
      newId = Math.floor(Math.random() * 10000 + 99999);
      if (this.providers.findIndex(el => el.id == newId) == -1) {
        return newId;
      }
    }
  }

  //Build new provider object
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
      phone: p.phone, // Asegúrate de que `phone` y `email` están dentro de `company`
      email: p.email,
      description: p.company.description,
      tagline: p.company.tagline,
    };
    console.log(this.provider)
    console.log('datos');
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
