import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  showChart: boolean = true

  constructor(private route: Router) {
    route.events.subscribe(val =>{
      if (val instanceof NavigationEnd){
        if(val.url.endsWith("admin"))
          this.showChart=true
      }
    })
   }

  ngOnInit(): void {

    const data = [
      { day: "design", count: 25 },
      { day: "performance", count: 35 },
      { day: "speed", count: 40 },
      // { day: "day 4", count: 20 },
      // { day: "day 5", count: 25 },
      // { day: "day 6", count: 30 },
      // { day: "day 7", count: 35 },
    ];

    new Chart(
      "myChart",
      {
        type: 'doughnut',
        data: {
          labels: data.map(row => row.day),
          datasets: [
            {
              label: `a Incremental evaluation for `,
              data: data.map(row => row.count)
            }
          ]
        }
      }
    );


  }



  signOut() {
    sessionStorage.removeItem("Admin")
    this.route.navigate(["/"])
  }

}
