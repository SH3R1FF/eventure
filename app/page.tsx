// Make sure this is in a server component file
// import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/calendar.png"
import ThemeMode from "@/components/ThemeMode";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
// export default async function Home() {
export default function Home() {

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
            {/* <NavLink href="/events">Events</NavLink>
            <NavLink href="/schedule">Schedule</NavLink> */}
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

      <div className="text-center flex flex-col gap-4 items-center  justify-center container my-24 mx-auto">
        <h1 className="text-[78px] md:text-[148px] md:leading-none font-semibold tracking-tighter bg-white bg-[radial-gradient(100%_100%_at_top_left,#e11d48,#fda4af,#e11d48)] dark:bg-[radial-gradient(100%_100%_at_top_left,white,white,#e11d48)] text-transparent bg-clip-text text-center">
          Eventure
        </h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto text-neutral-600 my-10 text-center ">
          Effortlessly manage appointments with our calendar scheduling app. Set availability and sync with Google Calendar for seamless, real-time scheduling.
        </p>

        <div className="flex gap-4">
          <Link href={"/sign-up"}>   
            <Button className="rounded-full bg-rose-100 text-neutral-800 hover:text-rose-100 " size={"sm"}>
              <h1>
                Join Now
              </h1>
              <ChevronRight className="size-24"/>
            </Button>
          </Link>
          
          <Link href={"/events"}>   
            <Button className="rounded-full bg-rose-600 " size={"sm"}>
              <h1>
                Get Started
              </h1>
              <ChevronRight  className="size-24"/>
            </Button>
          </Link>
        </div>
      </div>

    </>
  );
}
