import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginsComponent } from './plugins.component';
import { NoticeComponent } from './notice/notice.component';


@NgModule({
  declarations: [
    PluginsComponent,
    NoticeComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class PluginsModule { }
