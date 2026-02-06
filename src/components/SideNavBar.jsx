import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaBars } from "@react-icons/all-files/fa/FaBars";
import { FaHome } from "@react-icons/all-files/fa/FaHome";
import { FaRegListAlt } from "@react-icons/all-files/fa/FaRegListAlt";


const SideNavBar = () => {
    const [open, setOpen] = useState(false);

    const Menus = [
        { title: "Registratation", path: "/", icon: <FaHome /> },
        { title: "List Players", path: "/players", icon: <FaRegListAlt /> },
    ]

    const flipNavBar = () => {
        setOpen(!open);
    }

    return (
        <div className="flex">
            <div className={`h-screen p-5 pt-8 ${open ? 'w-50' : 'w-18'} bg-blue-200
            duration-300`}>
                <FaBars className={`text-2xl cursor-pointer text-blue-900 ml-2`} onClick={flipNavBar}>
                </FaBars>
                <ul>
                    {Menus.map((menu, index) => {
                        return (
                            <NavLink to={menu.path} key={index} className="text-gray-800 text-sm flex items-center
                             hover:bg-blue-300 rounded-sm mt-5 gap-x-1">
                                <span className="text-2xl cursor-pointer text-blue-900 px-2 py-1">
                                    {menu.icon}
                                </span>
                                <span className={`text-base font-medium  ${!open && 'hidden'}`}>{menu.title}</span>
                            </NavLink>
                        )
                    })
                    }
                </ul>
            </div>
        </div>
    )
}

export default SideNavBar;