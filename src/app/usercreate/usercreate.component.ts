import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-usercreate',
  templateUrl: './usercreate.component.html',
  styleUrls: ['./usercreate.component.css']
})
export class UsercreateComponent {
  userRegistrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userRegistrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required] // Role control
      // Add more form controls as needed
    });
  }

  onSubmit() {
    if (this.userRegistrationForm.valid) {
      // Handle form submission, e.g., send data to a server
      const formData = this.userRegistrationForm.value;
      console.log(formData);
      // You can send the form data to a service for further processing
    }
  }
}
