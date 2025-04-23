import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

import {
  BiPackage, BiSolidOffer, BiSolidCategoryAlt,
} from "react-icons/bi";
import {
  LuLayoutDashboard, LuPackage2,
} from "react-icons/lu";
import { GiShoppingCart } from "react-icons/gi";
import { FaUserFriends, FaShoppingBag } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { FaTags } from "react-icons/fa6";
import { TbBrandSwift } from "react-icons/tb";
import { RiLogoutBoxLine } from "react-icons/ri";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Pencil, Trash2, Eye } from 'lucide-react';



const Admin = () => {
  const navigate = useNavigate();
//   const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get('http://localhost:3003/api/getcard');
             setCards(res.data.data || res.data);
        console.log('API Response:', res.data);
      } catch (err) {
        console.error('Error fetching cards:', err);
        setError('Failed to load cards');
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);
 

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
           <motion.aside
  initial={{ width: 0 }}
  animate={{ width: isSidebarOpen ? "16rem" : "0" }}
  transition={{ duration: 0.3 }}
  className="bg-gray-100 h-full shadow-md border-r border-white/10 overflow-hidden hidden md:block text-black"
>
        {isSidebarOpen && (
          <div className="flex flex-col h-full justify-between text-black">
            <div className="p-5">
              <Link to="/admin" className="flex items-center">
                <img src="/images/Santics.png" alt="Logo" className="h-13" />
              </Link>
              <nav className="mt-10 space-y-2 text-black">
                <SidebarLink to="/admin" Icon={LuLayoutDashboard} label="Dashboard" onClick={closeMobileMenu} />
                <SidebarLink to="/admin/productslist" Icon={BiPackage} label="Products" onClick={closeMobileMenu} />
                <SidebarLink to="/admin/orderlists" Icon={GiShoppingCart} label="Orders" onClick={closeMobileMenu} />
                <SidebarLink to="/admin/userlists" Icon={FaUserFriends} label="Customers" onClick={closeMobileMenu} />
                <SidebarLink to="/admin/sales" Icon={FcSalesPerformance} label="Sales" onClick={closeMobileMenu} />
                <SidebarLink to="/admin/coup" Icon={FaTags} label="Coupons" onClick={closeMobileMenu} />
                <SidebarLink to="/admin/off" Icon={BiSolidOffer} label="Offers" onClick={closeMobileMenu} />
                <SidebarLink to="/admin/cate" Icon={BiSolidCategoryAlt} label="Category" onClick={closeMobileMenu} />
                <SidebarLink to="/admin/brands" Icon={TbBrandSwift} label="Brands" onClick={closeMobileMenu} />
                <SidebarLink to="/adminregester" Icon={TbBrandSwift} label="Add Admins" onClick={closeMobileMenu} />
              </nav>
            </div>
            <div className="p-6 bg-white/10 flex items-center justify-between">
              <h1 className="text-black">Hi Admin</h1>
              <div className="flex items-center gap-1 text-black hover:text-black">
                <RiLogoutBoxLine className="h-6 w-7 cursor-pointer" onClick={handleLogout} />
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        )}
      </motion.aside>

      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <motion.div
          className="bg-gray-100 shadow-md py-3 px-6 rounded-md flex justify-between items-center"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1> */}
          <div className="flex items-center gap-4">
            <button className="md:hidden text-white text-2xl" onClick={toggleMobileMenu}>
              ☰
            </button>
            <button className="hidden md:block text-white text-2xl" onClick={toggleSidebar}>
              <HiOutlineMenuAlt3 />
            </button>
          </div>
        </motion.div>

            <div>
                <img src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg" alt=""  className="w-screen p-5 rounded-3xl h-48"/>
            </div>

            <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded px-3 py-2 w-1/3"
        />
     <Link to={`/addoffer`}>   <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Offer</button></Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Card Image Name</th>
              <th className="p-2 border">Offer Name</th>
              <th className="p-2 border">Service</th>
              <th className="p-2 border">Payout</th>
              <th className="p-2 border">Commission</th>
              <th className="p-2 border">Create at</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card, index) => (
              <tr key={index} className="text-gray-700">
                <td className="border px-2 py-1 text-center">{card.id}</td>
                <td className="border px-2 py-1">
                  <img src={card.image} alt="Card" className="w-20 h-auto" />
                </td>
                <td className="border px-2 py-1">{card.cardName}</td>
                <td className="border px-2 py-1">{card.commission}</td>
                <td className="border px-2 py-1">{card.payout}</td>
                <td className="border px-2 py-1">{card.commission}</td>
                <td className="border px-2 py-1">{card.createdAt}</td>
                <td className="border px-2 py-1 text-center space-x-2">
                  <button className="text-blue-500 hover:scale-110">
                    <Pencil size={16} />
                  </button>
                  <button className="text-red-500 hover:scale-110">
                    <Trash2 size={16} />
                  </button>
                  <button className="text-teal-500 hover:scale-110">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4 text-sm">
          <div>
            <select className="border px-2 py-1 rounded">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>{' '}
            Showing 1 to 10 of 24 entries
          </div>
          <div className="space-x-1">
            <button className="border px-2 py-1 rounded">«</button>
            <button className="border px-2 py-1 rounded bg-gray-200">1</button>
            <button className="border px-2 py-1 rounded">2</button>
            <button className="border px-2 py-1 rounded">3</button>
            <button className="border px-2 py-1 rounded">»</button>
          </div>
        </div>
      </div>
    </div>

      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/80 text-white flex flex-col items-center justify-center space-y-4 z-50">
          <MobileMenuButton to="/addproducts" label="Add Product" onClick={closeMobileMenu} />
          <MobileMenuButton to="/productslist" label="Products List" onClick={closeMobileMenu} />
          <MobileMenuButton to="/viewproducts" label="View Product" onClick={closeMobileMenu} />
          <button
            onClick={handleLogout}
            className="w-64 bg-red-500 text-xl py-4 rounded-lg"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

// Sidebar Nav Link Component
const SidebarLink = ({ to, Icon, label, onClick }) => (
  <Link
    to={to}
    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white/10 hover:text-red-600 text-white/70 flex gap-4"
    onClick={onClick}
  >
    <Icon className="text-center h-6 w-7" />
    <p>{label}</p>
  </Link>
);

// Stat Card Component
const StatCard = ({ title, count, icon }) => (
  <div className="bg-gradient-to-r from-pink-600 via-blue-500 to-pink-500 p-6 rounded-lg shadow-lg">
    <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
    <div className="flex gap-3 items-center">
      {icon}
      <h1 className="text-3xl font-bold text-white">
        {count !== null ? count : "Loading..."}
      </h1>
    </div>
  </div>
);

// Mobile Menu Button Component
const MobileMenuButton = ({ to, label, onClick }) => (
  <Link to={to} onClick={onClick}>
    <button className="w-64 bg-red-500 text-xl py-4 rounded-lg">
      {label}
    </button>
  </Link>
);

export default Admin;