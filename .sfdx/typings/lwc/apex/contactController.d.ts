declare module "@salesforce/apex/contactController.getContact" {
  export default function getContact(): Promise<any>;
}
declare module "@salesforce/apex/contactController.saveNote" {
  export default function saveNote(param: {contactId: any, inputText: any}): Promise<any>;
}
declare module "@salesforce/apex/contactController.Accept" {
  export default function Accept(param: {contactId: any}): Promise<any>;
}
declare module "@salesforce/apex/contactController.getCount" {
  export default function getCount(param: {searchString: any}): Promise<any>;
}
