public with sharing class contactController {

    //Retrieve or Show data from the Org 

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContact(){
        return [SELECT Id,Title, FirstName, LastName,Email, Approval__C FROM contact Limit 10];
    }

    //  Save the Id and Text from the Modal window in a Custom Object in Org 

    @AuraEnabled 
    public static void saveNote(string contactId,String inputText){
       
       system.debug('ContactId value  '+ contactId);
       notes__c notes= new notes__c();
       notes.Name=contactId;
       notes.Title__c = 'Rejection Note';
       notes.Body__c = inputText;
        insert notes;    
    }

    // Update the Checkbox Field and Run the Workflow 

    @AuraEnabled
    public static void Accept(id contactId){
     Contact con =[select Id,FirstName,lastName,Approval__c from contact where id=:contactId ];  // Check the Id when it matches the id of the contact on click of  Button 
         con.Approval__c = True;
     update con;

    }

    @AuraEnabled
    public static Integer getCount(String searchString) {  
     String query = 'select count() from Contact ';  
     if (searchString != null && searchString != '') {  
       query += ' where name like \'%' + searchString + '%\' ';  
     }  
     return Database.countQuery(query);  
   }  
}