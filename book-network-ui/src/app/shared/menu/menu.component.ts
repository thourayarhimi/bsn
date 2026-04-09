import {Component, OnInit} from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak/keycloak.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {}

  get isLoggedIn(): boolean {
    return this.keycloakService.keycloak.authenticated ?? false;
  }

  get userProfile() {
    return this.keycloakService.profile;
  }

  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout();
  }
  goToProfile() {
    this.keycloakService.profileManagment();
    }
}
