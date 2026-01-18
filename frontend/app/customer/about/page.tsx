"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Header */}
      <div className="relative h-60 w-full">
        <Image
          src="/images/BackgroundPage.png"
          alt="About Jhasha"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full px-8 py-4 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-bold">About Jhasha</h1>
          <p className="mt-4 text-xl text-cyan-300">
            Crafting authentic flavors, creating memorable experiences
          </p>
          <Link
            href="/customer"
            className="mt-6 text-cyan-300 hover:text-cyan-200 underline underline-offset-4"
          >
            ← Back to Menu
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-16 space-y-12">
        {/* Our Story */}
        <section className="bg-neutral-800 rounded-lg p-8 border border-indigo-500/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-linear-to-b from-indigo-500 to-pink-500" />
            <h2 className="text-3xl font-bold">Our Story</h2>
          </div>
          <p className="text-gray-300 leading-relaxed text-lg">
            Jhasha Restaurant was founded with a simple mission: to bring authentic, 
            delicious Indian cuisine to your table. What started as a small family kitchen 
            has grown into a beloved dining destination where every dish tells a story of 
            tradition, passion, and culinary excellence.
          </p>
          <p className="text-gray-300 leading-relaxed text-lg mt-4">
            Our chefs combine time-honored recipes with modern cooking techniques to create 
            dishes that are both familiar and excitingly new. Every ingredient is carefully 
            selected to ensure the highest quality and authentic flavors.
          </p>
        </section>

        {/* Our Values */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-linear-to-b from-indigo-500 to-pink-500" />
            <h2 className="text-3xl font-bold">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🍴",
                title: "Quality",
                desc: "Fresh ingredients, authentic recipes, and meticulous preparation in every dish.",
              },
              {
                icon: "❤️",
                title: "Passion",
                desc: "We cook with love and dedication, treating every meal as a gift to our guests.",
              },
              {
                icon: "🤝",
                title: "Customer First",
                desc: "Your satisfaction is our priority. We listen, adapt, and serve with pride.",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-neutral-800 rounded-lg p-6 border border-indigo-500/30 text-center hover:border-indigo-500 transition"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-neutral-800 rounded-lg p-8 border border-indigo-500/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-linear-to-b from-indigo-500 to-pink-500" />
            <h2 className="text-3xl font-bold">Why Choose Jhasha?</h2>
          </div>
          <ul className="space-y-4 text-gray-300 text-lg">
            {[
              "🎯 Authentic Indian cuisine prepared by experienced chefs",
              "🌶️ Premium spices imported directly from India",
              "⚡ Quick preparation without compromising on quality",
              "🎨 Beautiful presentation that's Instagram-worthy",
              "💰 Affordable pricing with regular combo deals",
              "🚚 Fast delivery and excellent customer service",
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-4">
                <span className="text-2xl">{item.split(" ")[0]}</span>
                <span>{item.slice(2)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Team */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-linear-to-b from-indigo-500 to-pink-500" />
            <h2 className="text-3xl font-bold">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Chef Rajesh",
                role: "Head Chef",
                desc: "25 years of culinary experience in authentic Indian cooking.",
              },
              {
                name: "Priya Sharma",
                role: "Chef de Cuisine",
                desc: "Specializes in traditional recipes passed down through generations.",
              },
              {
                name: "Amit Patel",
                role: "Kitchen Manager",
                desc: "Ensures quality and consistency in every dish prepared.",
              },
              {
                name: "Neha Singh",
                role: "Customer Service Lead",
                desc: "Dedicated to making every customer's experience memorable.",
              },
            ].map((member, idx) => (
              <div
                key={idx}
                className="bg-neutral-800 rounded-lg p-6 border border-indigo-500/30"
              >
                <div className="w-16 h-16 rounded-full bg-orange-500 mb-4 flex items-center justify-center text-2xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-orange-400 text-sm font-semibold mb-2">{member.role}</p>
                <p className="text-gray-400">{member.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact & Hours */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-800 rounded-lg p-8 border border-indigo-500/30">
            <h3 className="text-2xl font-bold mb-6">📍 Location</h3>
            <p className="text-gray-300 mb-2">Jhasha Restaurant</p>
            <p className="text-gray-400 mb-4">
              123 Food Street, Culinary District<br />
              City, State 12345<br />
              India
            </p>
            <p className="text-orange-400">+91 98765 43210</p>
            <p className="text-orange-400">info@jhasarestaurant.com</p>
          </div>

          <div className="bg-neutral-800 rounded-lg p-8 border border-indigo-500/30">
            <h3 className="text-2xl font-bold mb-6">⏰ Hours</h3>
            <div className="space-y-2 text-gray-300">
              <p><span className="font-semibold">Monday - Friday:</span> 11:00 AM - 11:00 PM</p>
              <p><span className="font-semibold">Saturday:</span> 10:00 AM - 12:00 AM</p>
              <p><span className="font-semibold">Sunday:</span> 10:00 AM - 11:00 PM</p>
            </div>
            <p className="text-orange-400 mt-4">🚚 Delivery available till 10:30 PM</p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-8">
          <h2 className="text-3xl font-bold mb-4">Ready to taste the magic?</h2>
          <p className="text-gray-300 mb-6 text-lg">
            Explore our menu and order your favorite dishes today!
          </p>
          <Link
            href="/customer"
            className="inline-block bg-linear-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            View Menu
          </Link>
        </section>
      </div>
    </div>
  );
}
