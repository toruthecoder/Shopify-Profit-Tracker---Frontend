import { NavLink, Outlet } from 'react-router-dom'
import { TbLayoutDashboard } from "react-icons/tb";
import { LuClipboardList } from "react-icons/lu";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { GoPackageDependencies } from "react-icons/go";
import { PiCurrencyDollarSimpleFill } from "react-icons/pi";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";

function Nav() {
    const [isExpanded, setIsExpanded] = useState(false);
    const linkClass = ({ isActive }) =>
        `flex items-center p-[4px] rounded-lg transition-all 
        ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`;

    const navigate = useNavigate()

    function handleLogOut() {
        localStorage.removeItem('user')
        navigate('/login')
    }

    return (
        <>
            <nav className='h-170 top-38 left-0 bg-white absolute rounded-2xl'
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                style={{
                    width: isExpanded ? "180px" : "60px",
                    color: isExpanded ? "#343434" : "black",
                    transition: "width 0.3s ease",
                    overflow: "hidden",
                }}>
                <ul className='flex flex-col gap-5 items-left justify-left p-3  pt-8 h-full'>
                    <li>
                        <NavLink to='/' className={linkClass} end><TbLayoutDashboard size={28} /> {isExpanded && 'Dashboard'}</NavLink>
                    </li>

                    <li>
                        <NavLink to='/subscription' className={linkClass}><PiCurrencyDollarSimpleFill size={28} /> {isExpanded && 'Pricing'}</NavLink>
                    </li>

                    <li>
                        <NavLink to='/products' className={linkClass}><LuClipboardList size={28} />{isExpanded && 'Products'}</NavLink>
                    </li>

                    <li>
                        <NavLink to='/orders' className={linkClass}><GoPackageDependencies size={28} />{isExpanded && 'Orders'}</NavLink>
                    </li>

                    <li>
                        <NavLink to='/input' className={linkClass}><HiOutlinePencilSquare size={28} />{isExpanded && 'Costs'}</NavLink>
                    </li>

                    <li className='mt-auto'>
                        <div className='flex flex-col gap-4 items-center justify-end mb-2'>
                            {isExpanded ?
                                <button className='text-[16px] text-white rounded-[5px] px-12 py-1.5 bg-[#3b82f6] cursor-pointer hover:bg-[#5291f5]' onClick={() => handleLogOut()}>LogOut</button>
                                : <IoIosLogOut size={28} className="cursor-pointer hover:text-blue-500" />
                            }
                        </div>
                    </li>
                </ul>
            </nav >
            <Outlet />
        </>
    )
}

export default Nav