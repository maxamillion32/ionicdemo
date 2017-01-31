import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { LoadingController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import {AppServices} from '../../providers/app-services';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {

	loginform: FormGroup;
	errorMsg: String = "";
	username: FormControl = new FormControl("", Validators.required);
	password: FormControl = new FormControl("", Validators.required);

    loader: any;

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
        public loadingCtrl: LoadingController,
		public appServices: AppServices,
		private fb: FormBuilder,
		public alertCtrl: AlertController) {

		this.loader = this.loadingCtrl.create({
			content: "Please wait..."
		});
		// ['', Validators.compose([Validators.minLength(3),Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
		this.loginform = fb.group({
			"username": this.username,
			"password": this.password
		});

		this.loginform.valueChanges
			.subscribe(data => this.onValueChanged(data));

		this.onValueChanged(); // (re)set validation messages now
	}

	ionViewDidLoad() {
		console.log(window.localStorage.getItem('islogin'));

		if (window.localStorage.getItem('islogin') == '1') {
			this.navCtrl.setRoot(TabsPage);
		}
	}


	onClickLogin() {

        if(!this.loginform.valid) {
            return;
        }

        this.loader.present();
		this.appServices.checkLogin(this.loginform.value.username, this.loginform.value.password)
			.subscribe((result) => {
                this.loader.dismiss();
				console.log("Login response : ", result);
				if (result.Code == 0) {
					window.localStorage.setItem('islogin', '1');
					// cordova.plugins.Keyboard.close();
					this.navCtrl.setRoot(TabsPage);
				}
				else {
					console.log("");
					this.showAlert();
				}
			}, (error: any) => {
                this.loader.dismiss();
				console.log("checkLogin error: ", error);
				this.showAlert();
			});
	}


	showAlert() {
		let alert = this.alertCtrl.create({
			title: 'Error!',
			subTitle: 'Please Enter Correct Username and Password',
			buttons: ['OK']
		});
		alert.present();
	}

	onValueChanged(data?: any) {

		if (!this.loginform) {
			return;
		}

		const form = this.loginform;

		for (const field in this.formErrors) {
			this.formErrors[field] = '';
			const control = form.get(field);
			if (control && control.dirty && !control.valid) {
				const messages = this.validationMessages[field];
				for (const key in control.errors) {
					this.formErrors[field] += messages[key] + ' ';
				}
			}
		}
	}

	formErrors = {
		'username': '',
		'password': ''
	};

	logForm() {
		console.log(this.loginform.value)
	}

	validationMessages = {
		'username': {
			'required': 'Userame is required.',
			'minlength': 'Name must be at least 4 characters long.',
			'maxlength': 'Name cannot be more than 24 characters long.',
			'forbiddenName': 'Someone named "Bob" cannot be a hero.'
		},
		'password': {
			'required': 'Password is required.'
		}
	};


}
