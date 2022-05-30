import { Component, OnInit } from '@angular/core';
import {UserApiService} from "../../core/api/user-api.service";

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {
  noticeContext:String = "";
  noticeList:[] =[];
  constructor(
    private readonly userApiClient: UserApiService,
  ) { }

  ngOnInit(): void {
    this.userApiClient.requestGlobal({
      uri:'/notice',
      type:'get',
    }).subscribe(result=>{
      this.noticeList = result;
      // console.log(result);
    })
  }
  onRequest(){
    if(this.noticeContext ==''){
      alert('通知内容不能为空');
      return;
    }else{
      this.userApiClient.requestGlobal({
        uri:'/notice/add',
        type:'post',
        data:{
          'noticeContext':this.noticeContext
        }
      }).subscribe(result=>{
        if(result['responseType'] == 'SUCCESS'){
          alert('notice create success');
          this.noticeContext = '';
          this.ngOnInit();
        }else{
          alert(result['message']);
        }
      })
    }
  }
}
