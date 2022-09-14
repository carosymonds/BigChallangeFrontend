/* This example requires Tailwind CSS v2.0+ */
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Avatar from 'react-avatar';
import { QueueListIcon } from "@heroicons/react/24/solid";

export default function SideMenu() {
  return (
    <>
      <div
        className="fixed w-3/12 z-40 h-screen overflow-y-auto bg-white dark:bg-gray-800"
        aria-labelledby="drawer-navigation-label"
      >
        <div className="p-4 overflow-y-auto">
            <ul className="space-y-2">
                <li>
                <a
                    href="#"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <HomeIcon className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="ml-3">Home</span>
                </a>
                </li>
                <li>
                <a
                    href="#"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <QueueListIcon className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="flex-1 ml-3 whitespace-nowrap">Task history</span>
                </a>
                </li>
            </ul>
        </div>
        <div className="p-4 w-full absolute bottom-0 dark:bg-gray-700 py-4">
            <a href="#" className="group block w-full flex-shrink-0">
                <div className="flex items-center">
                    <div>
                       <Avatar name="Tom Cook" color="gray" size="60" round="50px"  className="inline-block h-9 w-9" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-white">Tom Cook</p>
                        <p className="text-xs font-medium text-gray-300  group-hover:text-white">Sign out</p>
                    </div>
                </div>
            </a>
        </div>
      </div>
    </>
  );
}
