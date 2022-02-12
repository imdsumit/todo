import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { ItemsComponent } from './items/items.component';

const routes: Routes = [
  { path: 'items', component: ItemsComponent},
    //children:[
      { path: 'items/add', component: ItemDetailComponent },
      { path: 'items/edit/:id', component: ItemDetailComponent },
    //] },

    // otherwise redirect to home
    //{ path: '**', redirectTo: 'items' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
