import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { Router } from '@angular/router';
import { UserGroup, Group, UserDetail, CurrentUser } from 'src/app/model/model';
import { MessageService } from 'src/app/service/message-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  userGroups: UserGroup[];
  groupList: Group[];
  filteredList: Group[];
  spinner = false;
  userDetails: UserDetail;
  selectedGroup: Group;
  groupCount: CurrentUser;
  constructor(
    public api: Service,
    private url: UrlConfig,
    private router: Router,
    private messageService: MessageService) { }

  /* get Group list */
  private getGroupList(): void {
    this.spinner = true;
    this.api.getList(this.url.urlConfig().group).subscribe(group => {
      if (group) {
        this.spinner = false;
        this.groupList = group;
        this.filteredList = group;
        this.filterGroup();
      }
    }, error => {
      this.spinner = false;
    });
  }

  /* Navigate to group Page */
  public navigateGroupPage(): void {
    this.router.navigate(['/group']);
  }

  /* get User Group list */
  private getUserGroupList(): void {
    this.spinner = true;
    const userId = this.api.loggedUser() ? this.api.loggedUser().id : '';
    const urlQueryString = '?userId=' + userId;
    this.api.getList(this.url.urlConfig().userGroup.concat(urlQueryString)).subscribe(userGroup => {
      if (userGroup) {
        this.spinner = false;
        this.userGroups = userGroup;
        const curentUserData = this.api.loggedUser();
        /* Passing the group count into header using subject subscription*/
        this.messageService.sendMessage(
          {
            name: curentUserData.name,
            id: curentUserData.id,
            gender: curentUserData.gender,
            group: userGroup.length
          }
        );
      }
    }, error => {
      this.spinner = false;
    });
  }

  /* Filter the group which is not Added the user*/
  private filterGroup(): void {
    if (this.userGroups && this.userGroups.length) {
      const userGroup = this.userGroups;
      this.filteredList = this.groupList.filter((group: Group) => {
        return !userGroup.find((user: UserGroup) => {
          return user.groupId === group.id;
        });
      });
    }
  }

  /* Asking confirmation to join group */
  public joinGroup(data: Group) {
    this.selectedGroup = data;
    this.api.alertConfig = this.api.modalConfig('Confirm', 'Are you sure wanted to join this ' + data.display, true, ['Yes', 'No']);
  }

  /* get User Group list */
  private addGroupList(data: Group): void {
    const postObj = {
      userId: this.api.loggedUser().id,
      groupName: data.display,
      groupId: data.id,
    };
    this.spinner = true;
    this.api.postCall(this.url.urlConfig().userGroup, postObj, 'post').subscribe(group => {
      if (group) {
        this.spinner = false;
        this.api.alertConfig = this.api.modalConfig('Success', 'You are member of the ' + data.display + ' group', true, ['Ok']);
      }
    }, error => {
      this.spinner = false;
    });
  }

  /* Modal Action */
  public modalAction(action: string): void {
    if (action === 'Ok') {
      this.getUserGroupList();
      this.getGroupList();
    } else if (action === 'Yes') {
      this.addGroupList(this.selectedGroup);
    } else {
      this.api.alertConfigDefaultValue();
    }
  }

  /* On init call logged user and list of the group  */
  ngOnInit() {
    this.getUserGroupList();
    this.getGroupList();
  }

}
