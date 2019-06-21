import { LightningElement, wire, api ,track} from 'lwc';
import getContact from '@salesforce/apex/contactController.getContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import saveNote from '@salesforce/apex/contactController.saveNote';
import Accept from '@salesforce/apex/contactController.Accept';


export default class LwcAssignment extends LightningElement {
    @api error;
    @api bShowModal = false;
    @api openmodal;
    @api recordId;
    @api ParentId;
    @track searchKey; 
    @api currentpage;  
    isSearchChangeExecuted = false;
    localCurrentPage = null;   
    @api result;


    @wire(getContact)
    contacts;


    openModal(event) {
        this.recordId = event.target.value;
        /*eslint-disable no-console */

        // to open modal window set 'bShowModal' tarck value as true
        this.bShowModal = true;
        console.log("this.recordId " + this.recordId);
    }

    closeModal() {
        /*eslint-disable no-console */
        console.log("hello");
        // to close modal window set 'bShowModal' track value as false
        this.bShowModal = false;

    }
    saveMethod() {
         const result =this.template.querySelector('.inputText');
         this.result=result.value;
        /*eslint-disable no-console */
        console.log('value of input '+ this.result);
        /*eslint-disable no-console */
        console.log("this.recordId " + this.recordId);
        saveNote({ contactId: this.recordId,inputText:this.result })
            .then(() => {
                const evt = new ShowToastEvent({
                    title: "Record Updated",
                    variant: 'Success',

                    mode: 'dismissable'
                });
                this.dispatchEvent(evt);
                this.closeModal();

            }).catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });

    }


    approvalMethod(event) {
        this.recordId = event.target.value;
        /*eslint-disable no-console */
        console.log("this.recordId " + this.recordId + "Hello World");

        Accept({ contactId: this.recordId })

            .then(() => {
                const evnt = new ShowToastEvent({
                    title: "Request Approved",
                    variant: 'Success'
                });
                this.dispatchEvent(evnt);
            }).catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });

    }


    handleKeyChange(event) {  
        if (this.searchKey !== event.target.value) {  
          this.isSearchChangeExecuted = false;  
          this.searchKey = event.target.value;  
          this.currentpage = 1;  
        }  
    }
    
    
    renderedCallback() {  
        // This line added to avoid duplicate/multiple executions of this code.  
        if (this.isSearchChangeExecuted && (this.localCurrentPage === this.currentpage)) {  
          return;  
        }  
        this.isSearchChangeExecuted = true;  
        this.localCurrentPage = this.currentpage;
    }
}