import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
 FormControl, FormGroup, Validators,
} from '@angular/forms';
import { CreateBoardDto } from 'src/app/shared/models/createBoardDto';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent implements OnInit {
  createDialog: FormGroup = new FormGroup({
    boardTitle: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<CreateBoardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateBoardDto,
) {

  }

  ngOnInit(): void {
    this.createDialog.get('boardTitle')?.setValue(this.data.title);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void{
    this.createDialog.get('boardTitle')?.markAsTouched();

    const title = this.createDialog.get('boardTitle')?.value;
    if (title) this.dialogRef.close(title);
  }
}
