const routes = [
	{
		path: '/component/cell',
		component: () => import('./demos/Cell.vue').then(m => m.default)
	},
	{
		path: '/css/1px',
		component: () => import('./demos/OnePx.vue').then(m => m.default)
	},
	{
		path: '/component/actionsheet',
		component: () => import('./demos/Actionsheet.vue').then(m => m.default)
	},
	{
		path: '/component/x-switch',
		component: () => import('./demos/XSwitch.vue').then(m => m.default)
	},
	{
		path: '/component/x-address',
		component: () => import('./demos/XAddress.vue').then(m => m.default)
	},
	{
		path: '/component/popup',
		component: () => import('./demos/Popup.vue').then(m => m.default)
	},
	{
		path: '/component/picker',
		component: () => import('./demos/Picker.vue').then(m => m.default)
	},
	{
		path: '/component/popup-picker',
		component: () => import('./demos/PopupPicker.vue').then(m => m.default)
	},
	{
		path: '/component/alert',
		component: () => import('./demos/Alert.vue').then(m => m.default)
	},
	{
		path: '/component/x-dialog',
		component: () => import('./demos/XDialog.vue').then(m => m.default)
	},
	{
		path: '/component/badge',
		component: () => import('./demos/Badge.vue').then(m => m.default)
	},
	{
		path: '/component/button-tab',
		component: () => import('./demos/ButtonTab.vue').then(m => m.default)
	},
	{
		path: '/component/checker',
		component: () => import('./demos/Checker.vue').then(m => m.default)
	},
	{
		path: '/component/x-circle',
		component: () => import('./demos/XCircle.vue').then(m => m.default)
	},
	{
		path: '/component/radio',
		component: () => import('./demos/Radio.vue').then(m => m.default)
	},
	{
		path: '/component/demo',
		component: () => import('./demos/Demo.vue').then(m => m.default)
	},
	{
		path: '/component/confirm',
		component: () => import('./demos/Confirm.vue').then(m => m.default)
	},
	{
		path: '/component/blur',
		component: () => import('./demos/Blur.vue').then(m => m.default)
	},
	{
		path: '/component/calendar',
		component: () => import('./demos/Calendar.vue').then(m => m.default)
	},
	{
		path: '/component/x-number',
		component: () => import('./demos/XNumber.vue').then(m => m.default)
	},
	{
		path: '/component/tabbar',
		component: () => import('./demos/Tabbar.vue').then(m => m.default)
	},
	{
		path: '/component/tab',
		component: () => import('./demos/Tab.vue').then(m => m.default)
	},
	{
		path: '/component/swiper',
		component: () => import('./demos/Swiper.vue').then(m => m.default)
	},
	{
		path: '/component/scroller',
		component: () => import('./demos/Scroller.vue').then(m => m.default)
	},
	{
		path: '/component/pulldown',
		component: () => import('./demos/Pulldown.vue').then(m => m.default)
	},
	{
		path: '/component/pullup',
		component: () => import('./demos/Pullup.vue').then(m => m.default)
	},
	{
		path: '/component/pulldown-pullup',
		component: () =>
			import('./demos/PulldownPullup.vue').then(m => m.default)
	},
	{
		path: '/component/toast',
		component: () => import('./demos/Toast.vue').then(m => m.default)
	},
	{
		path: '/component/reddot',
		component: () => import('./demos/Reddot.vue').then(m => m.default)
	},
	{
		path: '/component/divider',
		component: () => import('./demos/Divider.vue').then(m => m.default)
	},
	{
		path: '/component/checklist',
		component: () => import('./demos/Checklist.vue').then(m => m.default)
	},
	{
		path: '/component/issue702',
		component: () => import('./demos/Issue702.vue').then(m => m.default)
	},
	{
		path: '/component/selector',
		component: () => import('./demos/Selector.vue').then(m => m.default)
	},
	{
		path: '/component/panel',
		component: () => import('./demos/Panel.vue').then(m => m.default)
	},
	{
		path: '/component/inline-calendar',
		component: () =>
			import('./demos/InlineCalendar.vue').then(m => m.default)
	},
	{
		path: '/component/datetime',
		component: () => import('./demos/Datetime.vue').then(m => m.default)
	},
	{
		path: '/component/range',
		component: () => import('./demos/Range.vue').then(m => m.default)
	},
	{
		path: '/component/rater',
		component: () => import('./demos/Rater.vue').then(m => m.default)
	},
	{
		path: '/component/x-button',
		component: () => import('./demos/XButton.vue').then(m => m.default)
	},
	{
		path: '/component/x-input',
		component: () => import('./demos/XInput.vue').then(m => m.default)
	},
	{
		path: '/component/x-textarea',
		component: () => import('./demos/XTextarea.vue').then(m => m.default)
	},
	{
		path: '/component/loading',
		component: () => import('./demos/Loading.vue').then(m => m.default)
	},
	{
		path: '/component/popover',
		component: () => import('./demos/Popover.vue').then(m => m.default)
	},
	{
		path: '/component/countup',
		component: () => import('./demos/Countup.vue').then(m => m.default)
	},
	{
		path: '/component/countdown',
		component: () => import('./demos/Countdown.vue').then(m => m.default)
	},
	{
		path: '/component/clocker',
		component: () => import('./demos/Clocker.vue').then(m => m.default)
	},
	{
		path: '/component/flexbox',
		component: () => import('./demos/Flexbox.vue').then(m => m.default)
	},
	{
		path: '/component/icon',
		component: () => import('./demos/Icon.vue').then(m => m.default)
	},
	{
		path: '/component/card',
		component: () => import('./demos/Card.vue').then(m => m.default)
	},
	{
		path: '/component/previewer',
		component: () => import('./demos/Previewer.vue').then(m => m.default)
	},
	{
		path: '/component/x-progress',
		component: () => import('./demos/XProgress.vue').then(m => m.default)
	},
	{
		path: '/component/sticky',
		component: () => import('./demos/Sticky.vue').then(m => m.default)
	},
	{
		path: '/component/search',
		component: () => import('./demos/Search.vue').then(m => m.default)
	},
	{
		path: '/component/search-static',
		component: () => import('./demos/SearchStatic.vue').then(m => m.default)
	},
	{
		path: '/component/spinner',
		component: () => import('./demos/Spinner.vue').then(m => m.default)
	},
	{
		path: '/component/timeline',
		component: () => import('./demos/Timeline.vue').then(m => m.default)
	},
	{
		path: '/component/step',
		component: () => import('./demos/Step.vue').then(m => m.default)
	},
	{
		path: '/component/x-header',
		component: () => import('./demos/XHeader.vue').then(m => m.default)
	},
	{
		path: '/component/qrcode',
		component: () => import('./demos/Qrcode.vue').then(m => m.default)
	},
	{
		path: '/component/masker',
		component: () => import('./demos/Masker.vue').then(m => m.default)
	},
	{
		path: '/component/close',
		component: () => import('./demos/Close.vue').then(m => m.default)
	},
	{
		path: '/component/center',
		component: () => import('./demos/Center.vue').then(m => m.default)
	},
	{
		path: '/component/x-img',
		component: () => import('./demos/XImg.vue').then(m => m.default)
	},
	{
		path: '/component/wechat-emotion',
		component: () =>
			import('./demos/WechatEmotion.vue').then(m => m.default)
	},
	{
		path: '/component/color-picker',
		component: () => import('./demos/ColorPicker.vue').then(m => m.default)
	},
	{
		path: '/component/form-preview',
		component: () => import('./demos/FormPreview.vue').then(m => m.default)
	},
	{
		path: '/component/load-more',
		component: () => import('./demos/LoadMore.vue').then(m => m.default)
	},
	{
		path: '/component/scroller-full',
		component: () => import('./demos/ScrollerFull.vue').then(m => m.default)
	},
	{
		path: '/component/scroller-header',
		component: () =>
			import('./demos/ScrollerHeader.vue').then(m => m.default)
	},
	{
		path: '/component/grid',
		component: () => import('./demos/Grid.vue').then(m => m.default)
	},
	{
		path: '/component/group',
		component: () => import('./demos/Group.vue').then(m => m.default)
	},
	{
		path: '/component/view-box',
		component: () => import('./demos/ViewBox.vue').then(m => m.default)
	},
	{
		path: '/',
		component: () => import('./demos/Home.vue').then(m => m.default)
	},
	{
		path: '/demo',
		component: () => import('./demos/Demo.vue').then(m => m.default)
	},
	{
		path: '/component/format-time',
		component: () => import('./demos/FormatTime.vue').then(m => m.default)
	},
	{
		path: '/component/uploader',
		component: () => import('./demos/Uploader.vue').then(m => m.default)
	},
	{
		path: '/issue/833',
		component: () => import('./demos/Issue833.vue').then(m => m.default)
	},
	{
		path: '/issue/471',
		component: () => import('./demos/Issue471.vue').then(m => m.default)
	},
	{
		path: '/issue/598',
		component: () => import('./demos/Issue598.vue').then(m => m.default)
	},
	{
		path: '/issue/624',
		component: () => import('./demos/Issue624.vue').then(m => m.default)
	},
	{
		path: '/issue/649',
		component: () => import('./demos/Issue649.vue').then(m => m.default)
	},
	{
		path: '/issue/865',
		component: () => import('./demos/Issue865.vue').then(m => m.default)
	},
	{
		path: '/component/swipeout',
		component: () => import('./demos/Swipeout.vue').then(m => m.default)
	},
	{
		path: '/component/tabbar-simple',
		component: () => import('./demos/TabbarSimple.vue').then(m => m.default)
	},
	{
		path: '/plugin/device',
		component: () => import('./demos/Device.vue').then(m => m.default)
	},
	{
		path: '/component/agree',
		component: () => import('./demos/Agree.vue').then(m => m.default)
	},
	{
		path: '/component/x-hr',
		component: () => import('./demos/XHr.vue').then(m => m.default)
	},
	{
		path: '/component/marquee',
		component: () => import('./demos/Marquee.vue').then(m => m.default)
	},
	{
		path: '/component/msg',
		component: () => import('./demos/Msg.vue').then(m => m.default)
	},
	{
		path: '/component/wepay-input',
		component: () => import('./demos/WepayInput.vue').then(m => m.default)
	},
	{
		path: '/component/cell-box',
		component: () => import('./demos/CellBox.vue').then(m => m.default)
	},
	{
		path: '/component/x-icon',
		component: () => import('./demos/XIcon.vue').then(m => m.default)
	},
	{
		path: '/component/scroller-swiper',
		component: () =>
			import('./demos/ScrollerSwiper.vue').then(m => m.default)
	},
	{
		path: '/component/tabbar-icon',
		component: () => import('./demos/TabbarIcon.vue').then(m => m.default)
	},
	{
		path: '/component/datetime-range',
		component: () =>
			import('./demos/DatetimeRange.vue').then(m => m.default)
	},
	{
		path: '/demo/x-img-scroller',
		component: () => import('./demos/XImgScroller.vue').then(m => m.default)
	},
	{
		path: '/component/cell-form-preview',
		component: () =>
			import('./demos/CellFormPreview.vue').then(m => m.default)
	},
	{
		path: '/issue/1211',
		component: () => import('./demos/Issue1211.vue').then(m => m.default)
	},
	{
		path: '/component/x-table',
		component: () => import('./demos/XTable.vue').then(m => m.default)
	},
	{
		path: '/component/popup-radio',
		component: () => import('./demos/PopupRadio.vue').then(m => m.default)
	},
	{
		path: '/component/flow',
		component: () => import('./demos/Flow.vue').then(m => m.default)
	},
	{
		path: '/component/inline-loading',
		component: () =>
			import('./demos/InlineLoading.vue').then(m => m.default)
	},
	{
		path: '/demo/inline-calendar-each-day-slot',
		component: () =>
			import('./demos/InlineCalendarEachDaySlot.vue').then(m => m.default)
	},
	{
		path: '/component/check-icon',
		component: () => import('./demos/CheckIcon.vue').then(m => m.default)
	},
	{
		path: '/component/drawer',
		component: () => import('./demos/Drawer.vue').then(m => m.default)
	},
	{
		path: '/component/datetime-view',
		component: () => import('./demos/DatetimeView.vue').then(m => m.default)
	},
	{
		path: '/component/inline-x-number',
		component: () =>
			import('./demos/InlineXNumber.vue').then(m => m.default)
	},
	{
		path: '/component/popup-header',
		component: () => import('./demos/PopupHeader.vue').then(m => m.default)
	},
	{
		path: '/demo/inline-calendar-multi',
		component: () =>
			import('./demos/InlineCalendarMulti.vue').then(m => m.default)
	},
	{
		path: '/demo/x-img-popup',
		component: () => import('./demos/XImgPopup.vue').then(m => m.default)
	},
	{
		path: '/component/week-calendar',
		component: () => import('./demos/WeekCalendar.vue').then(m => m.default)
	},
	{
		path: '/component/number-roller',
		component: () => import('./demos/NumberRoller.vue').then(m => m.default)
	},
	{
		path: '/component/icon-loading',
		component: () => import('./demos/IconLoading.vue').then(m => m.default)
	},
	{
		path: '/component/inline-x-switch',
		component: () =>
			import('./demos/InlineXSwitch.vue').then(m => m.default)
	},
	{
		path: '*',
		component: () =>
			import('./demos/NotFoundComponent.vue').then(m => m.default)
	}
]

const router = new VueRouter({
	routes
})
