import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { DataService, DataItem } from './data.service';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ModalService } from './modal/modal.service';
import { ModalComponent } from './modal/modal.component';
import { BehaviorSubject } from 'rxjs';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  standalone: true,
  imports: [NzTableModule, CommonModule, ToolbarModule, ButtonModule, ModalComponent,NzPaginationModule],
  providers: [ModalService, DataService],
})
export class UsersComponent implements OnInit {
  @ViewChild('view') templateRef!: TemplateRef<Element>;
  @ViewChild('container', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  modalIsOpen = false;
  editDataItem: DataItem | null = null;
  listOfData: DataItem[] = [];
  displayData: DataItem[] = [];
  listOfColumn: { title: string; dataIndex: string; key: string }[] = [];
  pageIndex: number = 1;
  pageSize: number = 5;

  constructor(
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.updateData();
  }

  openModalComponent() {
    this.modalIsOpen = true;
  }

  editUser(user: DataItem) {
    this.editDataItem = user;
    this.openModalComponent();
  }

  updateData(): void {
    this.dataService.fetchData();
    this.dataService.data$.subscribe((data) => {
      this.listOfData = data.listOfData;
      this.listOfColumn = data.listOfColumn;
      this.updateDisplayData();
    });
  }

  updateDisplayData(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayData = this.listOfData.slice(startIndex, endIndex);
  }

  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.updateDisplayData();
  }

  onFormSubmitted(): void {
    this.updateData();
    this.modalIsOpen = false;
  }

  deleteData(id: number): void {
    this.dataService.deleteData(id);
    this.updateData(); // Ensure data is updated after deletion
  }
}
