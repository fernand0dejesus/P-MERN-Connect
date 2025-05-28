import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-6"> {}
          <Link to="/" className="text-4xl font-bold"> {}
           Zona Digital
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            <FaBars size={28} /> {/* Icono más grande */}
          </button>
          <div className={`md:flex space-x-8 ${isOpen ? 'block' : 'hidden'}`}>
            <Link to="/" className="hover:text-green-300 text-lg font-medium">
              Home
            </Link>
            <Link to="/products" className="hover:text-green-300 text-lg font-medium">
              Products
            </Link>
            <Link to="/employees" className="hover:text-green-300 text-lg font-medium">
              Employees
            </Link>
            <Link to="/branches" className="hover:text-green-300 text-lg font-medium">
              Branches
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
