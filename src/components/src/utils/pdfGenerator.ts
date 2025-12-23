import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface SlideData {
  title: string
  content: string
  type: string
}

export class PitchDeckPDFGenerator {
  private slides: SlideData[] = []

  constructor() {
    this.initializeSlides()
  }

  private initializeSlides() {
    this.slides = [
      {
        title: "Azure Tobacco Industrial FZCO",
        content: "Premium Tobacco Manufacturing & Distribution Excellence\n\nCrafting Quality • Driving Innovation • Delivering Excellence\n\nDubai, UAE • 2024",
        type: "title"
      },
      {
        title: "Company Overview",
        content: `ESTABLISHED: 2018
LOCATION: Dubai, UAE
EMPLOYEES: 150+
MARKETS: Global

OUR MISSION
To deliver premium tobacco products that exceed customer expectations through innovative manufacturing processes, sustainable practices, and unwavering commitment to quality.

OUR VISION
To become the leading tobacco manufacturing company in the Middle East and Africa, recognized for excellence in product quality, operational efficiency, and customer satisfaction.

KEY VALUES
• Quality Excellence
• Innovation Leadership
• Sustainable Operations
• Customer Focus`,
        type: "overview"
      },
      {
        title: "Market Opportunity",
        content: `GLOBAL TOBACCO MARKET SIZE: $800B+
ANNUAL GROWTH RATE: 5.2%
MEA MARKET SIZE: $45B
MEA GROWTH RATE: 8.1%

KEY MARKET DRIVERS
• Population Growth - Growing population in emerging markets driving demand
• Economic Development - Rising disposable income in developing economies
• Trade Liberalization - Improved international trade agreements
• Product Innovation - Premium and alternative product segments growing`,
        type: "market"
      },
      {
        title: "Our Solution",
        content: `COMPREHENSIVE TOBACCO MANUFACTURING EXCELLENCE
We provide end-to-end tobacco manufacturing solutions with state-of-the-art facilities and cutting-edge technology.

MANUFACTURING
• Premium tobacco processing
• Quality control systems
• Automated production lines
• Custom blending services

PACKAGING
• Premium packaging solutions
• Custom brand designs
• Sustainable materials
• Regulatory compliance

DISTRIBUTION
• Global logistics network
• Cold chain management
• Inventory optimization
• Supply chain visibility

COMPLIANCE
• Regulatory expertise
• Quality certifications
• Safety protocols
• Environmental standards`,
        type: "solution"
      },
      {
        title: "Technology & Innovation",
        content: `AI-POWERED ANALYTICS
Advanced data analytics for production optimization and quality prediction

AUTOMATION SYSTEMS
Industry 4.0 compliant automated manufacturing processes

QUALITY ASSURANCE
Real-time quality monitoring and predictive maintenance systems

DIGITAL INTEGRATION
IoT-enabled supply chain visibility and traceability

TECHNOLOGY BENEFITS
• 30% increase in production efficiency
• 99.5% quality consistency rate
• 50% reduction in waste
• Real-time supply chain visibility
• Predictive maintenance capabilities
• Automated compliance reporting`,
        type: "technology"
      },
      {
        title: "Operational Excellence",
        content: `ON-TIME DELIVERY: 99.8%
QUALITY PASS RATE: 99.5%
PRODUCTION UPTIME: 24/7
CERTIFIED QUALITY: ISO 9001

KEY OPERATIONAL FEATURES
• Quality Management - Comprehensive quality control systems with real-time monitoring
• Skilled Workforce - Highly trained professionals with industry expertise
• Modern Facilities - State-of-the-art manufacturing facilities with latest technology
• Safety Standards - Highest safety standards with continuous improvement programs`,
        type: "operational"
      },
      {
        title: "Financial Performance",
        content: `STRONG FINANCIAL TRACK RECORD
Consistent growth and profitability with strong cash flow generation

ANNUAL REVENUE: $45M (+15% YoY)
EBITDA: $8.5M (19% Margin)
NET PROFIT: $3.2M (7.1% Margin)
CASH POSITION: $12M (Strong Liquidity)

REVENUE GROWTH TRAJECTORY
Revenue Growth: 15% CAGR over 3 years`,
        type: "financial"
      },
      {
        title: "Competitive Advantage",
        content: `PREMIUM QUALITY
Superior product quality with rigorous quality control processes and premium raw materials

TECHNOLOGY LEADERSHIP
Cutting-edge manufacturing technology and AI-powered optimization systems

STRATEGIC LOCATION
Dubai's strategic position provides access to global markets with excellent logistics

REGULATORY EXPERTISE
Deep understanding of international regulations and compliance requirements

CUSTOMER RELATIONSHIPS
Strong partnerships with key clients and distributors across multiple markets

CERTIFICATIONS
ISO 9001, HACCP, and other international quality and safety certifications`,
        type: "competitive"
      },
      {
        title: "Growth Strategy",
        content: `STRATEGIC GROWTH INITIATIVES
Multi-pronged approach to expand market presence and operational capabilities

CAPACITY EXPANSION
• New production line installation
• Facility expansion in Dubai
• Increased automation investment
• 50% capacity increase by 2025

MARKET EXPANSION
• Enter new African markets
• Expand in Southeast Asia
• Develop premium product lines
• Strategic partnerships

INNOVATION & R&D
• Alternative product development
• Sustainable packaging solutions
• AI-driven optimization
• Premium brand development

3-YEAR GROWTH ROADMAP
2024: Capacity expansion Phase 1
2025: New market entry & premium products
2026: Full automation & sustainability initiatives`,
        type: "growth"
      },
      {
        title: "Investment Opportunity",
        content: `SEEKING STRATEGIC INVESTMENT
Opportunity to partner with a growing, profitable tobacco manufacturing company

INVESTMENT REQUIRED: $15M - $25M
For capacity expansion and market growth

EXPECTED RETURNS: 25-35% IRR
Based on projected growth and market expansion

USE OF FUNDS
• 40% - Capacity expansion
• 30% - Market development
• 20% - Technology upgrade
• 10% - Working capital

INVESTMENT BENEFITS
• Proven track record of profitability
• Strong market position in growing industry
• Experienced management team
• Strategic location with global access
• Scalable business model
• Clear exit strategy`,
        type: "investment"
      },
      {
        title: "Contact & Next Steps",
        content: `READY TO PARTNER WITH US?
Let's discuss how we can create mutual value and drive growth together

COMPANY ADDRESS
Azure Tobacco Industrial FZCO
Dubai, United Arab Emirates
Business Bay, Dubai International Financial Centre

CONTACT INFORMATION
Phone: +971 4 XXX XXXX
Email: info@azuretobacco.com
Website: www.azuretobacco.com

NEXT STEPS
• Schedule a facility visit
• Detailed due diligence
• Investment terms discussion
• Partnership agreement

THANK YOU FOR YOUR INTEREST
We look forward to discussing this exciting opportunity with you`,
        type: "contact"
      }
    ]
  }

