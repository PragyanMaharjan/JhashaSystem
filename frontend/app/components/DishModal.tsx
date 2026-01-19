"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

type Dish = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  rating: number;
  image: string;
};

export default function DishModal({
  open,
  dish,
  quantity,
  setQuantity,
  onClose,
  onAddToCart,
}: {
  open: boolean;
  dish: Dish | null;
  quantity: number;
  setQuantity: (n: number) => void;
  onClose: () => void;
  onAddToCart: () => void;
}) {
  const router = useRouter();
  const { addToCart } = useCart();

  if (!open || !dish) return null;

  const handleAddToCart = () => {
    addToCart({
      id: dish.id,
      title: dish.title,
      price: dish.price,
      quantity: quantity,
      image: dish.image,
    });
    onAddToCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3">
      {/* backdrop */}
      <button
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* modal */}
      <div className="relative z-10 w-full max-w-xl rounded-xl bg-[#3b3b3b] text-white shadow-2xl">
        {/* header */}
        <div className="flex items-start justify-between gap-3 px-5 pt-4">
          <div>
            <div className="text-sm font-semibold text-white/90">
              ⭐ <span className="italic">{dish.title}</span> •{" "}
              <span className="italic">{dish.subtitle}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-red-500/90 hover:bg-red-500 grid place-items-center transition"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* body */}
        <div className="grid grid-cols-1 gap-4 px-5 pb-5 pt-3 sm:grid-cols-[160px_1fr]">
          <div className="relative h-32 w-full overflow-hidden rounded-lg sm:h-36">
            <Image src={dish.image} alt={dish.title} fill className="object-cover" />
          </div>

          <div>
            <div className="flex items-center gap-3 text-sm text-white/80">
              <span className="text-orange-300">★ {dish.rating}</span>
              <span className="text-white/40">♡</span>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-white/90">
              {dish.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-md bg-white px-3 py-1 text-sm font-bold text-orange-600">
                PRICE : {dish.price}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-8 w-8 rounded-md bg-white/10 hover:bg-white/15 transition"
                >
                  −
                </button>
                <div className="min-w-10 text-center text-sm font-semibold">
                  {String(quantity).padStart(2, "0")}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8 rounded-md bg-white/10 hover:bg-white/15 transition"
                >
                  +
                </button>
                <span className="ml-2 text-sm text-white/80">Quantity</span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-4 w-full rounded-md bg-[#c14949] py-2 text-sm font-semibold hover:brightness-110 transition"
            >
              ✓ Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
