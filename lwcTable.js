import { LightningElement,wire, api} from 'lwc';
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


    @wire(getContact)
    contacts;


    openModal(event) {   
    this.recordId= event.target.value;
      /*eslint-disable no-console */
      
    // to open modal window set 'bShowModal' tarck value as true
    this.bShowModal = true;
    console.log("this.recordId "+ this.recordId); 
    }

    closeModal() { 
        /*eslint-disable no-console */
      console.log("hello");   
    // to close modal window set 'bShowModal' track value as false
    this.bShowModal = false;
    
    }
    saveMethod() {
     /*eslint-disable no-console */
     console.log("this.recordId "+ this.recordId); 
    saveNote({contactId:this.recordId})
    .then(() => {
    const evt = new ShowToastEvent({
        title: "Record Updated",
        //message: "Response Saved ",
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


    approvalMethod(event){
        this.recordId= event.target.value;
         /*eslint-disable no-console */
         console.log("this.recordId "+ this.recordId);

        Accept({contactId:this.recordId})

            .then(() => {
                const evnt = new ShowToastEvent({
                    title:"Request Approved",
                    //message:"Apporved Contact",
                    variant:'Success'
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
}