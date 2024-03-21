import { useContext, useState } from "react";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { IoLocationSharp } from "react-icons/io5";
import CartContext from "../contexts/CartContext.js";
import { NavLink } from "react-router-dom";

import {Navbar,NavbarMenuItem, NavbarMenu,NavbarMenuToggle, NavbarBrand, NavbarContent, NavbarItem, Link} from "@nextui-org/react";

export function NavBar() {
  const {totalItems} = useContext(CartContext)

  type menuItemType = { 
    name: string;
    href: string;
    color: "primary" | "danger" | "foreground" | "secondary" | "success" | "warning" | undefined ;
  }

  const menuItems:menuItemType[] = [
    { name: 'Cardapio', href: "/", color: "primary" },
    // { name: 'Dashboard', href: '', color: "primary" },
    // { name: 'Activity', href: '', color: "primary" },
    // { name: 'Analytics', href: '', color: "primary" },
    // { name: 'System', href: '', color: "primary" },
    // { name: 'Deployments', href: '', color: "primary" },
    // { name: 'My Settings', href: '', color: "primary" },
    // { name: 'Team Settings', href: '', color: "primary" },
    // { name: 'Help & Feedback', href: '', color: "primary" },
    // { name: 'Log Out', href: '', color: "danger" }
  ]
  ;
 

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return(
    // <div className="flex justify-between items-start pb-3 bg-gradient-to-t from-gray-200 to-gray-300 p-5 px-10 border-b-2 border-black " >
    //   <h1 className="font-bold text-xl">Angel Cakes</h1>
    //   <div className="flex gap-4 items-center">
        // <span className="flex gap-2 items-center bg-violet-300 text-violet-900 rounded-md p-1 px-2">
        //   <IoLocationSharp />
        //   Porto Alegre
        // </span>
        // <span className="flex gap-2">
        //   <NavLink to='/cart'
        //     className=" bg-pink-500 text-white rounded-md p-2"  >
        //     <HiMiniShoppingCart /> 
        //   </NavLink>
        //   { totalItems() > 0 ?
        //     <a className="flex px-2 relative text-sm py-0.5 text-pink-900 from-neutral-50 -top-3 h-6 bg-pink-400 rounded-full right-4 ">{totalItems()}</a>
        //     :
        //     null
        //   }
        // </span>
    //   </div>
    // </div>

    <Navbar 
      className="flex px-5"
      isBordered
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      >

      <NavbarContent justify="start" className="relative right-0 ">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <NavLink to='/'>            
            <p className="font-bold text-inherit">Angel Cakes</p>
            </NavLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink  to="/" aria-current="page">
            Cardapio
          </NavLink>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            
          </Link>
        </NavbarItem>
      </NavbarContent>
      
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <span className="flex gap-2 items-center bg-violet-300 text-violet-900 rounded-md p-1 px-2">
            <IoLocationSharp />
            Porto Alegre
          </span>
          </NavbarItem>
          <NavbarItem className="">
          <span className="flex gap-2">
            <NavLink to='/cart'
              className=" bg-pink-500 text-white rounded-md p-2"  >
              <HiMiniShoppingCart /> 
            </NavLink>
            { totalItems() > 0 ?
              <a className="flex px-2 relative text-sm py-0.5 text-pink-900 from-neutral-50 -top-3 h-6 bg-pink-400 rounded-full right-4 ">{totalItems()}</a>
              :
              null
            }
          </span>
          </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              
              href={item.href}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
    
  )
}