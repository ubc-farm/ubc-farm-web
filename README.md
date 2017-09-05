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
