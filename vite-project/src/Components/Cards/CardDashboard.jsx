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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3003/api/getcard');
      setCards(res.data.data || res.data);
    } catch (err) {
      console.error('Error fetching cards:', err);
      setError('Failed to load cards');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await axios.delete(`http://localhost:3003/api/delete/${id}`);
        fetchCards(); 
      } catch (err) {
        console.error('Error deleting card:', err);
        alert('Failed to delete card');
      }
    }
  };

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
        className="bg-gray-200 h-full shadow-md border-r border-gray-300 overflow-hidden hidden md:block"
      >
        {isSidebarOpen && (
          <div className="flex flex-col h-full justify-between">
            <div className="p-5">
              <Link to="/admin" className="flex items-center">
               
              </Link>
              <nav className="mt-10 space-y-2">
                <SidebarLink to="/admin" Icon={LuLayoutDashboard} label="Manage links" onClick={closeMobileMenu} />
                <SidebarLink to="/admin/productslist" Icon={BiPackage} label="Reports" onClick={closeMobileMenu} />
                <SidebarLink to="/admin/orderlists" Icon={GiShoppingCart} label="Manage Accounts" onClick={closeMobileMenu} />
                <SidebarLink to="/admin/userlists" Icon={FaUserFriends} label="Activitylog" onClick={closeMobileMenu} />
                <SidebarLink to="/admin/sales" Icon={FcSalesPerformance} label="Settings" onClick={closeMobileMenu} />
                <SidebarLink to="/admin/coup" Icon={FaTags} label="Realise notes" onClick={closeMobileMenu} />
                <SidebarLink to="/admin/off" Icon={BiSolidOffer} label="Documentation" onClick={closeMobileMenu} />
              </nav>
            </div>
            <div className="p-6 flex items-center justify-between">
             
              <div 
                className="flex items-center gap-1 text-black hover:text-red-600 cursor-pointer" 
                onClick={handleLogout}
              >
                <RiLogoutBoxLine className="h-6 w-7" />
                <span>Logout</span>
              </div>
            </div>
          </div>
        )}
      </motion.aside>

      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <motion.div
          className="bg-gray-100 py-3 px-6 rounded-md flex justify-between items-center"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
                 <div className="flex items-start gap-4">
            <button className="md:hidden text-black text-2xl" onClick={toggleMobileMenu}>
              ☰
            </button>
            <button className="hidden md:block text-black text-2xl" onClick={toggleSidebar}>
              <HiOutlineMenuAlt3 />
            </button>
          </div>
        </motion.div>

        <div>
          <img 
            src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg" 
            alt="Dashboard Banner" 
            className="w-full p-5 rounded-3xl h-48 object-cover"
          />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search offers..."
              className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Link to="/addoffer">
              <button className="bg-indigo-900 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                Add Offer
              </button>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Card Image</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offer Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payout</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cards.map((card, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img src={card.cardImage} alt="Card" className="h-12 w-auto rounded" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{card.cardName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.service}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.payout}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.commission}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(card.createdAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link to={`/edit-offer/${card._id}`} className="text-blue-600 hover:text-blue-900">
                              <Pencil size={16} />
                            </Link>
                            <button 
                              onClick={() => handleDelete(card._id)} 
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 size={16} />
                            </button>
                            <Link to={`/viewoffer/${card._id}`} className="text-green-600 hover:text-green-900">
                              <Eye size={16} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                      <span className="font-medium">{cards.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Previous</span>
                        «
                      </button>
                      <button
                        aria-current="page"
                        className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      >
                        1
                      </button>
                      <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        2
                      </button>
                      <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        3
                      </button>
                      <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Next</span>
                        »
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>


     
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col items-center justify-center space-y-4">
          <MobileMenuButton to="/addproducts" label="Add Product" onClick={closeMobileMenu} />
          <MobileMenuButton to="/productslist" label="Products List" onClick={closeMobileMenu} />
          <MobileMenuButton to="/viewproducts" label="View Product" onClick={closeMobileMenu} />
          <button
            onClick={handleLogout}
            className="w-64 bg-red-600 hover:bg-red-700 text-white text-xl py-4 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};


const SidebarLink = ({ to, Icon, label, onClick }) => (
  <Link
    to={to}
    className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-300 text-black"
    onClick={onClick}
  >
    <Icon className="h-5 w-5 mr-3 text-black" />
    <span>{label}</span>
  </Link>
);

const MobileMenuButton = ({ to, label, onClick }) => (
  <Link
    to={to}
    className="w-64 bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-lg transition-colors"
    onClick={onClick}
  >
    {label}
  </Link>
);

export default Admin;