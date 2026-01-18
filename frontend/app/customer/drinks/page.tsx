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

export default function DrinksPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [quantity, setQuantity] = useState(1);

  const drinks: Dish[] = [
    {
      id: "coke",
      title: "Coca Cola",
      subtitle: "Cold & Refreshing",
      description: "Ice-cold Coca Cola to quench your thirst.",
      price: 40,
      rating: 4.3,
      image: "/images/BBQ.png",
    },
    {
      id: "sprite",
      title: "Sprite",
      subtitle: "Lemon-Lime Flavored",
      description: "Crisp and refreshing lemon-lime flavored soft drink.",
      price: 40,
      rating: 4.2,
      image: "/images/image.png",
    },
    {
      id: "mango-shake",
      title: "Mango Shake",
      subtitle: "Creamy & Smooth",
      description: "Thick and creamy mango shake made with fresh mangoes.",
      price: 100,
      rating: 4.6,
      image: "/images/chickenChilli.png",
    },
    {
      id: "lassi",
      title: "Sweet Lassi",
      subtitle: "Traditional Yogurt Drink",
      description: "Chilled sweet yogurt drink with cardamom and rose essence.",
      price: 80,
      rating: 4.5,
      image: "/images/coupleCombo.png",
    },
    {
      id: "iced-tea",
      title: "Iced Tea",
      subtitle: "Refreshing & Cool",
      description: "Iced lemon tea with a hint of mint - perfect for hot days.",
      price: 60,
      rating: 4.4,
      image: "/images/image.png",
    },
    {
      id: "fresh-juice",
      title: "Fresh Juice",
      subtitle: "Orange Fresh",
      description: "Fresh orange juice made daily with natural oranges.",
      price: 90,
      rating: 4.7,
      image: "/images/BBQ.png",
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
          alt="Drinks"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full px-8 py-4 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white">Drinks</h1>
          <Link
            href="/customer"
            className="text-cyan-300 hover:text-cyan-200 underline underline-offset-4"
          >
            ← Back
          </Link>
        </div>
      </div>

      {/* Drinks Grid */}
      <div className="px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {drinks.map((drink) => (
            <button
              key={drink.id}
              onClick={() => openDish(drink)}
              className="text-left"
            >
              <div className="bg-linear-to-r from-cyan-500 to-blue-500 rounded-lg overflow-hidden hover:brightness-[1.05] transition h-full">
                <div className="flex h-full">
                  <div className="flex-1 p-6 text-white flex flex-col justify-center">
                    <h2 className="text-2xl font-bold">{drink.title}</h2>
                    <p className="mt-2 font-semibold text-sm">{drink.subtitle}</p>
                    <p className="mt-4 text-lg font-bold">₹{drink.price}</p>
                    <div className="mt-2 flex items-center gap-1">
                      <span className="text-yellow-300">★</span>
                      <span className="text-sm">{drink.rating}</span>
                    </div>
                  </div>
                  <div className="relative w-40 h-48">
                    <Image
                      src={drink.image}
                      alt={drink.title}
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
