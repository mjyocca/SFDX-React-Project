const { spawn } = require('child_process');
const { orgType } = require('../sfdx-react-scripts-config')
const platform = require('os').platform();

function execCmd(cmd, args, options = {}){

    if(platform == 'win32') options.shell = true;

    let child = spawn(cmd, args, options);

    return new Promise((resolve, reject) => {
       
        let output = '';
        
        child.stdout.on('data', (data) => {
            console.log(`SFDX STDOUT: ${data.toString()}`)
            output += data.toString();
        })

        child.stderr.on('data', (data) => {
            console.log(`SFDX STDER: ${data.toString()}`)
            output += data.toString();
        })

        child.on('exit', (err) => {
            if(err) reject(output);

            resolve(output);
        })
    })
}

module.exports = function(entries){

    if(orgType == 'scratch'){

        execCmd('sfdx', ['force:source:push'])
            .then((result) => {
                console.log('Project Finished Pushing to Scratch Org');
            })
            .catch(err => {
                console.log(err);
        })

    } else {

        let sourcePath = ``;
        let staticPath = `force-app/main/default/staticresources/`;
        for(let [key, entry] of entries.entries()){
            sourcePath += `${staticPath}${entry.name}`
            if(!key == entries.length - 1) sourcePath += `, `
        }

        execCmd('sfdx', ['force:source:deploy', `--sourcepath ${sourcePath}`])
            .then(result => {
                console.log('Project Finsihed Deploying to Developer/Sandbox')
            })
            .catch(err => {
                console.log(err)
            })
    }
}