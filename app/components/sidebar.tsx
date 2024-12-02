import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import Image from 'next/image';
import Link from "next/link";

const SideNavbar: React.FC = () => {
  return (
    <div>
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <Disclosure.Button className="fixed top-4 left-1 z-30 inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
              <GiHamburgerMenu className="block h-6 w-6" aria-hidden="true" />
            </Disclosure.Button>

            <Disclosure.Panel
              className={`p-6 w-1/2 h-screen bg-white z-20 border-2 border-gray-700 rounded-lg fixed top-0 transform ${
                open ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out lg:left-0 lg:w-60 flex flex-col justify-between`}
            >
              {/* Top Section */}
              <div className="flex flex-col justify-start items-left">
                <h1 className="text-base text-center cursor-pointer font-bold text-black border-b border-gray-100 pb-0 w-full">
                  EMS Dashboard
                </h1>
                
                <div className="my-4 border-b border-gray-100 pb-4">
                  <div className="flex mb-2 justify-start items-center gap-4 pl-5">
                    <Image
                    src="/images/OsageLogo.png"
                    width={150}
                    height={150}
                    alt="Osage County Logo"
                    />
                  </div>

                  <Link href="/">
                    <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                      <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white" />
                      <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                        Dashboard
                      </h3>
                    </div>
                  </Link>
                  <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <CgProfile className="text-2xl text-gray-600 group-hover:text-white" />
                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                      Profile
                    </h3>
                  </div>
                  <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <FaRegComments className="text-2xl text-gray-600 group-hover:text-white" />
                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                      Resource Manager
                    </h3>
                  </div>

                  <Link href="/docViewer">
                    <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                      <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-white" />
                      <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                        Documents
                      </h3>
                    </div>
                  </Link>

                  <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white" />
                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                        Settings
                    </h3>
                  </div>
                </div>
              </div>

              {/* Bottom Section (Settings & Logout) */}
              <div className="flex flex-col my-4">
                <div className="flex mb-2 jjustify-start items-center gap-4 pl-5 border border-gray-200 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white" />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
                    Logout
                  </h3>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default SideNavbar;
