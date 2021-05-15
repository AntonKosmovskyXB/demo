import {JetView} from "webix-jet";

import cities from "../models/cities";

export default class ProjectPopupView extends JetView {
	config() {
		const window = {
			view: "window",
			modal: true,
			localId: "popup",
			head: {
				view: "toolbar",
				cols: [
					{
						rows: [
							{
								view: "label",
								label: "PROJECT LIGHTHOUSE",
								css: "underlined"
							},
							{
								view: "label",
								label: "New request № 0123456"
							},
							{
								view: "label",
								label: "Project phase: DELIVERY"
							}
						]
					},
					{
						rows: [
							{
								view: "icon",
								icon: "wxi-close",
								click: () => {
									webix.confirm({
										text: "Are you sure that you want to close this editor?"
									}).then(() => {
										this.closePopup();
									});
								}
							},
							{}
						]
					}
				]
			},
			position: "center",
			width: 600,
			body: {
				view: "form",
				localId: "popupForm",
				elements: [
					{
						view: "multicombo",
						name: "addStore",
						label: "Add store",
						invalidMessage: "Please, select at least one store",
						options: {
							body: {
								data: cities,
								template: obj => `${obj.cityId}-${obj.city}`
							}
						}
					},
					{
						view: "datepicker",
						localId: "popupDatepicker",
						name: "selectDate",
						label: "Select date",
						required: true,
						invalidMessage: "Field should not be empty",
						on: {
							onChange: (date) => {
								this.fillDatepickerData(date);
							}
						}
					},
					{
						cols: [
							{},
							{
								view: "icon",
								icon: "mdi mdi-arrow-right"
							}
						]
					}
				],
				elementsConfig: {
					labelWidth: 115
				}
			}
		};

		return window;
	}

	init() {
		this.popup = this.getRoot();
		this.form = this.$$("popupForm");
	}

	showPopup() {
		this.popup.show();
	}

	fillDatepickerData(date) {
		const datapicker = this.$$("popupDatepicker");
		const dateInput = datapicker.getInputNode();
		if (date) {
			dateInput.innerHTML = `Week ${webix.Date.getISOWeek(date)}`;
		}
		else {
			dateInput.innerHTML = "";
		}
	}

	closePopup() {
		this.form.clear();
		this.form.clearValidation();
		this.popup.hide();
		const datapicker = this.$$("popupDatepicker");
		const dateInput = datapicker.getInputNode();
		dateInput.innerHTML = "";
	}
}
