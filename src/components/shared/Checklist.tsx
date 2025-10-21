
'use client';

import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface ChecklistOption {
  id: string;
  label: string;
}

interface ChecklistProps {
  options: ChecklistOption[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  maxHeight?: string;
}

export function Checklist({
  options,
  selectedIds,
  onChange,
  maxHeight = '200px'
}: ChecklistProps) {

  const handleCheckedChange = (optionId: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedIds, optionId]);
    } else {
      onChange(selectedIds.filter(id => id !== optionId));
    }
  };

  return (
    <ScrollArea className="rounded-md border p-4" style={{ maxHeight }}>
      <div className="space-y-4">
        {options.length > 0 ? (
          options.map(option => (
            <div key={option.id} className="flex items-center gap-3">
              <Checkbox
                id={`checklist-${option.id}`}
                checked={selectedIds.includes(option.id)}
                onCheckedChange={(checked) => handleCheckedChange(option.id, !!checked)}
              />
              <label
                htmlFor={`checklist-${option.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center">No resources available. Add some in the Resources tab.</p>
        )}
      </div>
    </ScrollArea>
  );
}
