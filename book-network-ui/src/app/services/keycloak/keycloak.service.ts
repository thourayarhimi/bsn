import {Injectable} from '@angular/core';
import Keycloak from 'keycloak-js';
import {UserProfile} from './user-profile';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;


  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://57.129.114.49:9090',
        realm: 'book-social-network',
        clientId: 'bsn'
      });
    }
    return this._keycloak;
  }

  private _profile: UserProfile | undefined;

  get profile(): UserProfile | undefined {
    return this._profile;
  }

 constructor(){ }
  async init() {
    const authenticated = await this.keycloak?.init({
      onLoad: 'login-required',
      checkLoginIframe: false 
    });

    if (authenticated) {
      this._profile = (await this.keycloak?.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak?.token ;
    }
  }

  login() {
    return this.keycloak?.login();
  }

  logout() {
    return this.keycloak?.logout();
  }
  profileManagment() {
    return this.keycloak?.accountManagement();
  }
}
