import { Component, OnInit, forwardRef } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  public savings: Saving;
  public currentDeposit: number;
  constructor(private appServ: AppService) {

  }
  ngOnInit() {
    this.initiateDefaults();
    this.fetchSavings();
  }

  private fetchSavings() {
    this.appServ.getSavings().subscribe((data: Saving) => {
      this.savings.total = data.total;
    })
  }

  private initiateDefaults() {
    this.currentDeposit = null;
    this.savings = new Saving();
  }

  public registerDeposit() {
    if (this.currentDeposit) {
      this.appServ.addDeposit(this.currentDeposit).subscribe((data: Saving) => {
        this.savings.total = data.total;
        this.currentDeposit = null;
      });
    }
  }
}

export class Saving {
  total: number = 0;
}
