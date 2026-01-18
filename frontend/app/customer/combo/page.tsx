"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DishModal from "@/app/components/DishModal";

type Dish = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  rating: number;
  image: string;
};

export default function ComboPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [quantity, setQuantity] = useState(1);

  const combos: Dish[] = [
    {
      id: "family-combo",
      title: "Family Combo",
      subtitle: "Perfect for 4-5 People",
      description: "2 Main curries, 1 Biryani, Naan, Salad & Free Dessert. Everything a family needs!",
      price: 999,
      rating: 4.8,
      image: "/images/image.png",
    },
    {
      id: "couple-combo",
      title: "Couple's Combo",
      subtitle: "Perfect for 2 People",
      description: "2 Main dishes, 1 Biryani, Naan & Sweet - romantic and delicious!",
      price: 520,
      rating: 4.7,
      image: "/images/coupleCombo.png",
    },
    {
      id: "party-combo",
      title: "Party Combo",
      subtitle: "Perfect for 8-10 People",
      description: "4 Curries, 2 Biryanis, Starters, Naan, Raita & Dessert. Great for celebrations!",
      price: 1999,
      rating: 4.9,
      image: "/images/BBQ.png",
    },
    {
      id: "starter-combo",
      title: "Starter Pack",
      subtitle: "Appetizer Collection",
      description: "Samosa, Paneer Tikka, Spring Rolls & Chicken Wings with dips.",
      price: 299,
      rating: 4.5,
      image: "/images/chickenChilli.png",
    },
    {
      id: "bbq-combo",
      title: "BBQ Night Combo",
      subtitle: "Grilled Delights",
      description: "Tandoori Chicken, Tikka, Kebabs & Naan - perfect for BBQ lovers!",
      price: 799,
      rating: 4.8,
      image: "/images/image.png",
    },
    {
      id: "veg-combo",
      title: "Vegetarian Feast",
      subtitle: "100% Vegetarian",
      description: "Paneer Tikka Masala, Vegetable Biryani, Starters & Naan.",
      price: 599,
      rating: 4.6,
      image: "/images/coupleCombo.png",
    },
  ];

  function openDish(dish: Dish) {
    setSelectedDish(dish);
    setQuantity(1);
    setModalOpen(true);
  }

  function closeDish() {
    setModalOpen(false);
    setSelectedDish(null);
  }

  function addToCart() {
    alert(`Added ${quantity} x ${selectedDish?.title} to cart`);
    closeDish();
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header */}
      <div className="relative h-40 w-full">
        <Image
          src="/images/BackgroundPage.png"
          alt="Combo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Combo Offers</h1>
            <p className="text-cyan-300 text-sm mt-2">Save more when you order together!</p>
          </div>
          <Link
            href="/customer"
            className="text-cyan-300 hover:text-cyan-200 underline underline-offset-4"
          >
            ← Back
          </Link>
        </div>
      </div>

      {/* Combos Grid */}
      <div className="px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {combos.map((combo) => (
            <button
              key={combo.id}
              onClick={() => openDish(combo)}
              className="text-left"
            >
              <div className="bg-linear-to-br from-amber-500 to-orange-600 rounded-lg overflow-hidden hover:brightness-[1.05] transition h-full relative">
                {/* Discount/Star badge */}
                <div className="absolute top-3 right-3 bg-yellow-300 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                  SAVE 20%
                </div>

                <div className="flex h-full">
                  <div className="flex-1 p-6 text-white flex flex-col justify-center">
                    <h2 className="text-2xl font-bold">{combo.title}</h2>
                    <p className="mt-2 font-semibold text-sm">{combo.subtitle}</p>
                    <p className="mt-3 text-sm opacity-90">{combo.description}</p>
                    <p className="mt-4 text-2xl font-bold">₹{combo.price}</p>
                    <div className="mt-2 flex items-center gap-1">
                      <span className="text-yellow-300">★</span>
                      <span className="text-sm">{combo.rating}</span>
                    </div>
                  </div>
                  <div className="relative w-40 h-48">
                    <Image
                      src={combo.image}
                      alt={combo.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <DishModal
        open={modalOpen}
        dish={selectedDish}
        quantity={quantity}
        setQuantity={setQuantity}
        onClose={closeDish}
        onAddToCart={addToCart}
      />
    </div>
  );
}
