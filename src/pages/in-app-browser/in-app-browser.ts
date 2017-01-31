import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the InAppBrowser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-in-app-browser',
	templateUrl: 'in-app-browser.html'
})
export class InAppBrowserPage {

    title: String;
    url: String;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.title = navParams.get('title');
		this.url = navParams.get('url');
        console.log("InAppBrowserPage constructor", this.title, this.url);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad InAppBrowserPage');
	}

}
