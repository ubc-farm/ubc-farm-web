# UBCFarm Application
This repository contains the application files that make up the current iteration fo the UBC Farm Application. 

# Folder Structure
(last updated on Sept 4th, 2017)
* **src**
	* **dashboard**
		* *Dashboard container and component files*
	* **fields**
		* **actions**
			* *Redux action creater files for **fields*** 
		* **maps**
			* **utils**
				* *React wrapper files for **google maps API***
			* *Google Maps component and container files*
		* **reducers**
			* *Redux reducer files for **fields***
		* *field creation and detailed view component files*
	* **finances**
		* **actions**
			* *Redux action creater files for **finances***
		* **components**
			* **ItemSelectors**
				* *MUI themed selectors for **inventory items***
			* **lists**
				* *list of **purchases and invoice***
			* **modals**
				* *modals for adding items to purchase and invoice forms*
			* *pages and modals for **finances***
		* **reducers**
			* *Redux reducer files for **fields***
		* *Finance Page base component files*
	* **inventory**
		* **actions**
			* *Redux action creation files for **inventory items***
		* **components** 
			* **lists**
				* *list components for inventories*
			* **modals**
				* *CRUD update components for inventories*
			* **visuals**
				* *D3 Components for inventories*
			* *Inventory base component files*
		* **reducers**
			* *Redux reducer files for **inventory items***
		* *Inventory Page base component files*
	* **login**
		* *login components and containers*
	* **modules**
		* *currently only contains Auth Module*
	* **navigation**
		* *main navigation drawer container and component files*
	* **reducers**
		* *main reducer file*
	* **reports**
		* *Report page*
	* **signup**
		* *signup component and container files*
	* **tasks**
		* **actions**
			* *redux action creater files for **tasks***
		* **components**
			* *child component files for **tasks***
		* **reducers**
			* *Redux Reducer files for **tasks***
		* *Task Page main component file*
	* **users**
		* **actions**
			* *redux action creater files for **users***
		* **components**
			* *child component files for **users***
		* **reducers**
			* *Redux Reducer files for **users***
		* *User Page main component file*
	* base component files and react routing


# How to Install
1. Install [Node.js](https://nodejs.org/en/)
2. With node istalled, use npm and follow [Redux instructions](http://redux.js.org/docs/basics/UsageWithReact.html)
3. Clone this package into your own environment
4. Install node modules
```bash
npm install
```
5. On two separate terminal windows run the following two commands
```bash
npm run bundle
```
and
```bash
npm run start
```
6. Open a browser and navigate to ```localhost:3000``` 

# Third Party Documentation
This web applications uses a few (well, a bunch of them) third party libraries to provide some of its core functionality and presentation. They are listed out below, with related documentation. 
### React-Redux
We use react-redux to manage state changes within and across pages. What redux does better than other frameworks such as Angular is providing a globally accessible **store**, so that shared states/variables are instantly updated across pages. Redux makes sure that state changes can only be triggered by **actions**, and it works well with react components. Combining the two together creates so called **React-Redux** patterns which most components in this project follow.

[Redux Documentation](http://redux.js.org/)

[React-Redux Example](http://redux.js.org/docs/basics/ExampleTodoList.html)

### D3.js
We use d3 to create dynamic visualizations from data gathered/generated by the application. Notice that we don't use a wrapper for this one, because d3 generates within <svg> tags whose inner content is handled by d3 only and not the DOM/React anymore.

[D3.js Documentation](https://d3js.org/)

### vis.js
We use vis.js to create the task timeline. In order to make it work better with React, we wrap vis.js functions into a react "component", this is done in **TimeLineJS.js**. In **TimeLine.js** we create the actual component/container for the timeline.

[vis.js Timeline Documentation](http://visjs.org/docs/timeline/)

### Google Maps API
Google Maps API is used for all of the mapping functions in the application. We use **react-google-maps** as an third party React wrapper for Google Map's Javascript API (similar to what we did for vis timeline, but this time someone else did most of the work for us already).

[Google Maps Javscript API Docs](https://developers.google.com/maps/documentation/javascript/tutorial)

[react-google-maps docs](https://tomchentw.github.io/react-google-maps/#introduction)

### Bulma & Material UI
Bulma and Material UI are two different css frameworks used to simplify component creation (tabs, lists, tables, buttons, forms etc)

We were using Bulma for both styling and columns/responsive layout but later switched to Material UI for our components. We kept using Bulma for columns because Matrerial UI did not have its own flex-box implementation [Read here about it](https://stackoverflow.com/questions/33671469/material-ui-and-grid-system). However, now that Material UI merged their new flex-box implementation into their core (sept 2017, just moved from alpha to beta), in the near future we should completely ditch bulma and move to Material UI instead.

As of now, most components are built using Material UI, but layout/columns is still done with Bulma.

[Material-UI Docs](http://www.material-ui.com/#/)

[Bulma Docs](https://bulma.io/)

