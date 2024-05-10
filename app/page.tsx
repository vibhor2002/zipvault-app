import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800">

        <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5">
          <h1 className="text-5xl font-bold">
            Welcome to ZipVault. <br />
            <br />
            Storing everything for you and your business needs. All in one place.
          </h1>

          <p className="pb-20">
            Enhance your personal storage with Zipvault offering a simple and efficient
            way to store, share, and collaborate on files from anywhere. Securely store important documents
            and media, and  experience the convinience of easy file management and sharing
            in one centeralized location.
          </p>

          <Link href='/dashboard' className="flex cursor-pointer bg-[#3fa883] w-fit p-5">
            Try it for Free!
            <ArrowRight className="ml-10" />
          </Link>
        </div>

        <div className="bg-[#1E1919] dark:bg-slate-800 h-full p-10">
          <video autoPlay loop muted className="rounded-lg">
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
              type="video/mp4"
            />
          </video>

        </div>

      </div>

      <p className="text-center font-bold text-xl pt-5">Disclaimer</p>
      <p className="text-center font-light pt-2">
        This website is made for informational and educational purposes only. We
        do not own or affiliate with ZipVault or/and any of its subsidiaries in any form.
        Copyright Disclaimer under section 107 of the Copyright Act 1976, allowance is made
        for &quot; fair use &quot; for educational purposes.
      </p>
    </main>
  );
}
