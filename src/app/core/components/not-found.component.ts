import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: 'app-not-found',
  template: '<h1>Not Found Page</h1>',
  styles: [`:host { text-align: center; }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
