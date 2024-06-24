import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";

export default function SidebarToggle({ handleToggle }) {
    return (
        <button
            onClick={handleToggle}
            title="Toggle Sidebar"
            id="sidebar-toggle-button"
            className={`transition-all duration-200 rounded-md p-2 bg-zinc-500 hover:bg-zinc-700 fixed top-4 right-8 z-[10] `}
        >
            <Bars3BottomLeftIcon className="h-6 w-6 text-zinc-900 font-semibold" />
        </button>
    )
}