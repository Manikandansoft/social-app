import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  spinner = false;
  constructor(
    private fb: FormBuilder,
    public api: Service,
    private url: UrlConfig,
    private router: Router
  ) { }
  private createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  /*  Access to form fields */
  get login() { return this.loginForm.controls; }

  /* Login */
  public onClickSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const urlString = '?username=' + this.loginForm.value.username +
        '&password=' + this.loginForm.value.password;
      this.spinner = true;
      /* Api call*/
      this.api.getList(this.url.urlConfig().userLogin.concat(urlString)).subscribe(user => {
        if (user.length) {
          const userDetails = {
            name: user[0].firstName,
            id: user[0].id,
            gender: user[0].gender,
            group: 0
          };
          /* Stored the user details in session storage */
          sessionStorage.setItem('currentUser', JSON.stringify(userDetails));
          this.router.navigate(['/home']);
          this.spinner = false;
        } else {
          this.api.alertConfig = this.api.modalConfig('Error', 'Username/Password is not valid', true, ['Ok']);
          this.spinner = false;
        }
      },
        error => {
          this.spinner = false;
        });
    }
  }
  /* Modal Action */
  public modalAction(action: string): void {
    if (action === 'Ok') {
      this.api.alertConfigDefaultValue();
    }
  }

  /* Oninit call */
  ngOnInit() {
    /* Check whether login/not */
    if (!this.api.validUser()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/home']);
    }
    /* Call the form creation while on component initiation */
    this.createForm();
  }

}
