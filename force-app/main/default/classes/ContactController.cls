public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(){
        return [SELECT Id,Title, FirstName, LastName, Approval__c FROM Contact LIMIT 10];
    }
}
