import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import {getString} from "tns-core-modules/application-settings";
import { Http, Headers } from "@angular/http";
@Injectable()
export class AddnewAddressService {




    private serverUrl = "http://46.101.88.80:81";

    constructor(private http: Http) { }


    post_new_location(data: any) {
       // console.log(JSON.stringify(data));
        let options = this.createRequestOptions();
        return this.http.post(this.serverUrl+"/add/location", { data }, { headers: options })
            .map(res => res);
    }

    private createRequestOptions() {
        let headers = new Headers();
        let user_token=getString("access_token");
        //headers.set("AuthKey", "my-key");
        headers.set("token", user_token);
        headers.set("Content-Type", "application/json");
        return headers;
    }


}
