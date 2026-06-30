"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  FileText,
  CreditCard,
  Settings,
  StickyNotePlus,
  CookingPot,
  ShoppingCart,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";

// Unified Navigation Links for Consumers matching HamimMart's domain
const consumerLinks = [
  { icon: Home, href: "/dashboard/consumer/grocery", name: "Dashboard", exact: true },
  { icon: StickyNotePlus, href: "/dashboard/consumer/grocery/new", name: "Add grocery" },
  { icon: CookingPot, href: "/dashboard/consumer/grocery/my", name: "My grocery" },
  { icon: FileText, href: "/dashboard/consumer/grocery/Favourite", name: "Favour grocery" },
  { icon: CreditCard, href: "/dashboard/consumer/billing", name: "Billing" },
  { icon: ShoppingCart, href: "/dashboard/consumer/purchaseInfo", name: "Purchase Info" },
  { icon: Settings, href: "/dashboard/profile", name: "Profile" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const userImage = session?.user?.image;

  const SidebarContent = () => (
    <div className="flex flex-col h-full w-full text-foreground bg-white dark:bg-zinc-950">
      {/* Brand & Profile Section */}
      <div className="p-5 border-b border-zinc-100 dark:border-zinc-900 flex flex-col gap-4">
        {/* Optional: Add HamimMart Brand text/logo space here if needed */}
        <div className="flex items-center gap-3">
          {userImage ? (
            <Image
              src={userImage}
              width={42}
              height={42}
              alt="profile"
              className="rounded-full object-cover border-2 border-orange-500"
            />
          ) : (
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400">
              {session?.user?.name?.charAt(0) || "U"}
            </div>
          )}

          <div className="text-sm space-y-0.5 min-w-0">
            <p className="font-semibold truncate text-zinc-800 dark:text-zinc-200">
              {session?.user?.name || "User"}
            </p>
            <p className="text-zinc-400 dark:text-zinc-500 text-xs truncate-all">
              {session?.user?.email}
            </p>
          </div>
        </div>
        
        {/* Plan Status Badge Styled after HamimMart Green Accent */}
        <div>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400 rounded-full border border-green-200/50 dark:border-green-900/30">
            {session?.user?.plan === "chef_free" ? 'Consumer' : session?.user?.plan === "chef_Pro" ? 'Pro Consumer' : 'Premium Consumer'}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {consumerLinks.map((item) => {
          const Icon = item.icon;

          const active = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                active
                  ? "bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 font-semibold shadow-sm border border-orange-100/50 dark:border-orange-950/30"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50/50 dark:hover:bg-orange-950/10"
              }`}
            >
              {/* Icon color shifts to HamimMart Orange when active */}
              <Icon 
                size={18} 
                className={active ? "text-orange-600 dark:text-orange-400" : "text-zinc-400 dark:text-zinc-500"} 
              />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 p-4 bg-background ">
        <button onClick={() => setOpen(true)} className="text-zinc-800 dark:text-zinc-200">
          <Menu size={24} />
        </button>
       
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 h-screen sticky top-0 border-r border-zinc-100 dark:border-zinc-900 bg-background">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 dark:bg-black/60 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 left-0 h-screen w-72 bg-background border-r border-zinc-200 dark:border-zinc-800 text-foreground transform transition-transform duration-300 flex flex-col ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-900">
            <h2 className="text-orange-600 dark:text-orange-500 font-semibold"> Menu </h2>
            <button onClick={() => setOpen(false)} className="text-zinc-500 dark:text-zinc-400 hover:text-orange-600">
              <X size={22} />
            </button>
          </div>

          <SidebarContent />
        </div>
      </div>
    </>
  );
}