import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import {AppServices} from '../../providers/app-services';

import { NotificationDetailPage } from '../notification-detail/notification-detail';

@Component({
	selector: 'page-notifications',
	templateUrl: 'notifications.html'
})
export class NotificationPage {

	notifications: any;

    loader: any;

	constructor(public navCtrl: NavController,
		public appServices: AppServices, public loadingCtrl: LoadingController) {
		this.loader = this.loadingCtrl.create({
			content: "Please wait..."
		});

		this.loadNotifications();
	}

	onClickNotification(notification: string) {
		console.log("Selected Notification:", notification);
		this.navCtrl.push(NotificationDetailPage, {
            selectedNotification: notification,
		});
	}


	loadNotifications() {
        this.loader.present();
		this.appServices.fetchNotificationList()
			.subscribe((result) => {
                this.loader.dismiss();
				console.log("NotificatinList : ", result);
				this.notifications = result.Response.Notifications;
				// this.itemsOriginal = result;
			}, (error: any) => {
                this.loader.dismiss();
				console.log("fetchNotificationList error: ", error);
			});
	}

}
