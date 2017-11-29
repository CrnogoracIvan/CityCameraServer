 import { Component, Input } from '@angular/core';
 import { ModalService} from '../../_services/index';
 @Component({
    selector: 'modal',
    templateUrl: 'modal.component.html',
   
})
 export class ModalComponent {
    message: any;
    constructor(
      private _ModalService: ModalService
   ) { }
   
   ngOnInit() {
    //this function waits for a message from alert service, it gets 
    //triggered when we call this from any other component
    this._ModalService.getMessage().subscribe(message => {
        this.message = message;
    });
  }
}