import { LuCircleDot } from "react-icons/lu";

function Subscription() {
    return (
        <div className="bg-[#e7e7e7]" >
            <div className="">
                <h1 className="text-center text-[72px] mt-10 leading-none">The perfect plan <br /> for every budget</h1>
                <p className="text-center text-[18px] mt-10 mb-20 text-gray-500">Software that returns more money than you spend.</p>
                <div className="mb-24">
                    <div className="flex items-center justify-center gap-12">
                        <div className="max-w-93 px-8 py-15 bg-white text-center rounded-2xl">
                            <h1 className="text-[32px] leading-none tracking-none mb-6">Free Plan</h1>
                            <p className="text-[18px] mb-8">
                                This Plan is for startup who need to test the app first before purshasing it. You will get access to all our features.
                            </p>
                            <h1 className="text-[40px] font-semibold mb-8">7 Days Trial</h1>
                            <button className="text-[25px] text-white rounded-[15px] px-21 py-3 bg-[#3b82f6] cursor-pointer hover:bg-[#5291f5]">Get Started</button>
                            <ul className="mt-8 text-[19px]">
                                <li className="flex items-center gap-2"> <LuCircleDot />Connect Unlimited Store</li>
                                <li className="flex items-center gap-2"> <LuCircleDot />Get Insights</li>
                                <li className="flex items-center gap-2"> <LuCircleDot />Input Costs</li>
                                <li className="flex items-center gap-2"> <LuCircleDot />Export CSV Data</li>
                            </ul>
                        </div>
                        <div className="max-w-93 px-8 py-15 text-white bg-[#3b82f6] text-center rounded-2xl">
                            <h1 className="text-[32px] leading-none tracking-none mb-6">Starter Plan</h1>
                            <p className="text-[18px] mb-8">
                                The perfect plan for early stage startups that want to launch quickly - can't get any better than this.
                            </p>
                            <h1 className="text-[40px] font-semibold mb-8">$15 / monthly</h1>
                            <button className="text-[25px] rounded-[15px] px-21 py-3 text-[#3b82f6] bg-white cursor-pointer hover:bg-[#538ff0] hover:text-white">Get Started</button>
                            <ul className="mt-8 text-[19px]">
                                <li className="flex items-center gap-2"> <LuCircleDot />Connect Unlimited Store</li>
                                <li className="flex items-center gap-2"> <LuCircleDot />Get NewsLetters through Email</li>
                                <li className="flex items-center gap-2"> <LuCircleDot />Input Costs</li>
                                <li className="flex items-center gap-2"> <LuCircleDot />Export CSV Data</li>
                            </ul>
                        </div>
                        <div className="max-w-93 px-8 py-15 bg-white text-center rounded-2xl">
                            <h1 className="text-[32px] leading-none tracking-none mb-6">Pro Plan</h1>
                            <p className="text-[18px] mb-8">
                                The plan best suited for businesses looking for all the features we offer. You will get insights through emails
                            </p>
                            <h1 className="text-[40px] font-semibold mb-8">$29 / monthly</h1>
                            <button className="text-[25px] text-white rounded-[15px] px-21 py-3 bg-[#3b82f6] cursor-pointer hover:bg-[#5291f5]">Get Started</button>
                            <ul className="mt-8 text-[19px]">
                                <li className="flex items-center gap-2"> <LuCircleDot />Connect Unlimited Store</li>
                                <li className="flex items-center gap-2"> <LuCircleDot />Get Insights</li>
                                <li className="flex items-center gap-2"> <LuCircleDot />Input Costs</li>
                                <li className="flex items-center gap-2"> <LuCircleDot />Export CSV Data</li>
                            </ul>
                        </div>
                    </div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default Subscription