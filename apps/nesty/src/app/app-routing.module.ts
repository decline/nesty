import { AuthGuard } from '@angular-nest/auth/data-access';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

export const authRootPath = 'auth';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth',
      },
      {
        path: 'foo',
        component: NotFoundComponent,
      },
    ],
  },
  {
    path: authRootPath,
    loadChildren: () => import('@angular-nest/auth/feature').then((m) => m.AuthFeatureModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
