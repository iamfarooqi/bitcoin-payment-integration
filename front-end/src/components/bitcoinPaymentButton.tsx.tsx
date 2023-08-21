import { useState } from "react";
import axios from "axios";

interface PaymentData {
  name: string;
  description: string;
  local_price: {
    amount: string;
    currency: string;
  };
  pricing_type: string;
  metadata: {
    order_id: string;
  };
  address: string;
  hosted_url: string;
}

const CoinbasePaymentButton: React.FC = () => {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  const createCharge = async () => {
    try {
      const response = await axios.post<PaymentData>(
        "https://api.commerce.coinbase.com/charges",
        {
          name: "Sample Charge",
          description: "Sample Description",
          local_price: {
            amount: "10.00",
            currency: "USD",
          },
          pricing_type: "fixed_price",
          metadata: {
            order_id: "12345",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CC-Api-Key": "37ad8476-9bce-4e5a-a5b1-0e1d7677dc24", // Replace with your Coinbase Commerce API Key
          },
        }
      );
      console.log(response.data, "response.data>>");

      setPaymentData(response.data);
    } catch (error) {
      console.error("Error creating charge:", error);
    }
  };

  const handlePayment = () => {
    if (paymentData) {
      window.open(paymentData.hosted_url, "_blank");
    }
  };

  return (
    <div>
      <button onClick={createCharge}>Create Bitcoin Payment</button>
      <br />
      {/* {paymentData && (
        <div>
          <p>
            Amount: {paymentData.local_price.amount}{" "}
            {paymentData.local_price.currency}
          </p>
          <p>Bitcoin Address: {paymentData.address}</p>
          <button onClick={handlePayment}>Pay with Bitcoin</button>
        </div>
      )} */}
    </div>
  );
};

export default CoinbasePaymentButton;
