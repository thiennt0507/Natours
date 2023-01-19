const stripe = require('stripe')(
  'sk_test_51MRnsCHUmCUY15KbKOeISkjRjUCKTJLDlYtF5KsENxFuNe8ERX8NwJLQZOzKtHxHtSz5dJaUvInvtcQAJlRbLOtt00EKmrwEEk'
);
const AppError = require('../utils/appError');
const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1)Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: `http://localhost:8000/img/tours/${tour.imageCover}`,
        price: tour.price * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],
  });

  // 3) create session response

  res.status(200).json({
    status: 'success',
    session,
  });
});
