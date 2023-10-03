import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { UserInfoFavClicked } from './user-info/user-info-fav-clicked';
import { ToastController, ToastOptions } from '@ionic/angular';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  





 public load:boolean = false;
  
  constructor(
  private toast: ToastController,
  public users:UsersService,
  ) {}

  ngOnInit():void {
    this.load = true;
    this.users.getAll().subscribe(users=>{this.load=false});
  }

  public onFavClicked(user:User, event:UserInfoFavClicked) {
    var _user:User = {...user};
    _user.fav = event.fav??false;
    this.users.updateUser(_user).subscribe(
      {next: user=>{
      const options:ToastOptions = {
        message:`User ${event.fav?'added':'removed'} ${event.fav?'to':'from'} favourites`,
        duration:1000,
        position:'bottom',
        color: event.fav?'success':'danger',
        cssClass:'fav-icon-toast' 
      };
    
      this.toast.create(options).then(toast => toast.present());
    },
    error: err=>{console.log(err);}
    })



  }

}
