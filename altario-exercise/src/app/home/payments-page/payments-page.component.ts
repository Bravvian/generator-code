import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {PaymentsDataElement} from "./payments-data-element";

@Component({
  selector: 'app-payments-page',
  templateUrl: './payments-page.component.html',
  styleUrls: ['./payments-page.component.scss']
})
export class PaymentsPageComponent implements OnInit {

  payment: string;

  amount: number;

  @Input() code: string;
  @Input() grid: number;

  tableDataSource = new MatTableDataSource<PaymentsDataElement>([])

  paymentsData = [];

  displayedColumns: string[] = ['name', 'amount', 'code', 'grid'];


  constructor() { }

  ngOnInit() {
  }

  addPayment(){
    const paymentObj: PaymentsDataElement = {name: this.payment, amount: this.amount, code: this.code, grid: this.grid};
    this.paymentsData.push(paymentObj);

    this.tableDataSource.data = this.paymentsData;
  }
}
