
import { useState } from "react";
import { TopNav } from "@/components/navigation/TopNav";
import { Sidebar } from "@/components/navigation/Sidebar";
import { ThemeProvider } from "next-themes";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Home,
  Layers,
  Palette,
  Settings,
  Box,
  FileText,
  Navigation,
  Sun,
  Moon,
  ChevronRight,
  Info,
} from "lucide-react";

// Logo component
const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-lg">
      DS
    </div>
    <span className="text-lg font-semibold">DesignSystem</span>
  </div>
);

// Sample nav items
const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Components",
    href: "#components",
  },
  {
    label: "Colors",
    href: "#colors",
  },
  {
    label: "Documentation",
    href: "#documentation",
  },
];

// Sample sidebar items
const sidebarItems = [
  { sectionTitle: null },
  {
    icon: <Home className="h-5 w-5" />,
    label: "Overview",
    href: "/",
    active: true,
  },
  { sectionTitle: "Foundation" },
  {
    icon: <Palette className="h-5 w-5" />,
    label: "Colors",
    href: "#colors",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    label: "Typography",
    href: "#typography",
  },
  { sectionTitle: "Components" },
  {
    icon: <Navigation className="h-5 w-5" />,
    label: "Navigation",
    href: "#navigation",
  },
  {
    icon: <Box className="h-5 w-5" />,
    label: "Data Display",
    href: "#data-display",
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: "Settings",
    badge: <span className="px-1.5 py-0.5 rounded-full bg-primary-100 text-primary-800 text-xs">New</span>,
  },
];

const ColorCard = ({ name, color, textColor = "text-foreground" }) => (
  <div className="flex flex-col">
    <div className={`h-16 w-full rounded-md ${color} mb-2`}></div>
    <div className={`text-sm font-medium ${textColor}`}>{name}</div>
  </div>
);

const ColorShadeRow = ({ title, colorName }) => (
  <div className="mb-8">
    <h3 className="text-lg font-medium mb-3">{title}</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-11 gap-4">
      <ColorCard name="50" color={`bg-${colorName}-50`} />
      <ColorCard name="100" color={`bg-${colorName}-100`} />
      <ColorCard name="200" color={`bg-${colorName}-200`} />
      <ColorCard name="300" color={`bg-${colorName}-300`} />
      <ColorCard name="400" color={`bg-${colorName}-400`} />
      <ColorCard name="500" color={`bg-${colorName}-500`} textColor="text-white" />
      <ColorCard name="600" color={`bg-${colorName}-600`} textColor="text-white" />
      <ColorCard name="700" color={`bg-${colorName}-700`} textColor="text-white" />
      <ColorCard name="800" color={`bg-${colorName}-800`} textColor="text-white" />
      <ColorCard name="900" color={`bg-${colorName}-900`} textColor="text-white" />
      <ColorCard name="950" color={`bg-${colorName}-950`} textColor="text-white" />
    </div>
  </div>
);

