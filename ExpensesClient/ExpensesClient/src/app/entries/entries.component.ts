import { Component, OnInit, ViewChild } from '@angular/core';
import { EntryService } from '../entry.service';
import { MatTableDataSource } from '@angular/material/table';
import { EntryElement } from '../interfaces/EntryElement';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEntryComponent } from '../update-entry/update-entry.component';
import { AuthService } from '../auth.service';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit{

  displayedColumns: string[] = [];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public authService: AuthService,
              private entryService: EntryService,
              private dialog: MatDialog) {
    if(this.isAuthenticated() === true){
      this.displayedColumns = ['description', 'isExpense', 'value', 'actions'];
    } else{
      this.displayedColumns = ['description', 'isExpense', 'value'];
    }
  }

  ngOnInit(): void {
    this.entryService.getAll().subscribe(
      (data: any) => {
        console.log('Result - ', data);
        this.dataSource = new MatTableDataSource<EntryElement>(data as EntryElement[]);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  isAuthenticated(): boolean{
    return this.authService.isAuthenticated();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateEntry(entry: any){
    console.log(entry);
    if(this.isAuthenticated()){
      this.dialog.open(UpdateEntryComponent, {
        data: {
          id: entry.id,
          description: entry.description,
          isExpense: entry.isExpense,
          value: entry.value
        }
      });
    }
  }
}
