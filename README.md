# SFDX React Project

Make React development on Salesforce simpler. 

## About
- This project contains node scripts, custom webpack plugins, and a webpack config to get you started with integrating your react app w/ salesforce.
- For every entry inside of your webpack config, a dist folder with the bundled js and html file is created along with the needed resource-meta.xml file for SFDX CLI to deploy to salesforce. 
- SFDX source format handles the zipping and unzipping of the static resources files of where your project code will be hosted on salesforce. Read more on this [here](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_source_file_format.htm)
- After every webpack bulid that is run, the associated dist output folder is deployed to your org automatically. 

Example of project result of running the webpack config file. 

With the following entry config,
```
entry: {
     app: './src/index.js'
}
``` 
Results with, 
```
project
|___force-app
|   |___main
|       |___default
|           |___staticresource
|              |___app
|              |    |   app.bundle.js
|              |    |   index.html
|              |___app.resource-meta.xml
|
|   *React components, styles, and assets*
|___src
|   |   index.js
|   |___components/...
|   |___styles/...
|   |___helpers/...    
```
* Each entry creates an output directory inside of staticresouces insde of force-app.
* Inside of each directory you get the associated entry dist with its own .html file **For use in lightning component container (Not needed for visualforce development)**.
 
## Important Notes
* The local environment code assumes you are working in the new source format and not the older metadata format. 
* For live local dev server results inside of salesforce w/ out waiting for each deploy, recommend using a service called [ngrok](https://ngrok.com/), which exposes your localhost server to outside web over https protocol. 
* Webpack config, and loaders are configured for react but can be changed to work with other client side frameworks such as angular or vue. 
* Read more on [Webpack](https://webpack.js.org/concepts)

### Requirements: 
* [Node and npm](https://nodejs.org/en/) installed on your machine
* SFDX [Salesforce CLI](https://developer.salesforce.com/tools/sfdxcli) installed on your machine

### Recommended:
* [VS Code](https://code.visualstudio.com/) (Visual Studio Code) installed
* [Salesforce VS Code Extension Pack(s)](https://forcedotcom.github.io/salesforcedx-vscode/) installed

## Getting Started

1. `git clone https://github.com/mjyocca/SFDX-React-Project.git`

2. `npm install`

	##### Project is already created so next step is to authenticate a dev hub or sandbox/developer org

3.   CLI: `sfdx force:auth:web:login`

     __OR__

     Command Palette (ctrl or command + shift + p): `SFDX: Authenticate an Org`

4. Put the source of your project inside of /src directory. 

5. Run one of the many npm scripts

## Config File

* Modify `sfdx-react-scripts-config.js`
and put your entry points in the file along with preference for sandbox or scratch org development. **Note Make sure manfiest directory is existant if you choose to do sandbox development

```Javascript    
    entry: {
        app: './src/app.js',
        admin: './src/admin.js'
    },
    devServerEntry: 'app',
    //for non webpack-dev-server scripts watch for entry changes
    watch: false,
    //scratch or sandbox 
    orgType: 'scratch'
```

* DevServerEntry - if you run `npm run start` dev server starts up and serves the specified entry point name.
* watch - if true, and you run eith `npm run dev` or `npm run build` it will continue the process to watch for file changes and automatically re-build and deploy to salesforce
* orgType - specify string as 'scratch' org if your deploying to a scatch org, if not specify sandbox. 
     
     Depending on the orgType chosen, the appropriate cli source command is executed. `SFDX force:source:push` for scratch org and `SFDX force:source:deploy` for Sandbox/Developer Org. Scratch org command is source tracked, meaning any changed you make locally are included in the command and vice versa when you pull. For Sandbox/Developer Org that is not the case by default, but only the output created from the webpack config is deployed to the org (Prevents entire local project from being deployed everytime a webpack config is run).  

## Salesforce Development Environments

### Visualforce 

* We can load the js file directly into the visualforce page.

```HTML
<apex:page showHeader="false" sidebar="false" standardStylesheets="false" 
	   applyBodyTag="false" applyHtmlTag="false">
<html>
    <head></head>
    <body>
        <div id="root" />
        <!-- Prod bundled script -->
        <script src="{!URLFOR($Resource.[name], '[name]/[name].js')}"/>
        <!-- If using ngrok  -->
        <script src="https://[random].ngrok.io/bundle.js" />
    </body>
</html>
</apex:page>
```

### Lightning 

* To load your react application inside a lightning component w/ out iframing a visualforce page, you need to use a lightning namespace component called, `<lightning:container />`.
* The lightning container essentially iframes in your project instead of loading your script directly into the parent document. `Which is why the webpack config files create a html file for every output created :) `
* Read more on lightning:container [here](https://developer.salesforce.com/docs/component-library/bundle/lightning:container/documentation)

```Javascript
<aura:component>
    <lightning:container src="{!$Resource.[name] + '/index.html'}" />
<aura:component/>
```

