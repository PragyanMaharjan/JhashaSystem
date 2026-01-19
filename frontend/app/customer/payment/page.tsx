"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useState, useEffect } from "react";

export default function PaymentPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "Esewa" | "cash">("card");
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white">Loading...</div>;
  }

  // If no items in cart
  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-neutral-900">
        <div className="relative h-40 w-full">
          <Image
            src="/images/BackgroundPage.png"
            alt="Payment"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 h-full px-8 py-4 flex items-center justify-between">
            <h1 className="text-4xl font-bold text-white">Payment</h1>
            <Link
              href="/customer/cart"
              className="rounded-md border border-white bg-black/30 px-4 py-2 text-white hover:bg-white/10 transition"
            >
              ← Back to Cart
            </Link>
          </div>
        </div>

        <div className="px-8 py-12">
          <div className="max-w-2xl mx-auto bg-neutral-800 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-white/70 mb-8">Please add items to your cart before proceeding to payment.</p>
            <Link
              href="/customer"
              className="inline-block rounded-lg bg-linear-to-r from-indigo-500 to-pink-500 text-white px-8 py-3 font-bold hover:shadow-lg transition"
            >
              🍽️ Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-neutral-900">
        <div className="relative h-40 w-full">
          <Image
            src="/images/BackgroundPage.png"
            alt="Success"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 h-full px-8 py-4 flex items-center justify-between">
            <h1 className="text-4xl font-bold text-white">Order Confirmed</h1>
            <Link
              href="/customer"
              className="rounded-md border border-white bg-black/30 px-4 py-2 text-white hover:bg-white/10 transition"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        <div className="px-8 py-12">
          <div className="max-w-2xl mx-auto bg-linear-to-br from-green-900 to-emerald-900 rounded-lg p-8 text-center">
            <div className="text-7xl mb-4 animate-bounce">✓</div>
            <h2 className="text-4xl font-bold text-white mb-4">Order Placed Successfully!</h2>
            <p className="text-green-200 mb-2">Thank you for your order</p>
            <p className="text-white/70 mb-8">Your food will be delivered in approximately 30-45 minutes</p>
            
            <div className="bg-black/30 rounded-lg p-6 mb-8">
              <p className="text-white/80 mb-2">Order ID: <span className="text-green-300 font-bold">#ORD{Math.random().toString(36).substr(2, 9).toUpperCase()}</span></p>
              <p className="text-white/80">Total Amount: <span className="text-xl font-bold text-green-300">RS: {getTotalPrice() + 50}</span></p>
            </div>

            <Link
              href="/customer"
              className="inline-block rounded-lg bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 font-bold transition shadow-lg"
            >
              🏠 Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();
  const deliveryFee = 50;
  const finalAmount = totalPrice + deliveryFee;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setOrderPlaced(true);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header */}
      <div className="relative h-40 w-full">
        <Image
          src="/images/BackgroundPage.png"
          alt="Payment"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full px-8 py-4 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white">Payment</h1>
          <Link
            href="/customer/cart"
            className="rounded-md border border-white bg-black/30 px-4 py-2 text-white hover:bg-white/10 transition"
          >
            ← Back to Cart
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-neutral-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center pb-3 border-b border-neutral-700">
                  <div className="grow">
                    <p className="text-white font-semibold">{item.title}</p>
                    <p className="text-white/60 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-green-400 font-bold">RS: {item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-neutral-700">
              <div className="flex justify-between text-white/80">
                <span>Subtotal</span>
                <span>RS: {totalPrice}</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Delivery Fee</span>
                <span>RS: {deliveryFee}</span>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-neutral-700">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-green-400">RS: {finalAmount}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-neutral-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>

            <div className="space-y-4 mb-8">
              {/* Card Option */}
              <label className="flex items-center p-4 border-2 border-neutral-700 rounded-lg cursor-pointer hover:border-indigo-500 transition" style={{ borderColor: paymentMethod === "card" ? "#6366f1" : "inherit" }}>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value as "card" | "Esewa" | "cash")}
                  className="w-5 h-5"
                />
                <div className="ml-4 grow">
                  <p className="text-white font-semibold">💳 Credit/Debit Card</p>
                  <p className="text-white/60 text-sm">Visa, Mastercard, Rupay</p>
                </div>
              </label>

              {/* Esewa Option */}
              <label className="flex items-center p-4 border-2 border-neutral-700 rounded-lg cursor-pointer hover:border-indigo-500 transition" style={{ borderColor: paymentMethod === "Esewa" ? "#6366f1" : "inherit" }}>
                <input
                  type="radio"
                  name="payment"
                  value="Esewa"
                  checked={paymentMethod === "Esewa"}
                  onChange={(e) => setPaymentMethod(e.target.value as "card" | "Esewa" | "cash")}
                  className="w-5 h-5"
                />
                <div className="ml-4 grow">
                  <p className="text-white font-semibold">📱 Esewa</p>
                  <p className="text-white/60 text-sm">Fonepay</p>
                </div>
              </label>

              {/* Cash Option */}
              <label className="flex items-center p-4 border-2 border-neutral-700 rounded-lg cursor-pointer hover:border-indigo-500 transition" style={{ borderColor: paymentMethod === "cash" ? "#6366f1" : "inherit" }}>
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(e) => setPaymentMethod(e.target.value as "card" | "Esewa" | "cash")}
                  className="w-5 h-5"
                />
                <div className="ml-4 grow">
                  <p className="text-white font-semibold">💵 Cash on Delivery</p>
                  <p className="text-white/60 text-sm">Pay when you receive</p>
                </div>
              </label>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full py-3 rounded-lg bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-500 disabled:to-gray-500 text-white font-bold transition shadow-lg"
            >
              {isProcessing ? "Processing..." : `Place Order • RS: ${finalAmount}`}
            </button>

            <p className="text-center text-white/60 text-sm mt-4">Your payment information is secure and encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
}
