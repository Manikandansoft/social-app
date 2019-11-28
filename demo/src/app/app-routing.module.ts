import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './service/auth-guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./module/member/member.module`).then(m => m.MemberModule)
  },
  {
    path: 'home',
    loadChildren: () => import(`./module/home/home.module`).then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'group',
    loadChildren: () => import(`./module/group/group.module`).then(m => m.GroupModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
