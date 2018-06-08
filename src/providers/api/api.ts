import { Injectable, Component } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { HttpParams } from '@angular/common/http';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
@Component({
  providers: [HTTP]
})
export class Api {
  url: string = 'https://example.com/api/v1';

  constructor(public http: HTTP) {
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }    

    return this.http.get(endpoint, reqOpts, {});
  }

  getWithAuth(endpoint: string, params?: any) {
    var headers = new Headers();
    headers.append("X-GLB-Token", params.GLBID);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(endpoint, {}, {'X-GLB-Token': params.GLBID});
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts, {});
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}
