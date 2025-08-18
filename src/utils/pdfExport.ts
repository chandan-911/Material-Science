
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Material } from '@/types/Material';

export const exportMaterialsAsPDF = async (materials: Material[], title: string = 'Material Selection Report') => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Add title
  pdf.setFontSize(20);
  pdf.setTextColor(44, 62, 80);
  pdf.text(title, pageWidth / 2, 20, { align: 'center' });
  
  // Add generation date
  pdf.setFontSize(10);
  pdf.setTextColor(128, 128, 128);
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 30, { align: 'center' });
  
  let yPosition = 50;
  
  materials.forEach((material, index) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = 20;
    }
    
    // Material header
    pdf.setFontSize(14);
    pdf.setTextColor(52, 73, 94);
    pdf.text(`${index + 1}. ${material.name} (${material.designation})`, 15, yPosition);
    yPosition += 8;
    
    // Category and subcategory
    pdf.setFontSize(10);
    pdf.setTextColor(128, 128, 128);
    pdf.text(`Category: ${material.category} - ${material.subcategory}`, 15, yPosition);
    yPosition += 6;
    
    // Key properties
    pdf.setFontSize(9);
    pdf.setTextColor(0, 0, 0);
    const properties = [
      `Tensile Strength: ${material.properties.tensileStrength} MPa`,
      `Yield Strength: ${material.properties.yieldStrength} MPa`,
      `Density: ${material.properties.density} g/cm³`,
      `Melting Point: ${material.properties.meltingPoint}°C`,
      `Cost: $${material.properties.costPerKg}/kg`
    ];
    
    properties.forEach(prop => {
      pdf.text(prop, 20, yPosition);
      yPosition += 4;
    });
    
    // Applications
    pdf.setFontSize(9);
    pdf.setTextColor(52, 73, 94);
    pdf.text('Key Applications:', 20, yPosition);
    yPosition += 4;
    
    const allApps = Object.values(material.applications).flat().slice(0, 3);
    allApps.forEach(app => {
      pdf.setTextColor(0, 0, 0);
      pdf.text(`• ${app}`, 25, yPosition);
      yPosition += 4;
    });
    
    yPosition += 5; // Space between materials
  });
  
  pdf.save(`${title.replace(/\s+/g, '_')}.pdf`);
};

export const exportChartAsPDF = async (chartElementId: string, title: string) => {
  const element = document.getElementById(chartElementId);
  if (!element) return;
  
  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: '#ffffff'
  });
  
  const pdf = new jsPDF('l', 'mm', 'a4');
  const imgWidth = pdf.internal.pageSize.getWidth() - 20;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  pdf.setFontSize(16);
  pdf.text(title, pdf.internal.pageSize.getWidth() / 2, 15, { align: 'center' });
  
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 25, imgWidth, imgHeight);
  pdf.save(`${title.replace(/\s+/g, '_')}.pdf`);
};
