"use client"

import * as React from "react"
import {
  BarChart3,
  FolderOpen,
  ListOrdered,
  QrCode,
  HelpCircle,
  Building2,
  Table2,
  Palette,
} from "lucide-react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavSecondary } from "@/components/dashboard/nav-secondary"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart3,
      isActive: false,
    },
    {
      title: "Customization",
      url: "/dashboard/customization",
      icon: Palette,
      isActive: false,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: FolderOpen,
      isActive: false,
    },
    {
      title: "Menu Items",
      url: "/dashboard/items",
      icon: ListOrdered,
      isActive: false,
    },
    {
      title: "Tables",
      url: "/dashboard/tables",
      icon: Table2,
      isActive: false,
    },
    {
      title: "QR Code",
      url: "/dashboard/qr-code",
      icon: QrCode,
      isActive: false,
    },
  ],
  navSecondary: [
    {
      title: "Help",
      url: "/dashboard/help",
      icon: HelpCircle,
    },
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  businessName?: string
  userEmail?: string
  userName?: string
}

export function AppSidebar({ businessName, userEmail, userName, ...props }: AppSidebarProps) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Building2 className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{businessName || "QR Menu Builder"}</span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: userName || "User", email: userEmail || "user@example.com", avatar: "" }} />
      </SidebarFooter>
    </Sidebar>
  )
}
