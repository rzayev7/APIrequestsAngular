import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface DataItem {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'api/user';
  private dataSubject = new BehaviorSubject<{ listOfData: DataItem[], listOfColumn: { title: string; dataIndex: string; key: string }[] }>({
    listOfData: [],
    listOfColumn: [
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'Gender', dataIndex: 'gender', key: 'gender' },
      { title: 'Status', dataIndex: 'status', key: 'status' }
    ]
  });

  data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchData(): void {
    this.http.get<{ data: DataItem[] }>(this.apiUrl).subscribe(
      response => {
        this.dataSubject.next({
          listOfData: response.data,
          listOfColumn: this.dataSubject.value.listOfColumn
        });
        console.log(response.data, '-000000');
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }

  addData(data: DataItem): void {
    this.http.post<DataItem>(this.apiUrl, data).subscribe(
      response => {
        console.log('Data successfully added', response);
        this.fetchData(); 
      },
      error => {
        console.error('Error adding data', error);
      }
    );
  }

  deleteData(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(
      response => {
        console.log('Data successfully deleted', response);
        this.fetchData(); 
      },
      error => {
        console.error('Error deleting data', error);
      }
    );
  }

  updateData(id: number, updatedData: Partial<DataItem>) {
  return this.http.patch(this.apiUrl+`/${id}`, updatedData);
  }


  
}
