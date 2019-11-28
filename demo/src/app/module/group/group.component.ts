import { Component, OnInit, OnDestroy } from '@angular/core';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { GroupMessage, UserGroup, UserDetail } from 'src/app/model/model';
import { Subscription, interval } from 'rxjs';
import { MessageService } from 'src/app/service/message-service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {
  userDetails: UserDetail;
  spinner = false;
  userGroups: UserGroup;
  selected: UserGroup;
  groupMessageList: GroupMessage[];
  message: string;
  subscription: Subscription;
  constructor(
    private api: Service,
    private url: UrlConfig,
    private messageService: MessageService
  ) { }

  /* Get group List */
  private getGroupList() {
    this.spinner = true;
    /* Get User id from logged user */
    const userId = this.api.loggedUser() ? this.api.loggedUser().id : '';
    const urlQueryString = '?userId=' + userId;
    this.api.getList(this.url.urlConfig().userGroup.concat(urlQueryString)).subscribe(groups => {
      if (groups) {
        this.spinner = false;
        this.userGroups = groups;
        const curentUserData = this.api.loggedUser();
        /* Passing the group count into header using subject subscription*/
        this.messageService.sendMessage(
          {
            name: curentUserData.name,
            id: curentUserData.id,
            gender: curentUserData.gender,
            group: groups.length
          }
        );
        this.selected = this.userGroups[0];
        this.getGroupMessage();
      }
    }, error => {
      this.spinner = false;
    });
  }

  /* set function auto call on every 10 seconds*/
  private autoCall() {
    const source = interval(10000);
    this.subscription = source.subscribe(val => this.getGroupMessage());
  }

  /* selected the group */
  public selectedGroup(group: UserGroup) {
    this.selected = group;
    this.getGroupMessage();
  }

  /* Get group message based on group and logged user */
  private getGroupMessage() {
    this.spinner = true;
    const urlQueryString = '?userId=' + this.api.loggedUser().id + '&groupId=' + this.selected.groupId;
    this.api.getList(this.url.urlConfig().groupMessage.concat(urlQueryString)).subscribe(message => {
      if (message) {
        this.spinner = false;
        this.groupMessageList = message.reverse();
      }
    }, error => {
      this.spinner = false;
    });
  }

  /* Post message */
  public postMessage() {
    if (this.message) {
      const postObj = {
        groupId: this.selected.groupId,
        username: this.api.loggedUser().name,
        date: new Date(),
        gender: this.api.loggedUser().gender,
        message: this.message
      };
      this.spinner = true;
      this.api.postCall(this.url.urlConfig().groupMessage, postObj, 'post').subscribe(message => {
        if (message) {
          this.spinner = false;
          this.getGroupMessage();
          this.message = '';
        }
      }, error => {
        this.spinner = false;
      });
    }
  }

  /* Destroy the subscribtion  */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /* On init call logged user and list of the group  */
  ngOnInit() {
    this.getGroupList();
    this.autoCall();
  }

}
