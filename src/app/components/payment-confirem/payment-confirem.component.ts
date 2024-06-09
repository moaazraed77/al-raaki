import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-confirem',
  templateUrl: './payment-confirem.component.html',
  styleUrls: ['./payment-confirem.component.scss']
})
export class PaymentConfiremComponent implements OnInit{

  id:any;

  constructor(private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.paramMap.get("id")
  }

}
