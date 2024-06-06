import { Component } from '@angular/core';
import { UpaymentService } from 'src/app/services/upayment.service';
// import { Stripe, loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-test-upayment',
  templateUrl: './test-upayment.component.html',
  styleUrls: ['./test-upayment.component.scss']
})
export class TestUpaymentComponent  {
  // stripe: Stripe | null = null;
  // stripeKey = 'your-publishable-key-here'; // Replace with your actual Stripe publishable key

  // async ngOnInit() {
  //   this.stripe = await loadStripe(this.stripeKey);
  // }

  // async checkout() {
  //   if (!this.stripe) {
  //     console.error('Stripe.js has not loaded yet.');
  //     return;
  //   }

  //   const { error } = await this.stripe.redirectToCheckout({
  //     lineItems: [
  //       {
  //         price: 'price_1JHJklKJ3BjJLKJLKJLKJ', // Replace with the ID of your price
  //         quantity: 1,
  //       },
  //     ],
  //     mode: 'payment',
  //     successUrl: window.location.origin + '/success',
  //     cancelUrl: window.location.origin + '/cancel',
  //   });

  //   if (error) {
  //     console.error('Error during redirect to checkout:', error);
  //   }
  // }


  // --------------------------------------------------------------

//   const upayments = new uPayments({
//     apiKey: 'your-api-key',
//     success: function(response) {
//       console.log('Payment successful!', response);
//     },
//     error: function(error) {
//       console.log('Payment error!', error);
//     }
//   });

//   upayments.render('#payment-form');
// }

constructor(private asd:UpaymentService){}

  buy(){
    // this.asd.createPayment("as").subscribe(data=>{
    //   console.log(data);
    //   console.log(data.data.link);
    //   window.open(data.data.link,"blank")
    // })
  }
}
