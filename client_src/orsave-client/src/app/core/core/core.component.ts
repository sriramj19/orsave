import { Component, OnInit } from '@angular/core';
import { CoreService } from './core.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
  providers: [CoreService]
})
export class CoreComponent implements OnInit {

  public savings: Saving;
  public currentDeposit: number;
  constructor(private coreServ: CoreService) {

  }
  ngOnInit() {
    this.initiateDefaults();
    this.fetchSavings();
  }

  private fetchSavings() {
    this.coreServ.getSavings().subscribe((data: Saving) => {
      this.savings.total = data.total;
    })
  }

  private initiateDefaults() {
    this.currentDeposit = null;
    this.savings = new Saving();
  }

  public registerDeposit() {
    if (this.currentDeposit) {
      this.coreServ.addDeposit(this.currentDeposit).subscribe((data: Saving) => {
        this.savings.total = data.total;
        this.currentDeposit = null;
      });
    }
  }

}

export class Saving {
  total: number = 0;
}
