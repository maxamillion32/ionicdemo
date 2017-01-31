import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the NotificationDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-notification-detail',
	templateUrl: 'notification-detail.html'
})
export class NotificationDetailPage {

	currentNotification: any;
	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.currentNotification = navParams.get('selectedNotification');
		console.log('Current notification');
		console.log(this.currentNotification);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad NotificationDetailPage');
	}

}
