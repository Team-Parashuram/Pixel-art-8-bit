declare module "pdf-parse-fork" {
  interface PDFInfo {
    PDFFormatVersion: string;
    IsAcroFormPresent: boolean;
    IsXFAPresent: boolean;
    Title?: string;
    Author?: string;
    Subject?: string;
    Creator?: string;
    Producer?: string;
    CreationDate?: string;
    ModDate?: string;
  }

  interface PDFMetadata {
    _metadata?: {
      [key: string]: string;
    };
  }

  interface PDFData {
    numpages: number;
    numrender: number;
    info: PDFInfo;
    metadata: PDFMetadata;
    text: string;
    version: string;
  }

  function pdfParse(
    dataBuffer: Buffer,
    options?: {
      pagerender?: (pageData: any) => string;
      max?: number;
      version?: string;
    },
  ): Promise<PDFData>;

  export default pdfParse;
}
