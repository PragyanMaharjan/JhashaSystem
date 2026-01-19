"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useEffect, useState } from "react";

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white">Loading...</div>;
  }

  // If no items in cart
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-900">
        <div className="relative h-40 w-full">
          <Image
            src="/images/BackgroundPage.png"
            alt="Cart"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 h-full px-8 py-4 flex items-center justify-between">
            <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>
            <Link
              href="/customer"
              className="rounded-md border border-white bg-black/30 px-4 py-2 text-white hover:bg-white/10 transition"
            >
              ← Back
            </Link>
          </div>
        </div>

        <div className="px-8 py-12">
          <div className="max-w-4xl mx-auto bg-neutral-800 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-white/70 mb-8">Please select a dish first to add items to your cart.</p>
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

  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header */}
      <div className="relative h-40 w-full">
        <Image
          src="/images/BackgroundPage.png"
          alt="Cart"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full px-8 py-4 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>
          <Link
            href="/customer"
            className="rounded-md border border-white bg-black/30 px-4 py-2 text-white hover:bg-white/10 transition"
          >
            ← Back
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-neutral-800 rounded-lg overflow-hidden">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex flex-col sm:flex-row items-center gap-4 p-6 ${
                    index !== items.length - 1 ? "border-b border-neutral-700" : ""
                  }`}
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="grow text-center sm:text-left">
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-yellow-400 font-semibold">RS: {item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-neutral-700 rounded-lg p-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8 rounded bg-neutral-600 hover:bg-neutral-500 text-white transition"
                    >
                      −
                    </button>
                    <div className="min-w-10 text-center text-white font-semibold">
                      {String(item.quantity).padStart(2, "0")}
                    </div>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 rounded bg-neutral-600 hover:bg-neutral-500 text-white transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-24">
                    <p className="text-white/70 text-sm">Subtotal</p>
                    <p className="text-xl font-bold text-green-400">
                      RS: {item.price * item.quantity}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="h-10 w-10 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300 transition flex items-center justify-center"
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-linear-to-br from-indigo-900 to-purple-900 rounded-lg p-6 h-fit sticky top-6">
            <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

            {/* Items Count */}
            <div className="flex justify-between text-white/80 mb-3">
              <span>Items ({items.length})</span>
              <span>{items.reduce((sum, item) => sum + item.quantity, 0)} items</span>
            </div>

            {/* Subtotal */}
            <div className="flex justify-between text-white/80 mb-3">
              <span>Subtotal</span>
              <span>RS: {totalPrice}</span>
            </div>

            {/* Delivery Fee */}
            <div className="flex justify-between text-white/80 mb-6 pb-6 border-b border-white/20">
              <span>Delivery Fee</span>
              <span>RS: 50</span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-white">Total</span>
              <span className="text-2xl font-bold text-green-400">RS: {totalPrice + 50}</span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => router.push("/customer")}
                className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition"
              >
                🛍️ Add More Items
              </button>
              <button
                onClick={() => router.push("/customer/payment")}
                className="w-full py-3 rounded-lg bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold transition shadow-lg"
              >
                💳 Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
