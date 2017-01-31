import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { LoginPage } from '../login/login';

import {AppServices} from '../../providers/app-services';

@Component({
	selector: 'page-setting',
	templateUrl: 'setting.html'
})

export class SettingPage {

	language: String = "english";
	languages: any;

    loader: any;

	constructor(private _app: App, public navCtrl: NavController,
		public appServices: AppServices, public loadingCtrl: LoadingController) {

		this.loader = this.loadingCtrl.create({
			content: "Please wait..."
		});

		this.navCtrl = navCtrl;
		this.fetchUserSetting();
	}

	onClickLogout() {
		// this.navCtrl.setRoot(LoginPage);
		window.localStorage.setItem('islogin', '0');
		const root = this._app.getRootNav();
		root.setRoot(LoginPage);
	}

	fetchUserSetting() {

        this.loader.present();
		this.appServices.fetchUserSetting()
			.subscribe((result) => {
                this.loader.dismiss();
				console.log("Userlist : ", result);
				if (result.Code == 0) {
					this.language = result.Response.Language;
					this.languages = result.Response.LanaguageOptions;
					console.log("Selected language : ", this.language);
					console.log("Language Options : ", this.languages);
				}
			}, (error: any) => {
                this.loader.dismiss();
				console.log("fetchUserSetting error: ", error);
			});
	}

}
