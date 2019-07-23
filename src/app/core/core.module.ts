import { NgModule, Optional, SkipSelf } from "@angular/core";
import { 
  NotFoundComponent 
} from './components';
import { CommonModule } from '@angular/common';

export const COMPONENTS = [
  NotFoundComponent
];

@NgModule({
  imports: [CommonModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core:CoreModule) {
    if (core) {
      throw new Error("You should import core module only in the root module");
    }
  }
}