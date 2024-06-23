import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";

export default function SidebarToggle() {
    return (
        <button
            title="Toggle Sidebar"
            id="sidebar-toggle-button"
            className="transition-all duration-200 hover:bg-gray-700/50 rounded-md p-2"
        >
            <Bars3BottomLeftIcon className="h-6 w-6 text-gray-500 font-semibold" />
        </button>
    )
}