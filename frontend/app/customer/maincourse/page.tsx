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

export default function MainCoursePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [quantity, setQuantity] = useState(1);

  const mainCourses: Dish[] = [
    {
      id: "butter-chicken",
      title: "Butter Chicken",
      subtitle: "Creamy & Tender",
      description: "Tender chicken in a rich, creamy tomato-based sauce with aromatic spices.",
      price: 280,
      rating: 4.8,
      image: "/images/image.png",
    },
    {
      id: "biryani",
      title: "Chicken Biryani",
      subtitle: "Fragrant Rice Dish",
      description: "Basmati rice cooked with tender chicken, herbs, and aromatic spices.",
      price: 320,
      rating: 4.7,
      image: "/images/chickenChilli.png",
    },
    {
      id: "tandoori-chicken",
      title: "Tandoori Chicken",
      subtitle: "Smoky & Spicy",
      description: "Half chicken marinated in yogurt and spices, roasted in a clay oven.",
      price: 350,
      rating: 4.6,
      image: "/images/BBQ.png",
    },
    {
      id: "paneer-curry",
      title: "Paneer Tikka Masala",
      subtitle: "Vegetarian Delight",
      description: "Soft paneer cubes in a silky tomato cream sauce with Indian spices.",
      price: 250,
      rating: 4.5,
      image: "/images/image.png",
    },
    {
      id: "fish-curry",
      title: "Fish Curry",
      subtitle: "Spicy & Flavorful",
      description: "Fresh fish cooked in a traditional coconut and spice-based curry.",
      price: 380,
      rating: 4.7,
      image: "/images/coupleCombo.png",
    },
    {
      id: "vegetable-fried-rice",
      title: "Vegetable Fried Rice",
      subtitle: "Quick & Tasty",
      description: "Fluffy rice stir-fried with fresh vegetables and aromatic seasonings.",
      price: 200,
      rating: 4.4,
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
          alt="Main Course"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full px-8 py-4 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white">Main Course</h1>
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
          {mainCourses.map((dish) => (
            <button
              key={dish.id}
              onClick={() => openDish(dish)}
              className="text-left"
            >
              <div className="bg-linear-to-r from-pink-500 to-rose-500 rounded-lg overflow-hidden hover:brightness-[1.05] transition h-full">
                <div className="flex h-full">
                  <div className="flex-1 p-6 text-white flex flex-col justify-center">
                    <h2 className="text-2xl font-bold">{dish.title}</h2>
                    <p className="mt-2 font-semibold text-sm">{dish.subtitle}</p>
                    <p className="mt-4 text-lg font-bold">RS: {dish.price}</p>
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
