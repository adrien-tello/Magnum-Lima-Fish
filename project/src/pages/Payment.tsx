import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { CreditCard, Shield, Lock, Check, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { products } from '../data/mockData';
import { PaymentForm } from '../types';
import { formatUSDToXAF } from '../utils/currency';

const paymentSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  zipCode: yup.string().required('ZIP code is required'),
  country: yup.string().required('Country is required')
});

const Payment: React.FC = () => {
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PaymentForm>({
    resolver: yupResolver(paymentSchema)
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const productId = params.get('product');
    if (productId) {
      const product = products.find(p => p.id === productId);
      if (product) {
        setSelectedProduct(product);
      }
    }
  }, [location]);

  const subtotal = selectedProduct.price * quantity;
  const tax = subtotal * 0.08; // 8% tax
  const shipping = 15.99;
  const total = subtotal + tax + shipping;

  const onSubmit = async (data: PaymentForm) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Complete!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order confirmation has been sent to your email.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Order #12345</p>
            <p className="font-semibold text-gray-900">{selectedProduct.name}</p>
            <p className="text-green-600 font-bold">${total.toFixed(2)}</p>
          </div>
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Continue Shopping
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Products</span>
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            {/* Product */}
            <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{selectedProduct.name}</h3>
                <p className="text-gray-600 text-sm">{selectedProduct.category}</p>
                <p className="text-green-600 font-bold">{formatUSDToXAF(selectedProduct.price)}</p>
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-semibold min-w-[2rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatUSDToXAF(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold">{formatUSDToXAF(tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">{formatUSDToXAF(shipping)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200 text-lg font-bold">
                <span>Total</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  {formatUSDToXAF(total)}
                </span>
              </div>
            </div>

            {/* Security Features */}
            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">Secure Payment</span>
              </div>
              <p className="text-green-700 text-sm">
                Your payment information is encrypted and secure. We use industry-standard SSL encryption.
              </p>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>

            {/* Payment Method Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'card', label: 'Credit Card', icon: CreditCard },
                  { id: 'paypal', label: 'PayPal', icon: Lock },
                  { id: 'apple', label: 'Apple Pay', icon: Shield }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setPaymentMethod(id)}
                    className={`p-3 border rounded-lg flex flex-col items-center space-y-2 transition-all ${
                      paymentMethod === id
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Billing Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      {...register('firstName')}
                      type="text"
                      placeholder="First name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register('lastName')}
                      type="text"
                      placeholder="Last name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-4">
                  <input
                    {...register('address')}
                    type="text"
                    placeholder="Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <input
                      {...register('city')}
                      type="text"
                      placeholder="City"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register('zipCode')}
                      type="text"
                      placeholder="ZIP code"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <select
                    {...register('country')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                  )}
                </div>
              </div>

              {/* Card Information (Mock) */}
              {paymentMethod === 'card' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Information</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Card number (Test: 4242 4242 4242 4242)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isProcessing}
                whileHover={!isProcessing ? { scale: 1.02 } : {}}
                whileTap={!isProcessing ? { scale: 0.98 } : {}}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-xl transition-shadow disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Complete Order - {formatUSDToXAF(total)}</span>
                  </>
                )}
              </motion.button>

              <p className="text-center text-sm text-gray-500">
                This is a demo payment system. No real transactions will be processed.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Payment;