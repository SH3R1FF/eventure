import NavLink from "@/components/NavLink";
import ThemeMode from "@/components/ThemeMode";
import { UserButton } from "@clerk/nextjs";
// import { CalendarRangeIcon } from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/calendar.png"
import Link from "next/link";

export default function PrivateLayout({children}: { children: React.ReactNode}) {
    return (
        <>
            <header className="flex py-2 border-b bg-card">
                <nav className="font-medium flex items-center text-sm gap-6 container">
                    <Link href={"/"} className="flex items-center gap-2 font-semibold mr-auto ">
                        {/* <CalendarRangeIcon className="size-6"/> */}
                        <Image
                            src={Logo}
                            alt="Eventure"
                            className="size-8"
                        />
                        <span className="sr-only md:not-sr-only text-lg">Eventure</span>
                    </Link>
                    <NavLink href="/events">Events</NavLink>
                    <NavLink href="/schedule">Schedule</NavLink>
                    <div className="ml-auto flex items-center gap-4">
                        <ThemeMode />
                        <div className="size-8">
                            <UserButton 
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox: "size-full"}
                                    }}
                                    />
                        </div>
                    </div>
                </nav>
            </header>
            <main className="container my-6">
                {children}
            </main>
        </>
    )
}