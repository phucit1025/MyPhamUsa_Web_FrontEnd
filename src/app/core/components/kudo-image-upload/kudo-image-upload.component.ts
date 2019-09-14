import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  HostBinding,
  Optional,
  Self,
  ElementRef,
  HostListener,
  forwardRef,
  ViewChild,
} from '@angular/core';
import { MatFormFieldControl, MatDialog, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'kudo-image-upload',
  templateUrl: './kudo-image-upload.component.html',
  styleUrls: ['./kudo-image-upload.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => KudoImageUploadComponent),
      multi: true,
    },
  ],
})
export class KudoImageUploadComponent implements OnInit, OnDestroy, ControlValueAccessor, MatFormFieldControl<string[]> {
  static nextId = 0;
  imageList: string[] = [];
  previewing: string;
  dialogRef: MatDialogRef<any>;

  @ViewChild('previewImageContent', {static: false}) previewImageContent: any;

  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'kudo-image-upload';
  private _placeholder: string;
  private _disabled: boolean;
  private _errorState: boolean;
  private _required = false;

  @HostBinding() id = `kudo-image-upload-${KudoImageUploadComponent.nextId++}`;

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return !this.disabled;
  }

  @Input() UploadText = 'Upload';
  @Input() PreviewText = 'Preview Image';
  @Input() RemoveText = 'Remove Image';

  @HostBinding('attr.aria-describedby') describedBy = '';

  @HostBinding('attr.tabindex') tabindex = 0;

  // ngModel Access
  onChange: (value: string[]) => void = () => null;
  onTouched: () => void = () => null;
  // End ngModel Access

  get empty() {
    return !this.imageList || this.imageList.length === 0;
  }

  get errorState(): boolean {
    return this._errorState;
  }
  set errorState(err: boolean) {
    this._errorState = coerceBooleanProperty(err);
    this.stateChanges.next();
  }

  @Input()
  get value(): string[] | null {
    if (this.imageList && this.imageList.length > 0) {
      return this.imageList;
    }
    return null;
  }
  set value(imageList: string[] | null) {
    this.imageList = imageList;
    this.stateChanges.next();
  }


  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(dis: boolean) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private dialog: MatDialog,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>
  ) {
    // Replace the provider from above with this.
    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
    this.fm.monitor(this.elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  showPreviewImage(image: string) {
    this.previewing = image;
    this.dialogRef = this.dialog.open(this.previewImageContent, {
      width: '70vw',
    });
  }

  @HostListener('blur')
  onBlur() {
    if (this.ngControl) {
      this._errorState = !!this.ngControl.errors;
      this.stateChanges.next();
    }
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if (!this._disabled) {
      this.elRef.nativeElement.focus();
    }
  }

  // ngModel Access
  writeValue(imageList: string[]): void {
    this.imageList = imageList;
    this.stateChanges.next();
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
    this.stateChanges.next();
  }
  // End ngModel Access

  loadImageBase64(event: any) {
    const fileList = event.target.files;
    if (fileList.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.imageList.push(reader.result.toString());
        this.onChange(this.value);
        this._errorState = !!this.ngControl.errors;
        this.stateChanges.next();
      };
      reader.readAsDataURL(fileList[0]);
    }
  }

  removeImageAt(index: number, inputFile: any) {
    if (index === this.imageList.length - 1) {
      inputFile.value = '';
    }
    this.imageList.splice(index, 1);
    this.onChange(this.value);
    this._errorState = !!this.ngControl.errors;
    this.stateChanges.next();
  }

}
