const fs = require('fs')
const path = require('path')
const XMLBuilder = require('xmlbuilder')
const pathName = './manifest/package.xml';

const MetaDataTypes = ['ApexClass', 'ApexComponent', 'ApexPage', 'ApexTestSuite',
                        'ApexTrigger', 'AuraDefinitionBundle', 'LightningComponentBundle',
                        'StaticResource'];

let xml = XMLBuilder.create('Package', { encoding: 'utf-8', version: '1.0', standalone: true})
    .att('xmlns','http://soap.sforce.com/2006/04/metadata')
        for(let type of MetaDataTypes){
            xml.ele('types')
                .ele('members', '*').up()
                .ele('name', type).up()
            .up()
        }
        xml.ele('version', '45.0').up()
    .end({pretty: true})
xml = xml.doc();

module.exports = function(){
    
    fs.writeFile(pathName, xml.toString({pretty:true}), (err) => {
        if(err){
            console.log('error creating file')
            console.log({err})
            return;
        }
    })
}