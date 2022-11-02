const { defineConfig } = require("cypress");
const createBundler  = require("@bahmutov/cypress-esbuild-preprocessor");
const nodePolyfills = require('@esbuild-plugins/node-modules-polyfill').NodeModulesPolyfillPlugin;
const  addCucumberPreprocessorPlugin  = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createESbuildPlugin= require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const child_process= require('child_process');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const glob = require('glob');


module.exports = defineConfig({
  
  e2e: {
    async setupNodeEvents(on, config) {
     on('before:browser:launch',(browser,launchOptions)=>{


     });
    

  function getAndSetTestData(){
    glob('../ExcelData/*.xlsx', function(err,files){
    files.forEach(function(fileName){
    const wb = xlsx.readFile(filename,{dateNf: "mm/dd/yyyy"});
    const sheets = wb.SheetNames;
    for (let i=0 ; i<sheets.length; i++){
    console.log(sheets[i]);
    const ws= wb.sheets[[i]];
    tdata = xlsx.utils.sheet_to_json(ws , {raw: false});
    fs.writeFile('../cypress/fixtures/inputData/'+sheets[i] + '.json', JSON.stringify(tdata), err=>{
        if(err){
            console.log('Error writing file', err)

        }else {
            console.log('Successfully created' +sheets[i]+ ' json file')
        }


    })    

}


});

});

};
     on('task',{

      generateJsonFromExcel(){
         let flag = false;
         glob('../ExcelData/*.xlsx', function(err,files){
             console.log(files)
             files.forEach(function(fileName){
                 console.log(fileName)
             const wb = xlsx.readFile(filename,{dateNf: "mm/dd/yyyy"});
             const sheets = wb.SheetNames;
             for (let i=0 ; i<sheets.length; i++){
             console.log(sheets[i]);
             const ws= wb.sheets[[i]];
             tdata = xlsx.utils.sheet_to_json(ws , {raw: false});
             const fname = filename
             const str =fname.split('.');
             console.log(str[0]);
             console/log(str);
             fs.writeFile('../cypress/fixtures/inputData/'+str[0] + '/InputFile_' +sheets[0]+ '.json', JSON.stringify(tdata), err=>{
                 if(err){
                     console.log('Error writing file', err)
     
                 }else {
                     console.log('Successfully created' +sheets[i]+ ' json file')
                 }
                 })    
     
         }
             flag = true;
       });
     
     
     
       });
       return flag;
      }
     });

     on('before:run',(details)=>{
   
      generateJsonFromExcel();
      getAndSetTestData();
  
  });


     const bundler = createBundler({
        plugins: [createESbuildPlugin(config)],

     });
     on('file:preprocessor',bundler);
     await addCucumberPreprocessorPlugin(on,config);
     
      return config;
    },
    
    specPattern: ["**/*.feature"],
    watchForFileChanges: false
  },

 

});
