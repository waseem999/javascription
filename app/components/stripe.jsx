import React from 'react';

export default function (props) {
return (
        <div className="col-lg-12 col-lg-12" style={{textAlign : "center", backgroundColor : "grey"}}>
            <div>
            <h1>Checkout</h1>
          </div>
        <h3>Enter Credit Card Number</h3>
            <form onSubmit={props.handleSubmit} id="payment-form">
                <span className="payment-errors"></span>

            <div className="form-row">
                <label>
                <span>Card Number</span>
                <input type="text" size="20" data-stripe="number"/>
                </label>
            </div>

            <div className="form-row">
                <label>
                <span>Expiration (MM/YY)</span>
                <input type="text" size="2" data-stripe="exp_month"/>
                </label>
                <span> / </span>
                <input type="text" size="2" data-stripe="exp_year"/>
            </div>

            <div className="form-row">
                <label>
                <span>CVC</span>
                <input type="text" size="4" data-stripe="cvc"/>
                </label>
            </div>

            <div className="form-row">
                <label>
                <span>Billing ZIP Code</span>
                <input type="text" size="6" data-stripe="address_zip"/>
                </label>
            </div>

            <input type="submit" className="submit" value="Submit Payment" className="btn-sm btn-danger" style={{margin : "2em"}}/>
            </form>
        </div>
)
}