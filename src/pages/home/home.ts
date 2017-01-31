import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import {AppServices} from '../../providers/app-services';

import { OrderDetailPage } from '../order-detail/order-detail';


@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})


export class HomePage {

	sortedBy: String = "all";
	sortOptions: any;
	orderList: any;
	originalOrderList: any;

    loader: any;

	constructor(public navCtrl: NavController,
		public appServices: AppServices, public loadingCtrl: LoadingController) {

        this.loader = this.loadingCtrl.create({
			content: "Please wait..."
		});

		this.fetchOrderList();
	}

	fetchOrderList() {
        this.loader.present();
		this.appServices.fetchOrderList("all")
			.subscribe((result) => {
                this.loader.dismiss();
				console.log("Orderlist : ", result);
				if (result.Code == 0) {
					this.sortOptions = result.Response.Filters;
					this.orderList = result.Response.List;
					this.originalOrderList = result.Response.List;
				}
			}, (error: any) => {
                this.loader.dismiss();
				console.log("fetchOrderList error: ", error);
			});
	}

	onOrderClick(order: string) {
		console.log("Selected order: ", order);
		this.navCtrl.push(OrderDetailPage, {
            orderSelected: order,
		});
	}

	onFilterChange(selectedValue) {
		console.log(selectedValue);

		let val = selectedValue;

		if (val == "all") {
			this.orderList = this.originalOrderList;
			return;
		}

		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
			this.orderList = this.originalOrderList.filter((item) => {
				return (item.Status.toLowerCase().indexOf(val.toLowerCase()) > -1);
			})
		}

	}

}
