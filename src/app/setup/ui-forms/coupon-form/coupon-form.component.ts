import { Component, EventEmitter, Input, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { couponType } from 'src/app/constants/couponType';

@Component({
  selector: 'app-coupon-form',
  templateUrl: './coupon-form.component.html',
  styleUrls: ['./coupon-form.component.scss']
})
export class CouponFormComponent {
  @Input() isEdit = false;
  @Input() coupon: any = {
    title: false,
    code: '',
    customerUsageLimit: '',
    startDate: '',
    endDate: '',
    discountType: '',
    discount: '',
    maxDiscount: '',
    minPurchase: '',
  };

  couponType=couponType;
  form: FormGroup;
  @Input() serverErrors: any; // Input property to receive server errors from parent component
  @Input() isSaving!:boolean; // Input property to receive server errors from parent component


  @Output() save = new EventEmitter<any>();
  constructor(
    public dialogRef: MatDialogRef<CouponFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) {
    this.isEdit = data.isEdit;

    if (this.isEdit) {
      this.coupon = data.coupon; // Access the candidate from the passed data
    } else {
      this.coupon = null;
    }

    console.log('coupon:', this.coupon);

    this.form = this.formBuilder.group({
      title: [this.coupon?.title || null],
      code: [this.coupon?.code || null],
      customerUsageLimit: [this.coupon?.customerUsageLimit || null],
      startDate: [this.coupon?.startDate || null],
      endDate: [this.coupon?.endDate || null],
      discountType: [this.coupon?.discountType || null],
      discount: [this.coupon?.discount || null,],
      minPurchase: [this.coupon?.minPurchase || null],
      maxDiscount: [this.coupon?.maxDiscount || null],
    });

  }


  onSave(): void {
    this.isSaving=true;
    console.log(this.form.value)
    this.form.markAllAsTouched();
      if (this.form.valid) {

       if (this.isEdit) {
        console.log('Update')
        console.log(this.form.value);
        console.log(this.coupon.id);
        const data = this.form.value;
         this.save.emit({data, id:this.coupon.id});
       } else {
        console.log('Save')

         this.save.emit( this.form.value );
       }
       console.log('Form Data: Valid');
        //  this.dialogRef.close();
      } else {
        console.log('Form is invalid');
      }
  }




}
