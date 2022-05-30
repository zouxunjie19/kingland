import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth/auth.component";
import {PluginsComponent} from "./plugins/plugins.component";
import {NoticeComponent} from "./plugins/notice/notice.component";

const adminModule = () =>
  import('./admin/admin.module').then(module => module.AdminModule);
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: adminModule
  }, {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'plugins',
    children: [
      {
        path: '',
        component: PluginsComponent
      },
      {
        path:'notice',
        component:NoticeComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
