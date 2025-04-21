
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, Moon, Sun, ChevronDown, Bell } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export interface TopNavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: TopNavItem[];
  onClick?: () => void;
}

export interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  navItems?: TopNavItem[];
  userNav?: {
    user?: {
      name?: string;
      email?: string;
      image?: string;
    };
    actions: { label: string; onClick?: () => void; href?: string }[];
  };
  sticky?: boolean;
  showThemeToggle?: boolean;
}

export function TopNav({
  logo,
  navItems = [],
  userNav,
  sticky = true,
  showThemeToggle = true,
  className,
  ...props
}: TopNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "w-full bg-background border-b border-border z-40",
        sticky && "sticky top-0",
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Desktop Navigation */}
          <div className="flex items-center">
            {logo && <div className="mr-4 flex-shrink-0">{logo}</div>}
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item, i) => (
                <React.Fragment key={`desktop-${item.label}-${i}`}>
                  {item.children ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "flex items-center gap-1",
                            item.disabled && "opacity-50 pointer-events-none"
                          )}
                        >
                          {item.icon}
                          {item.label}
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {item.children.map((child, j) => (
                          <DropdownMenuItem
                            key={`desktop-dropdown-${child.label}-${j}`}
                            disabled={child.disabled}
                            onClick={child.onClick}
                            asChild={!!child.href}
                          >
                            {child.href ? (
                              <a
                                href={child.href}
                                className="flex w-full items-center"
                              >
                                {child.icon && (
                                  <span className="mr-2">{child.icon}</span>
                                )}
                                {child.label}
                              </a>
                            ) : (
                              <>
                                {child.icon && (
                                  <span className="mr-2">{child.icon}</span>
                                )}
                                {child.label}
                              </>
                            )}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Button
                      variant="ghost"
                      disabled={item.disabled}
                      onClick={item.onClick}
                      asChild={!!item.href}
                    >
                      {item.href ? (
                        <a
                          href={item.href}
                          className="flex items-center"
                        >
                          {item.icon && <span className="mr-2">{item.icon}</span>}
                          {item.label}
                        </a>
                      ) : (
                        <>
                          {item.icon && <span className="mr-2">{item.icon}</span>}
                          {item.label}
                        </>
                      )}
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-2">
            {/* Notification button example */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </Button>

            {/* Theme toggle */}
            {showThemeToggle && (
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
            )}

            {/* User menu */}
            {userNav && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full hidden md:flex"
                  >
                    <Avatar className="h-8 w-8">
                      {userNav.user?.image && (
                        <AvatarImage
                          src={userNav.user.image}
                          alt={userNav.user.name || "User"}
                        />
                      )}
                      <AvatarFallback className="bg-primary-100 text-primary-800">
                        {userNav.user?.name
                          ? userNav.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {userNav.user && (
                    <>
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          {userNav.user.name && (
                            <p className="font-medium">{userNav.user.name}</p>
                          )}
                          {userNav.user.email && (
                            <p className="text-xs text-muted-foreground truncate w-full">
                              {userNav.user.email}
                            </p>
                          )}
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  {userNav.actions.map((item, i) => (
                    <DropdownMenuItem
                      key={`user-nav-${item.label}-${i}`}
                      onClick={item.onClick}
                      asChild={!!item.href}
                    >
                      {item.href ? (
                        <a href={item.href}>{item.label}</a>
                      ) : (
                        item.label
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="flex md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map((item, i) => (
              <React.Fragment key={`mobile-${item.label}-${i}`}>
                {item.children ? (
                  <>
                    <div className="px-3 py-2 text-sm font-medium text-foreground">
                      {item.label}
                    </div>
                    <div className="pl-4 space-y-1">
                      {item.children.map((child, j) => (
                        <Button
                          key={`mobile-child-${child.label}-${j}`}
                          variant="ghost"
                          className="w-full justify-start"
                          disabled={child.disabled}
                          onClick={() => {
                            if (child.onClick) {
                              child.onClick();
                              setIsMobileMenuOpen(false);
                            }
                          }}
                          asChild={!!child.href}
                        >
                          {child.href ? (
                            <a
                              href={child.href}
                              className="flex items-center"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.icon && (
                                <span className="mr-2">{child.icon}</span>
                              )}
                              {child.label}
                            </a>
                          ) : (
                            <>
                              {child.icon && (
                                <span className="mr-2">{child.icon}</span>
                              )}
                              {child.label}
                            </>
                          )}
                        </Button>
                      ))}
                    </div>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    disabled={item.disabled}
                    onClick={() => {
                      if (item.onClick) {
                        item.onClick();
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    asChild={!!item.href}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex items-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.icon && <span className="mr-2">{item.icon}</span>}
                        {item.label}
                      </a>
                    ) : (
                      <>
                        {item.icon && <span className="mr-2">{item.icon}</span>}
                        {item.label}
                      </>
                    )}
                  </Button>
                )}
              </React.Fragment>
            ))}
            
            {showThemeToggle && (
              <div className="px-3 py-2">
                <ThemeToggle />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
