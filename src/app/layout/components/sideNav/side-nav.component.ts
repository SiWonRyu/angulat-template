import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import { SideNav } from '../../models';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent {
  @Input() userName: string | null;
  @Input() sideNav: SideNav[] = [];
  @Output() logout = new EventEmitter();

  exit() {
    this.logout.emit();
  }
}