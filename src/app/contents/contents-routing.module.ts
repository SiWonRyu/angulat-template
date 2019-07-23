import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { 
  ContentsPageComponent,
  CollectionPageComponent 
} from './pages';
import { SearchPageComponent } from './pages/search-page/search-page.component';

const routes: Routes = [
  { path: '', 
    component: ContentsPageComponent,
    children: [
      { 
        path: 'collection',
        component: CollectionPageComponent,
        data: { title: 'Book Collection' }
      },
      {
        path: 'search',
        component: SearchPageComponent,
        data: { title: 'Book Search '}
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentsRoutingModule { }
