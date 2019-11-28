import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/service/message-service';
import { CurrentUser } from 'src/app/model/model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  userDetails: CurrentUser;
  toggleFlag = false;
  constructor(
    private router: Router,
    private messageService: MessageService) { }

  /* Get loggged user details from subject subscription */
  private getLoginUser(): void {
    // subscribe to home component messages
    this.subscription = this.messageService.getMessage().subscribe(userData => {
      if (userData) {
        this.userDetails = userData;
      } else {
        this.userDetails = {
          name: null,
          id: null,
          gender: null,
          group: null
        };
      }
    });
  }
  /* Navigate to group page */
  public navigateGroupPage() {
    if (this.userDetails.group) {
      this.router.navigate(['/group']);
    }
  }
  /* toggle function while mobile view */
  public toggle(): void {
    this.toggleFlag = !this.toggleFlag;
  }
  /* logout */
  public logout(): void {
    sessionStorage.clear();
    this.messageService.clearMessages();
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    this.getLoginUser();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
