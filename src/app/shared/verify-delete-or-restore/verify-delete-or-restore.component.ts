import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-verify-delete-or-restore',
  templateUrl: './verify-delete-or-restore.component.html',
  styleUrls: ['./verify-delete-or-restore.component.scss']
})
export class VerifyDeleteOrRestoreComponent {
  user:any;
  constructor(
    public dialogRef: MatDialogRef<VerifyDeleteOrRestoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user=data.data;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
