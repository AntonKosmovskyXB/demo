import {JetView} from "webix-jet";

import data from "../models/dashboardData";

export default class DashboardView extends JetView {
	config() {
		const dashboardList = {
			width: 330,
			rows: [
				{
					view: "toolbar",
					borderless: true,
					localId: "listToolbar",
					css: "listToolbar",
					height: 100,
					rows: [
						{
							cols: [
								{
									view: "template",
									template: "<span class='mdi mdi-alert'></span>",
									type: "clean",
									width: 30
								},
								{
									view: "label",
									label: "EXCEPTIONS"
								},
								{
									view: "richselect",
									placeholder: "Project phase",
									options: [
										{id: 1, value: "Phase 1"},
										{id: 2, value: "Phase 2"},
										{id: 3, value: "Phase 3"}
									]

								}
							]
						},
						{
							cols: [
								{
									view: "richselect",
									placeholder: "Country",
									options: [
										{id: 1, value: "Great Britain"},
										{id: 2, value: "Germany"},
										{id: 3, value: "Netherlands"}
									]

								},
								{
									view: "richselect",
									placeholder: "City",
									options: [
										{id: 1, value: "Amsterdam"},
										{id: 2, value: "Manchester"},
										{id: 3, value: "Dublin"}
									]

								}
							]
						}
					]
				},
				{
					view: "list",
					localId: "dashboardList",
					select: true,
					type: {
						template: obj => `
						<div class="dashboard-list-item">
							<div class="item-data">
								<div class="bold-text">${obj.firstCityId}-${obj.firstCity}</div>
								<div>${obj.secondCityId}-${obj.secondCity}</div>
							</div>
							<div>
								<span class="mdi mdi-chevron-right"></span>
							</div>
						</div>`,
						height: 60
					}
				}
			]
		};

		const dashboardGraphics = {
			css: "dashboardGraphics",
			rows: [
				{
					view: "toolbar",
					borderless: true,
					margin: 40,
					css: "graphics-toolbar",
					cols: [
						{
							view: "button",
							type: "icon",
							icon: "wxi-plus",
							label: "New project",
							css: "graphics-toolbar-buttons",
							width: 150
						},
						{
							view: "button",
							type: "icon",
							icon: "wxi-plus",
							label: "New order",
							css: "graphics-toolbar-buttons",
							width: 150
						},
						{
							view: "search",
							placeholder: "SEARCH",
							width: 300
						}
					]
				},
				{
					view: "gridlayout",
					css: "graphicsGrid",
					gridColumns: 2,
					gridRows: 4,
					margin: 20,
					cells: [
						{template: "<div class='center-aligned'><span class='stores-heading'>Participating stores</span><br><span class='stores-num'>320</span></div>", x: 0, y: 0, dx: 1, dy: 1, css: "graphicsGridCell"},
						{template: "<div class='center-aligned'><span class='stores-heading'>Completed stores</span><br><span class='stores-num'>96</span></div>", x: 0, y: 1, dx: 1, dy: 1, css: "graphicsGridCell"},
						{
							cols: [
								{
									view: "chart",
									id: "pieChart",
									type: "pie",
									label: "#firstCity#",
									value: "#firstCityId#",
									radius: 70,
									data
								}
							],
							x: 1,
							y: 0,
							dx: 1,
							dy: 2,
							css: "graphicsGridCell"
						},
						{
							cols: [
								{
									view: "chart",
									id: "pieChart",
									type: "pie",
									label: "#firstCity#",
									value: "#firstCityId#",
									radius: 70,
									data
								}
							],
							x: 0,
							y: 2,
							dx: 1,
							dy: 2,
							css: "graphicsGridCell"
						},
						{
							view: "chart",
							id: "barChart",
							type: "bar",
							value: "#firstCityId#",
							xAxis: {
								title: "City",
								template: "#firstCity#"
							},
							yAxis: {
								start: 0,
								end: 10,
								step: 1
							},
							x: 1,
							y: 2,
							dx: 1,
							dy: 2,
							css: "graphicsGridCell"
						}
					]
				}
			]
		};
		return {
			rows: [
				{
					css: "flex-container",
					type: "clean",
					cols: [
						{
							view: "label",
							label: "DASHBOARD",
							css: "dashboard-label"
						},
						{},
						{
							view: "label",
							label: "MIND YOUR WASTE",
							css: "dashboard-graphics-top-text"
						}
					]
				},
				{
					cols: [dashboardList, dashboardGraphics]
				}
			]
		};
	}

	init() {
		this.$$("dashboardList").sync(data);
		this.$$("barChart").sync((data), () => {
			this.$$("barChart").group({
				by: "firstCity",
				map: {
					firstCityId: ["firstCityId", "count"]
				}
			});
		});
	}
}
