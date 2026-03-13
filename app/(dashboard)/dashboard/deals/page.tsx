"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { PageTransition } from "@/components/layout/page-transition";
import { DealCard, DealKanban, PitchModal, RateCalculator } from "@/components/deals";
import { useCreatorData } from "@/lib/hooks/use-creator-data";
import { BrandDeal } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Handshake, KanbanSquare, DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";

export default function DealsPage() {
  const { brandDeals } = useCreatorData();
  const [pitchDeal, setPitchDeal] = useState<BrandDeal | null>(null);
  const [pitchOpen, setPitchOpen] = useState(false);

  const handleDraftPitch = (deal: BrandDeal) => {
    setPitchDeal(deal);
    setPitchOpen(true);
  };

  // Recommended view shows prospect + pitched deals
  const recommendedDeals = brandDeals.filter(
    (d) => d.status === "prospect" || d.status === "pitched"
  );

  // Pipeline value: sum of all non-completed deals
  const pipelineValue = useMemo(() => {
    return brandDeals
      .filter((d) => d.status !== "completed")
      .reduce((sum, d) => sum + d.value, 0);
  }, [brandDeals]);

  return (
    <PageTransition>
    <div>
      <PageHeader
        title="Brand Deals"
        description="Find brands, pitch, and track partnerships"
      />

      {/* Pipeline value summary */}
      <Card className="mb-4 p-4 border-[#7C3AED]/15 bg-gradient-to-r from-[#7C3AED]/[0.03] to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#7C3AED]/10 flex items-center justify-center">
            <DollarSign className="w-4.5 h-4.5 text-[#7C3AED]" />
          </div>
          <div>
            <p className="text-xs font-medium text-[#64748B]">Pipeline Value</p>
            <p className="text-2xl font-bold text-[#0F172A]">
              {formatCurrency(pipelineValue)}
            </p>
          </div>
          <p className="ml-auto text-[11px] text-[#64748B]">
            {brandDeals.filter((d) => d.status !== "completed").length} active deals
          </p>
        </div>
      </Card>

      <Tabs defaultValue="recommended" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recommended" className="gap-1.5">
            <Handshake className="w-4 h-4" />
            Recommended
          </TabsTrigger>
          <TabsTrigger value="pipeline" className="gap-1.5">
            <KanbanSquare className="w-4 h-4" />
            Pipeline
          </TabsTrigger>
        </TabsList>

        {/* Recommended View */}
        <TabsContent value="recommended">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Deal cards grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedDeals.map((deal) => (
                  <DealCard
                    key={deal.id}
                    deal={deal}
                    onDraftPitch={handleDraftPitch}
                  />
                ))}
                {recommendedDeals.length === 0 && (
                  <div className="col-span-full text-center py-12 text-[#64748B] text-sm">
                    No recommended deals at this time. Check back soon!
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar: Rate Calculator */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <RateCalculator />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Pipeline View */}
        <TabsContent value="pipeline">
          <DealKanban deals={brandDeals} />
        </TabsContent>
      </Tabs>

      {/* Pitch Modal */}
      <PitchModal
        brandDeal={pitchDeal}
        open={pitchOpen}
        onOpenChange={setPitchOpen}
      />
    </div>
    </PageTransition>
  );
}
