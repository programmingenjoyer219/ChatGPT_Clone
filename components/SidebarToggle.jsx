import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";

export default function SidebarToggle({ handleToggle, extraClass }) {
    return (
        <button
            onClick={handleToggle}
            title="Toggle Sidebar"
            id="sidebar-toggle-button"
            className={`transition-all duration-200 rounded-md p-2 ${extraClass}`}
        >
            <Bars3BottomLeftIcon className="h-6 w-6 text-zinc-500 font-semibold" />
        </button>
    )
}