export interface User {
    firstName: string;
    email: string;
    gender: string;
    username: string;
    password: string;
    acceptTerms: boolean;
    id: number;
}
export interface CurrentUser {
    name: string;
    id: number;
    gender: string;
    group: number;
}
export interface Group {
    id: number;
    value: string;
    display: string;
}
export interface GroupMessage {
    groupId: number;
    username: string;
    gender: string;
    date: string;
    message: string;
    id: number;
}
export interface UserGroup {
    userId: number;
    groupName: string;
    groupId: number;
    id: number;
}
export interface UserDetail {
    id: number;
    name: string;
}
