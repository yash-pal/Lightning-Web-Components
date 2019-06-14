public with sharing class contactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContact(){
        return [SELECT Id,Title, FirstName, LastName,Email, Approval__C FROM contact LIMIT 10];
    }
   @AuraEnabled 
    public static void saveNote(string contactId){
        String databinding = '';
       system.debug('ContactId value  '+ contactId);
       notes__c notes= new notes__c();
       notes.Name=contactId;
       notes.Title__c = 'Rejection Note';
       notes.Body__c = databinding;
        insert notes;    
    }

    @AuraEnabled
    public static void Accept(id contactId){
     
     Contact con =[select Id,FirstName,lastName,Approval__c from contact where id=:contactId ];
         con.Approval__c = true;
     update con;

    }
}
