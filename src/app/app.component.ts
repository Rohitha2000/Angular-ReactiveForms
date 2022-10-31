import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResolveEnd } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ReactiveForms';
  genders= ['female', 'male']
  signupform: FormGroup;
  forbiddenusernames= ['chris', 'ana'];
  constructor(private formbuilder: FormBuilder){}
   ngOnInit(){
    this.signupform= new FormGroup({
      'userData': new FormGroup({
      'username': new FormControl(null,[Validators.required, this.forbiddenNames.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
    }),
      'gender': new FormControl('female'),
      'hobbies': new FormArray([])

    });
    // this.signupform.valueChanges.subscribe((value)=>
    // console.log(value))
    this.signupform.statusChanges.subscribe((value)=>
    console.log(value));
    this.signupform.setValue({
      'userData':{
        'username': 'user',
        'email': 'emailaddress@test.com'
      },
      'gender':'male',
      'hobbies': []
    });
   }
   onSubmit(){

    console.log(this.signupform);
    this.signupform.reset();

   }

   addHobby(){
    const control= new FormControl(null, Validators.required);
   (<FormArray>this.signupform.get('hobbies')).push(control);
   }

   forbiddenNames(control: FormControl): {[s: string]: boolean}{
   if(this.forbiddenusernames.indexOf(control.value) !== -1 ){
    return {'nameIsForbidden': true};
   }
   return null;
   }

   // asynchronous validators
   forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{
     const promise= new Promise<any>( (resolve, reject)=>{
       setTimeout(()=>{
        if(control.value === 'ro@gmail.com'){
          resolve({'emailIsForbidden': true});
        } else{
          resolve(null);
        }
       }, 1500);
     
   });
   return promise;
  }

}
