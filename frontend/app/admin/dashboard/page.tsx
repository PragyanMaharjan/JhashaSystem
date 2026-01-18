"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-white to-gray-50 shadow-xl border-r border-gray-200">
        {/* Logo */}
        <div className="p-6 border-b bg-gradient-to-r from-orange-50 to-amber-50">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">Jhasha</h1>
          <p className="text-xs text-gray-600 mt-1 font-medium">Restaurant Admin</p>
        </div>

        {/* Menu Items */}
        <nav className="p-3 flex-1 overflow-y-auto">
          <div className="space-y-1">
            <button
              onClick={() => setActiveMenu("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition duration-200 ${
                activeMenu === "dashboard"
                  ? "bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 font-semibold shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>📊</span>
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveMenu("orders")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition duration-200 ${
                activeMenu === "orders"
                  ? "bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 font-semibold shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>📋</span>
              <span>Order List</span>
            </button>

            <button
              onClick={() => setActiveMenu("analytics")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition duration-200 ${
                activeMenu === "analytics"
                  ? "bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 font-semibold shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>📈</span>
              <span>Analytics</span>
            </button>

            <button
              onClick={() => setActiveMenu("employees")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition duration-200 ${
                activeMenu === "employees"
                  ? "bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 font-semibold shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>👥</span>
              <span>Employee</span>
            </button>

            <button
              onClick={() => setActiveMenu("reviews")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition duration-200 ${
                activeMenu === "reviews"
                  ? "bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 font-semibold shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>⭐</span>
              <span>Reviews</span>
            </button>

            <button
              onClick={() => setActiveMenu("funds")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition duration-200 ${
                activeMenu === "funds"
                  ? "bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 font-semibold shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>💰</span>
              <span>Funds</span>
            </button>

            <button
              onClick={() => setActiveMenu("profile")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition duration-200 ${
                activeMenu === "profile"
                  ? "bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 font-semibold shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>👤</span>
              <span>Profile</span>
            </button>
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t mt-auto">
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2.5 rounded-lg hover:shadow-lg transition duration-200 font-semibold"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between shadow-sm sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-gray-800">
            {activeMenu === "dashboard" && "Dashboard"}
            {activeMenu === "orders" && "Order List"}
            {activeMenu === "analytics" && "Analytics"}
            {activeMenu === "employees" && "Employee Management"}
            {activeMenu === "reviews" && "Customer Reviews"}
            {activeMenu === "funds" && "Funds Management"}
            {activeMenu === "profile" && "Admin Profile"}
          </h2>
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Dashboard Content */}
        <div className="p-8">
          {activeMenu === "dashboard" && (
            <>
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition duration-200">
              <p className="text-gray-600 text-xs font-semibold mb-2 uppercase tracking-wider">
                Total Orders
              </p>
              <p className="text-4xl font-bold text-orange-600">1,245</p>
              <p className="text-xs text-green-600 mt-3 font-medium">
                ↑ 12% from last month
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition duration-200">
              <p className="text-gray-600 text-xs font-semibold mb-2 uppercase tracking-wider">
                Total Revenue
              </p>
              <p className="text-4xl font-bold text-blue-600">₹3,24,500</p>
              <p className="text-xs text-green-600 mt-3 font-medium">
                ↑ 8% from last month
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition duration-200">
              <p className="text-gray-600 text-xs font-semibold mb-2 uppercase tracking-wider">
                Active Users
              </p>
              <p className="text-4xl font-bold text-purple-600">342</p>
              <p className="text-xs text-green-600 mt-3 font-medium">
                ↑ 5% from last month
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition duration-200">
              <p className="text-gray-600 text-xs font-semibold mb-2 uppercase tracking-wider">
                Avg Rating
              </p>
              <p className="text-4xl font-bold text-yellow-600">4.8</p>
              <p className="text-xs text-green-600 mt-3 font-medium">
                ↑ Excellent feedback
              </p>
            </div>
          </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Company Growth Chart */}
                <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">
                    Company Growth
                  </h3>
                  <div className="h-64 flex items-end justify-around gap-3">
                    {[
                      { label: "2016", values: [20, 30, 25, 15] },
                      { label: "2017", values: [25, 35, 30, 20] },
                      { label: "2018", values: [30, 40, 35, 25] },
                      { label: "2019", values: [35, 45, 40, 30] },
                    ].map((year) => (
                      <div key={year.label} className="flex flex-col items-center">
                        <div className="flex gap-1 items-end h-48">
                          <div
                            className="w-4 bg-gradient-to-t from-orange-500 to-orange-400"
                            style={{
                              height: `${year.values[0] * 2}px`,
                            }}
                          />
                          <div
                            className="w-4 bg-gradient-to-t from-teal-500 to-teal-400"
                            style={{
                              height: `${year.values[1] * 2}px`,
                            }}
                          />
                          <div
                            className="w-4 bg-gradient-to-t from-green-500 to-green-400"
                            style={{
                              height: `${year.values[2] * 2}px`,
                            }}
                          />
                          <div
                            className="w-4 bg-gradient-to-t from-blue-500 to-blue-400"
                            style={{
                              height: `${year.values[3] * 2}px`,
                            }}
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-600">{year.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-4 justify-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full" />
                      <span>Paris</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-teal-500 rounded-full" />
                      <span>Bangkok</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span>San Francisco</span>
                    </div>
                  </div>
                </div>

                {/* Statistics Donut Chart */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">
                    Statistics
                  </h3>
                  <div className="flex flex-col items-center justify-center h-64">
                    <svg viewBox="0 0 100 100" className="w-40 h-40">
                      {/* Donut segments */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="10"
                        strokeDasharray="62.8 314"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#ec4899"
                        strokeWidth="10"
                        strokeDasharray="62.8 314"
                        strokeDashoffset="-62.8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="10"
                        strokeDasharray="47.1 314"
                        strokeDashoffset="-125.6"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="10"
                        strokeDasharray="47.1 314"
                        strokeDashoffset="-172.7"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="10"
                        strokeDasharray="94.2 314"
                        strokeDashoffset="-219.8"
                      />
                      {/* Center circle */}
                      <circle cx="50" cy="50" r="25" fill="white" />
                    </svg>
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full" />
                        <span>NYC</span>
                      </div>
                      <span className="font-bold">20%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-pink-500 rounded-full" />
                        <span>FAD/Growth LLC</span>
                      </div>
                      <span className="font-bold">20%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-cyan-500 rounded-full" />
                        <span>KLM</span>
                      </div>
                      <span className="font-bold">15%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full" />
                        <span>Aerofix</span>
                      </div>
                      <span className="font-bold">15%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                        <span>American Express</span>
                      </div>
                      <span className="font-bold">30%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Absent Employee Section */}
              <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Absent Employee
                </h3>
                <div className="h-32 flex items-center justify-center">
                  <p className="text-gray-400 text-center">No data assigned</p>
                </div>
              </div>
            </>
          )}

          {activeMenu === "orders" && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Recent Orders
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Order ID
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Customer
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: "#001",
                        customer: "John Doe",
                        amount: "₹450",
                        status: "Delivered",
                        date: "2026-01-18",
                      },
                      {
                        id: "#002",
                        customer: "Jane Smith",
                        amount: "₹680",
                        status: "Processing",
                        date: "2026-01-18",
                      },
                      {
                        id: "#003",
                        customer: "Mike Johnson",
                        amount: "₹320",
                        status: "Pending",
                        date: "2026-01-17",
                      },
                    ].map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-800">{order.id}</td>
                        <td className="py-3 px-4 text-gray-800">
                          {order.customer}
                        </td>
                        <td className="py-3 px-4 font-bold text-orange-600">
                          {order.amount}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-700"
                                : order.status === "Processing"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeMenu === "analytics" && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Analytics & Insights
              </h3>
              <div className="text-center py-12">
                <p className="text-gray-400">
                  Detailed analytics coming soon...
                </p>
              </div>
            </div>
          )}

          {activeMenu === "employees" && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Employee Management
              </h3>
              <div className="text-center py-12">
                <p className="text-gray-400">
                  Employee management system coming soon...
                </p>
              </div>
            </div>
          )}

          {activeMenu === "reviews" && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Customer Reviews
              </h3>
              <div className="text-center py-12">
                <p className="text-gray-400">Reviews and ratings coming soon...</p>
              </div>
            </div>
          )}

          {activeMenu === "funds" && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Funds Management
              </h3>
              <div className="text-center py-12">
                <p className="text-gray-400">Funds management coming soon...</p>
              </div>
            </div>
          )}

          {activeMenu === "profile" && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Admin Profile
              </h3>
              <div className="max-w-md">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    A
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Admin User</h3>
                    <p className="text-gray-600">admin@jhasha.com</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value="Admin User"
                      disabled
                      className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value="admin@jhasha.com"
                      disabled
                      className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Role
                    </label>
                    <input
                      type="text"
                      value="Administrator"
                      disabled
                      className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
