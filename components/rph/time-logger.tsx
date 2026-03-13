"use client";

import { useState, useMemo } from "react";
import { Clock, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreatorData } from "@/lib/hooks/use-creator-data";

const TIME_FIELDS = [
  { key: "ideation", label: "Ideation" },
  { key: "scripting", label: "Scripting" },
  { key: "filming", label: "Filming" },
  { key: "editing", label: "Editing" },
  { key: "thumbnail", label: "Thumbnail" },
  { key: "publishing", label: "Publishing" },
] as const;

export function TimeLogger() {
  const { contentPieces } = useCreatorData();
  const [open, setOpen] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState("");
  const [times, setTimes] = useState<Record<string, number>>({
    ideation: 0,
    scripting: 0,
    filming: 0,
    editing: 0,
    thumbnail: 0,
    publishing: 0,
  });

  const totalHours = useMemo(() => {
    return Object.values(times).reduce((sum, v) => sum + (v || 0), 0);
  }, [times]);

  function updateTime(key: string, value: string) {
    const num = parseFloat(value) || 0;
    setTimes((prev) => ({ ...prev, [key]: num }));
  }

  function handleSave() {
    setOpen(false);
    setSelectedPiece("");
    setTimes({
      ideation: 0,
      scripting: 0,
      filming: 0,
      editing: 0,
      thumbnail: 0,
      publishing: 0,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white gap-1.5">
          <Plus className="w-4 h-4" />
          Log Time
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#7C3AED]" />
            Log Time
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5 pt-2">
          {/* Content Piece Selector */}
          <div>
            <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
              Content Piece
            </label>
            <select
              value={selectedPiece}
              onChange={(e) => setSelectedPiece(e.target.value)}
              className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">Select a content piece...</option>
              {contentPieces.map((piece) => (
                <option key={piece.id} value={piece.id}>
                  {piece.title}
                </option>
              ))}
            </select>
          </div>

          {/* Time Breakdown */}
          <div>
            <label className="text-sm font-medium text-[#0F172A] mb-3 block">
              Time Breakdown (hours)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {TIME_FIELDS.map(({ key, label }) => (
                <div key={key}>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    {label}
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="0.25"
                    placeholder="0"
                    value={times[key] || ""}
                    onChange={(e) => updateTime(key, e.target.value)}
                    className="h-9 tabular-nums"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between px-3 py-2.5 bg-muted/50 rounded-lg">
            <span className="text-sm font-medium text-[#64748B]">Total Hours</span>
            <span className="text-lg font-bold text-[#0F172A] tabular-nums">
              {totalHours.toFixed(1)}h
            </span>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={!selectedPiece}
            className="w-full bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white"
          >
            Save Time Log
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
