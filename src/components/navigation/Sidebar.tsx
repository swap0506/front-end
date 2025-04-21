
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  label?: string;
  href?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  // If not null, this is a section header
  sectionTitle?: string | null;
  // Optional badge (count, etc)
  badge?: React.ReactNode;
}

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: SidebarItemProps[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  collapsible?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function Sidebar({
  items = [],
  header,
  footer,
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  collapsible = true,
  onCollapsedChange,
  className,
  ...props
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(
    controlledCollapsed !== undefined ? controlledCollapsed : defaultCollapsed
  );

  // Handle controlled & uncontrolled behavior
  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : isCollapsed;

  const toggleCollapsed = () => {
    const newCollapsed = !collapsed;
    if (controlledCollapsed === undefined) {
      setIsCollapsed(newCollapsed);
    }
    onCollapsedChange?.(newCollapsed);
  };

  return (
    <aside
      data-collapsed={collapsed}
      className={cn(
        "group flex flex-col bg-sidebar border-r border-sidebar-border h-screen",
        collapsed ? "w-16" : "w-64",
        "transition-all duration-300 ease-in-out",
        className
      )}
      {...props}
    >
      {/* Header */}
      {header && (
        <div
          className={cn(
            "h-16 flex items-center border-b border-sidebar-border px-4",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          {collapsed ? (
            <div className="flex justify-center items-center w-full">
              {header}
            </div>
          ) : (
            <>
              <div className="flex items-center overflow-hidden">
                {header}
              </div>
            </>
          )}
        </div>
      )}

      {/* Navigation items */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          {items.map((item, i) => {
            // Check if this is a section header
            if (item.sectionTitle !== undefined) {
              if (collapsed) return null; // Don't show section titles when collapsed
              
              return (
                <li key={`section-${i}`} className="mt-4 mb-2 px-2">
                  <div className="text-xs uppercase tracking-wider text-sidebar-foreground/50 font-medium">
                    {item.sectionTitle}
                  </div>
                </li>
              );
            }

            const itemContent = (
              <>
                {item.icon && (
                  <span className="mr-3 flex-shrink-0 text-sidebar-foreground/70">
                    {item.icon}
                  </span>
                )}
                {!collapsed && (
                  <>
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto">{item.badge}</span>
                    )}
                  </>
                )}
              </>
            );

            return (
              <li key={`item-${i}`}>
                {collapsed ? (
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={item.active ? "secondary" : "ghost"}
                          size="icon"
                          className={cn(
                            "w-full h-10",
                            item.active && "bg-sidebar-accent text-sidebar-accent-foreground",
                            item.disabled && "opacity-50 pointer-events-none"
                          )}
                          asChild={!!item.href}
                          disabled={item.disabled}
                          onClick={item.onClick}
                        >
                          {item.href ? (
                            <a href={item.href} className="flex items-center justify-center">
                              {item.icon}
                            </a>
                          ) : (
                            item.icon
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="flex items-center gap-4">
                        {item.label}
                        {item.badge}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <Button
                    variant={item.active ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      item.active && "bg-sidebar-accent text-sidebar-accent-foreground",
                      item.disabled && "opacity-50 pointer-events-none"
                    )}
                    asChild={!!item.href}
                    disabled={item.disabled}
                    onClick={item.onClick}
                  >
                    {item.href ? (
                      <a href={item.href} className="flex items-center">
                        {itemContent}
                      </a>
                    ) : (
                      <>{itemContent}</>
                    )}
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {footer && (
        <div
          className={cn(
            "h-16 flex items-center border-t border-sidebar-border p-2",
            collapsed ? "justify-center" : "px-4"
          )}
        >
          {footer}
        </div>
      )}

      {/* Collapse toggle button */}
      {collapsible && (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-3 rounded-full",
            collapsed ? "right-0 translate-x-1/2" : "right-4",
            "h-6 w-6 text-sidebar-foreground/70 hover:text-sidebar-foreground"
          )}
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      )}
    </aside>
  );
}

export const SidebarItem = React.forwardRef<
  HTMLDivElement,
  SidebarItemProps
>(({ className, icon, label, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center space-x-4 py-2", className)}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
    </div>
  );
});
SidebarItem.displayName = "SidebarItem";
