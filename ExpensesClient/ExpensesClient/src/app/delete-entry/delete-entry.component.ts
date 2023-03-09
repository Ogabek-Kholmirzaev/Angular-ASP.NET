import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntryService } from '../entry.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-entry',
  templateUrl: './delete-entry.component.html',
  styleUrls: ['./delete-entry.component.css']
})
export class DeleteEntryComponent implements OnInit {

  entry = {
    description: '',
    isExpense: false,
    value: 0
  };

  id: any;

  constructor(private activatedRoute: ActivatedRoute,
              private entryService: EntryService,
              private router: Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.entryService.getEntry(this.id).subscribe((data: any) => {
      console.log(data);

      this.entry.description = data.description;
      this.entry.isExpense = data.isExpense;
      this.entry.value = data.value;
    })
  }

  cancel(){
    this.router.navigate(['/']).then(() => { window.location.reload() });
  }

  confirm(){
    this.entryService.deleteEntry(this.id).subscribe(
      (data: any) => {
        console.log(data);
        alert('Successfully deleted!');
        this.router.navigate(['/']).then(() => { window.location.reload() });
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
        this.router.navigate(['/']).then(() => { window.location.reload() });
      }
    );
  }

}
