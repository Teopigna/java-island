import { AuthService } from 'src/app/auth/auth.service';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent implements OnInit {
  @ViewChild('one', { static: true }) divOne: ElementRef = new ElementRef<any>(
    null
  );
  @ViewChild('two', { static: true }) divTwo: ElementRef = new ElementRef<any>(
    null
  );
  @ViewChild('three', { static: true }) divThree: ElementRef =
    new ElementRef<any>(null);
  @ViewChild('four', { static: true }) divFour: ElementRef =
    new ElementRef<any>(null);

  style: string = 'transform: translate(0)';

  userRole = '';
  userIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.authService.user.value) {
      this.userRole = this.authService.user.value?.role;
      this.userIn = true;
    }
  }

  @HostListener('mouseover', ['$event'])
  moveDivs(event: MouseEvent) {
    const x = (window.innerWidth - event.pageX) / 20;
    const y = (window.innerHeight - event.pageY) / 20;

    this.divOne.nativeElement.style.transform = `translateX(${x}px) translateY(${y}px)`;
    this.divTwo.nativeElement.style.transform = `translateX(${-x}px) translateY(${-y}px)`;
    this.divThree.nativeElement.style.transform = `translateX(${-x}px) translateY(${y}px)`;
    this.divFour.nativeElement.style.transform = `translateX(${x}px) translateY(${-y}px)`;
  }
}
