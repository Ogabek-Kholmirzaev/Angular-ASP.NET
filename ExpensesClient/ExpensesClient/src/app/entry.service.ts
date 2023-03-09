import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  baseUrl: string = 'https://localhost:7115/api/entries';

  constructor(private http: HttpClient) { }

  getEntry(id: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token_value')}`
    });

    return this.http.get(this.baseUrl + '/' + id, { headers: headers })
  }

  getAll(){
    return this.http.get(this.baseUrl);
  }

  createEntry(entry: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token_value')}`
    });

    return this.http.post(this.baseUrl, entry, { headers: headers });
  }

  updateEntry(id: number, entry: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token_value')}`
    });

    return this.http.put(this.baseUrl + '/' + id, entry, { headers: headers });
  }

  deleteEntry(id: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token_value')}`
    });

    return this.http.delete(this.baseUrl + '/' + id, { headers: headers });
  }
}
