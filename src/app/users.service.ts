import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './home/user';

export class UserNotFoundException extends Error {
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _users:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public users$:Observable<User[]>=this._users.asObservable();

  constructor() { }

  public getAll():Observable<User[]> {
    return new Observable(observer=>{
      var users:User[] = [
        {id: 1,nombre:'jesús',apellidos:'Herrera Sánchez',edad:19,fav:true,},
        {id: 2,nombre:'Denisa',apellidos:'Belean',edad:18,fav:false,},
        {id: 3,nombre:'Marco',apellidos:'Valente',edad:30,fav:false,},
        {id: 4,nombre:'Adrián',apellidos:'perejil',edad:89,fav:true,},
        {id: 5,nombre:'Elena',apellidos:'Nito Feliz',edad:26,fav:false,}
      ];
      this._users.next(users);
      observer.next(users);
      observer.complete();  
    })
  }

  public getUser(id:number):Observable<User> {
    return new Observable(observer=>{
      var user = this._users.value.find(user=>user.id==id);
      if (user) {
        observer.next(user);
      } else {
        observer.error(new UserNotFoundException)
      }
      observer.complete();
    })
  }

  public updateUser(user:User):Observable<User> {
    return new Observable(observer=> {
    var _users = [...this._users.value]
    var index = _users.findIndex(us=>user.id==us.id);
    if (index!=-1) {
      _users[index] = user;
      observer.next(user);
      this._users.next(_users);
    } else {
      observer.error(new UserNotFoundException);
    }
  })
  }

  public deleteUser(user:User):Observable<User> {
    return new Observable(observer=> {
      var _users = [...this._users.value]
      var index = _users.findIndex(us=>user.id==us.id);
      if (index!=-1) {
        _users= [..._users.slice(0, index),..._users.slice(index+1)];
        this._users.next(_users);
        observer.next(user);
      } else {
        observer.error(new UserNotFoundException);
      }
      observer.complete();
    })
  }

}
