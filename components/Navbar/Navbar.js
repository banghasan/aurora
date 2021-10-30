import { Aurora } from "../Icons/Aurora";
import { MenuItem } from "./MenuItem";

export function Navbar() {
  return (
    <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10 bg-white max-w-7xl mx-auto px-6 md:px-0">
      <div className="flex font-bold text-xl md:text-2xl text-gray-800 tracking-tight">
        <Aurora className="h-16 w-16" />
      </div>

      <div className="flex items-center justify-end md:flex-1 lg:w-0">
        <nav className="flex md:space-x-4">
          <MenuItem href="/" label="Websites" />
          <MenuItem href="/users" label="Users" />
          <MenuItem href="/profile" label="Profile" />
        </nav>
      </div>
    </div>
  );
}
