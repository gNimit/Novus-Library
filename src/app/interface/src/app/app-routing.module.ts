import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContributeComponent } from './pages/contribute/contribute.component';
import { LibraryComponent } from './pages/library/library.component';

import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [

  { path: '', component: SearchComponent},
  { path: 'library', component: LibraryComponent},
  { path: 'contribute', component: ContributeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
