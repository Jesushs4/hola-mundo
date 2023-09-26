import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  users= [
    {
      nombre:'jesús',
      apellidos:'Herrera Sánchez',
      edad:19,
    },
    {
      nombre:'Denisa',
      apellidos:'Belean',
      edad:18,
    },
    {
      nombre:'Marco',
      apellidos:'Valente',
      edad:30,
    },
    {
      nombre:'Adrián',
      apellidos:'perejil',
      edad:89,
    },
    {
      nombre:'Elena',
      apellidos:'Nito Feliz',
      edad:26,
    }
  ]

  constructor() {}

}
