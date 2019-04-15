const fs = require('fs');
const xmlBuilder = require('xmlbuilder');
const folderName = './force-app/main/default/staticresources';

let xml = xmlBuilder.create('StaticResource', { encoding: 'utf-8', version: "1.0", standalone: true})
    .att('xmlns', 'http://soap.sforce.com/2006/04/metadata')
        .ele('cacheControl', 'Public').up()
        .ele('contentType', 'application/zip').up()
    xml.end({ pretty: true })
xml = xml.doc();

module.exports = function(name){

    const resourceName = `${folderName}/${name}.resource-meta.xml`

    if(!fs.existsSync(resourceName)){
        fs.writeFile(resourceName, xml.toString({pretty:true}), (err) => { 
            if(err){
                console.log({err})
                return;
            }
        })
    } 
}
