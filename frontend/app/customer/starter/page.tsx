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

export default function StarterPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [quantity, setQuantity] = useState(1);

  const starters: Dish[] = [
    {
      id: "samosa",
      title: "Samosa",
      subtitle: "Crispy & Golden",
      description: "Crispy pastry filled with spiced potatoes and peas. A classic Indian starter.",
      price: 80,
      rating: 4.5,
      image: "/images/BBQ.png",
    },
    {
      id: "paneer-tikka",
      title: "Paneer Tikka",
      subtitle: "Grilled Paneer Cubes",
      description: "Marinated cottage cheese cubes grilled to perfection with aromatic spices.",
      price: 150,
      rating: 4.7,
      image: "/images/BBQ.png",
    },
    {
      id: "spring-rolls",
      title: "Spring Rolls",
      subtitle: "Veggie Delight",
      description: "Crispy spring rolls filled with fresh vegetables and served with sweet chili sauce.",
      price: 100,
      rating: 4.4,
      image: "/images/image.png",
    },
    {
      id: "chicken-wings",
      title: "Chicken Wings",
      subtitle: "Spicy & Tangy",
      description: "BBQ glazed chicken wings with a perfect blend of spice and sweetness.",
      price: 120,
      rating: 4.6,
      image: "/images/chickenChilli.png",
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
          alt="Starters"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full px-8 py-4 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white">Starters</h1>
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
          {starters.map((dish) => (
            <button
              key={dish.id}
              onClick={() => openDish(dish)}
              className="text-left"
            >
              <div className="bg-linear-to-r from-indigo-500 to-blue-500 rounded-lg overflow-hidden hover:brightness-[1.05] transition h-full">
                <div className="flex h-full">
                  <div className="flex-1 p-6 text-white flex flex-col justify-center">
                    <h2 className="text-2xl font-bold">{dish.title}</h2>
                    <p className="mt-2 font-semibold text-sm">{dish.subtitle}</p>
                    <p className="mt-4 text-lg font-bold">₹{dish.price}</p>
                    <div className="mt-2 flex items-center gap-1">
                      <span className="text-yellow-300">★</span>
                      <span className="text-sm">{dish.rating}</span>
                    </div>
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
