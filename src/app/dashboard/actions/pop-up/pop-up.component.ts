import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
})
export class PopUpComponent implements OnInit, OnDestroy {
  @Input() action: string = '';
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();

  form: FormGroup = new FormGroup({});

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      toIban: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$/
          // PHONE NUMBER VAIDATOR:
          // /^([+]39)?((3[\d]{2})([ ,\-,\/]){0,1}([\d, ]{6,9}))|(((0[\d]{1,4}))([ ,\-,\/]){0,1}([\d, ]{5,10}))$/
        ),
      ]),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\$[0-9]+(\.[0-9][0-9])?$/),
      ]),
      // la causale non è obbligatoria
      description: new FormControl(null, [Validators.maxLength(2)]),
    });
  }

  closeEvent() {
    this.onClose.emit(true);
  }

  onSubmit() {
    console.log(this.form);
    this.form.reset();
  }

  ngOnDestroy(): void {}
}
