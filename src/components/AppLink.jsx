
"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

function AppLink({ path, children }) {

    const currentPath = usePathname();
    const isActive = currentPath === path;

    return (
        <Link href={path} className={isActive ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" : ""}>
            {children}
        </Link>
    );
}

export default AppLink;
