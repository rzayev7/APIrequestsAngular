import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';

import { UsersComponent } from './users/users.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NzTableModule, CommonModule,UsersComponent,HttpClientModule],
})
export class AppComponent  {
  
}
