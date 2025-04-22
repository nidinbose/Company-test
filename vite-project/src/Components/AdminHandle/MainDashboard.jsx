import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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


const Admin = () => {
  const navigate = useNavigate();

  const [productCount, setProductCount] = useState(null);
  const [orderCount, setOrderCount] = useState(null);
  const [userCount, setUserCount] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProductCount(120);
      setOrderCount(340);
      setUserCount(89);
    }, 1000);
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
    <div className="flex h-full bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <motion.aside
  initial={{ width: 0 }}
  animate={{ width: isSidebarOpen ? "16rem" : "0" }}
  transition={{ duration: 0.3 }}
  className="bg-black h-full shadow-md border-r border-white/10 overflow-hidden hidden md:block"
>
        {isSidebarOpen && (
          <div className="flex flex-col h-full justify-between">
            <div className="p-5">
              <Link to="/admin" className="flex items-center">
                <img src="/images/Santics.png" alt="Logo" className="h-13" />
              </Link>
              <nav className="mt-10 space-y-2">
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
              <h1 className="text-white">Hi Admin</h1>
              <div className="flex items-center gap-1 text-white hover:text-red-600">
                <RiLogoutBoxLine className="h-6 w-7 cursor-pointer" onClick={handleLogout} />
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        )}
      </motion.aside>
            
      {/* Main Content */}
      <div className="flex-1 p-6 bg-black overflow-auto">
        <motion.div
          className="bg-white shadow-md py-3 px-6 rounded-md flex justify-between items-center"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="md:hidden text-white text-2xl" onClick={toggleMobileMenu}>
              ☰
            </button>
            <button className="hidden md:block text-white text-2xl" onClick={toggleSidebar}>
              <HiOutlineMenuAlt3 />
            </button>
          </div>
        </motion.div>
        <div className="min-h-fullflex items-center justify-center p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4  gap-4 w-full max-w-full">
        {/* Welcome Card */}
        <div className="col-span-1 md:col-span-2 bg-white rounded-xl p-6 flex flex-col md:flex-row items-center shadow-sm">
          {/* Left: Avatar + Text */}
          <div className="flex-1 flex flex-col justify-between items-center">
            <div className="flex items-center gap-3     ">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="font-bold text-lg text-gray-800">Welcome back</h2>
                <p className="text-sm text-gray-500">
                  You have done 72% more sales today. Check your new badge in your profile.
                </p>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-1">
                <span className="text-gray-600 text-sm">Today's Leads</span>
                <span className="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded text-xs">01</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-600 text-sm">Total Leads</span>
                <span className="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded text-xs">101</span>
              </div>
            </div>
          </div>
          {/* Right: Illustration */}
          <div className="hidden md:flex flex-1 justify-end">
            <img
              src="https://assets-global.website-files.com/63e4f6e8d6b1d2c5d7c8b2e1/63f7c8e7d6b1d2e5d7c8b2e2_3d-illustration.png"
              alt="illustration"
              className="w-40 h-32 object-contain"
            />
          </div>
        </div>

        {/* Credit Card Clicks */}
        <div className="bg-white rounded-md p-6 flex flex-col space-y-2 justify-between shadow-sm">
          <div className="flex items-start flex-col gap-2 mb-2">
            <span className="bg-green-100 p-2 rounded-md">
              {/* Card Icon */}
              <svg width="24" height="24" fill="none" stroke="green" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="6" width="18" height="12" rx="2" />
                <path d="M3 10h18" />
              </svg>
            </span>
            <span className="font-semibold text-gray-700 text-xl">Credit Card Clicks</span>
          </div>
          
          <div className="text-3xl font-bold text-gray-900">12,628</div>
          <div className="text-green-500 text-md font-semibold flex items-center gap-1">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 15l6-6 6 6" />
            </svg>
            +72.80%
          </div>
        </div>


                {/* Credit Card Clicks */}
                <div className="bg-white rounded-md p-6 flex flex-col space-y-2 justify-between shadow-sm">
          <div className="flex items-start flex-col gap-2 mb-2">
          <span className="bg-blue-100 p-2 rounded-md">
              {/* Loan Icon */}
              <svg width="24" height="24" fill="none" stroke="#38bdf8" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
              </svg>
            </span>
            <span className="font-semibold text-gray-700 text-xl">Personal loans clicks</span>
          </div>
          
          <div className="text-3xl font-bold text-gray-900">4679</div>
          <div className="text-green-500 text-md font-semibold flex items-center gap-1">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 15l6-6 6 6" />
            </svg>
            +72.80%
          </div>
        </div>

            </div>


            {/* section2 */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
  {/* Total Revenue Card */}
  <div className="h-auto w-full bg-white rounded-md shadow-sm p-6">
    <div className="mb-4">
      <h1 className="text-lg font-semibold text-gray-800">Total Revenue Details</h1>
      <p className="text-sm text-gray-500">Revenue details provided by insights</p>
    </div>
    
    <div className="space-y-4">
      {/* Total Revenue */}
      <div className="flex justify-between items-center p-3 bg-gray-50 rounded gap-6">
  {/* Metric Block */}
  <div className="flex items-center justify-between w-full gap-4">
    {/* Total Revenue */}
    <div className="flex-1 flex items-center gap-2">
      <svg width="20" height="20" fill="none" stroke="#38bdf8" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
      <span className="text-gray-600">Total Revenue</span>
    </div>
    <div className="text-right">
      <h1 className="text-xl font-bold">24,021.00</h1>
      <div className="text-green-500 text-sm font-semibold flex items-center justify-end gap-1">
        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M6 15l6-6 6 6" />
        </svg>
        +72%
      </div>
    </div>

    {/* Commission */}
    <div className="flex-1 flex items-center gap-2">
      <svg width="20" height="20" fill="none" stroke="#38bdf8" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
      <span className="text-gray-600">Commission</span>
    </div>
    <div className="text-right">
      <h1 className="text-xl font-bold">4,248.00</h1>
      <div className="text-green-500 text-sm font-semibold flex items-center justify-end gap-1">
        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M6 15l6-6 6 6" />
        </svg>
        +42%
      </div>
    </div>

    {/* Margin */}
    <div className="flex-1 flex items-center gap-2">
      <svg width="20" height="20" fill="none" stroke="#38bdf8" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
      <span className="text-gray-600">Margin</span>
    </div>
    <div className="text-right">
      <h1 className="text-xl font-bold">8,052.00</h1>
      <div className="text-green-500 text-sm font-semibold flex items-center justify-end gap-1">
        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M6 15l6-6 6 6" />
        </svg>
        +82%
      </div>
    </div>
  </div>
</div>


      {/* Commission */}
      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
       
      </div>

      {/* Margin */}
      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
     
      </div>
    </div>
  </div>

  {/* Credit Card Revenue Card */}
  <div className="h-auto w-full bg-white rounded-md shadow-sm p-6">
    <div className="mb-4">
      <h1 className="text-lg font-semibold text-gray-800">Credit Card Revenue</h1>
      <p className="text-sm text-gray-500">Revenue details provided by insights</p>
    </div>
    
    <div className="space-y-4">
      {/* Total Revenue */}
      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" fill="none" stroke="#38bdf8" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </svg>
          <span className="text-gray-600">Total Revenue</span>
        </div>
        <div className="text-right">
          <h1 className="text-xl font-bold">24,021.00</h1>
          <div className="text-green-500 text-sm font-semibold flex items-center justify-end gap-1">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 15l6-6 6 6" />
            </svg>
            +72%
          </div>
        </div>
      </div>

      {/* Commission */}
      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" fill="none" stroke="#38bdf8" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </svg>
          <span className="text-gray-600">Commission</span>
        </div>
        <div className="text-right">
          <h1 className="text-xl font-bold">4,248.00</h1>
          <div className="text-green-500 text-sm font-semibold flex items-center justify-end gap-1">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 15l6-6 6 6" />
            </svg>
            +42%
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Personal Loan Revenue Card */}
  <div className="h-auto w-full bg-white rounded-md shadow-sm p-6">
    <div className="mb-4">
      <h1 className="text-lg font-semibold text-gray-800">Personal Loan Revenue</h1>
      <p className="text-sm text-gray-500">Revenue details provided by insights</p>
    </div>
    
    <div className="space-y-4">
      {/* This Month */}
      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" fill="none" stroke="#38bdf8" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </svg>
          <span className="text-gray-600">This Month</span>
        </div>
        <div className="text-right">
          <div className="text-green-500 text-sm font-semibold flex items-center justify-end gap-1">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 15l6-6 6 6" />
            </svg>
            +72%
          </div>
        </div>
      </div>

      {/* Total Revenue */}
      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" fill="none" stroke="#38bdf8" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </svg>
          <span className="text-gray-600">Total Revenues</span>
        </div>
        <div className="text-right">
          <h1 className="text-xl font-bold">24,021.00</h1>
          <div className="text-green-500 text-sm font-semibold flex items-center justify-end gap-1">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 15l6-6 6 6" />
            </svg>
            +72%
          </div>
        </div>
      </div>

      {/* Commission */}
      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" fill="none" stroke="#38bdf8" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </svg>
          <span className="text-gray-600">Commission</span>
        </div>
        <div className="text-right">
          <h1 className="text-xl font-bold">4,248.00</h1>
          <div className="text-green-500 text-sm font-semibold flex items-center justify-end gap-1">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 15l6-6 6 6" />
            </svg>
            +42%
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>

    <div className="bg-white rounded shadow p-4 w-full max-w-full mx-auto">
  <div className="flex justify-between items-center mb-4">
    <div>
      <h2 className="text-xl font-semibold">Leaderboard</h2>
      <p className="text-sm text-gray-500">Top 10 users sort by earning</p>
    </div>
    <button className="text-sm text-gray-600 flex items-center gap-1 border px-2 py-1 rounded">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 4a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2H7z" />
      </svg>
      This Month
    </button>
  </div>

  <div className="overflow-x-auto">
    <table className="min-w-full table-auto border-collapse text-sm">
      <thead className="bg-gray-100 text-left text-gray-600">
        <tr>
          <th className="p-3">S.No</th>
          <th className="p-3">Name</th>
          <th className="p-3">Amount</th>
          <th className="p-3">Mobile</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {[
          { sno: '01', name: 'Wade Warren', amount: '₹40,000', mobile: '66 81XXXX26', avatar: '🧔' },
          { sno: '02', name: 'Annette Black', amount: '₹37,000', mobile: '82 81XXXX26', avatar: '👩‍🦰' },
          { sno: '03', name: 'Ronald Richards', amount: '₹37,000', mobile: '78 81XXXX26', avatar: '🧑‍🦱' },
          { sno: '04', name: 'Darlene Robertson', amount: '₹37,000', mobile: '67 81XXXX26', avatar: '🧑‍🦳' },
          { sno: '05', name: 'Bessie Cooper', amount: '₹37,000', mobile: '86 81XXXX26', avatar: '👩' },
          { sno: '06', name: 'Ralph Edwards', amount: '₹2,000', mobile: '77 81XXXX26', avatar: '🧔' },
          { sno: '07', name: 'Jacob Jones', amount: '₹2,000', mobile: '70 81XXXX26', avatar: '🧑‍🦰' },
          { sno: '08', name: 'Cameron Williamson', amount: '₹2,000', mobile: '80 81XXXX26', avatar: '🧑‍🦱' },
          { sno: '09', name: 'Dianne Russell', amount: '₹2,000', mobile: '73 81XXXX26', avatar: '👩‍🎤' },
          { sno: '10', name: 'Darrell Steward', amount: '₹1,000', mobile: '84 81XXXX26', avatar: '🧑‍🦳' }
        ].map((user, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="p-3">{user.sno}</td>
            <td className="p-3 flex items-center gap-2">
              <span className="text-lg">{user.avatar}</span>
              {user.name}
            </td>
            <td className="p-3">{user.amount}</td>
            <td className="p-3">{user.mobile}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div className="flex justify-center mt-4">
    <button className="px-6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
      View All
    </button>
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

export default Admin;