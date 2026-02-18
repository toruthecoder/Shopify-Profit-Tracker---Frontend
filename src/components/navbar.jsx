import { Link, Outlet } from 'react-router-dom'
import { TbLayoutDashboard } from "react-icons/tb";
import { LuClipboardList } from "react-icons/lu";
import { useState } from "react";

function Nav() {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <>
            <nav className='w-[40px] h-180 top-38 left-0 bg-white absolute rounded-2xl'
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                style={{
                    width: isExpanded ? "150px" : "40px",
                    color: isExpanded ? "#343434" : "black",
                    transition: "width 0.3s ease",
                    overflow: "hidden",
                }}>
                <ul className='flex flex-col gap-5 items-left justify-left pl-2 pt-4'>
                    <li>
                        <Link to='/' className='flex gap-2'><TbLayoutDashboard size={25} /> {isExpanded === true ? 'DashBoard' : null}</Link>
                    </li>

                    <li>
                        <Link to='/rawdata' className='flex gap-2'><LuClipboardList size={25} />{isExpanded === true ? 'Products' : null}</Link>
                    </li>
                </ul>
            </nav >
            <Outlet />
        </>
    )
}

export default Nav