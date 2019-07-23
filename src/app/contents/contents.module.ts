import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsRoutingModule } from './contents-routing.module';
import { 
  ContentsPageComponent,
  CollectionPageComponent,
  SearchPageComponent,
} from './pages';

import {
  ContentHeaderComponent,
  ContentLayoutComponent,
  CollectionListComponent,
  BookCardComponent,
  SearchBoxComponent,
  SearchLayoutComponent,
} from './components';

import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects, CollectionEffects } from './effects';

const COMPONENTS = [
  ContentsPageComponent,
  ContentHeaderComponent,
  ContentLayoutComponent,
  CollectionPageComponent,
  CollectionListComponent,
  BookCardComponent,
  SearchLayoutComponent,
  SearchPageComponent,
  SearchBoxComponent
];


@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    ContentsRoutingModule,
    StoreModule.forFeature('books', reducers),
    EffectsModule.forFeature([
      BookEffects,
      CollectionEffects
    ])
  ]
})
export class ContentsModule { }
