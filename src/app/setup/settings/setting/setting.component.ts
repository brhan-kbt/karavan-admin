import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Editor } from 'ngx-editor';
import {  SortEvent } from 'primeng/api';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SettingService } from 'src/app/services/setting/setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {

  sortField!:string;
  sortOrder!:number;
  products: any;
  changePasswordForm!:FormGroup;
  user:any;
  expanded:boolean=false;
  orderId!:string;
  searchForm!: FormGroup;
  settingForm !: FormGroup;
  filteredOrders:any;
  howItWorks:any;


  text:String=''
  editor!: Editor;
  html = '';
  editingContent: boolean = false;
  editedContent: string = '';
  formGroup: FormGroup;

  isSaving:boolean =false;

  toggleExpanded(order:any){
   this.expanded = !this.expanded
   this.orderId=order.orderId;
  }

  programDescription!: SafeHtml;



  constructor(
    private auth: AuthService,
    private setting: SettingService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    // private messageService:MessageService,
  ) {
    this.changePasswordForm = fb.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      confirm_new_password: ['', [Validators.required]]
    });

    this.formGroup = new FormGroup({
      text: new FormControl()
  });
    this.searchForm = new FormGroup({
      searchControl: new FormControl('')
    });

    // Initialize howItWorks array first
    this.setting.getContents().then(res => {
      this.howItWorks = res.data.filter((data: any) => data.name === "HOWITWORKS");
      if (this.howItWorks.length > 0) {
        this.settingForm = fb.group({
          description: [this.howItWorks[0]?.description],
          name: [this.howItWorks[0]?.name],
          title: [this.howItWorks[0]?.title],
          id: [this.howItWorks[0]?.id],
          type: [this.howItWorks[0]?.type]
        });
      }
    });


  }


     ngOnInit() {
    this.editor = new Editor();

    console.log(this.howItWorks)

     }
     formatText(text: string): SafeHtml {
      const paragraphs = text.split('\n\n'); // Split by double newline to separate paragraphs
      const formattedParagraphs = paragraphs.map((paragraph, index) => {
        if (index === 0 || index === paragraphs.length - 1) {
          return '<strong>' + paragraph + '</strong>';
        } else {
          return paragraph;
        }
      });

      const formattedText = formattedParagraphs.join('<br><br>');
      return this.sanitizer.bypassSecurityTrustHtml(formattedText);
    }



     onChangePassword(){
       this.changePasswordForm.markAllAsTouched();

     }




     currentTab = 'general';

     customSort(event: any) {
       event.data.sort((data1:any, data2:any) => {
           let value1 = data1[event.field];
           let value2 = data2[event.field];
           let result = null;

           if (value1 == null && value2 != null) result = -1;
           else if (value1 != null && value2 == null) result = 1;
           else if (value1 == null && value2 == null) result = 0;
           else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
           else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

           return event.order * result;
       });
   }

     getSeverity (product: any) {
         switch (product.inventoryStatus) {
             case 'INSTOCK':
                 return 'success';

             case 'LOWSTOCK':
                 return 'warning';

             case 'OUTOFSTOCK':
                 return 'danger';

             default:
                 return null;
         }
     };

     editorConfig: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: '300px',
      minHeight: '0',
      maxHeight: '300px',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',

      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
      ],
      uploadUrl: 'v1/image',
      uploadWithCredentials: false,
      sanitize: true,
      toolbarPosition: 'top',
      toolbarHiddenButtons: [
        ['bold', 'italic'],
        ['fontSize']
      ]
    }


    editContent(data: any) {
      this.editingContent = true;
      console.log(data);
      this.editedContent = data.description; // Initialize with the current content
      this.settingForm.get('description')?.setValue(this.editedContent); // Set form control value
    }


    saveEditedContent() {
      this.isSaving=true;
      console.log(this.settingForm.value)
      this.setting.updateContent(this.settingForm.value).then(res=>{
        console.log(res);
        this.editingContent = false;
        this.isSaving=false;
        this.editedContent = ''; // Clear the edited content placeholder
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Success',
        //   detail: 'Content Updated Successfully!',
        // });
      },err=>{
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Error',
        //   detail: 'Something went wrong, try again!',
        // });
        console.log(err);
        this.isSaving=false;
      })
    }

    cancelEdit() {
      this.editingContent = false;
      this.editedContent = ''; // Clear the edited content placeholder
    }

    calculateTextareaRows(): number {
      const lines = this.editedContent.split('\n').length;
      const minHeight = 2; // Minimum number of rows
      return Math.max(minHeight-10, lines);
    }
 }
