import { Injectable } from '@angular/core';
@Injectable()
export class UrlConfig {
    serverConfig = false;
    private apiHost = 'http://localhost:3000/';
    url = {};

    urlApi() {
        return this.url = {
            userLogin: this.apiHost + 'users',
            userList: this.apiHost + 'users',
            group: this.apiHost + 'groups',
            groupMessage: this.apiHost + 'groupMessage',
            userGroup: this.apiHost + 'userGroup'
        };
    }
    urlConfig() {
        return  this.urlApi() ;
    }
}
