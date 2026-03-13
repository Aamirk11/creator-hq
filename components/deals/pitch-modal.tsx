"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCreatorData } from "@/lib/hooks/use-creator-data";
import { formatNumber } from "@/lib/utils/format";
import { getPlatformLabel } from "@/lib/utils/format";
import { BrandDeal } from "@/lib/types";
import { Copy, Check, Send, Users, TrendingUp, Palette } from "lucide-react";
import { toast } from "sonner";

interface PitchModalProps {
  brandDeal: BrandDeal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function generateSubject(brandName: string, creatorName: string): string {
  return `Partnership Proposal: ${creatorName} x ${brandName}`;
}

function generateBody(
  brandName: string,
  creatorName: string,
  niche: string,
  totalFollowers: string,
  engagementRate: string
): string {
  return `Hi there,

I'm ${creatorName}, a ${niche} content creator with a combined following of ${totalFollowers} across my platforms. I've been a genuine fan of ${brandName} and would love to explore a partnership opportunity.

Here's what I bring to the table:

- ${totalFollowers} total followers across YouTube, TikTok, and Instagram
- ${engagementRate}% average engagement rate
- A highly engaged audience interested in ${niche.toLowerCase()} recommendations
- Professional content production with quick turnaround times

I'd love to discuss how we can create authentic, high-performing content together. I've attached my media kit for reference.

Looking forward to hearing from you!

Best,
${creatorName}`;
}

export function PitchModal({ brandDeal, open, onOpenChange }: PitchModalProps) {
  const { creator } = useCreatorData();
  const [copied, setCopied] = useState(false);

  const totalFollowers = useMemo(
    () => creator.platforms.reduce((sum, p) => sum + p.followers, 0),
    [creator.platforms]
  );

  const engagementRate = "4.2";

  const defaultSubject = brandDeal
    ? generateSubject(brandDeal.brandName, creator.name)
    : "";

  const defaultBody = brandDeal
    ? generateBody(
        brandDeal.brandName,
        creator.name,
        creator.niche,
        formatNumber(totalFollowers),
        engagementRate
      )
    : "";

  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState(defaultBody);

  // Reset content when deal changes
  const [lastDealId, setLastDealId] = useState<string | null>(null);
  if (brandDeal && brandDeal.id !== lastDealId) {
    setLastDealId(brandDeal.id);
    setSubject(generateSubject(brandDeal.brandName, creator.name));
    setBody(
      generateBody(
        brandDeal.brandName,
        creator.name,
        creator.niche,
        formatNumber(totalFollowers),
        engagementRate
      )
    );
    setCopied(false);
  }

  const handleCopy = async () => {
    const fullEmail = `Subject: ${subject}\n\n${body}`;
    await navigator.clipboard.writeText(fullEmail);
    toast.success("Pitch copied to clipboard!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    toast.success(`Pitch sent to ${brandDeal?.contactName ?? brandDeal?.brandName ?? "the brand"}!`);
    onOpenChange(false);
  };

  if (!brandDeal) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg">
            Pitch to {brandDeal.brandName}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-4">
          {/* Left: Email editor */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <label className="text-xs font-medium text-[#64748B] mb-1.5 block">
                Subject Line
              </label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#64748B] mb-1.5 block">
                Email Body
              </label>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="min-h-[320px] text-sm leading-relaxed resize-none"
              />
            </div>
          </div>

          {/* Right: Media kit preview */}
          <div className="lg:col-span-2">
            <Card className="border-[#7C3AED]/20 bg-gradient-to-b from-[#7C3AED]/5 to-transparent">
              <CardContent className="p-4">
                <h4 className="text-sm font-semibold text-[#0F172A] mb-1">
                  Media Kit Preview
                </h4>
                <p className="text-[11px] text-[#64748B] mb-4">
                  {creator.name} &middot; {creator.niche}
                </p>

                <Separator className="mb-4" />

                {/* Platform followers */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#64748B]">
                    <Users className="w-3.5 h-3.5" />
                    Audience
                  </div>
                  {creator.platforms
                    .filter((p) => p.connected)
                    .map((p) => (
                      <div
                        key={p.platform}
                        className="flex items-center justify-between"
                      >
                        <span className="text-xs text-[#0F172A]">
                          {getPlatformLabel(p.platform)}
                        </span>
                        <span className="text-xs font-semibold text-[#0F172A]">
                          {formatNumber(p.followers)}
                        </span>
                      </div>
                    ))}
                  <div className="flex items-center justify-between border-t pt-2">
                    <span className="text-xs font-medium text-[#0F172A]">
                      Total
                    </span>
                    <span className="text-sm font-bold text-[#7C3AED]">
                      {formatNumber(totalFollowers)}
                    </span>
                  </div>
                </div>

                <Separator className="mb-4" />

                {/* Engagement & Niche */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Engagement Rate
                    </div>
                    <span className="text-sm font-bold text-emerald-600">
                      {engagementRate}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                      <Palette className="w-3.5 h-3.5" />
                      Niche
                    </div>
                    <span className="text-xs font-medium text-[#0F172A]">
                      {creator.niche}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom: Copy + Send buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </>
            )}
          </Button>
          <Button
            onClick={handleSend}
            className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Pitch
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
