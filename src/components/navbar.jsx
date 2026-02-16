import { Link, Outlet } from 'react-router-dom'

function Nav() {
    return (
        <>
            <nav className='w-full bg-[#eee]'>
                <ul className='flex gap-5 items-center justify-center'>
                    <li>
                        <Link to='/'>Dashboard</Link>
                    </li>

                    <li>
                        <Link to='/rawdata'>Raw Data</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}

export default Nav