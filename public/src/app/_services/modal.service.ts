import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
@Injectable() export class ModalService {
    private subject = new Subject<any>();
    constructor() { }
    confirmThis(message: string, yesFn: () => void, noFn: () => void) {
        this.setConfirmation(message, yesFn, noFn);
    }
    setConfirmation(message: string, yesFn: () => void, noFn: () => void) {

        this.subject.next({
            type: "confirm",
            text: message,
            yesFn: () => {
                this.subject.next(); //this will close the modal
                yesFn();
            },
            noFn: () => {
                this.subject.next();
                noFn();
            }
        });

    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}