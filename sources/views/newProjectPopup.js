import {JetView} from "webix-jet";

import cities from "../models/cities";
import mediumPriorityData from "../models/mediumPriorityData";

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
								label: "New request # 0123456"
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
								icon: "mdi mdi-arrow-right",
								click: () => {
									if (this.form.validate()) {
										const values = this.form.getValues();
										const newCitiesList = values.addStore.split(",").map(item => +item);
										mediumPriorityData.add({
											city: cities.data.pull[newCitiesList[0]].city,
											cityId: cities.data.pull[newCitiesList[0]].cityId,
											numOfOrder: this.numOfOrder,
											projectPhase: "delivery",
											country: cities.data.pull[newCitiesList[0]].country
										});
										this.closePopup();
									}
								}
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
		this.numOfOrder = this.getRandomInt(100000, 199999);
	}

	showPopup() {
		this.popup.show();
		this.numOfOrder = this.getRandomInt(100000, 199999);
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

	getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}
