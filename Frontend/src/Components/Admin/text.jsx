<aside id='sidebar' className={openSidebarToggle ? "sidebar-responsive": ""}>
     
<nav className=" w-72 sm:w-30! flex-col justify-between ml-0 pl-4 bg-purple-700 ">
    <div className=" bg-purple-700 h-full">
        <div className="flex py-10 shadow-sm pr-4">

            <div className="">

                <h1 className={'text-4xl font-bold text-white'}>TastyEatzz</h1>
                    <span className={'sm' ? 'relative top-0 right-0 text-xs text-gray-800' :'text-lg block text-gray-800'}>Hotel</span>
            </div>
        </div>
        <div className="">
            <ul className="space-y-8 pt-10">
                <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
                    <FaTable className='text-2xl'/>
                    <Link to={HOTEL_DASHBOARD}>
                        <a className='hidden sm:block'>Dashboard</a>
                    </Link>
                </li>
                <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
                    <FaHamburger className='text-2xl' />
                    <Link to={HOTEL_FOOD}>
                        <a className="hidden sm:block">Food Item</a>
                    </Link>
                </li>
                <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
                    <FaUser className='text-2xl'/>
                    <Link to={''}>
                    <a className='hidden sm:block'>Profile</a>
                    </Link>
                </li>
                <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
                    <BsCardChecklist className='text-2xl'/>
                    <a className='hidden sm:block'>Orders</a>
                </li>
                <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
                    <IoMdSettings className='text-2xl'/>
                    <a className='hidden sm:block'>Settings</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
</aside>