  async generatePDF(): Promise<void> {
    const pdf = new jsPDF('landscape', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    
    // Add title page
    this.addTitlePage(pdf, pageWidth, pageHeight)
    
    // Add content pages
    for (let i = 0; i < this.slides.length; i++) {
      if (i > 0) {
        pdf.addPage()
      }
      this.addContentPage(pdf, this.slides[i], pageWidth, pageHeight)
    }
    
    // Save the PDF
    pdf.save('Azure_Tobacco_Industrial_FZCO_Pitch_Deck.pdf')
  }

  private addTitlePage(pdf: jsPDF, pageWidth: number, pageHeight: number): void {
    // Background
    pdf.setFillColor(10, 13, 26)
    pdf.rect(0, 0, pageWidth, pageHeight, 'F')
    
    // Logo placeholder
    pdf.setFillColor(0, 212, 255)
    pdf.circle(pageWidth / 2, pageHeight / 2 - 40, 30, 'F')
    
    // Company name
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(28)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Azure Tobacco Industrial FZCO', pageWidth / 2, pageHeight / 2 + 10, { align: 'center' })
    
    // Subtitle
    pdf.setTextColor(200, 200, 200)
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Premium Tobacco Manufacturing & Distribution Excellence', pageWidth / 2, pageHeight / 2 + 30, { align: 'center' })
    
    // Tagline
    pdf.setTextColor(0, 212, 255)
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Crafting Quality • Driving Innovation • Delivering Excellence', pageWidth / 2, pageHeight / 2 + 50, { align: 'center' })
    
    // Date and location
    pdf.setTextColor(150, 150, 150)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Dubai, UAE • 2024', pageWidth / 2, pageHeight / 2 + 70, { align: 'center' })
  }

  private addContentPage(pdf: jsPDF, slide: SlideData, pageWidth: number, pageHeight: number): void {
    // Background
    pdf.setFillColor(20, 25, 45)
    pdf.rect(0, 0, pageWidth, pageHeight, 'F')
    
    // Header background
    pdf.setFillColor(10, 13, 26)
    pdf.rect(0, 0, pageWidth, 40, 'F')
    
    // Title
    pdf.setTextColor(0, 212, 255)
    pdf.setFontSize(24)
    pdf.setFont('helvetica', 'bold')
    pdf.text(slide.title, 20, 25)
    
    // Accent line
    pdf.setDrawColor(0, 212, 255)
    pdf.setLineWidth(2)
    pdf.line(20, 30, 100, 30)
    
    // Content
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    
    const lines = slide.content.split('\n')
    let yPosition = 60
    const lineHeight = 7
    const maxWidth = pageWidth - 40
    
    for (const line of lines) {
      if (line.trim() === '') {
        yPosition += lineHeight / 2
        continue
      }
      
      // Check if line starts with uppercase and ends with colon (section headers)
      if (line.match(/^[A-Z][A-Z\s]+:$/)) {
        pdf.setTextColor(0, 212, 255)
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(14)
        pdf.text(line, 20, yPosition)
        yPosition += lineHeight + 2
        pdf.setTextColor(255, 255, 255)
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(12)
        continue
      }
      
      // Check if line starts with bullet point
      if (line.trim().startsWith('•')) {
        pdf.text('•', 25, yPosition)
        const text = line.trim().substring(1).trim()
        pdf.text(text, 35, yPosition, { maxWidth: maxWidth - 35 })
      } else {
        // Regular text
        const wrappedText = pdf.splitTextToSize(line, maxWidth)
        for (const textLine of wrappedText) {
          pdf.text(textLine, 20, yPosition)
          yPosition += lineHeight
        }
      }
      
      yPosition += 2
      
      // Check if we need a new page
      if (yPosition > pageHeight - 30) {
        pdf.addPage()
        pdf.setFillColor(20, 25, 45)
        pdf.rect(0, 0, pageWidth, pageHeight, 'F')
        yPosition = 30
      }
    }
    
    // Footer
    pdf.setTextColor(100, 100, 100)
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Azure Tobacco Industrial FZCO', pageWidth - 100, pageHeight - 10)
  }

  async generatePDFFromHTML(element: HTMLElement): Promise<void> {
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#0a0d1a'
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('landscape', 'mm', 'a4')
      
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      
      const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight)
      const imgX = (pageWidth - imgWidth * ratio) / 2
      const imgY = (pageHeight - imgHeight * ratio) / 2
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
      pdf.save('Azure_Tobacco_Industrial_FZCO_Pitch_Deck.pdf')
    } catch (error) {
      console.error('Error generating PDF from HTML:', error)
      // Fallback to content-based PDF
      await this.generatePDF()
    }
  }
}

export default PitchDeckPDFGenerator


