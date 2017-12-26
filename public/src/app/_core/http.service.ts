import { Injectable } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SessionService } from './session.service';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService extends Http {

  constructor(backend: XHRBackend, defaultOptions: RequestOptions, private sessionService: SessionService) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url

      if (!options) {
        // let's make option object
        options = { headers: new Headers() };
      }
      options.headers.set('x-access-token', this.sessionService.getSessionToken());
      options.headers.set('from', this.sessionService.getusername());
    } else {

      // we have to add the token to the url object
      url.headers.set('x-access-token', this.sessionService.getSessionToken());
      console.log('http services', url, options);
      url.headers.set('from', this.sessionService.getusername());
    }
    return super.request(url, options).catch((error: Response) => {
      if (error.status === 401 || error.status === 403) {
        this.sessionService.destroy();
      }

      return Observable.throw(error);
    });
  }
}
