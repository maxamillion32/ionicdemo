import { NgModule, ErrorHandler } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';


import { MyApp } from './app.component';
import { NotificationPage } from '../pages/notifications/notifications';
import { SettingPage } from '../pages/setting/setting';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { OrderDetailPage } from '../pages/order-detail/order-detail';
import { NotificationDetailPage } from '../pages/notification-detail/notification-detail';
import { AppServices } from '../providers/app-services';


import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { SafePipe } from '../shared/pipes/safe.pipe';

import { InAppBrowserPage } from '../pages/in-app-browser/in-app-browser';

@NgModule({
	declarations: [
		MyApp,
		NotificationPage,
		SettingPage,
		HomePage,
		TabsPage,
		LoginPage,
		OrderDetailPage,
		NotificationDetailPage,
		InAppBrowserPage,

		CapitalizePipe,
		SafePipe

	],
	imports: [
		IonicModule.forRoot(MyApp),
		ReactiveFormsModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		NotificationPage,
		SettingPage,
		HomePage,
		TabsPage,
		LoginPage,
		OrderDetailPage,
		NotificationDetailPage,
		InAppBrowserPage
	],
	providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
		AppServices
	]
})
export class AppModule { }
