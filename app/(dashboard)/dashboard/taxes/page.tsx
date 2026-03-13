"use client";

import { Download } from "lucide-react";
import { useCreatorData } from "@/lib/hooks/use-creator-data";
import { PageHeader } from "@/components/layout/page-header";
import { TaxSummary, QuarterlyTracker, DeductionList } from "@/components/taxes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function TaxesPage() {
  const { taxSummary, quarterlyPayments, deductions } = useCreatorData();

  return (
    <div className="space-y-4">
      <PageHeader
        title="Tax Center"
        description="Stay on top of your tax obligations"
      />

      {/* YTD Tax Summary */}
      <TaxSummary taxSummary={taxSummary} />

      {/* Quarterly Payments + Deductions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <QuarterlyTracker quarterlyPayments={quarterlyPayments} />
        <DeductionList deductions={deductions} />
      </div>

      {/* Download for CPA */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={() => toast.success("Tax summary downloaded! Check your downloads folder.")}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Download for CPA
        </Button>
      </div>
    </div>
  );
}
