import { NavLink, Outlet } from 'react-router-dom'
import { TbLayoutDashboard } from "react-icons/tb";
import { LuClipboardList } from "react-icons/lu";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useState } from "react";

function Nav() {
    const [isExpanded, setIsExpanded] = useState(false);
    const linkClass = ({ isActive }) =>
        `flex items-center p-[2px] rounded-lg transition-all 
        ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`;
    return (
        <>
            <nav className='h-170 top-38 left-0 bg-white absolute rounded-2xl'
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                style={{
                    width: isExpanded ? "140px" : "40px",
                    color: isExpanded ? "#343434" : "black",
                    transition: "width 0.3s ease",
                    overflow: "hidden",
                }}>
                <ul className='flex flex-col gap-5 items-left justify-left p-2 pt-8'>
                    <li>
                        <NavLink to='/' className={linkClass} end><TbLayoutDashboard size={25} /> {isExpanded && 'Dashboard'}</NavLink>
                    </li>

                    <li>
                        <NavLink to='/rawdata' className={linkClass}><LuClipboardList size={25} />{isExpanded && 'Products'}</NavLink>
                    </li>

                    <li>
                        <NavLink to='/input' className={linkClass}><HiOutlinePencilSquare size={25} />{isExpanded && 'Costs'}</NavLink>
                    </li>
                </ul>
            </nav >
            <Outlet />
        </>
    )
}

export default Nav