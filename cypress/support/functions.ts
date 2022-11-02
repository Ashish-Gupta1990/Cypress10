
import * as objectRepoJson from '../fixtures/objectRepo.json';
require('cypress-xpath');

export class Functions {
 public static testDataID : any ;
 public static tcData : any ;
 public static getDataFromDBArray : any ;



 /*==================================================================
 * Function name : saveAndLoadTestData
 * Author : Ashish Gupta
 * Description : to Load the testdata from fixtures files
 * Parameters :
 * Date : 16/08/2022
 * Module :  General
 * Example :
 *===================================================================*/
 static saveAndLoadTestData (testData : any){
    this.testDataID = testData;
    let tcData: string;
    this.testDataID = testData;
    cy.log(this.testDataID);
    cy.readFile('cypress/fixtures/inputData/LC_Data.json',{timeout:10000}).then((loanData)=>{

        tcData= Functions.getJsonData(this.testDataID,'ID', loanData);
        cy.log(tcData)
    }).then(()=>{

        this.tcData= tcData;
    });

}

/*==================================================================
 * Function name : saveAndLoadTestData
 * Author : Ashish Gupta
 * Description : to Load the testdata from fixtures files
 * Parameters :
 * Date : 16/08/2022
 * Module :  General
 * Example :
 *===================================================================*/
static getDataAndSaveData() {
   
    cy.task('generateJsonFromExcel');

}

/*==================================================================
 * Function name : Login
 * Author : Ashish Gupta
 * Description : 
 * Parameters :
 * Date : 16/08/2022
 * Module :  General
 * Example :
 *===================================================================*/
static login() {
   
    cy.visit("https://rahulshettyacademy.com/angularpractice/");

}
/*==================================================================
 * Function name : EnterData
 * Author : Ashish Gupta
 * Description : 
 * Parameters :
 * Date : 16/08/2022
 * Module :  General
 * Example :
 *===================================================================*/
static enterData(datatable : any) {

    datatable.hashes().forEach((datafromfeature: any) => {
        cy.get(objectRepoJson.HomePage.txtUserName2).type(datafromfeature.user);
        cy.get(objectRepoJson.HomePage.txtEmail).type(datafromfeature.email);
        cy.get(objectRepoJson.HomePage.btnSubmit).click();
        cy.get(objectRepoJson.HomePage.lblsuccess).then(function(ele){

            const elementtxt = ele.text();
            expect(elementtxt).to.be.string('Success! The Form has been submitted successfully!.');
        }) 
    });
   
   }


/*==================================================================
 * Function name : saveAndLoadTestData
 * Author : Ashish Gupta
 * Description : to Load the testdata from fixtures files
 * Parameters :
 * Date : 16/08/2022
 * Module :  General
 * Example :
 *===================================================================*/
static getJsonData (rowNum: any , field: any , testDatafile:any){
   
    return testDatafile.filter(function (e1:any){
        return e1[field]===rowNum
    });

}

/*==================================================================
 * Function name : enterDataFromExcel
 * Author : Ashish Gupta
 * Description : to enter the data from excel
 * Parameters :
 * Date : 16/08/2022
 * Module :  General
 * Example :
 *===================================================================*/
static enterDataFromExcel (tcData:any){
            
        cy.log(tcData);
        cy.get(objectRepoJson.HomePage.txtUserName2).type(tcData[0].User);
        cy.get(objectRepoJson.HomePage.txtEmail).type(tcData[0].Email);
        cy.get(objectRepoJson.HomePage.btnSubmit).click();
        cy.get(objectRepoJson.HomePage.lblsuccess).then(function(ele){

            const elementtxt = ele.text();
            expect(elementtxt).to.be.string('Success! The Form has been submitted successfully!.');
        }) 
    
   
   }









}