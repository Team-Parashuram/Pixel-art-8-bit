"use client";

import { useState } from "react";
import { PixelButton } from "@/components/ui/pixel/pixel-button";
import { PixelCard, PixelCardContent, PixelCardDescription, PixelCardHeader, PixelCardTitle, PixelCardFooter } from "@/components/ui/pixel/pixel-card";
import { PixelInput } from "@/components/ui/pixel/pixel-input";
import { PixelBadge } from "@/components/ui/pixel/pixel-badge";
import { PixelCheckbox } from "@/components/ui/pixel/pixel-checkbox";
import { PixelTabs, PixelTabsContent, PixelTabsList, PixelTabsTrigger } from "@/components/ui/pixel/pixel-tabs";
import { PixelAccordion, PixelAccordionContent, PixelAccordionItem, PixelAccordionTrigger } from "@/components/ui/pixel/pixel-accordion";
import { PixelSelect, PixelSelectContent, PixelSelectItem, PixelSelectTrigger, PixelSelectValue } from "@/components/ui/pixel/pixel-select";
import { PixelSwitch } from "@/components/ui/pixel/pixel-switch";
import { PixelRadioGroup, PixelRadioGroupItem } from "@/components/ui/pixel/pixel-radio-group";
import { PixelTextarea } from "@/components/ui/pixel/pixel-textarea";
import { PixelSlider } from "@/components/ui/pixel/pixel-slider";
import { PixelLabel } from "@/components/ui/pixel/pixel-label";
import { PixelAvatar, PixelAvatarFallback, PixelAvatarImage } from "@/components/ui/pixel/pixel-avatar";
import { PixelSkeleton } from "@/components/ui/pixel/pixel-skeleton";
import { PixelTable, PixelTableBody, PixelTableCell, PixelTableHead, PixelTableHeader, PixelTableRow } from "@/components/ui/pixel/pixel-table";
import { PixelKbd } from "@/components/ui/pixel/pixel-kbd";
import { PixelEmpty, PixelEmptyDescription, PixelEmptyMedia, PixelEmptyTitle } from "@/components/ui/pixel/pixel-empty";
import { PixelAlert, PixelAlertDescription, PixelAlertTitle } from "@/components/ui/pixel/pixel-alert";
import { PixelProgress } from "@/components/ui/pixel/pixel-progress";
import { PixelSpinner } from "@/components/ui/pixel/pixel-spinner";
import { PixelBreadcrumb, PixelBreadcrumbItem, PixelBreadcrumbLink, PixelBreadcrumbList, PixelBreadcrumbSeparator } from "@/components/ui/pixel/pixel-breadcrumb";
import { PixelPagination, PixelPaginationContent, PixelPaginationItem, PixelPaginationLink, PixelPaginationNext, PixelPaginationPrevious } from "@/components/ui/pixel/pixel-pagination";
import { PixelDialog, PixelDialogContent, PixelDialogDescription, PixelDialogHeader, PixelDialogTitle, PixelDialogTrigger } from "@/components/ui/pixel/pixel-dialog";
import { PixelAlertDialog, PixelAlertDialogAction, PixelAlertDialogCancel, PixelAlertDialogContent, PixelAlertDialogDescription, PixelAlertDialogFooter, PixelAlertDialogHeader, PixelAlertDialogTitle, PixelAlertDialogTrigger } from "@/components/ui/pixel/pixel-alert-dialog";
import { PixelPopover, PixelPopoverContent, PixelPopoverTrigger } from "@/components/ui/pixel/pixel-popover";
import { PixelTooltip, PixelTooltipContent, PixelTooltipProvider, PixelTooltipTrigger } from "@/components/ui/pixel/pixel-tooltip";
import { PixelDropdownMenu, PixelDropdownMenuContent, PixelDropdownMenuItem, PixelDropdownMenuTrigger } from "@/components/ui/pixel/pixel-dropdown-menu";
import { PixelContextMenu, PixelContextMenuContent, PixelContextMenuItem, PixelContextMenuTrigger } from "@/components/ui/pixel/pixel-context-menu";
import { PixelSheet, PixelSheetContent, PixelSheetHeader, PixelSheetTitle, PixelSheetTrigger } from "@/components/ui/pixel/pixel-sheet";
import { PixelSeparator } from "@/components/ui/pixel/pixel-separator";
import { PixelCollapsible, PixelCollapsibleContent, PixelCollapsibleTrigger } from "@/components/ui/pixel/pixel-collapsible";
import { PixelScrollArea } from "@/components/ui/pixel/pixel-scroll-area";
import { PixelAspectRatio } from "@/components/ui/pixel/pixel-aspect-ratio";
import { PixelHoverCard, PixelHoverCardContent, PixelHoverCardTrigger } from "@/components/ui/pixel/pixel-hover-card";

