


import {Component, OnInit} from '@angular/core';

import {KeycloakService} from '../../services/keycloak/keycloak.service';

@Component({
  selector: 'app-login',
  template: ""
})
export class LoginComponent implements OnInit{

  constructor(
    private keycloakService: KeycloakService
  ) {
  }
async ngOnInit(): Promise<void> {
    await this.keycloakService.init();
    await this.keycloakService.login();
  }

 }