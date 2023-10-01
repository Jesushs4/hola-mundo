import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { UserInfoFavClicked } from './user-info/user-info-fav-clicked';
import { ToastController, ToastOptions } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  private _users:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  users$:Observable<User[]>=this._users.asObservable();
  
  users= [
    {
      id: 1,
      nombre:'jesús',
      apellidos:'Herrera Sánchez',
      edad:19,
      fav:true,
    },
    {
      id: 2,
      nombre:'Denisa',
      apellidos:'Belean',
      edad:18,
      fav:false,
    },
    {
      id: 3,
      nombre:'Marco',
      apellidos:'Valente',
      edad:30,
      fav:false,
    },
    {
      id: 4,
      nombre:'Adrián',
      apellidos:'perejil',
      edad:89,
      fav:true,
    },
    {
      id: 5,
      nombre:'Elena',
      apellidos:'Nito Feliz',
      edad:26,
      fav:false,
    }
  ]
  

  public onFavClicked(user:User, event:UserInfoFavClicked) {
    const users = [...this._users.value];
    var index = users.findIndex((_user)=>_user.id == user.id);
    
    if (index!=-1) {
      users[index].fav = event.fav??false;
      this._users.next([...users]);
    }
    const options:ToastOptions = {
      message:`User ${event.fav?'added':'removed'} ${event.fav?'to':'from'} favourites`,
      duration:1000,
      position:'bottom',
      color: event.fav?'success':'danger',
      cssClass:'fav-icon-toast' 
    };
  
    this.toast.create(options).then(toast => toast.present());

  }


 
  
  constructor(
  private toast: ToastController
  ) {}

  ngOnInit():void {
    setTimeout(() => {
      this._users.next(this.users);
    }, 1000);
  }
}
