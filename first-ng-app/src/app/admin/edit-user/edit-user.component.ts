import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserApiService} from "../../core/api/user-api.service";
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {filter, Subscription} from "rxjs";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  formDisabled: boolean = true;
  pageType: String = '';
  requestId: number | undefined;

  public subscription?:Subscription;
  public subPassword?:Subscription;
  constructor(private readonly formBuilder: FormBuilder,
              private readonly userApiClient: UserApiService,
              private readonly router: Router,
              private activeRoute:ActivatedRoute
              ) {

    this.registerForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        name: ['', Validators.required],
        gender: [1, Validators.required],
        birthday: ['', Validators.required],
        phoneNum: ['', Validators.required],
        homeAddress: ['', Validators.required],
        password: [''],
        confirmPassword: [''],
        isAdmin: [false, Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {disable: this.formDisabled}
    );
    this.subscription = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((data)=>{
      let uriParams = this.activeRoute.snapshot.queryParams;
      if(uriParams.hasOwnProperty('type')){
        if(uriParams['type'] == 'new'){
          this.registerForm.controls['password'].setValidators([Validators.required,Validators.minLength(6)]);
          this.registerForm.controls['confirmPassword'].setValidators(Validators.required);
        }
        this.pageType = uriParams['type'];
      }
      this.onReset();
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
  registerForm: FormGroup;
  submitted = false;
  passwordLength:number = 0;

  genderOpts = [{label: 'Male', value: 1}, {label: 'Female', value: 2}, {label: 'Other', value: 3}];
  ngOnDestroy(){
    this.subscription && this.subscription.unsubscribe();
  }
  ngOnInit() {
    // loading existing user data by given id
    let uriParams = this.activeRoute.snapshot.queryParams;
    if(!uriParams.hasOwnProperty('type') || uriParams['type'] === undefined){
      alert('error type null');
      return;
    }
    let userId = (uriParams['id'] === undefined ? undefined:uriParams['id']),pageType: String = this.pageType = uriParams['type'];
    switch (pageType){
      case 'edit':
      case 'new':
        this.formDisabled = false;
        break;
      case 'view':
        break;
      default:
        alert('find type error');
    }
    if(userId !== undefined && pageType !=='new'){
      this.userApiClient.getUserById(+userId).subscribe(user => {
        this.registerForm.patchValue(user);
        this.registerForm.controls['birthday'].setValue(new Date(user.birthday));
        this.requestId = userId;
        if(pageType == 'view') this.registerForm.disable();
        if(pageType == 'edit'){
          this.registerForm.controls['password'].setValue('');
          this.registerForm.controls['confirmPassword'].setValue('');
          if(this.pageType === 'edit'){
            this.subPassword = this.registerForm.get('password')?.valueChanges.subscribe((data)=>{
              if(data != null){
                if(data.length > 0){
                  this.registerForm.controls['password'].setValidators(Validators.minLength(6));
                }
                this.passwordLength = data.length;
              }
            })
          }
        }
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.controls[key].markAsDirty();
      });
      this.registerForm.updateValueAndValidity();
      return;
    }
    if(this.requestId !=undefined){
      this.userApiClient.update(this.requestId,this.registerForm.value).subscribe((result) => {
        if(result['responseType'] == 'SUCCESS'){
          alert('User update success');
        }else{
          alert(result['message']);
        }
      });
    }else{
      this.userApiClient.create(this.registerForm.value).subscribe((result) => {
        if(result['responseType'] == 'SUCCESS'){
          alert('User create success');
        }else{
          alert(result['message']);
        }
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
    this.requestId = undefined;
    this.subPassword && this.subPassword.unsubscribe();
  }

}
