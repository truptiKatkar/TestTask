import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  private fb = inject(FormBuilder);

  personalDetalsFormGroup = this.fb.group({
    password: ['', Validators.required],
    email: ['', Validators.required],
    role: ['', Validators.required],
  });
  addressFormGroup = this.fb.group({
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
  });
  isLinear = false;

  ngOnInit(): void {}

  handleSubmit() {
    console.log(this.personalDetalsFormGroup.value);
    console.log(this.addressFormGroup.value);
    const personalDetails = this.personalDetalsFormGroup.value;
    const addressDetails = this.addressFormGroup.value;
    const combinedData = {
      ...personalDetails,
      ...addressDetails,
    };
    console.log(combinedData, 'combinedData');
    let prevData: any = localStorage.getItem('data');
    let data: any[] = JSON.parse(prevData) || [];
    data.push(combinedData);
    localStorage.setItem('data', JSON.stringify(data));
  }
}
