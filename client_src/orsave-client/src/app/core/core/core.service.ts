import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CoreService {

  constructor(private http: HttpClient) { }

  public addDeposit(depositAmount: number) {
    return this.http.post('/api/savings/deposit', { depositAmount: depositAmount });
  }

  public getSavings() {
    return this.http.get('/api/savings/total');
  }
}
