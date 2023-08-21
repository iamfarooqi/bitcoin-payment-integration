// checkoutController.ts

import { Request, Response } from 'express';

var coinbase = require('coinbase-commerce-node');
var Client = coinbase.Client;
var resources = coinbase.resources;
var Webhook = coinbase.Webhook;
var Checkout = coinbase.resources.Checkout;

Client.init(process.env.COINBASE_API);

export const checkout = async (req: Request, res: Response): Promise<void> => {
  console.log('hello');
  const { amount, currency } = req.body;
  console.log(amount, currency, 'amount, currency');

  try {
    const charge = await resources.Charge.create({
      name: 'Test Charge',
      description: 'Test Charge Description',
      local_price: {
        amount: amount,
        currency: currency,
      },
      pricing_type: 'fixed_price',
      metadata: {
        user_id: '3434',
      },
    });

    res
      .status(200)
      .json({ message: 'Checkout created successfully', data: charge });
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
export const webhooks = async (req: Request, res: Response): Promise<void> => {
  try {
    // Retrieve data from the request body
    const event = Webhook.verifyEventBody(
      req.rawBody,
      req.headers['x-cc-webhook-signature'],
      process.env.COINBASE_WEBHOOK_SECRET
    );

    if (event.type === 'charge:confirmed') {
      let amount = event.data.pricing.local.amount;
      let currency = event.data.pricing.local.currency;
      let user_id = event.data.metadata.user_id;

      console.log(amount, currency, user_id, '>>>');
    }
    // Send a response
    res
      .status(200)
      .json({ message: 'Checkout created successfully', data: event });
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
