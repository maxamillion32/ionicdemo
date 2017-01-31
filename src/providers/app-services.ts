import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
//import 'rxjs/Rx';  // use this line if you want to be lazy, otherwise:
import 'rxjs/add/operator/do';  // debug


/*
  Generated class for the AppServices provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppServices {

    serviceUrl: String = "http://jordannsnow.com/3plcentral/";

	constructor(public http: Http) {
		//console.log('Hello AppServices Provider');
	}

	checkLogin(username: String, password: String) {
		return this.http.get(this.serviceUrl + 'login.php?username=' + username + '&password=' + password)
			.map((res: Response) => {
				let body = res.json();
				console.log(body);
				return body;
				//return this.user;

			})
			.catch(this.handleError);
	}

	fetchUserSetting() {
		return this.http.get(this.serviceUrl + 'settings.php')
			.map((res: Response) => {
				let body = res.json();
				//console.log(body);
				return body;
				//return this.user;

			})
			.catch(this.handleError);
	}

	fetchOrderList(filter: String) {
		return this.http.get(this.serviceUrl + 'home.php?filter=' + filter)
			.map((res: Response) => {
				let body = res.json();
				//console.log(body);
				return body;
				//return this.user;

			})
			.catch(this.handleError);
	}

	fetchOrderSubDetail(id: String) {
		return this.http.get(this.serviceUrl + 'ordersub.php?id=' + id)
			.map((res: Response) => {
				let body = res.json();
				//console.log(body);
				return body;
				//return this.user;

			})
			.catch(this.handleError);
	}

	fetchNotificationList() {
		return this.http.get(this.serviceUrl + 'notifications.php')
			.map((res: Response) => {
				let body = res.json();
				//console.log(body);
				return body;
				//return this.user;

			})
			.catch(this.handleError);
	}

	handleError(error: any) {
		console.log("error", error);
		return Observable.throw(error.json().error || 'Server error');
	}
}
