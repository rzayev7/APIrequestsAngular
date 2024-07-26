import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataItem, DataService } from '../data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
  imports: [FormsModule],
  providers: [DataService],
})
export class ModalComponent {
  closeModal = false;
  @Output() formSubmitted = new EventEmitter<void>();
  @Input() editDataItem: DataItem | null = null;

  name: string = '';
  email: string = '';
  gender: string = '';
  status: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    if (this.editDataItem) {
      this.name = this.editDataItem.name;
      this.email = this.editDataItem.email;
      this.gender = this.editDataItem.gender;
      this.status = this.editDataItem.status;
    }
  }

  onClose() {
    this.closeModal = true;
  }

  submitForm(): void {
    if (this.editDataItem) {
      const data: Partial<DataItem> = {
        name: this.name,
        email: this.email,
        gender: this.gender,
        status: this.status,
      };
      this.dataService.updateData(this.editDataItem.id, data).subscribe(() => {
        this.formSubmitted.emit();
      });
    } else {
      const data: DataItem = {
        id: 0,
        name: this.name,
        email: this.email,
        gender: this.gender,
        status: this.status,
      };
      this.dataService.addData(data);
      this.formSubmitted.emit();
    }
  }
}
