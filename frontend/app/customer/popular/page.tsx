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

export default function PopularPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [quantity, setQuantity] = useState(1);

  const popularDishes: Dish[] = [
    {
      id: "bbq-wings",
      title: "BBQ Chicken Wings",
      subtitle: "Customer's Favorite",
      description: "Tender BBQ wings glazed in rich smoky sauce - the most ordered dish!",
      price: 200,
      rating: 4.9,
      image: "/images/BBQ.png",
    },
    {
      id: "butter-chicken",
      title: "Butter Chicken",
      subtitle: "All-Time Classic",
      description: "Creamy tomato-based chicken curry that never goes out of style.",
      price: 280,
      rating: 4.8,
      image: "/images/image.png",
    },
    {
      id: "chicken-chilli",
      title: "Chicken Chilli",
      subtitle: "Spicy Favorite",
      description: "Crispy chicken stir-fried with fresh vegetables in bold, spicy sauce.",
      price: 240,
      rating: 4.7,
      image: "/images/chickenChilli.png",
    },
    {
      id: "biryani",
      title: "Chicken Biryani",
      subtitle: "Signature Dish",
      description: "Fragrant basmati rice with tender chicken - our most-loved rice dish.",
      price: 320,
      rating: 4.8,
      image: "/images/coupleCombo.png",
    },
    {
      id: "tandoori-tikka",
      title: "Tandoori Chicken Tikka",
      subtitle: "Smoky & Juicy",
      description: "Marinated chicken cubes roasted in traditional clay oven.",
      price: 260,
      rating: 4.7,
      image: "/images/BBQ.png",
    },
    {
      id: "paneer-tikka-masala",
      title: "Paneer Tikka Masala",
      subtitle: "Vegetarian Hit",
      description: "Soft paneer in silky tomato cream sauce - a vegetarian bestseller.",
      price: 250,
      rating: 4.6,
      image: "/images/image.png",
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
    closeDish();
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header */}
      <div className="relative h-40 w-full">
        <Image
          src="/images/BackgroundPage.png"
          alt="Popular"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full px-8 py-4 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white">Popular Dishes</h1>
          <Link
            href="/customer"
            className="text-cyan-300 hover:text-cyan-200 underline underline-offset-4"
          >
            ← Back
          </Link>
        </div>
      </div>

      {/* Dishes Grid */}
      <div className="px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popularDishes.map((dish) => (
            <button
              key={dish.id}
              onClick={() => openDish(dish)}
              className="text-left"
            >
              <div className="bg-linear-to-r from-purple-600 to-pink-600 rounded-lg overflow-hidden hover:brightness-[1.05] transition h-full relative">
                {/* Star badge */}
                <div className="absolute top-3 right-3 bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-sm font-bold">
                  ★ {dish.rating}
                </div>

                <div className="flex h-full">
                  <div className="flex-1 p-6 text-white flex flex-col justify-center">
                    <h2 className="text-2xl font-bold">{dish.title}</h2>
                    <p className="mt-2 font-semibold text-sm">{dish.subtitle}</p>
                    <p className="mt-4 text-lg font-bold">RS: {dish.price}</p>
                  </div>
                  <div className="relative w-40 h-48">
                    <Image
                      src={dish.image}
                      alt={dish.title}
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
