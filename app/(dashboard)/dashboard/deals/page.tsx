"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { DealCard, DealKanban, PitchModal, RateCalculator } from "@/components/deals";
import { useCreatorData } from "@/lib/hooks/use-creator-data";
import { BrandDeal } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Handshake, KanbanSquare } from "lucide-react";

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

  return (
    <div>
      <PageHeader
        title="Brand Deals"
        description="Find brands, pitch, and track partnerships"
      />

      <Tabs defaultValue="recommended" className="space-y-6">
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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
  );
}
