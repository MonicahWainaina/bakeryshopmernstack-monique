import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";



export default class PayPalButton extends React.Component {
  render() {
    const onSuccess = (payment) => {
      console.log("The payment was succeeded!", payment);
      this.props.tranSuccess(payment);
    };

    const onCancel = (data) => {
      console.log("The payment was cancelled!", data);
    };

    const onError = (err) => {
      console.log("Error!", err);
    };

    let env = "sandbox"; // you can set here to 'production' for production

    let amount = this.props.total;

    let currency = "USD";
    let success = onSuccess;







    const client = {
      sandbox:
        "ARYPxO6rlDf9kFQqpC4MPCgbzAvFW4btkRizT8UU7woYi_ekH4mdzPvBW3zlDtbwbMw9eyZAguqqIYek",
      production: "YOUR-PRODUCTION-APP-ID",
    };

    let style = {
      size: "small",
      color: "blue",
      shape: "rect",
      label: "checkout",
      tagline: false,
    };

    return (
      <PayPalScriptProvider
        options={{
          "client-id": "ARYPxO6rlDf9kFQqpC4MPCgbzAvFW4btkRizT8UU7woYi_ekH4mdzPvBW3zlDtbwbMw9eyZAguqqIYek",
        }}
      >
        <PayPalButtons
          env={env}
          client={client}
          style={style}
          commit={true}
          onError={onError}
          onCancel={onCancel}

          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
          }}
          onApprove={(data, actions) => onSuccess(data, actions)}

        />
      </PayPalScriptProvider>
    );
  }
}