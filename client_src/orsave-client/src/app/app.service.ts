import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {
    constructor(private http: HttpClient) {

    }

    public addDeposit(depositAmount: number) {
        return this.http.post('/savings/deposit', { depositAmount: depositAmount });
    }

    public getSavings() {
        return this.http.get('/savings/total');
    }
}