import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';

import {AppServices} from '../../providers/app-services';

import { InAppBrowserPage } from '../in-app-browser/in-app-browser';
/*
  Generated class for the OrderDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-order-detail',
	templateUrl: 'order-detail.html'
})
export class OrderDetailPage {

	orderDetail: any;
	currentOrder: any;
	breakdowns: any;
	deliveryUrl: any;

    loader: any;

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public appServices: AppServices, public loadingCtrl: LoadingController) {

		this.loader = this.loadingCtrl.create({
			content: "Please wait..."
		});

		this.currentOrder = navParams.get('orderSelected');
		console.log('Current order');
		console.log(this.currentOrder);
		this.loadOrderSubDetail(this.currentOrder.Reference);
	}

	ionViewDidLoad() {
		//console.log('ionViewDidLoad OrderDetailPage');
	}

	loadOrderSubDetail(orderid: String) {
        this.loader.present();
		this.appServices.fetchOrderSubDetail(orderid)
			.subscribe((result) => {
                this.loader.dismiss();
				console.log("DeliveryDetail : ", result);
				this.orderDetail = result.Response.Header;
				this.breakdowns = result.Response.Breakdown;
				this.deliveryUrl = result.Response.DeliveryUrl;

				// this.itemsOriginal = result;
			}, (error: any) => {
                this.loader.dismiss();
				console.log("fetchOrderSubDetail error: ", error);
			});
	}

	onClickCheckDelivery() {
		console.log("OrderDetailPage onClickCheckDelivery : " + this.currentOrder.Reference + "  url: " + this.deliveryUrl);
		this.navCtrl.push(InAppBrowserPage, {
			title: this.currentOrder.Reference,
			url: this.deliveryUrl //"https://www.logisticinfotech.com"
		});
	}

}
