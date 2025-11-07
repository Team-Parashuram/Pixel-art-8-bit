export type ComponentCategory = 
  | "Forms"
  | "Layout"
  | "Feedback"
  | "Navigation"
  | "Display"
  | "Overlays";

export interface ComponentExample {
  title: string;
  description?: string;
  code: string;
}

export interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  description?: string;
}

export interface ComponentDoc {
  slug: string;
  title: string;
  description: string;
  category: ComponentCategory;
  installation: string;
  importCode: string;
  usageCode: string;
  componentCode: string;
  props?: ComponentProp[];
  examples?: ComponentExample[];
}

export const componentRegistry: ComponentDoc[] = [
  // Forms
  {
    slug: "pixel-button",
    title: "Button",
    description: "Retro 8-bit styled button with pixel-perfect borders and instant state changes.",
    category: "Forms",
    installation: "npm install @radix-ui/react-slot",
    importCode: `import { PixelButton } from "@/components/ui/pixel-button"`,
    usageCode: `<PixelButton>Click Me</PixelButton>
<PixelButton variant="secondary">Secondary</PixelButton>
<PixelButton variant="destructive">Delete</PixelButton>`,
    componentCode: `/src/components/ui/pixel-button.tsx`,
    props: [
      { name: "variant", type: '"default" | "secondary" | "ghost" | "destructive"', default: '"default"', description: "Button visual style" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Button size" },
      { name: "asChild", type: "boolean", default: "false", description: "Render as child component" },
    ],
    examples: [
      {
        title: "Variants",
        code: `<div className="flex gap-4 flex-wrap">
  <PixelButton variant="default">Default</PixelButton>
  <PixelButton variant="secondary">Secondary</PixelButton>
  <PixelButton variant="ghost">Ghost</PixelButton>
  <PixelButton variant="destructive">Destructive</PixelButton>
</div>`,
      },
      {
        title: "Sizes",
        code: `<div className="flex gap-4 items-center">
  <PixelButton size="sm">Small</PixelButton>
  <PixelButton size="md">Medium</PixelButton>
  <PixelButton size="lg">Large</PixelButton>
</div>`,
      },
    ],
  },
  {
    slug: "pixel-input",
    title: "Input",
    description: "Text input field with retro pixel borders and styling.",
    category: "Forms",
    installation: "",
    importCode: `import { PixelInput } from "@/components/ui/pixel-input"`,
    usageCode: `<PixelInput placeholder="Enter text..." />`,
    componentCode: `/src/components/ui/pixel-input.tsx`,
    props: [
      { name: "type", type: "string", default: '"text"', description: "Input type" },
      { name: "placeholder", type: "string", description: "Placeholder text" },
    ],
    examples: [
      {
        title: "Basic Input",
        code: `<PixelInput placeholder="Type something..." />`,
      },
      {
        title: "With Label",
        code: `<div className="space-y-2">
  <PixelLabel htmlFor="email">Email</PixelLabel>
  <PixelInput id="email" type="email" placeholder="email@example.com" />
</div>`,
      },
    ],
  },
  {
    slug: "pixel-checkbox",
    title: "Checkbox",
    description: "A pixel-styled checkbox component for selections.",
    category: "Forms",
    installation: "npm install @radix-ui/react-checkbox",
    importCode: `import { PixelCheckbox } from "@/components/ui/pixel-checkbox"`,
    usageCode: `<PixelCheckbox id="terms" />
<PixelLabel htmlFor="terms">Accept terms</PixelLabel>`,
    componentCode: `/src/components/ui/pixel-checkbox.tsx`,
    examples: [
      {
        title: "With Label",
        code: `<div className="flex items-center space-x-2">
  <PixelCheckbox id="terms" />
  <PixelLabel htmlFor="terms">Accept terms and conditions</PixelLabel>
</div>`,
      },
    ],
  },
  {
    slug: "pixel-switch",
    title: "Switch",
    description: "A toggle switch with pixel-art styling.",
    category: "Forms",
    installation: "npm install @radix-ui/react-switch",
    importCode: `import { PixelSwitch } from "@/components/ui/pixel-switch"`,
    usageCode: `<PixelSwitch />`,
    componentCode: `/src/components/ui/pixel-switch.tsx`,
    examples: [
      {
        title: "Basic Switch",
        code: `<div className="flex items-center space-x-2">
  <PixelSwitch id="airplane-mode" />
  <PixelLabel htmlFor="airplane-mode">Airplane Mode</PixelLabel>
</div>`,
      },
    ],
  },
  {
    slug: "pixel-radio-group",
    title: "Radio Group",
    description: "Radio button group with retro styling.",
    category: "Forms",
    installation: "npm install @radix-ui/react-radio-group",
    importCode: `import { PixelRadioGroup, PixelRadioGroupItem } from "@/components/ui/pixel-radio-group"`,
    usageCode: `<PixelRadioGroup defaultValue="option1">
  <PixelRadioGroupItem value="option1" />
  <PixelRadioGroupItem value="option2" />
</PixelRadioGroup>`,
    componentCode: `/src/components/ui/pixel-radio-group.tsx`,
  },
  {
    slug: "pixel-select",
    title: "Select",
    description: "Dropdown selection with pixel borders.",
    category: "Forms",
    installation: "npm install @radix-ui/react-select",
    importCode: `import { PixelSelect, PixelSelectTrigger, PixelSelectValue, PixelSelectContent, PixelSelectItem } from "@/components/ui/pixel-select"`,
    usageCode: `<PixelSelect>
  <PixelSelectTrigger>
    <PixelSelectValue placeholder="Select..." />
  </PixelSelectTrigger>
  <PixelSelectContent>
    <PixelSelectItem value="1">Option 1</PixelSelectItem>
    <PixelSelectItem value="2">Option 2</PixelSelectItem>
  </PixelSelectContent>
</PixelSelect>`,
    componentCode: `/src/components/ui/pixel-select.tsx`,
  },
  {
    slug: "pixel-textarea",
    title: "Textarea",
    description: "Multi-line text input with pixel styling.",
    category: "Forms",
    installation: "",
    importCode: `import { PixelTextarea } from "@/components/ui/pixel-textarea"`,
    usageCode: `<PixelTextarea placeholder="Type your message..." />`,
    componentCode: `/src/components/ui/pixel-textarea.tsx`,
  },
  {
    slug: "pixel-slider",
    title: "Slider",
    description: "Range slider with chunky pixel styling.",
    category: "Forms",
    installation: "npm install @radix-ui/react-slider",
    importCode: `import { PixelSlider } from "@/components/ui/pixel-slider"`,
    usageCode: `<PixelSlider defaultValue={[50]} max={100} step={1} />`,
    componentCode: `/src/components/ui/pixel-slider.tsx`,
  },
  {
    slug: "pixel-label",
    title: "Label",
    description: "Form label with pixel font styling.",
    category: "Forms",
    installation: "npm install @radix-ui/react-label",
    importCode: `import { PixelLabel } from "@/components/ui/pixel-label"`,
    usageCode: `<PixelLabel htmlFor="input">Label</PixelLabel>`,
    componentCode: `/src/components/ui/pixel-label.tsx`,
  },
  {
    slug: "pixel-form",
    title: "Form",
    description: "Form components integrated with react-hook-form.",
    category: "Forms",
    installation: "npm install react-hook-form @hookform/resolvers zod",
    importCode: `import { PixelForm, PixelFormField, PixelFormItem, PixelFormLabel, PixelFormControl, PixelFormMessage } from "@/components/ui/pixel-form"`,
    usageCode: `// See examples for full usage`,
    componentCode: `/src/components/ui/pixel-form.tsx`,
  },

  // Display
  {
    slug: "pixel-card",
    title: "Card",
    description: "Container component with pixel-art styling for displaying content.",
    category: "Display",
    installation: "",
    importCode: `import { PixelCard, PixelCardHeader, PixelCardTitle, PixelCardDescription, PixelCardContent, PixelCardFooter } from "@/components/ui/pixel-card"`,
    usageCode: `<PixelCard>
  <PixelCardHeader>
    <PixelCardTitle>Title</PixelCardTitle>
    <PixelCardDescription>Description</PixelCardDescription>
  </PixelCardHeader>
  <PixelCardContent>Content</PixelCardContent>
  <PixelCardFooter>Footer</PixelCardFooter>
</PixelCard>`,
    componentCode: `/src/components/ui/pixel-card.tsx`,
  },
  {
    slug: "pixel-badge",
    title: "Badge",
    description: "Small status indicator with retro styling.",
    category: "Display",
    installation: "",
    importCode: `import { PixelBadge } from "@/components/ui/pixel-badge"`,
    usageCode: `<PixelBadge>New</PixelBadge>
<PixelBadge variant="secondary">Beta</PixelBadge>`,
    componentCode: `/src/components/ui/pixel-badge.tsx`,
  },
  {
    slug: "pixel-avatar",
    title: "Avatar",
    description: "Pixelated user avatar component.",
    category: "Display",
    installation: "npm install @radix-ui/react-avatar",
    importCode: `import { PixelAvatar, PixelAvatarImage, PixelAvatarFallback } from "@/components/ui/pixel-avatar"`,
    usageCode: `<PixelAvatar>
  <PixelAvatarImage src="/avatar.png" />
  <PixelAvatarFallback>JD</PixelAvatarFallback>
</PixelAvatar>`,
    componentCode: `/src/components/ui/pixel-avatar.tsx`,
  },
  {
    slug: "pixel-skeleton",
    title: "Skeleton",
    description: "Loading placeholder with pixel styling.",
    category: "Display",
    installation: "",
    importCode: `import { PixelSkeleton } from "@/components/ui/pixel-skeleton"`,
    usageCode: `<PixelSkeleton className="w-full h-12" />`,
    componentCode: `/src/components/ui/pixel-skeleton.tsx`,
  },
  {
    slug: "pixel-table",
    title: "Table",
    description: "Data table with pixel borders.",
    category: "Display",
    installation: "",
    importCode: `import { PixelTable, PixelTableHeader, PixelTableBody, PixelTableRow, PixelTableHead, PixelTableCell } from "@/components/ui/pixel-table"`,
    usageCode: `<PixelTable>
  <PixelTableHeader>
    <PixelTableRow>
      <PixelTableHead>Name</PixelTableHead>
    </PixelTableRow>
  </PixelTableHeader>
  <PixelTableBody>
    <PixelTableRow>
      <PixelTableCell>Data</PixelTableCell>
    </PixelTableRow>
  </PixelTableBody>
</PixelTable>`,
    componentCode: `/src/components/ui/pixel-table.tsx`,
  },
  {
    slug: "pixel-kbd",
    title: "Keyboard Key",
    description: "Display keyboard shortcuts with pixel styling.",
    category: "Display",
    installation: "",
    importCode: `import { PixelKbd } from "@/components/ui/pixel-kbd"`,
    usageCode: `<PixelKbd>Ctrl</PixelKbd> + <PixelKbd>C</PixelKbd>`,
    componentCode: `/src/components/ui/pixel-kbd.tsx`,
  },
  {
    slug: "pixel-empty",
    title: "Empty State",
    description: "Empty state display component.",
    category: "Display",
    installation: "",
    importCode: `import { PixelEmpty, PixelEmptyIcon, PixelEmptyTitle, PixelEmptyDescription } from "@/components/ui/pixel-empty"`,
    usageCode: `<PixelEmpty>
  <PixelEmptyIcon />
  <PixelEmptyTitle>No items</PixelEmptyTitle>
  <PixelEmptyDescription>Get started by creating a new item</PixelEmptyDescription>
</PixelEmpty>`,
    componentCode: `/src/components/ui/pixel-empty.tsx`,
  },

  // Feedback
  {
    slug: "pixel-alert",
    title: "Alert",
    description: "Alert messages with pixel styling.",
    category: "Feedback",
    installation: "",
    importCode: `import { PixelAlert, PixelAlertTitle, PixelAlertDescription } from "@/components/ui/pixel-alert"`,
    usageCode: `<PixelAlert>
  <PixelAlertTitle>Heads up!</PixelAlertTitle>
  <PixelAlertDescription>This is an alert message</PixelAlertDescription>
</PixelAlert>`,
    componentCode: `/src/components/ui/pixel-alert.tsx`,
  },
  {
    slug: "pixel-toast",
    title: "Toast",
    description: "Toast notifications with retro styling.",
    category: "Feedback",
    installation: "",
    importCode: `import { usePixelToast } from "@/components/ui/pixel-toast"`,
    usageCode: `const { toast } = usePixelToast()

toast({
  title: "Success!",
  description: "Operation completed",
})`,
    componentCode: `/src/components/ui/pixel-toast.tsx`,
  },
  {
    slug: "pixel-progress",
    title: "Progress",
    description: "Progress bar with pixel styling.",
    category: "Feedback",
    installation: "npm install @radix-ui/react-progress",
    importCode: `import { PixelProgress } from "@/components/ui/pixel-progress"`,
    usageCode: `<PixelProgress value={60} />`,
    componentCode: `/src/components/ui/pixel-progress.tsx`,
  },
  {
    slug: "pixel-spinner",
    title: "Spinner",
    description: "Loading spinner with pixel animation.",
    category: "Feedback",
    installation: "",
    importCode: `import { PixelSpinner } from "@/components/ui/pixel-spinner"`,
    usageCode: `<PixelSpinner />`,
    componentCode: `/src/components/ui/pixel-spinner.tsx`,
  },
  {
    slug: "pixel-sonner",
    title: "Sonner Toast",
    description: "Toast notifications using Sonner library.",
    category: "Feedback",
    installation: "npm install sonner",
    importCode: `import { toast } from "sonner"`,
    usageCode: `toast.success("Saved!")`,
    componentCode: `/src/components/ui/pixel-sonner.tsx`,
  },

  // Navigation
  {
    slug: "pixel-tabs",
    title: "Tabs",
    description: "Tabbed interface with pixel styling.",
    category: "Navigation",
    installation: "npm install @radix-ui/react-tabs",
    importCode: `import { PixelTabs, PixelTabsList, PixelTabsTrigger, PixelTabsContent } from "@/components/ui/pixel-tabs"`,
    usageCode: `<PixelTabs defaultValue="tab1">
  <PixelTabsList>
    <PixelTabsTrigger value="tab1">Tab 1</PixelTabsTrigger>
    <PixelTabsTrigger value="tab2">Tab 2</PixelTabsTrigger>
  </PixelTabsList>
  <PixelTabsContent value="tab1">Content 1</PixelTabsContent>
  <PixelTabsContent value="tab2">Content 2</PixelTabsContent>
</PixelTabs>`,
    componentCode: `/src/components/ui/pixel-tabs.tsx`,
  },
  {
    slug: "pixel-breadcrumb",
    title: "Breadcrumb",
    description: "Navigation breadcrumbs with pixel styling.",
    category: "Navigation",
    installation: "",
    importCode: `import { PixelBreadcrumb, PixelBreadcrumbList, PixelBreadcrumbItem, PixelBreadcrumbLink, PixelBreadcrumbSeparator } from "@/components/ui/pixel-breadcrumb"`,
    usageCode: `<PixelBreadcrumb>
  <PixelBreadcrumbList>
    <PixelBreadcrumbItem>
      <PixelBreadcrumbLink href="/">Home</PixelBreadcrumbLink>
    </PixelBreadcrumbItem>
    <PixelBreadcrumbSeparator />
    <PixelBreadcrumbItem>
      <PixelBreadcrumbLink href="/docs">Docs</PixelBreadcrumbLink>
    </PixelBreadcrumbItem>
  </PixelBreadcrumbList>
</PixelBreadcrumb>`,
    componentCode: `/src/components/ui/pixel-breadcrumb.tsx`,
  },
  {
    slug: "pixel-pagination",
    title: "Pagination",
    description: "Page navigation with pixel styling.",
    category: "Navigation",
    installation: "",
    importCode: `import { PixelPagination, PixelPaginationContent, PixelPaginationItem, PixelPaginationLink, PixelPaginationNext, PixelPaginationPrevious } from "@/components/ui/pixel-pagination"`,
    usageCode: `<PixelPagination>
  <PixelPaginationContent>
    <PixelPaginationItem>
      <PixelPaginationPrevious href="#" />
    </PixelPaginationItem>
    <PixelPaginationItem>
      <PixelPaginationLink href="#">1</PixelPaginationLink>
    </PixelPaginationItem>
    <PixelPaginationItem>
      <PixelPaginationNext href="#" />
    </PixelPaginationItem>
  </PixelPaginationContent>
</PixelPagination>`,
    componentCode: `/src/components/ui/pixel-pagination.tsx`,
  },
  {
    slug: "pixel-menubar",
    title: "Menubar",
    description: "Application menu bar with dropdowns.",
    category: "Navigation",
    installation: "npm install @radix-ui/react-menubar",
    importCode: `import { PixelMenubar, PixelMenubarMenu, PixelMenubarTrigger, PixelMenubarContent, PixelMenubarItem } from "@/components/ui/pixel-menubar"`,
    usageCode: `<PixelMenubar>
  <PixelMenubarMenu>
    <PixelMenubarTrigger>File</PixelMenubarTrigger>
    <PixelMenubarContent>
      <PixelMenubarItem>New</PixelMenubarItem>
      <PixelMenubarItem>Open</PixelMenubarItem>
    </PixelMenubarContent>
  </PixelMenubarMenu>
</PixelMenubar>`,
    componentCode: `/src/components/ui/pixel-menubar.tsx`,
  },
  {
    slug: "pixel-navigation-menu",
    title: "Navigation Menu",
    description: "Navigation menu with dropdowns.",
    category: "Navigation",
    installation: "npm install @radix-ui/react-navigation-menu",
    importCode: `import { PixelNavigationMenu, PixelNavigationMenuList, PixelNavigationMenuItem, PixelNavigationMenuTrigger, PixelNavigationMenuContent, PixelNavigationMenuLink } from "@/components/ui/pixel-navigation-menu"`,
    usageCode: `// See examples`,
    componentCode: `/src/components/ui/pixel-navigation-menu.tsx`,
  },
  {
    slug: "pixel-command",
    title: "Command",
    description: "Command palette for keyboard navigation.",
    category: "Navigation",
    installation: "npm install cmdk",
    importCode: `import { PixelCommand, PixelCommandInput, PixelCommandList, PixelCommandEmpty, PixelCommandGroup, PixelCommandItem } from "@/components/ui/pixel-command"`,
    usageCode: `// See examples`,
    componentCode: `/src/components/ui/pixel-command.tsx`,
  },

  // Overlays
  {
    slug: "pixel-dialog",
    title: "Dialog",
    description: "Modal dialog with pixel styling.",
    category: "Overlays",
    installation: "npm install @radix-ui/react-dialog",
    importCode: `import { PixelDialog, PixelDialogTrigger, PixelDialogContent, PixelDialogHeader, PixelDialogTitle, PixelDialogDescription } from "@/components/ui/pixel-dialog"`,
    usageCode: `<PixelDialog>
  <PixelDialogTrigger>Open</PixelDialogTrigger>
  <PixelDialogContent>
    <PixelDialogHeader>
      <PixelDialogTitle>Title</PixelDialogTitle>
      <PixelDialogDescription>Description</PixelDialogDescription>
    </PixelDialogHeader>
  </PixelDialogContent>
</PixelDialog>`,
    componentCode: `/src/components/ui/pixel-dialog.tsx`,
  },
  {
    slug: "pixel-alert-dialog",
    title: "Alert Dialog",
    description: "Alert confirmation dialog.",
    category: "Overlays",
    installation: "npm install @radix-ui/react-alert-dialog",
    importCode: `import { PixelAlertDialog, PixelAlertDialogTrigger, PixelAlertDialogContent, PixelAlertDialogHeader, PixelAlertDialogTitle, PixelAlertDialogDescription, PixelAlertDialogFooter, PixelAlertDialogCancel, PixelAlertDialogAction } from "@/components/ui/pixel-alert-dialog"`,
    usageCode: `// See examples`,
    componentCode: `/src/components/ui/pixel-alert-dialog.tsx`,
  },
  {
    slug: "pixel-popover",
    title: "Popover",
    description: "Floating content container.",
    category: "Overlays",
    installation: "npm install @radix-ui/react-popover",
    importCode: `import { PixelPopover, PixelPopoverTrigger, PixelPopoverContent } from "@/components/ui/pixel-popover"`,
    usageCode: `<PixelPopover>
  <PixelPopoverTrigger>Open</PixelPopoverTrigger>
  <PixelPopoverContent>Content</PixelPopoverContent>
</PixelPopover>`,
    componentCode: `/src/components/ui/pixel-popover.tsx`,
  },
  {
    slug: "pixel-tooltip",
    title: "Tooltip",
    description: "Tooltip with pixel styling.",
    category: "Overlays",
    installation: "npm install @radix-ui/react-tooltip",
    importCode: `import { PixelTooltip, PixelTooltipTrigger, PixelTooltipContent, PixelTooltipProvider } from "@/components/ui/pixel-tooltip"`,
    usageCode: `<PixelTooltipProvider>
  <PixelTooltip>
    <PixelTooltipTrigger>Hover me</PixelTooltipTrigger>
    <PixelTooltipContent>Tooltip text</PixelTooltipContent>
  </PixelTooltip>
</PixelTooltipProvider>`,
    componentCode: `/src/components/ui/pixel-tooltip.tsx`,
  },
  {
    slug: "pixel-dropdown-menu",
    title: "Dropdown Menu",
    description: "Dropdown menu with pixel styling.",
    category: "Overlays",
    installation: "npm install @radix-ui/react-dropdown-menu",
    importCode: `import { PixelDropdownMenu, PixelDropdownMenuTrigger, PixelDropdownMenuContent, PixelDropdownMenuItem } from "@/components/ui/pixel-dropdown-menu"`,
    usageCode: `<PixelDropdownMenu>
  <PixelDropdownMenuTrigger>Open</PixelDropdownMenuTrigger>
  <PixelDropdownMenuContent>
    <PixelDropdownMenuItem>Item 1</PixelDropdownMenuItem>
    <PixelDropdownMenuItem>Item 2</PixelDropdownMenuItem>
  </PixelDropdownMenuContent>
</PixelDropdownMenu>`,
    componentCode: `/src/components/ui/pixel-dropdown-menu.tsx`,
  },
  {
    slug: "pixel-context-menu",
    title: "Context Menu",
    description: "Right-click context menu.",
    category: "Overlays",
    installation: "npm install @radix-ui/react-context-menu",
    importCode: `import { PixelContextMenu, PixelContextMenuTrigger, PixelContextMenuContent, PixelContextMenuItem } from "@/components/ui/pixel-context-menu"`,
    usageCode: `<PixelContextMenu>
  <PixelContextMenuTrigger>Right click me</PixelContextMenuTrigger>
  <PixelContextMenuContent>
    <PixelContextMenuItem>Item 1</PixelContextMenuItem>
  </PixelContextMenuContent>
</PixelContextMenu>`,
    componentCode: `/src/components/ui/pixel-context-menu.tsx`,
  },
  {
    slug: "pixel-sheet",
    title: "Sheet",
    description: "Side panel overlay.",
    category: "Overlays",
    installation: "npm install @radix-ui/react-dialog",
    importCode: `import { PixelSheet, PixelSheetTrigger, PixelSheetContent, PixelSheetHeader, PixelSheetTitle } from "@/components/ui/pixel-sheet"`,
    usageCode: `<PixelSheet>
  <PixelSheetTrigger>Open</PixelSheetTrigger>
  <PixelSheetContent>
    <PixelSheetHeader>
      <PixelSheetTitle>Title</PixelSheetTitle>
    </PixelSheetHeader>
  </PixelSheetContent>
</PixelSheet>`,
    componentCode: `/src/components/ui/pixel-sheet.tsx`,
  },
  {
    slug: "pixel-drawer",
    title: "Drawer",
    description: "Bottom drawer component.",
    category: "Overlays",
    installation: "npm install vaul",
    importCode: `import { PixelDrawer, PixelDrawerTrigger, PixelDrawerContent, PixelDrawerHeader, PixelDrawerTitle } from "@/components/ui/pixel-drawer"`,
    usageCode: `// See examples`,
    componentCode: `/src/components/ui/pixel-drawer.tsx`,
  },
  {
    slug: "pixel-hover-card",
    title: "Hover Card",
    description: "Card that appears on hover.",
    category: "Overlays",
    installation: "npm install @radix-ui/react-hover-card",
    importCode: `import { PixelHoverCard, PixelHoverCardTrigger, PixelHoverCardContent } from "@/components/ui/pixel-hover-card"`,
    usageCode: `<PixelHoverCard>
  <PixelHoverCardTrigger>Hover me</PixelHoverCardTrigger>
  <PixelHoverCardContent>Content</PixelHoverCardContent>
</PixelHoverCard>`,
    componentCode: `/src/components/ui/pixel-hover-card.tsx`,
  },

  // Layout
  {
    slug: "pixel-accordion",
    title: "Accordion",
    description: "Collapsible content sections.",
    category: "Layout",
    installation: "npm install @radix-ui/react-accordion",
    importCode: `import { PixelAccordion, PixelAccordionItem, PixelAccordionTrigger, PixelAccordionContent } from "@/components/ui/pixel-accordion"`,
    usageCode: `<PixelAccordion type="single" collapsible>
  <PixelAccordionItem value="item-1">
    <PixelAccordionTrigger>Section 1</PixelAccordionTrigger>
    <PixelAccordionContent>Content 1</PixelAccordionContent>
  </PixelAccordionItem>
</PixelAccordion>`,
    componentCode: `/src/components/ui/pixel-accordion.tsx`,
  },
  {
    slug: "pixel-separator",
    title: "Separator",
    description: "Visual divider with pixel styling and expandable sections.",
    category: "Layout",
    installation: "npm install @radix-ui/react-separator @radix-ui/react-collapsible",
    importCode: `import { PixelSeparator, PixelExpandableSeparator, PixelSectionDivider } from "@/components/ui/pixel-separator"`,
    usageCode: `<PixelSeparator />
<PixelExpandableSeparator title="Expand Me">
  Hidden content
</PixelExpandableSeparator>
<PixelSectionDivider label="Section" />`,
    componentCode: `/src/components/ui/pixel-separator.tsx`,
  },
  {
    slug: "pixel-collapsible",
    title: "Collapsible",
    description: "Collapsible content container.",
    category: "Layout",
    installation: "npm install @radix-ui/react-collapsible",
    importCode: `import { PixelCollapsible, PixelCollapsibleTrigger, PixelCollapsibleContent } from "@/components/ui/pixel-collapsible"`,
    usageCode: `<PixelCollapsible>
  <PixelCollapsibleTrigger>Toggle</PixelCollapsibleTrigger>
  <PixelCollapsibleContent>Content</PixelCollapsibleContent>
</PixelCollapsible>`,
    componentCode: `/src/components/ui/pixel-collapsible.tsx`,
  },
  {
    slug: "pixel-scroll-area",
    title: "Scroll Area",
    description: "Scrollable container with pixel styling.",
    category: "Layout",
    installation: "npm install @radix-ui/react-scroll-area",
    importCode: `import { PixelScrollArea } from "@/components/ui/pixel-scroll-area"`,
    usageCode: `<PixelScrollArea className="h-72">
  {/* Long content */}
</PixelScrollArea>`,
    componentCode: `/src/components/ui/pixel-scroll-area.tsx`,
  },
  {
    slug: "pixel-aspect-ratio",
    title: "Aspect Ratio",
    description: "Container with fixed aspect ratio.",
    category: "Layout",
    installation: "npm install @radix-ui/react-aspect-ratio",
    importCode: `import { PixelAspectRatio } from "@/components/ui/pixel-aspect-ratio"`,
    usageCode: `<PixelAspectRatio ratio={16 / 9}>
  <img src="..." alt="..." />
</PixelAspectRatio>`,
    componentCode: `/src/components/ui/pixel-aspect-ratio.tsx`,
  },
  {
    slug: "pixel-resizable",
    title: "Resizable",
    description: "Resizable panel container.",
    category: "Layout",
    installation: "npm install react-resizable-panels",
    importCode: `import { PixelResizablePanelGroup, PixelResizablePanel, PixelResizableHandle } from "@/components/ui/pixel-resizable"`,
    usageCode: `// See examples`,
    componentCode: `/src/components/ui/pixel-resizable.tsx`,
  },
  {
    slug: "pixel-carousel",
    title: "Carousel",
    description: "Image/content carousel with pixel styling.",
    category: "Layout",
    installation: "npm install embla-carousel-react",
    importCode: `import { PixelCarousel, PixelCarouselContent, PixelCarouselItem, PixelCarouselNext, PixelCarouselPrevious } from "@/components/ui/pixel-carousel"`,
    usageCode: `// See examples`,
    componentCode: `/src/components/ui/pixel-carousel.tsx`,
  },
];

export function getComponentBySlug(slug: string): ComponentDoc | undefined {
  return componentRegistry.find((comp) => comp.slug === slug);
}

export function getComponentsByCategory(category: ComponentCategory): ComponentDoc[] {
  return componentRegistry.filter((comp) => comp.category === category);
}

export const categories: ComponentCategory[] = [
  "Forms",
  "Display",
  "Feedback",
  "Navigation",
  "Overlays",
  "Layout",
];
