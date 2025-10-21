'use client';
import { GripVertical } from 'lucide-react';
import * as React from 'react';
import {
  PanelGroup as PanelGroupPrimitive,
  type PanelGroupProps as PanelGroupPrimitiveProps,
  Panel as PanelPrimitive,
  type PanelProps as PanelPrimitiveProps,
  PanelResizeHandle as PanelResizeHandlePrimitive,
  type PanelResizeHandleProps as PanelResizeHandlePrimitiveProps,
} from 'react-resizable-panels';

import { cn } from '@/lib/utils';

const ResizablePanelGroup = React.forwardRef<
  React.ElementRef<typeof PanelGroupPrimitive>,
  React.ComponentProps<typeof PanelGroupPrimitive>
>(({ className, ...props }, ref) => (
  <PanelGroupPrimitive
    ref={ref}
    className={cn(
      'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
      className
    )}
    {...props}
  />
));
ResizablePanelGroup.displayName = 'ResizablePanelGroup';

const ResizablePanel = PanelPrimitive;

const ResizableHandle = React.forwardRef<
  React.ElementRef<typeof PanelResizeHandlePrimitive>,
  PanelResizeHandlePrimitiveProps & { withHandle?: boolean }
>(({ className, withHandle, ...props }, ref) => (
  <PanelResizeHandlePrimitive
    ref={ref}
    className={cn(
      'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 [&[data-panel-group-direction=vertical]>div]:rotate-90',
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </PanelResizeHandlePrimitive>
));
ResizableHandle.displayName = 'ResizableHandle';

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
