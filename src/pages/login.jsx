import BgImage from '../assets/bg-image.jpg'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate()

    const handleSuccess = (message) => {
        toast.success(message)
    }

    const handleConnect = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/setup-store`);
            if (data) {
                const { success, message, shop, initialSyncDone } = data;
                if (success === true) {
                    handleSuccess(message)
                    const user = {
                        shop,
                        initialSyncDone
                    }
                    localStorage.setItem('user', JSON.stringify(user))
                    navigate('/')
                }
            }
        } catch (error) {
            console.error(`Error Fetching Data From GetAccess: `, error)
        }
    }

    return (
        <div>
            <div className='w-screen h-screen inset-0 z-0'>
                <img src={BgImage} className='fixed object-cover w-screen h-screen filter blur-[3px]' />
                <div className='fixed inset-0 bg-black/30 z-10 w-screen h-screen'></div>
            </div>

            <div className='fixed inset-0 z-20 flex items-center justify-center'>
                <div className="text-center text-white p-8 bg-black/50 rounded-lg">
                    <h1 className="text-4xl font-bold mb-6">Keep Track OF Your Shopify</h1>
                    <button onClick={() => handleConnect()} className="bg-[#95BF47] cursor-pointer text-white font-bold py-3 px-6 rounded-lg shadow-lg">Connect To Shopfiy Account</button>
                </div>
            </div>
        </div >
    )
}

export default Login