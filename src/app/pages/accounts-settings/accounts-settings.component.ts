import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-accounts-settings',
  templateUrl: './accounts-settings.component.html',
  styles: []
})
export class AccountsSettingsComponent implements OnInit {


  constructor( public _ajustes: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any) {
    this.aplicarCheck( link );
    // Asigna el color del tema.
    this._ajustes.aplicarTema( tema );

  }

  aplicarCheck( link: any) {
    const selectores: any = document.getElementsByClassName('selector');

    for ( const ref of selectores) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck() {
    const selectores: any = document.getElementsByClassName('selector');

    const tema = this._ajustes.ajustes.tema;
    for ( const ref of selectores) {
      if (tema === ref.getAttribute('data-theme') ) {
        ref.classList.add('working');
        break;
      }
    }



  }

}
