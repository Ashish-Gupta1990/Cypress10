import { Before,Given,When,Then } from "@badeball/cypress-cucumber-preprocessor";
import  * as objectRepoJson from '../../fixtures/objectRepo.json';
import {Functions} from "../../support/functions"




Before(()=>{

console.log(Cypress.spec)

})

Given('The user visit url of the application',()=>{
Functions.login();    

})
When('The user enters all the details',(datatable: any)=>{
    Functions.enterData(datatable);    
    
    })
When('The user enters all the details from excel',(tcData: any)=>{
        Functions.enterDataFromExcel(tcData);    
        
})
Then('I used TestData {string} for this Scenario',(testData: any)=>{
    Functions.saveAndLoadTestData(testData);    
    
})