const ComponentExample = ({ title, children, description }) => (
  <div className="border rounded-lg p-6 mb-8">
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    {description && <p className="text-muted-foreground mb-4">{description}</p>}
    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-md p-6 flex flex-wrap items-center gap-4">
      {children}
    </div>
  </div>
);

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [progressValue, setProgressValue] = useState(65);

  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <div className="flex h-screen bg-background text-foreground">
        <Sidebar
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
          items={sidebarItems}
          header={<Logo />}
        />

        <div className="flex flex-col flex-1 overflow-hidden">
          <TopNav
            logo={sidebarCollapsed ? <Logo /> : undefined}
            navItems={navItems}
            userNav={{
              user: {
                name: "John Doe",
                email: "john@example.com",
              },
              actions: [
                { label: "Profile", href: "#profile" },
                { label: "Settings", href: "#settings" },
                { label: "Logout", onClick: () => console.log("Logout") },
              ],
            }}
          />

          <main className="flex-1 overflow-auto p-6">
            <div className="container mx-auto max-w-6xl">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Design System</h1>
                <p className="text-muted-foreground">
                  A comprehensive, modular design system for building modern interfaces.
                </p>
              </div>

              <section id="colors" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Palette className="mr-2 h-5 w-5" /> 
                  Color System
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our color system is built around semantic meaning, with accessibility and contrast in mind.
                  These tokens serve as the foundation for our entire design language.
                </p>

                <ColorShadeRow title="Primary" colorName="primary" />
                <ColorShadeRow title="Secondary" colorName="secondary" />
                <ColorShadeRow title="Tertiary" colorName="tertiary" />
                
                <h3 className="text-lg font-medium mb-3">Semantic Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <ColorCard name="Success" color="bg-success-500" textColor="text-white" />
                  <ColorCard name="Info" color="bg-info-500" textColor="text-white" />
                  <ColorCard name="Warning" color="bg-warning-500" />
                  <ColorCard name="Error" color="bg-error-500" textColor="text-white" />
                </div>
                
                <ColorShadeRow title="Neutral" colorName="neutral" />
              </section>

              <section id="data-display" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Box className="mr-2 h-5 w-5" /> 
                  Data Display
                </h2>

                <ComponentExample 
                  title="Tooltip Component" 
                  description="Tooltips display informative text when users hover over, focus on, or tap an element."
                >
                  <div className="flex flex-wrap gap-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button>Default</Button>
                        </TooltipTrigger>
                        <TooltipContent>Default tooltip</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Success</Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-success-500 text-success-foreground">Success tooltip</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Warning</Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-warning-500 text-warning-foreground">Warning tooltip</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Error</Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-error-500 text-error-foreground">Error tooltip</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Top</Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Top placement</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Bottom</Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">Bottom placement</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Left</Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">Left placement</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Right</Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">Right placement</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </ComponentExample>

                <ComponentExample 
                  title="Progress Bar Component" 
                  description="Progress indicators inform users about the status of ongoing processes."
                >
                  <div className="w-full space-y-6">
                    <div>
                      <Progress value={progressValue} labelText="Default Progress" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Progress value={progressValue} variant="success" labelText="Success" />
                      <Progress value={progressValue} variant="info" labelText="Info" />
                      <Progress value={progressValue} variant="warning" labelText="Warning" />
                      <Progress value={progressValue} variant="error" labelText="Error" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Progress value={progressValue} striped labelText="Striped" />
                      <Progress value={progressValue} striped animated labelText="Animated" />
                    </div>
                    
                    <div>
                      <Progress indeterminate labelText="Indeterminate" />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setProgressValue(Math.max(0, progressValue - 10))}
                      >
                        Decrease
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setProgressValue(Math.min(100, progressValue + 10))}
                      >
                        Increase
                      </Button>
                    </div>
                  </div>
                </ComponentExample>
              </section>

              <section id="navigation" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Navigation className="mr-2 h-5 w-5" /> 
                  Navigation Components
                </h2>
                
                <ComponentExample 
                  title="Top Navigation"
                  description="The top navigation bar provides consistent navigation across the application."
                >
                  <div className="w-full">
                    <div className="border rounded p-4 text-center mb-2">
                      <p>Top navigation demo is displayed at the top of this page</p>
                    </div>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      <li>Supports brand logo, navigation links, and user account dropdown</li>
                      <li>Responsive design collapses to a mobile menu on smaller screens</li>
                      <li>Supports dropdown menus for grouped navigation items</li>
                      <li>Includes theme toggle and notification components</li>
                    </ul>
                  </div>
                </ComponentExample>
                
                <ComponentExample 
                  title="Sidebar Navigation"
                  description="The sidebar provides vertical navigation that can be collapsed to save space."
                >
                  <div className="w-full">
                    <div className="border rounded p-4 text-center mb-2">
                      <p>Sidebar demo is displayed on the left side of this page</p>
                    </div>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      <li>Collapsible design with expanded/collapsed states</li>
                      <li>Supports section headers to group related links</li>
                      <li>Includes icon + text for better visual recognition</li>
                      <li>Shows tooltips when collapsed for improved accessibility</li>
                      <li>Support for active states and badges</li>
                    </ul>
                  </div>
                </ComponentExample>
              </section>
              
              <section id="documentation" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <FileText className="mr-2 h-5 w-5" /> 
                  Documentation & Usage
                </h2>
                
                <div className="bg-info-50 border border-info-200 rounded-lg p-4 mb-6 flex items-start">
                  <Info className="h-5 w-5 text-info-500 mt-0.5 mr-2" />
                  <div>
                    <h4 className="font-medium text-info-800">Getting Started</h4>
                    <p className="text-sm text-info-700">
                      This design system is built with React, TypeScript, and TailwindCSS. All components
                      are fully accessible and follow WCAG guidelines for contrast and keyboard navigation.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1" />
                      Tooltip Usage
                    </h4>
                    <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded font-mono text-sm overflow-auto">
                      {`import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Basic usage
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>Helpful information</TooltipContent>
  </Tooltip>
</TooltipProvider>

// With custom styling
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Error tooltip</Button>
    </TooltipTrigger>
    <TooltipContent className="bg-error-500 text-error-foreground">
      Error message
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

// With placement
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Right tooltip</Button>
    </TooltipTrigger>
    <TooltipContent side="right">Right tooltip</TooltipContent>
  </Tooltip>
</TooltipProvider>`}
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1" />
                      Progress Bar Usage
                    </h4>
                    <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded font-mono text-sm overflow-auto">
                      {`import { Progress } from "@/components/ui/progress";

// Basic usage
<Progress value={65} />

// With label
<Progress value={65} labelText="Loading..." />

// With variants
<Progress value={65} variant="success" labelText="Success" />
<Progress value={65} variant="warning" labelText="Warning" />

// Striped and animated
<Progress value={65} striped animated labelText="Animated" />

// Indeterminate
<Progress indeterminate labelText="Loading..." />`}
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1" />
                      Navigation Components Usage
                    </h4>
                    <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded font-mono text-sm overflow-auto">
                      {`import { TopNav } from "@/components/navigation/TopNav";
import { Sidebar } from "@/components/navigation/Sidebar";

// Top Navigation
<TopNav 
  logo={<Logo />}
  navItems={navigationItems}
  userNav={{ 
    user: { name: "User Name", email: "user@example.com" },
    actions: [{ label: "Profile" }, { label: "Logout" }] 
  }} 
/>

// Sidebar Navigation
<Sidebar
  items={sidebarItems}
  header={<Logo />}
  defaultCollapsed={false}
/>`}
                    </div>
                  </div>
                </div>
              </section>
              
              <footer className="border-t pt-6 text-center text-sm text-muted-foreground">
                <p className="mb-4">Enterprise Design System - Built with React, TypeScript and TailwindCSS</p>
                <div className="flex items-center justify-center space-x-4">
                  <Button variant="ghost" size="sm">GitHub</Button>
                  <Button variant="ghost" size="sm">Documentation</Button>
                  <Button variant="ghost" size="sm">Version 1.0.0</Button>
                </div>
              </footer>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
