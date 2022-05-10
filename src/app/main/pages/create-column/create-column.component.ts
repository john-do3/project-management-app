import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateColumnDto } from 'src/app/shared/models/createColumnDto';

@Component({
  selector: 'app-create-column',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.scss'],
})
export class CreateColumnComponent implements OnInit {
  createDialog: FormGroup = new FormGroup({
    columnTitle: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<CreateColumnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateColumnDto,
) { }

  ngOnInit(): void {
    this.createDialog.get('columnTitle')?.setValue(this.data.title);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    this.createDialog.get('columnTitle')?.markAsTouched();

    const title = this.createDialog.get('columnTitle')?.value;
    if (title) this.dialogRef.close(title);
  }
}
