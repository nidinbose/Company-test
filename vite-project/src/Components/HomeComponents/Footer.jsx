import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-gray-100 overlow-x-hidden">
      <div className=" mx-auto ">
        {/* Heading Section */}
        <div className="text-center mb-12 bg-pink-500 w-full h-38">
          <h2 className="text-3xl font-bold mb-4">Having Trouble Choosing A Product? Let's Connect</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {/* Address & Contact */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Address</h3>
            <address className="not-italic">
              <p>No accompany</p>
              <p>Bergaunu</p>
              <p>Kamataka 560078</p>
            </address>
            <div className="mt-4">
              <p className="font-semibold">Phone: +91 9000 00009</p>
              <p className="font-semibold">Mail: info@abc.com</p>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-600">Credit Cards</a></li>
              <li><a href="#" className="hover:text-blue-600">Personal Loan</a></li>
              <li><a href="#" className="hover:text-blue-600">Our Lenders</a></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-600">BMI Calculator</a></li>
              <li><a href="#" className="hover:text-blue-600">CIBIL Score</a></li>
              <li><a href="#" className="hover:text-blue-600">Loan Calculator</a></li>
            </ul>
          </div>

          {/* Resources & Company */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-600">Check Eligibility</a></li>
                <li><a href="#" className="hover:text-blue-600">Blogs</a></li>
                <li><a href="#" className="hover:text-blue-600">Videos</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-600">About MoneyBIP</a></li>
                <li><a href="#" className="hover:text-blue-600">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-600">Careers</a></li>
                <li><a href="#" className="hover:text-blue-600">Privacy Policies</a></li>
                <li><a href="#" className="hover:text-blue-600">Terms of Services</a></li>
                <li><a href="#" className="hover:text-blue-600">Disclaimer</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-sm mb-4">
            Disclaimer: The information on its for general informational purposes and not financial advice. 
            Users should independently verify its accuracy. MoneyBIP is not responsible for external websites 
            linked from our platform. Consult with financial professionals before making significant decisions. 
            MoneyBIP disclaims liability for errors or consequences from reliance on the information provided.
          </p>
          <p className="text-sm">© Copyright 2023. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;