import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserInfoFavClicked } from 'src/app/home/user-info/user-info-fav-clicked';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent  implements OnInit {
  @Input() user?: {
    id: number;
    nombre: string;
    apellidos: string;
    edad: number;
    fav: boolean;
    
  }

  

  @Output() onFavClicked:EventEmitter<UserInfoFavClicked> = new EventEmitter<UserInfoFavClicked>();
  @Output() onDeleteClicked:EventEmitter<void> = new EventEmitter<void>();

  
  
  
  constructor() { }

  ngOnInit() {}


    onFavClick(event:any) {
    this.onFavClicked.emit({
      fav:!(this.user?.fav??false)
    });
    event.stopPropagation();
    event.preventDefault();
  }

  onDeleteClick(event:any) {
    this.onDeleteClicked.emit();
    event.stopPropagation();
    event.preventDefault();
  }

}
