import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import {getString} from "tns-core-modules/application-settings";

@Injectable()
export class MydetailService {




    private serverUrl = "http://46.101.88.80:81";

    constructor(private http: Http) { }

    getUserProfileFromApi(id) {
        let headers = this.createRequestHeader();
        return this.http.get(this.serverUrl+"/user/getprofile/"+id, { headers: headers })
            .map(res => res);
    }


    updateuserProfileFromApi(user) {
       // console.log("service"+JSON.stringify(user));
        let headers = this.createRequestHeader();
        return this.http.put(this.serverUrl+"/user/updateprofile",user, {headers: headers})
            .map(res => res);

    }

    getResponseInfo() {
        let headers = this.createRequestHeader();
        return this.http.get(this.serverUrl, { headers: headers })
            .do(res =>  res);
    }

     createRequestHeader() {
        let headers = new Headers();
        let token=getString("access_token");
        // set headers here e.g.
      //  headers.append("AuthKey", "my-key");
        headers.append("token",token );
        headers.append("Content-Type", "application/json");

        return headers;
    }

}
