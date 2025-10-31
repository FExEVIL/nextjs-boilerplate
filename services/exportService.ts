import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MarketIndex, StockData, ExportOptions } from '@/types';
import { formatCurrency, formatPercentage, formatDateTime } from '@/lib/utils';

class ExportService {
  generatePDFReport(indices: MarketIndex[], stocks: StockData[], options?: ExportOptions): void {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFontSize(20);
    doc.text('ORION Market Report', pageWidth / 2, 20, { align: 'center' });

    doc.setFontSize(10);
    doc.text(`Generated: ${formatDateTime(new Date())}`, pageWidth / 2, 28, {
      align: 'center',
    });

    let yPosition = 40;

    // Global Indices Section
    doc.setFontSize(14);
    doc.text('Global Market Indices', 14, yPosition);
    yPosition += 5;

    const indicesData = indices.map(index => [
      index.symbol,
      formatCurrency(index.price),
      formatCurrency(index.change),
      formatPercentage(index.percentChange),
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [['Symbol', 'Price', 'Change', '% Change']],
      body: indicesData,
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    yPosition =
      (doc as typeof doc & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15;

    // Stocks Section
    if (stocks && stocks.length > 0) {
      doc.setFontSize(14);
      doc.text('Stock Performance', 14, yPosition);
      yPosition += 5;

      const stocksData = stocks.map(stock => [
        stock.symbol,
        stock.name,
        formatCurrency(stock.price),
        formatCurrency(stock.change),
        formatPercentage(stock.percentChange),
      ]);

      autoTable(doc, {
        startY: yPosition,
        head: [['Symbol', 'Name', 'Price', 'Change', '% Change']],
        body: stocksData,
        theme: 'grid',
        headStyles: { fillColor: [0, 0, 0] },
        alternateRowStyles: { fillColor: [245, 245, 245] },
      });
    }

    // Footer
    const pageCount = doc.getNumberOfPages();
    doc.setFontSize(8);
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, {
        align: 'center',
      });
    }

    // Save the PDF
    const fileName = `orion-market-report-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  }

  generateCSVReport(indices: MarketIndex[], stocks: StockData[]): void {
    let csvContent = 'Type,Symbol,Name,Price,Change,Percent Change\n';

    // Add indices
    indices.forEach(index => {
      csvContent += `Index,${index.symbol},,${index.price},${index.change},${index.percentChange}\n`;
    });

    // Add stocks
    stocks.forEach(stock => {
      csvContent += `Stock,${stock.symbol},${stock.name},${stock.price},${stock.change},${stock.percentChange}\n`;
    });

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `orion-market-report-${new Date().toISOString().split('T')[0]}.csv`
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async exportReport(
    format: 'pdf' | 'csv',
    indices: MarketIndex[],
    stocks: StockData[]
  ): Promise<void> {
    try {
      if (format === 'pdf') {
        this.generatePDFReport(indices, stocks);
      } else if (format === 'csv') {
        this.generateCSVReport(indices, stocks);
      }
    } catch (error) {
      throw new Error(`Failed to export ${format.toUpperCase()} report: ${error}`);
    }
  }
}

export const exportService = new ExportService();
