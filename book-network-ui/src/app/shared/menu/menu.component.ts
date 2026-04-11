import {Component, OnDestroy, OnInit} from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak/keycloak.service';






import {ToastrService} from 'ngx-toastr';



import {Notification}  from './Notification'
import { Stomp } from '@stomp/stompjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit , OnDestroy {

  socketClient: any = null;


  private notificationSubscription: any;


  unreadNotificationsCount = 0;


  notifications: Array<Notification> = [];

  constructor(private keycloakService: KeycloakService,private toastService: ToastrService) {}
 

  ngOnInit(): void {
    if (this.keycloakService.keycloak.tokenParsed?.sub) {



      let ws = new WebSocket('http://57.129.114.49:8088/api/v1/ws');


      this.socketClient = Stomp.over(ws);


      this.socketClient.connect({'Authorization': 'Bearer ' + this.keycloakService.keycloak.token}, () => {


          this.notificationSubscription = this.socketClient.subscribe(


            `/user/${this.keycloakService.keycloak.tokenParsed?.sub}/notifications`,


            (message: any) => {


              const notification = JSON.parse(message.body);


              if (notification) {


                this.notifications.unshift(notification);


                switch (notification.status) {


                  case 'BORROWED':


                    this.toastService.info(notification.message, notification.bookTitle);


                    break;


                  case 'RETURNED':


                    this.toastService.warning(notification.message, notification.bookTitle);


                    break;


                  case 'RETURN_APPROVED':


                    this.toastService.success(notification.message, notification.bookTitle);


                    break;


                }


                this.unreadNotificationsCount++;


              }








            }, () => {


              console.error('Error while connecting to webSocket');


            });

        })


  }
}

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

    



  ngOnDestroy() {
    if (this.socketClient !== null) {
      if (this.notificationSubscription) {
        this.notificationSubscription.unsubscribe();
      }
      this.socketClient.disconnect();
      this.socketClient = null;
    }
  }
}
