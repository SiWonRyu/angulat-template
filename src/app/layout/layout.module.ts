import { NgModule } from "@angular/core";
import { LayoutRoutingModule } from './layout.routing.module';
import { LayoutPageComponent } from './pages';
import { 
  LayoutComponent,
  SideNavComponent,
} from './components';
import { CommonModule } from '@angular/common';

const COMPONENTS =[
  LayoutPageComponent,
  LayoutComponent,
  SideNavComponent
];

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule
  ],
  declarations: COMPONENTS
})
export class LayoutModule {}