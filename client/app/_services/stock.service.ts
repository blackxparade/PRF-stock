import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { Stock } from '../_models/index';
@Injectable()
export class StockService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + '/stocks');
    }

    getById(_id: string) {
        return this.http.get(this.config.apiUrl + '/stocks/' + _id);
    }

   /* create(stock: Stock) {
        return this.http.post(this.config.apiUrl + '/stocks/newStock', stock);
    }

    update(stock: Stock) {
        return this.http.put(this.config.apiUrl + '/stocks/' + stock._id, stock);
    }

    delete(_id: string) {
        return this.http.delete(this.config.apiUrl + '/stocks/' + _id);
    }*/

}
