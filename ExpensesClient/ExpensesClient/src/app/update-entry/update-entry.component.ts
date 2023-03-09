import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core'
import { Type } from '../interfaces/Type';
import { EntryService } from '../entry.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-entry',
  templateUrl: './update-entry.component.html',
  styleUrls: ['./update-entry.component.css']
})
export class UpdateEntryComponent {

  form: FormGroup;
  id: number;

  constructor(private entryService: EntryService,
              private router: Router,
              private formBuilder: FormBuilder,
              private dialogReference: MatDialogRef<UpdateEntryComponent>,
              @Inject(MAT_DIALOG_DATA) { description, isExpense, value, id } :
                                        { description: string, isExpense: boolean, value: number, id: number }){
                this.id = id;

                this.form = formBuilder.group({
                  description: [description, Validators.required],
                  isExpense: [isExpense, Validators.required],
                  value: [value, [Validators.required, Validators.pattern('\\d+\\.?\\d*')]],
                });

  }

  types: Type[] = [
    { value: true, display: 'Expense' },
    { value: false, display: 'Income' }
  ];

  close(){
    this.dialogReference.close();
    this.router.navigate(['/']).then(() => { window.location.reload() });
  }

  save(){
    this.form.value.id = this.id;
    this.entryService.updateEntry(this.id, this.form.value).subscribe(
      (data: any) => {
        console.log('Data: ', data);
        alert("Successfully updated!");
        this.router.navigate(['/']).then(() => { window.location.reload() });
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
        this.router.navigate(['/']).then(() => { window.location.reload() });
      }
    );
  }

}
