/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
  @query("#error")
  error!: HTMLDivElement;

  @query("#token")
  token!: HTMLDivElement;

  @query("#card-number")
  cardNumber!: HTMLDivElement;

  @query("#card-expiry")
  cardExpiry!: HTMLDivElement;

  @query("#card-cvc")
  cardCvc!: HTMLDivElement;

  @query("#payment")
  form!: HTMLFormElement;

  @query("#submit-button")
  submitButton!: HTMLFormElement;

  override connectedCallback(): void {
    super.connectedCallback();
    this.loadService();
  }

  loadService() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const cbInstance = Chargebee.init({
      site: "ahoy-test",
      publishableKey: "test_EiWHjDIx0ZmX3Jnf8LtSq4ojZcuBKP0Fh"
    });

    const options = {
      fonts: ['https://fonts.googleapis.com/css?family=Roboto:300,500,600'],

      // add classes for different states
      classes: {
        focus: 'focus',
        invalid: 'invalid',
        empty: 'empty',
        complete: 'complete',
      },

      // add placeholders
      placeholder: {
        number: "4111 1111 1111 1111"
      },

      // Set locale
      locale: 'en',

      style: {

        // Styles for default state
        base: {
          color: '#333',
          fontWeight: '500',
          fontFamily: 'Roboto, Segoe UI, Helvetica Neue, sans-serif',
          fontSize: '16px',
          fontSmoothing: 'antialiased',

          ':focus': {
            // color: '#424770',
          },

          '::placeholder': {
            color: '#abacbe',
          },

          ':focus::placeholder': {
            // color: '#7b808c',
          },
        },

        // Styles for invalid state
        invalid: {
          color: '#E94745',

          ':focus': {
            color: '#e44d5f',
          },
          '::placeholder': {
            color: '#FFCCA5',
          },
        },
      },
    };

    cbInstance.load("components").then(() => {
      // Create card
      const cardComponent = cbInstance.createComponent("card", options);
      // Create card fields
      cardComponent.createField("number").at(this.cardNumber);
      cardComponent.createField("expiry").at(this.cardExpiry);
      cardComponent.createField("cvv").at(this.cardCvc);
      // Mount card component
      cardComponent.mount();

      // $(this.form).on("submit", function (event) {
      //   $(this.submitButton).addClass("submit");
      //   event.preventDefault();
      //   cardComponent.tokenize().then(data => {
      //     var temp_token = data.token;
      //     $(this.submitButton).removeClass("submit");
      //     $(this.token).show();
      //     $(this.error).hide();
      //     $(this.token).html(data.token);

      //     // // ######################## TODO: Create Customer API
      //     // console.log("Test----> after submit");

      //     // $.ajax({
      //     //   url: "http://172.31.30.225:8081/Notifies",
      //     //   type: 'GET',
      //     //   dataType: 'json', // added data type
      //     //   success: function (res) {
      //     //     console.log("My Call Result:" + res);
      //     //     alert(res);
      //     //   }
      //     // });

      //     // console.log("Test----> after create customer");


      //   }).catch(error => {
      //     $(this.submitButton).removeClass("submit");
      //     // TODO get a proper error message
      //     $(this.error).show();
      //     $(this.error).html("E Problem while tokenizing your card details !!");
      //     $(this.token).hide();
      //     console.log(error);
      //   });
      // });
    });
  }

  handleFocus(input: HTMLInputElement) {
    input.classList.add("focus");
  }
  handleBlur(input: HTMLInputElement) {
    input.classList.remove("focus");
  }
  handleKeyup(input: HTMLInputElement) {
    if (input.value) {
      input.classList.remove("empty");
      input.classList.add("val");
    } else {
      input.classList.remove("val");
      input.classList.add("empty");
    }
  }

  renderContent() {
    return html`
   
   <div class="ex1-wrap">        
        <form id="payment">
            <div class="ex1-contain">
                <div class="ex1-fieldset">
                    <div class="ex1-field">                  
                        <input 
                        id="form-input"
                        class="ex1-input" 
                        type="text" 
                        placeholder="John Doe"
                        @focus=${(e: Event) => this.handleFocus((<HTMLInputElement>e.target))}
                        @blur=${(e: Event) => this.handleBlur((<HTMLInputElement>e.target))}
                        @keyup=${(e: Event) => this.handleKeyup((<HTMLInputElement>e.target))}
                    
                        >
                        <label class="ex1-label">Name on Card</label><i class="ex1-bar"></i>
                    </div>                          
                    <div class="ex1-field">                  
                        <div id="card-number" class="ex1-input"></div>
                        <label class="ex1-label">Card Number!</label><i class="ex1-bar"></i>
                    </div>
                    <div class="ex1-fields">
                      <div class="ex1-field">                    
                          <div id="card-expiry" class="ex1-input"></div>
                          <label class="ex1-label">Expiry</label><i class="ex1-bar"></i>
                      </div>
                      <div class="ex1-field">                    
                          <div id="card-cvc" class="ex1-input"></div>
                          <label class="ex1-label">CVC</label><i class="ex1-bar"></i>
                      </div>
                    </div>
                </div>
            </div>
            <button id="submit-button" type="submit" class="ex1-button">Pay $x & Tokenize</button>
            <div id="error" role="alert"></div>
            <div id="token"></div>
        </form>        
    </div>
   
   `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