export function ComponentPreview({ slug }: { slug: string }) {
  const [checked, setChecked] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const [switchValue, setSwitchValue] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);
  const [radioValue, setRadioValue] = useState("option1");
  
  switch (slug) {
    case "pixel-button":
      return (
        <div className="flex gap-4 flex-wrap">
          <PixelButton>Default</PixelButton>
          <PixelButton variant="secondary">Secondary</PixelButton>
          <PixelButton variant="ghost">Ghost</PixelButton>
          <PixelButton variant="destructive">Destructive</PixelButton>
        </div>
      );
    
    case "pixel-card":
      return (
        <PixelCard className="w-[350px]">
          <PixelCardHeader>
            <PixelCardTitle>Card Title</PixelCardTitle>
            <PixelCardDescription>Card description goes here</PixelCardDescription>
          </PixelCardHeader>
          <PixelCardContent>
            <p>This is the card content area.</p>
          </PixelCardContent>
          <PixelCardFooter>
            <PixelButton>Action</PixelButton>
          </PixelCardFooter>
        </PixelCard>
      );
    
    case "pixel-input":
      return <PixelInput placeholder="Enter text..." className="max-w-sm" />;
    
    case "pixel-badge":
      return (
        <div className="flex gap-2 flex-wrap">
          <PixelBadge>Default</PixelBadge>
          <PixelBadge variant="success">Success</PixelBadge>
          <PixelBadge variant="warning">Warning</PixelBadge>
          <PixelBadge variant="error">Error</PixelBadge>
        </div>
      );
    
    case "pixel-checkbox":
      return (
        <div className="flex items-center space-x-2">
          <PixelCheckbox id="preview" checked={checked} onCheckedChange={(c) => setChecked(c as boolean)} />
          <PixelLabel htmlFor="preview">Accept terms and conditions</PixelLabel>
        </div>
      );
    
    case "pixel-select":
      return (
        <PixelSelect value={selectValue} onValueChange={setSelectValue}>
          <PixelSelectTrigger className="w-[200px]">
            <PixelSelectValue placeholder="Choose option" />
          </PixelSelectTrigger>
          <PixelSelectContent>
            <PixelSelectItem value="1">Option 1</PixelSelectItem>
            <PixelSelectItem value="2">Option 2</PixelSelectItem>
            <PixelSelectItem value="3">Option 3</PixelSelectItem>
          </PixelSelectContent>
        </PixelSelect>
      );
    
    case "pixel-tabs":
      return (
        <PixelTabs defaultValue="tab1" className="w-[400px]">
          <PixelTabsList>
            <PixelTabsTrigger value="tab1">Tab 1</PixelTabsTrigger>
            <PixelTabsTrigger value="tab2">Tab 2</PixelTabsTrigger>
          </PixelTabsList>
          <PixelTabsContent value="tab1">Content for tab 1</PixelTabsContent>
          <PixelTabsContent value="tab2">Content for tab 2</PixelTabsContent>
        </PixelTabs>
      );
    
    case "pixel-accordion":
      return (
        <PixelAccordion type="single" collapsible className="w-full">
          <PixelAccordionItem value="item-1">
            <PixelAccordionTrigger>Question 1</PixelAccordionTrigger>
            <PixelAccordionContent>Answer to question 1</PixelAccordionContent>
          </PixelAccordionItem>
          <PixelAccordionItem value="item-2">
            <PixelAccordionTrigger>Question 2</PixelAccordionTrigger>
            <PixelAccordionContent>Answer to question 2</PixelAccordionContent>
          </PixelAccordionItem>
        </PixelAccordion>
      );
    
    case "pixel-switch":
      return (
        <div className="flex items-center space-x-2">
          <PixelSwitch id="switch" checked={switchValue} onCheckedChange={setSwitchValue} />
          <PixelLabel htmlFor="switch">Airplane Mode</PixelLabel>
        </div>
      );
    
    case "pixel-radio-group":
      return (
        <PixelRadioGroup value={radioValue} onValueChange={setRadioValue}>
          <div className="flex items-center space-x-2">
            <PixelRadioGroupItem value="option1" id="r1" />
            <PixelLabel htmlFor="r1">Option 1</PixelLabel>
          </div>
          <div className="flex items-center space-x-2">
            <PixelRadioGroupItem value="option2" id="r2" />
            <PixelLabel htmlFor="r2">Option 2</PixelLabel>
          </div>
        </PixelRadioGroup>
      );
    
    case "pixel-textarea":
      return <PixelTextarea placeholder="Type your message..." className="max-w-sm" />;
    
    case "pixel-slider":
      return (
        <div className="w-[300px]">
          <PixelSlider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
        </div>
      );
    
    case "pixel-label":
      return <PixelLabel>This is a label</PixelLabel>;
    
    case "pixel-avatar":
      return (
        <div className="flex gap-4">
          <PixelAvatar>
            <PixelAvatarImage src="https://github.com/shadcn.png" />
            <PixelAvatarFallback>CN</PixelAvatarFallback>
          </PixelAvatar>
          <PixelAvatar>
            <PixelAvatarFallback>JD</PixelAvatarFallback>
          </PixelAvatar>
        </div>
      );
    
    case "pixel-skeleton":
      return (
        <div className="space-y-2">
          <PixelSkeleton className="w-full h-12" />
          <PixelSkeleton className="w-3/4 h-12" />
          <PixelSkeleton className="w-1/2 h-12" />
        </div>
      );
    
    case "pixel-table":
      return (
        <PixelTable>
          <PixelTableHeader>
            <PixelTableRow>
              <PixelTableHead>Name</PixelTableHead>
              <PixelTableHead>Status</PixelTableHead>
            </PixelTableRow>
          </PixelTableHeader>
          <PixelTableBody>
            <PixelTableRow>
              <PixelTableCell>Item 1</PixelTableCell>
              <PixelTableCell>Active</PixelTableCell>
            </PixelTableRow>
            <PixelTableRow>
              <PixelTableCell>Item 2</PixelTableCell>
              <PixelTableCell>Inactive</PixelTableCell>
            </PixelTableRow>
          </PixelTableBody>
        </PixelTable>
      );
    
    case "pixel-kbd":
      return (
        <div className="flex gap-2 items-center">
          <span>Press</span>
          <PixelKbd>Ctrl</PixelKbd>
          <span>+</span>
          <PixelKbd>C</PixelKbd>
          <span>to copy</span>
        </div>
      );
    
    case "pixel-empty":
      return (
        <PixelEmpty>
          <PixelEmptyMedia variant="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          </PixelEmptyMedia>
          <PixelEmptyTitle>No items found</PixelEmptyTitle>
          <PixelEmptyDescription>Get started by creating a new item</PixelEmptyDescription>
        </PixelEmpty>
      );
    
    case "pixel-alert":
      return (
        <PixelAlert>
          <PixelAlertTitle>Heads up!</PixelAlertTitle>
          <PixelAlertDescription>This is an alert message with important information.</PixelAlertDescription>
        </PixelAlert>
      );
    
    case "pixel-progress":
      return <PixelProgress value={60} className="w-[300px]" />;
    
    case "pixel-spinner":
      return <PixelSpinner />;
    
    case "pixel-breadcrumb":
      return (
        <PixelBreadcrumb>
          <PixelBreadcrumbList>
            <PixelBreadcrumbItem>
              <PixelBreadcrumbLink href="/">Home</PixelBreadcrumbLink>
            </PixelBreadcrumbItem>
            <PixelBreadcrumbSeparator />
            <PixelBreadcrumbItem>
              <PixelBreadcrumbLink href="/docs">Docs</PixelBreadcrumbLink>
            </PixelBreadcrumbItem>
            <PixelBreadcrumbSeparator />
            <PixelBreadcrumbItem>
              <PixelBreadcrumbLink>Components</PixelBreadcrumbLink>
            </PixelBreadcrumbItem>
          </PixelBreadcrumbList>
        </PixelBreadcrumb>
      );
    
    case "pixel-pagination":
      return (
        <PixelPagination>
          <PixelPaginationContent>
            <PixelPaginationItem>
              <PixelPaginationPrevious />
            </PixelPaginationItem>
            <PixelPaginationItem>
              <PixelPaginationLink>1</PixelPaginationLink>
            </PixelPaginationItem>
            <PixelPaginationItem>
              <PixelPaginationLink isActive>2</PixelPaginationLink>
            </PixelPaginationItem>
            <PixelPaginationItem>
              <PixelPaginationLink>3</PixelPaginationLink>
            </PixelPaginationItem>
            <PixelPaginationItem>
              <PixelPaginationNext />
            </PixelPaginationItem>
          </PixelPaginationContent>
        </PixelPagination>
      );
    
    case "pixel-dialog":
      return (
        <PixelDialog>
          <PixelDialogTrigger asChild>
            <PixelButton>Open Dialog</PixelButton>
          </PixelDialogTrigger>
          <PixelDialogContent>
            <PixelDialogHeader>
              <PixelDialogTitle>Dialog Title</PixelDialogTitle>
              <PixelDialogDescription>This is a dialog description</PixelDialogDescription>
            </PixelDialogHeader>
            <p>Dialog content goes here.</p>
          </PixelDialogContent>
        </PixelDialog>
      );
    
    case "pixel-alert-dialog":
      return (
        <PixelAlertDialog>
          <PixelAlertDialogTrigger asChild>
            <PixelButton variant="destructive">Delete</PixelButton>
          </PixelAlertDialogTrigger>
          <PixelAlertDialogContent>
            <PixelAlertDialogHeader>
              <PixelAlertDialogTitle>Are you sure?</PixelAlertDialogTitle>
              <PixelAlertDialogDescription>
                This action cannot be undone.
              </PixelAlertDialogDescription>
            </PixelAlertDialogHeader>
            <PixelAlertDialogFooter>
              <PixelAlertDialogCancel>Cancel</PixelAlertDialogCancel>
              <PixelAlertDialogAction>Continue</PixelAlertDialogAction>
            </PixelAlertDialogFooter>
          </PixelAlertDialogContent>
        </PixelAlertDialog>
      );
    
    case "pixel-popover":
      return (
        <PixelPopover>
          <PixelPopoverTrigger asChild>
            <PixelButton>Open Popover</PixelButton>
          </PixelPopoverTrigger>
          <PixelPopoverContent>
            <p>This is the popover content</p>
          </PixelPopoverContent>
        </PixelPopover>
      );
    
    case "pixel-tooltip":
      return (
        <PixelTooltipProvider>
          <PixelTooltip>
            <PixelTooltipTrigger asChild>
              <PixelButton>Hover me</PixelButton>
            </PixelTooltipTrigger>
            <PixelTooltipContent>
              <p>Tooltip text</p>
            </PixelTooltipContent>
          </PixelTooltip>
        </PixelTooltipProvider>
      );
    
    case "pixel-dropdown-menu":
      return (
        <PixelDropdownMenu>
          <PixelDropdownMenuTrigger asChild>
            <PixelButton>Open Menu</PixelButton>
          </PixelDropdownMenuTrigger>
          <PixelDropdownMenuContent>
            <PixelDropdownMenuItem>Item 1</PixelDropdownMenuItem>
            <PixelDropdownMenuItem>Item 2</PixelDropdownMenuItem>
            <PixelDropdownMenuItem>Item 3</PixelDropdownMenuItem>
          </PixelDropdownMenuContent>
        </PixelDropdownMenu>
      );
    
    case "pixel-context-menu":
      return (
        <PixelContextMenu>
          <PixelContextMenuTrigger asChild>
            <div className="flex h-[150px] w-[300px] items-center justify-center pixel-borders border-4 border-black dark:border-[#ff8c00]">
              <p>Right click here</p>
            </div>
          </PixelContextMenuTrigger>
          <PixelContextMenuContent>
            <PixelContextMenuItem>Item 1</PixelContextMenuItem>
            <PixelContextMenuItem>Item 2</PixelContextMenuItem>
            <PixelContextMenuItem>Item 3</PixelContextMenuItem>
          </PixelContextMenuContent>
        </PixelContextMenu>
      );
    
    case "pixel-sheet":
      return (
        <PixelSheet>
          <PixelSheetTrigger asChild>
            <PixelButton>Open Sheet</PixelButton>
          </PixelSheetTrigger>
          <PixelSheetContent>
            <PixelSheetHeader>
              <PixelSheetTitle>Sheet Title</PixelSheetTitle>
            </PixelSheetHeader>
            <p>Sheet content goes here</p>
          </PixelSheetContent>
        </PixelSheet>
      );
    
    case "pixel-separator":
      return (
        <div className="space-y-4">
          <p>Above separator</p>
          <PixelSeparator />
          <p>Below separator</p>
        </div>
      );
    
    case "pixel-collapsible":
      return (
        <PixelCollapsible>
          <PixelCollapsibleTrigger asChild>
            <PixelButton>Toggle Content</PixelButton>
          </PixelCollapsibleTrigger>
          <PixelCollapsibleContent>
            <p className="mt-4">This content can be toggled</p>
          </PixelCollapsibleContent>
        </PixelCollapsible>
      );
    
    case "pixel-scroll-area":
      return (
        <PixelScrollArea className="h-[200px] w-[350px] p-4">
          <div className="space-y-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i}>Scrollable item {i + 1}</p>
            ))}
          </div>
        </PixelScrollArea>
      );
    
    case "pixel-aspect-ratio":
      return (
        <div className="w-[300px]">
          <PixelAspectRatio ratio={16 / 9}>
            <div className="flex items-center justify-center h-full bg-[#ff8c00] text-white font-bold">
              16:9 Aspect Ratio
            </div>
          </PixelAspectRatio>
        </div>
      );
    
    case "pixel-hover-card":
      return (
        <PixelHoverCard>
          <PixelHoverCardTrigger asChild>
            <PixelButton>Hover me</PixelButton>
          </PixelHoverCardTrigger>
          <PixelHoverCardContent>
            <p>This appears on hover</p>
          </PixelHoverCardContent>
        </PixelHoverCard>
      );
    
    default:
      return (
        <div className="text-center py-8">
          <p className="text-sm text-black/60 dark:text-white/60">
            Interactive preview available - see usage code below
          </p>
        </div>
      );
  }
}
