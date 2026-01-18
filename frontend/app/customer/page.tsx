"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Your structure: app/components/DishModal.tsx
// From app/customer/page.tsx -> ../components/DishModal ✅
import DishModal from "../components/DishModal";

type Dish = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  rating: number;
  image: string;
};

export default function CustomerPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>("");

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Get user email from localStorage
    const email = localStorage.getItem("userEmail") || "Guest";
    setUserEmail(email);
  }, []);

  // Dishes data
  const dishes: Dish[] = useMemo(
    () => [
      {
        id: "special",
        title: "Today’s Special",
        subtitle: "BBQ Chicken Wings + Free Coke",
        description:
          "Tender BBQ wings glazed in rich smoky sauce, served with an ice-cold Coke for the perfect combo.",
        price: 200,
        rating: 4.6,
        image: "/images/BBQ.png",
      },
      {
        id: "family-1",
        title: "Family Combo",
        subtitle: "Perfect for the whole family",
        description:
          "Tender chicken stir-fried with fresh vegetables in a bold, spicy sauce—perfectly balanced and full of flavor",
        price: 450,
        rating: 4.4,
        image: "/images/image.png",
      },
      {
        id: "family-2",
        title: "Chicken Chilli",
        subtitle: "Cripsy, Spicy, All-Time Favourite",
        description:
          "A big combo meal designed for family gatherings—fresh, filling, and delicious.",
        price: 500,
        rating: 4.5,
        image: "/images/chickenChilli.png",
      },
      {
        id: "family-3",
        title: "Couple's Combo",
        subtitle: "Perfect for your loved ones",
        description:
          "A value-packed combo for two with tasty mains and sides—great for sharing.",
        price: 520,
        rating: 4.3,
        image: "/images/coupleCombo.png",
      },
    ],
    []
  );

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [quantity, setQuantity] = useState(1);

  function openDish(d: Dish) {
    setSelectedDish(d);
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

  function handleLogout() {
    setSidebarOpen(false);
    router.push("/"); // ✅ back to main page.tsx
  }

  return (
    <div className="min-h-screen bg-neutral-900 p-0">
      <div className="w-full">
        <div className="w-full bg-white shadow-2xl overflow-hidden relative">
          {/* Backdrop for sidebar */}
          {sidebarOpen && (
            <button
              aria-label="Close sidebar"
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside
            className={[
              "fixed left-0 top-0 z-50 h-full w-64 bg-linear-to-b from-indigo-900 to-purple-900 text-white shadow-2xl",
              "transform transition-transform duration-300",
              sidebarOpen ? "translate-x-0" : "-translate-x-full",
            ].join(" ")}
          >
            {/* Sidebar Header */}
            <div className="px-5 py-4 border-b border-pink-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-linear-to-br from-pink-500 to-cyan-500 flex items-center justify-center font-bold text-white">
                  {userEmail.charAt(0).toUpperCase()}
                </div>
                <p className="text-sm font-semibold text-white/80 truncate">{userEmail}</p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/15 transition grid place-items-center"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Sidebar Navigation */}
            <nav className="p-5 space-y-2">
              <Link
                href="/customer"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-md bg-linear-to-r from-pink-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-white hover:shadow-lg transition"
              >
                <span>🏠</span>
                Home
              </Link>

              <Link
                href="/customer/about"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-md px-4 py-3 text-sm font-semibold text-white/70 hover:bg-white/10 transition"
              >
                <span>ℹ️</span>
                About Us
              </Link>

              <Link
                href="#"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-md px-4 py-3 text-sm font-semibold text-white/70 hover:bg-white/10 transition"
              >
                <span>📋</span>
                Your Orders
              </Link>

              <hr className="border-white/20 my-3" />

              {/* ✅ Logout Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 w-full rounded-md border border-red-500/50 bg-red-500/10 px-4 py-3 text-left text-sm font-semibold text-red-400 hover:bg-red-500/20 hover:border-red-500 transition"
              >
                <span>🚪</span>
                Logout
              </button>
            </nav>
          </aside>

          {/* HEADER */}
          <div className="relative h-50 sm:h-60 md:h-70 w-full">
            {/* Background image */}
            <Image
              src="/images/BackgroundPage.png"
              alt="Header background"
              fill
              className="object-cover"
              priority
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative z-10 h-full px-4 sm:px-8 py-4 sm:py-6">
              <div className="grid grid-cols-3 items-start">
                {/* LEFT — Welcome */}
                <div className="text-white max-w-130">
                  <p className="text-xs sm:text-sm md:text-base text-cyan-300 font-semibold">
                    Welcome back, {userEmail.split("@")[0]}!
                  </p>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold mt-1">
                    Jhasha Restaurant
                  </h1>
                  <p className="mt-1 text-sm sm:text-base md:text-lg font-semibold">
                    Order your favorite dishes now
                  </p>
                </div>

                {/* CENTER — Logo */}
                <div className="flex justify-center text-center">
                  <div>
                    <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border-2 border-cyan-400 text-xl sm:text-2xl font-semibold text-cyan-300 shadow-lg">
                      J
                    </div>
                    <p className="mt-2 text-[11px] sm:text-[12px] tracking-[0.35em] text-cyan-200">
                      JHASHA
                    </p>
                    <p className="text-[9px] sm:text-[10px] tracking-[0.45em] text-cyan-200/90">
                      RESTAURANT
                    </p>
                  </div>
                </div>

                {/* RIGHT — Menu & Cart */}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="rounded-md border border-cyan-400 bg-black/30 px-3 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-500 hover:text-black transition"
                  >
                    ☰ Menu
                  </button>
                  <Link
                    href="/customer/cart"
                    className="rounded-md border border-cyan-400 bg-black/30 px-3 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-500 hover:text-black transition flex items-center gap-2"
                  >
                    🛒 Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <div className="flex items-center gap-3 px-4 sm:px-8 py-4 bg-white shadow-md">
            <button
              onClick={() => setSidebarOpen(true)}
              className="h-11 w-11 rounded-md bg-linear-to-br from-indigo-500 to-pink-500 text-white shadow hover:shadow-lg transition grid place-items-center"
              aria-label="Open menu"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M21 21l-4.3-4.3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>

              <input
                type="text"
                placeholder="Search dishes..."
                className="h-11 w-full rounded-md border border-indigo-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 shadow-sm"
              />
            </div>
          </div>

          {/* ✅ CATEGORIES + CART */}
          <div className="px-4 sm:px-8 py-6 bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900">
            <div className="flex items-center justify-between gap-3">
              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                <Link
                  href="/customer/starter"
                  className="shrink-0 rounded-lg bg-linear-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-5 py-2.5 text-xs font-bold transition shadow-md"
                >
                  🥘 STARTER
                </Link>

                <Link
                  href="/customer/maincourse"
                  className="shrink-0 rounded-lg bg-linear-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-5 py-2.5 text-xs font-bold transition shadow-md"
                >
                  🍗 MAIN COURSE
                </Link>

                <Link
                  href="/customer/drinks"
                  className="shrink-0 rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-5 py-2.5 text-xs font-bold transition shadow-md"
                >
                  🥤 DRINKS
                </Link>

                <Link
                  href="/customer/popular"
                  className="shrink-0 rounded-lg bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-5 py-2.5 text-xs font-bold transition shadow-md"
                >
                  ⭐ POPULAR
                </Link>

                <Link
                  href="/customer/combo"
                  className="shrink-0 rounded-lg bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-5 py-2.5 text-xs font-bold transition shadow-md"
                >
                  🎁 COMBO
                </Link>
              </div>

              {/* Cart Icon */}
              <Link
                href="/customer/cart"
                aria-label="Cart"
                className="shrink-0 h-12 w-12 rounded-lg bg-linear-to-br from-indigo-500 to-pink-500 hover:shadow-lg grid place-items-center text-white transition shadow-md"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 6h15l-1.5 9h-12L6 6Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6 5 3H2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* FEATURED DISHES */}
          <div className="px-4 sm:px-8 py-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">🔥 Featured Dishes</h2>
              <p className="text-gray-400">Check out our special recommendations</p>
            </div>
            
            <div className="space-y-5">
              {dishes.map((dish) => (
                <button
                  key={dish.id}
                  onClick={() => openDish(dish)}
                  className="w-full text-left group"
                >
                  <div className="flex flex-col md:flex-row bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                    <div className="flex-1 p-6 text-white">
                      <h2 className="text-2xl sm:text-3xl font-bold group-hover:text-indigo-100 transition">
                        {dish.title}
                      </h2>
                      <p className="mt-2 font-semibold text-indigo-100">{dish.subtitle}</p>
                      <p className="mt-3 text-sm text-white/90 line-clamp-2">{dish.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-2xl font-bold">₹{dish.price}</span>
                        <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                          <span className="text-yellow-300">★</span>
                          <span className="text-sm font-semibold">{dish.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative h-40 md:h-auto md:w-70 overflow-hidden">
                      <Image
                        src={dish.image}
                        alt={dish.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
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
 