import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-contents-page',
  templateUrl: './contents-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentsPageComponent {

  headerInfo: any;
  
  constructor(private route: ActivatedRoute, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(_ => this.headerInfo = this.route.snapshot.firstChild.data);
  }

}
