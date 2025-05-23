"use client"

import { type LucideIcon } from "lucide-react"

import {
  Collapsible,
} from "@/components/ui/collapsible"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    // <SidebarGroup>
    //   <SidebarGroupLabel>Platform</SidebarGroupLabel>
    <SidebarMenu className="flex items-center w-full">
      {items.map((item) => (
        <Collapsible
          key={item.title}
          asChild
          defaultOpen={item.isActive}
          className="group/collapsible"
        >
          <SidebarMenuItem className="w-full flex items-center">
            {/* <CollapsibleTrigger asChild> */}
            <SidebarMenuButton className="flex items-center" tooltip={item.title}>
              {item.icon && <item.icon />}
              <Link href={item.url} className="text-left w-full">{item.title}</Link>
              {/* <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" /> */}
            </SidebarMenuButton>
            {/* </CollapsibleTrigger> */}
            {/* <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent> */}
          </SidebarMenuItem>
        </Collapsible>
      ))}
    </SidebarMenu>
    // </SidebarGroup>
  )
}
