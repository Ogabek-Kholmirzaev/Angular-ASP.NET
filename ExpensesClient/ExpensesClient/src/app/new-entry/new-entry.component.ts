import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Type } from '../interfaces/Type';
import { EntryService } from '../entry.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.css']
})
export class NewEntryComponent {

  types: Type[] = [
    { value: true, display: 'Expense' },
    { value: false, display: 'Income' }
  ];

  entryForm!: FormGroup;

  constructor(private entryService: EntryService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.entryForm = this.formBuilder.group({
      description: new FormControl('', Validators.required),
      isExpense: new FormControl('', Validators.required),
      value: new FormControl('', [Validators.required, Validators.pattern('-\\d+\\.?\\d*')])
    });
  }

  get f() {
    return this.entryForm.controls;
  }

  onSubmit() {
    console.log(this.entryForm.value);
    this.entryService.createEntry(this.entryForm.value).subscribe(
      (data: any) => {
        console.log('Data - ', data);
        alert('Successfully added!');
        this.router.navigate(['/']).then(() => { window.location.reload() });
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
        this.router.navigate(['/']).then(() => { window.location.reload() });
      }
    );
  }
}
