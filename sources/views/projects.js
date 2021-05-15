import {JetView} from "webix-jet";

export default class ProjectsView extends JetView {
	config() {
		const projectsHeader = {
			css: "flex-container",
			type: "clean",
			cols: [
				{
					rows: [
						{
							view: "label",
							label: "PROJECT LIGHTHOUSE",
							css: "dashboard-label"
						},
						{
							view: "label",
							label: "Porject owner: Faith Howells"
						}
					]
				},
				{},
				{
					view: "search",
					placeholder: "SEARCH",
					inputHeight: 38
				},
				{
					view: "label",
					label: "MIND YOUR WASTE",
					css: "dashboard-graphics-top-text"
				}
			]
		};

		const storesDescriptions = {
			gravity: 4,
			rows: [
				{
					view: "toolbar",
					borderless: true,
					cols: [
						{
							view: "button",
							type: "icon",
							icon: "wxi-plus",
							label: "Add store",
							css: "projects-toolbar-buttons",
							width: 170
						},
						{
							view: "icon",
							icon: "wxi-pencil"
						},
						{
							view: "icon",
							icon: "mdi mdi-chart-timeline"
						},
						{
							view: "icon",
							icon: "mdi mdi-import"
						},
						{
							view: "icon",
							icon: "mdi mdi-file-document"
						}
					]
				},
				{
					view: "toolbar",
					borderless: true,
					cols: [
						{
							view: "combo",
							placeholder: "Country",
							options: [
								{id: 1, value: "Great Britain"},
								{id: 2, value: "Germany"},
								{id: 3, value: "Netherlands"}
							]

						},
						{
							view: "combo",
							placeholder: "City",
							options: [
								{id: 1, value: "Amsterdam"},
								{id: 2, value: "Manchester"},
								{id: 3, value: "Dublin"}
							]

						},
						{
							view: "combo",
							placeholder: "RVM",
							options: [
								{id: 1, value: "Amsterdam"},
								{id: 2, value: "Manchester"},
								{id: 3, value: "Dublin"}
							]

						}
					]
				},
				{
					view: "label",
					label: "Participating store(s):"
				},
				{
					cols: [
						{
							rows: [
								{
									view: "label",
									label: "1214-AMSTERDAM"
								},
								{
									view: "label",
									label: "2101-ANTVERPEN"
								},
								{
									view: "label",
									label: "1214-AMSTERDAM"
								},
								{
									view: "label",
									label: "2101-ANTVERPEN"
								},
								{
									view: "label",
									label: "1214-AMSTERDAM"
								},
								{
									view: "label",
									label: "2101-ANTVERPEN"
								},
								{
									view: "label",
									label: "2101-ANTVERPEN"
								},
								{
									view: "label",
									label: "1214-AMSTERDAM"
								}
							]
						},
						{
							rows: [
								{
									view: "label",
									label: "2101-ANTVERPEN"
								},
								{
									view: "label",
									label: "1214-AMSTERDAM"
								},
								{
									view: "label",
									label: "2101-ANTVERPEN"
								},
								{
									view: "label",
									label: "1214-AMSTERDAM"
								},
								{
									view: "label",
									label: "2101-ANTVERPEN"
								},
								{
									view: "label",
									label: "1214-AMSTERDAM"
								},
								{
									view: "label",
									label: "2101-ANTVERPEN"
								},
								{
									view: "label",
									label: "1214-AMSTERDAM"
								},
								{
									view: "button",
									type: "icon",
									icon: "wxi-angle-right",
									label: "See all",
									width: 140
								}
							]
						}
					]
				}
			]
		};

		const googleMapContent = {
			gravity: 8,
			rows: [
				{
					view: "segmented",
					options: [
						{id: 1, value: "Phase 1: delivery"},
						{id: 2, value: "Phase 2: innovation"},
						{id: 3, value: "Phase 3: collection"}
					]
				},
				{
					template: "<span class='stores-heading'>Participating stores</span> &nbsp;&nbsp;&nbsp;<span class='projects-stores-num'>266</span>",
					height: 40
				},
				{
					view: "yandex-map",
					zoom: 6,
					height: 650
				}
			]
		};

		return {
			rows: [
				projectsHeader,
				{
					cols: [
						storesDescriptions,
						{gravity: 1},
						googleMapContent
					]
				}
			]
		};
	}
}
