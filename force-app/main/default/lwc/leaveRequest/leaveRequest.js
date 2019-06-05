import { LightningElement,wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class LwcAssignment extends LightningElement {
   @wire(getContactList)
   contact;
    
}