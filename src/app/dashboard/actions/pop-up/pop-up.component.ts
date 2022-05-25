import { Router, ActivatedRoute } from '@angular/router';
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

  form1: FormGroup = new FormGroup({});
  form2: FormGroup = new FormGroup({});
  form3: FormGroup = new FormGroup({});

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form1 = new FormGroup({
      toIban: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$/
        ),
      ]),
      amount: new FormControl('€', [
        Validators.required,
        Validators.pattern(/^\€[0-9]+(\.[0-9][0-9])?$/),
      ]),
      // la causale non è obbligatoria
      description: new FormControl(null, [Validators.maxLength(2)]),
    });

    this.form2 = new FormGroup({
      toPhoneNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^([+]39)?((3[\d]{2})([ ,\-,\/]){0,1}([\d, ]{6,9}))|(((0[\d]{1,4}))([ ,\-,\/]){0,1}([\d, ]{5,10}))$/
        ),
      ]),
      amount: new FormControl('€', [
        Validators.required,
        Validators.pattern(/^\€[0-9]+(\.[0-9][0-9])?$/),
      ]),
      // la causale non è obbligatoria
      description: new FormControl(null, [Validators.maxLength(200)]),
    });

    this.form3 = new FormGroup({
      amount: new FormControl('€', [
        Validators.required,
        Validators.pattern(/^\€[0-9]+(\.[0-9][0-9])?$/),
      ]),
    });
  }

  closeEvent() {
    this.onClose.emit(true);
  }

  onSubmit() {
    if (this.form1) {
      console.log(this.form1);
      this.form1.reset();
    } else if (this.form2) {
      console.log(this.form2);
      this.form2.reset();
    } else if (this.form3) {
      console.log(this.form3);
      this.form3.reset();
    }

    this.closeEvent();
  }

  ngOnDestroy(): void {}
}
