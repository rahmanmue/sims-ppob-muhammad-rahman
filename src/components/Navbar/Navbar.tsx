import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/assets/images/Logo.png";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
    {
        name: "Top Up",
        route:"top-up"
    },
    {
        name: "Transaction",
        route:"transaction"
    },
    {
        name: "Akun",
        route:"akun"
    }
]


const Navbar = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false);
  const currentLocation = location.pathname.split('/')[1]
  
  return (
    <nav className="bg-white shadow-md sticky-top top-0 left-0 w-full z-20">
      <div className="container max-w-screen-xl flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="h-10 w-auto" />
          <span className="text-xl font-semibold text-gray-800">SIMS PPOB</span>
        </div>

        {/* Menu untuk Desktop */}
        <ul className="hidden md:flex gap-10 font-medium">
            {menuItems.map((m, index)=> (
                <Link key={index} to={`/${m.route}`} className={`${ currentLocation == m.route ? "text-primary" : ""} cursor-pointer hover:text-primary`}>{m.name}</Link>
            ))}
        </ul>

        {/* Tombol Hamburger untuk Mobile */}
        <button 
          className="md:hidden text-gray-700 z-10 focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu Mobile */}
      <div 
        className={`md:hidden bg-white shadow-md absolute w-full left-0 top-16 ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-4 py-4">
            {menuItems.map((m, index)=> (
                <Link key={index} to={`/${m.route}`} className={`${currentLocation == m.route ? "text-primary" : ""} cursor-pointer hover:text-primary`}
                >{m.name}</Link>
            ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
