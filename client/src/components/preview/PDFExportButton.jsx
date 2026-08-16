import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumePDFDocument } from "./ResumePDFDocument";

export function PDFExportButton({ data }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fileName = `${data.personal.fullName ? data.personal.fullName.replace(/\s+/g, "_") : "Resume"}_Legible.pdf`;

  if (!isClient) {
    return (
      <Button disabled className="w-full bg-emerald-600 cursor-not-allowed">
        <Loader2 className="w-4 h-4 animate-spin" /> Preparing PDF Engine...
      </Button>
    );
  }

  return (
    <PDFDownloadLink
      document={<ResumePDFDocument data={data} />}
      fileName={fileName}
      className="w-full inline-block"
    >
      {({ loading, error }) => (
        <Button
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold cursor-pointer shadow-lg shadow-emerald-500/20"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Generating PDF...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" /> Download Print-Ready ATS PDF
            </>
          )}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
