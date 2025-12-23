import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, Factory, Globe, TrendingUp, Users, Award, 
  Shield, Leaf, Truck, Target, DollarSign, BarChart3,
  ChevronLeft, ChevronRight, Play, Pause, Maximize2,
  Download, Share2, Presentation, Briefcase, Zap,
  CheckCircle, ArrowRight, Star, Building, MapPin,
  Phone, Mail, Calendar, FileText, PieChart, Package
} from 'lucide-react'
import { PitchDeckPDFGenerator } from '../utils/pdfGenerator'

interface Slide {
  id: number
  title: string
  component: React.ComponentType<any>
}

const StandalonePitchDeck: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const slideContentRef = useRef<HTMLDivElement>(null)
  const pdfGenerator = useRef(new PitchDeckPDFGenerator())

  const slides: Slide[] = [
    { id: 0, title: "Title Slide", component: TitleSlide },
    { id: 1, title: "Company Overview", component: CompanyOverviewSlide },
    { id: 2, title: "Market Opportunity", component: MarketOpportunitySlide },
    { id: 3, title: "Our Solution", component: SolutionSlide },
    { id: 4, title: "Technology & Innovation", component: TechnologySlide },
    { id: 5, title: "Operational Excellence", component: OperationalExcellenceSlide },
    { id: 6, title: "Financial Performance", component: FinancialPerformanceSlide },
    { id: 7, title: "Competitive Advantage", component: CompetitiveAdvantageSlide },
    { id: 8, title: "Growth Strategy", component: GrowthStrategySlide },
    { id: 9, title: "Investment Opportunity", component: InvestmentOpportunitySlide },
    { id: 10, title: "Contact & Next Steps", component: ContactSlide }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      await pdfGenerator.current.generatePDF()
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handleDownloadPDFFromHTML = async () => {
    if (!slideContentRef.current) return
    
    setIsGeneratingPDF(true)
    try {
      await pdfGenerator.current.generatePDFFromHTML(slideContentRef.current)
    } catch (error) {
      console.error('Error generating PDF from HTML:', error)
      // Fallback to content-based PDF
      await pdfGenerator.current.generatePDF()
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const CurrentSlideComponent = slides[currentSlide].component

  return (
    <div className={`cosmic-pitch-deck ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="cosmic-pitch-deck-container">
        {/* Header Controls */}
        <div className="cosmic-pitch-header">
          <div className="cosmic-pitch-title">
            <Presentation size={20} />
            <h2>Azure Tobacco Industrial FZCO - Pitch Deck</h2>
          </div>
          <div className="cosmic-pitch-controls">
            <button className="cosmic-pitch-btn" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button className="cosmic-pitch-btn" onClick={toggleFullscreen}>
              <Maximize2 size={16} />
            </button>
            <button 
              className="cosmic-pitch-btn" 
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              title="Download as PDF"
            >
              <Download size={16} />
              {isGeneratingPDF && <div className="cosmic-loading-spinner"></div>}
            </button>
            <button 
              className="cosmic-pitch-btn" 
              onClick={handleDownloadPDFFromHTML}
              disabled={isGeneratingPDF}
              title="Download Current Slide as PDF"
            >
              <FileText size={16} />
              {isGeneratingPDF && <div className="cosmic-loading-spinner"></div>}
            </button>
            <button className="cosmic-pitch-btn">
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Slide Navigation */}
        <div className="cosmic-slide-nav">
          <button 
            className="cosmic-nav-btn" 
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="cosmic-slide-indicators">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                className={`cosmic-slide-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                title={slide.title}
              />
            ))}
          </div>
          
          <button 
            className="cosmic-nav-btn" 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Main Slide Content */}
        <div className="cosmic-slide-content" ref={slideContentRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="cosmic-slide-wrapper"
            >
              <CurrentSlideComponent />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Counter */}
        <div className="cosmic-slide-counter">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
    </div>
  )
}

// Title Slide Component
const TitleSlide: React.FC = () => (
  <div className="cosmic-slide cosmic-title-slide">
    <div className="cosmic-slide-content-wrapper">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="cosmic-title-content"
      >
        <div className="cosmic-company-logo">
          <Building2 size={80} className="cosmic-logo-icon" />
          <div className="cosmic-logo-glow"></div>
        </div>
        
        <h1 className="cosmic-main-title">
          Azure Tobacco Industrial FZCO
        </h1>
        
        <p className="cosmic-subtitle">
          Premium Tobacco Manufacturing & Distribution Excellence
        </p>
        
        <div className="cosmic-tagline">
          <Leaf size={24} />
          <span>Crafting Quality • Driving Innovation • Delivering Excellence</span>
        </div>
        
        <div className="cosmic-presentation-info">
          <div className="cosmic-date-location">
            <Calendar size={16} />
            <span>Dubai, UAE • {new Date().getFullYear()}</span>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
)

// Company Overview Slide
const CompanyOverviewSlide: React.FC = () => (
  <div className="cosmic-slide cosmic-overview-slide">
    <div className="cosmic-slide-header">
      <h2>Company Overview</h2>
      <div className="cosmic-slide-accent"></div>
    </div>
    
    <div className="cosmic-slide-grid">
      <div className="cosmic-overview-stats">
        <div className="cosmic-stat-card">
          <Factory size={32} />
          <div className="cosmic-stat-content">
            <h3>Established</h3>
            <p>2018</p>
          </div>
        </div>
        
        <div className="cosmic-stat-card">
          <MapPin size={32} />
          <div className="cosmic-stat-content">
            <h3>Location</h3>
            <p>Dubai, UAE</p>
          </div>
        </div>
        
        <div className="cosmic-stat-card">
          <Users size={32} />
          <div className="cosmic-stat-content">
            <h3>Employees</h3>
            <p>150+</p>
          </div>
        </div>
        
        <div className="cosmic-stat-card">
          <Globe size={32} />
          <div className="cosmic-stat-content">
            <h3>Markets</h3>
            <p>Global</p>
          </div>
        </div>
      </div>
      
      <div className="cosmic-overview-content">
        <h3>Our Mission</h3>
        <p>To deliver premium tobacco products that exceed customer expectations through innovative manufacturing processes, sustainable practices, and unwavering commitment to quality.</p>
        
        <h3>Our Vision</h3>
        <p>To become the leading tobacco manufacturing company in the Middle East and Africa, recognized for excellence in product quality, operational efficiency, and customer satisfaction.</p>
        
        <div className="cosmic-key-values">
          <div className="cosmic-value-item">
            <CheckCircle size={20} />
            <span>Quality Excellence</span>
          </div>
          <div className="cosmic-value-item">
            <CheckCircle size={20} />
            <span>Innovation Leadership</span>
          </div>
          <div className="cosmic-value-item">
            <CheckCircle size={20} />
            <span>Sustainable Operations</span>
          </div>
          <div className="cosmic-value-item">
            <CheckCircle size={20} />
            <span>Customer Focus</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// Market Opportunity Slide
const MarketOpportunitySlide: React.FC = () => (
  <div className="cosmic-slide cosmic-market-slide">
    <div className="cosmic-slide-header">
      <h2>Market Opportunity</h2>
      <div className="cosmic-slide-accent"></div>
    </div>
    
    <div className="cosmic-market-content">
      <div className="cosmic-market-stats">
        <div className="cosmic-market-stat">
          <div className="cosmic-stat-number">$800B+</div>
          <div className="cosmic-stat-label">Global Tobacco Market Size</div>
        </div>
        
        <div className="cosmic-market-stat">
          <div className="cosmic-stat-number">5.2%</div>
          <div className="cosmic-stat-label">Annual Growth Rate</div>
        </div>
        
        <div className="cosmic-market-stat">
          <div className="cosmic-stat-number">$45B</div>
          <div className="cosmic-stat-label">MEA Market Size</div>
        </div>
        
        <div className="cosmic-market-stat">
          <div className="cosmic-stat-number">8.1%</div>
          <div className="cosmic-stat-label">MEA Growth Rate</div>
        </div>
      </div>
      
      <div className="cosmic-market-drivers">
        <h3>Key Market Drivers</h3>
        <div className="cosmic-driver-grid">
          <div className="cosmic-driver-item">
            <TrendingUp size={24} />
            <div>
              <h4>Population Growth</h4>
              <p>Growing population in emerging markets driving demand</p>
            </div>
          </div>
          
          <div className="cosmic-driver-item">
            <DollarSign size={24} />
            <div>
              <h4>Economic Development</h4>
              <p>Rising disposable income in developing economies</p>
            </div>
          </div>
          
          <div className="cosmic-driver-item">
            <Globe size={24} />
            <div>
              <h4>Trade Liberalization</h4>
              <p>Improved international trade agreements</p>
            </div>
          </div>
          
          <div className="cosmic-driver-item">
            <Zap size={24} />
            <div>
              <h4>Product Innovation</h4>
              <p>Premium and alternative product segments growing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// Solution Slide
const SolutionSlide: React.FC = () => (
  <div className="cosmic-slide cosmic-solution-slide">
    <div className="cosmic-slide-header">
      <h2>Our Solution</h2>
      <div className="cosmic-slide-accent"></div>
    </div>
    
    <div className="cosmic-solution-content">
      <div className="cosmic-solution-overview">
        <h3>Comprehensive Tobacco Manufacturing Excellence</h3>
        <p>We provide end-to-end tobacco manufacturing solutions with state-of-the-art facilities and cutting-edge technology.</p>
      </div>
      
      <div className="cosmic-solution-services">
        <div className="cosmic-service-card">
          <Factory size={40} />
          <h4>Manufacturing</h4>
          <ul>
            <li>Premium tobacco processing</li>
            <li>Quality control systems</li>
            <li>Automated production lines</li>
            <li>Custom blending services</li>
          </ul>
        </div>
        
        <div className="cosmic-service-card">
          <Package size={40} />
          <h4>Packaging</h4>
          <ul>
            <li>Premium packaging solutions</li>
            <li>Custom brand designs</li>
            <li>Sustainable materials</li>
            <li>Regulatory compliance</li>
          </ul>
        </div>
        
        <div className="cosmic-service-card">
          <Truck size={40} />
          <h4>Distribution</h4>
          <ul>
            <li>Global logistics network</li>
            <li>Cold chain management</li>
            <li>Inventory optimization</li>
            <li>Supply chain visibility</li>
          </ul>
        </div>
        
        <div className="cosmic-service-card">
          <Shield size={40} />
          <h4>Compliance</h4>
          <ul>
            <li>Regulatory expertise</li>
            <li>Quality certifications</li>
            <li>Safety protocols</li>
            <li>Environmental standards</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)

// Technology Slide
const TechnologySlide: React.FC = () => (
  <div className="cosmic-slide cosmic-technology-slide">
    <div className="cosmic-slide-header">
      <h2>Technology & Innovation</h2>
      <div className="cosmic-slide-accent"></div>
    </div>
    
    <div className="cosmic-technology-content">
      <div className="cosmic-tech-highlights">
        <div className="cosmic-tech-card">
          <BarChart3 size={32} />
          <h4>AI-Powered Analytics</h4>
          <p>Advanced data analytics for production optimization and quality prediction</p>
        </div>
        
        <div className="cosmic-tech-card">
          <Zap size={32} />
          <h4>Automation Systems</h4>
          <p>Industry 4.0 compliant automated manufacturing processes</p>
        </div>
        
        <div className="cosmic-tech-card">
          <Shield size={32} />
          <h4>Quality Assurance</h4>
          <p>Real-time quality monitoring and predictive maintenance systems</p>
        </div>
        
        <div className="cosmic-tech-card">
          <Globe size={32} />
          <h4>Digital Integration</h4>
          <p>IoT-enabled supply chain visibility and traceability</p>
        </div>
      </div>
      
      <div className="cosmic-tech-benefits">
        <h3>Technology Benefits</h3>
        <div className="cosmic-benefit-list">
          <div className="cosmic-benefit-item">
            <CheckCircle size={20} />
            <span>30% increase in production efficiency</span>
          </div>
          <div className="cosmic-benefit-item">
            <CheckCircle size={20} />
            <span>99.5% quality consistency rate</span>
          </div>
          <div className="cosmic-benefit-item">
            <CheckCircle size={20} />
            <span>50% reduction in waste</span>
          </div>
          <div className="cosmic-benefit-item">
            <CheckCircle size={20} />
            <span>Real-time supply chain visibility</span>
          </div>
          <div className="cosmic-benefit-item">
            <CheckCircle size={20} />
            <span>Predictive maintenance capabilities</span>
          </div>
          <div className="cosmic-benefit-item">
            <CheckCircle size={20} />
            <span>Automated compliance reporting</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// Operational Excellence Slide
const OperationalExcellenceSlide: React.FC = () => (
  <div className="cosmic-slide cosmic-operational-slide">
    <div className="cosmic-slide-header">
      <h2>Operational Excellence</h2>
      <div className="cosmic-slide-accent"></div>
    </div>
    
    <div className="cosmic-operational-content">
      <div className="cosmic-operational-metrics">
        <div className="cosmic-metric-card">
          <div className="cosmic-metric-number">99.8%</div>
          <div className="cosmic-metric-label">On-Time Delivery</div>
        </div>
        
        <div className="cosmic-metric-card">
          <div className="cosmic-metric-number">99.5%</div>
          <div className="cosmic-metric-label">Quality Pass Rate</div>
        </div>
        
        <div className="cosmic-metric-card">
          <div className="cosmic-metric-number">24/7</div>
          <div className="cosmic-metric-label">Production Uptime</div>
        </div>
        
        <div className="cosmic-metric-card">
          <div className="cosmic-metric-number">ISO 9001</div>
          <div className="cosmic-metric-label">Certified Quality</div>
        </div>
      </div>
      
      <div className="cosmic-operational-features">
        <h3>Key Operational Features</h3>
        <div className="cosmic-feature-grid">
          <div className="cosmic-feature-item">
            <Award size={24} />
            <div>
              <h4>Quality Management</h4>
              <p>Comprehensive quality control systems with real-time monitoring</p>
            </div>
          </div>
          
          <div className="cosmic-feature-item">
            <Users size={24} />
            <div>
              <h4>Skilled Workforce</h4>
              <p>Highly trained professionals with industry expertise</p>
            </div>
          </div>
          
          <div className="cosmic-feature-item">
            <Building size={24} />
            <div>
              <h4>Modern Facilities</h4>
              <p>State-of-the-art manufacturing facilities with latest technology</p>
            </div>
          </div>
          
          <div className="cosmic-feature-item">
            <Shield size={24} />
            <div>
              <h4>Safety Standards</h4>
              <p>Highest safety standards with continuous improvement programs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// Financial Performance Slide
const FinancialPerformanceSlide: React.FC = () => (
  <div className="cosmic-slide cosmic-financial-slide">
    <div className="cosmic-slide-header">
      <h2>Financial Performance</h2>
      <div className="cosmic-slide-accent"></div>
    </div>
    
    <div className="cosmic-financial-content">
      <div className="cosmic-financial-overview">
        <h3>Strong Financial Track Record</h3>
        <p>Consistent growth and profitability with strong cash flow generation</p>
      </div>
      
      <div className="cosmic-financial-metrics">
        <div className="cosmic-financial-card">
          <TrendingUp size={32} />
          <div className="cosmic-financial-number">$45M</div>
          <div className="cosmic-financial-label">Annual Revenue</div>
          <div className="cosmic-financial-growth">+15% YoY</div>
        </div>
        
        <div className="cosmic-financial-card">
          <DollarSign size={32} />
          <div className="cosmic-financial-number">$8.5M</div>
          <div className="cosmic-financial-label">EBITDA</div>
          <div className="cosmic-financial-growth">19% Margin</div>
        </div>
        
        <div className="cosmic-financial-card">
          <BarChart3 size={32} />
          <div className="cosmic-financial-number">$3.2M</div>
          <div className="cosmic-financial-label">Net Profit</div>
          <div className="cosmic-financial-growth">7.1% Margin</div>
        </div>
        
        <div className="cosmic-financial-card">
          <Target size={32} />
          <div className="cosmic-financial-number">$12M</div>
          <div className="cosmic-financial-label">Cash Position</div>
          <div className="cosmic-financial-growth">Strong Liquidity</div>
        </div>
      </div>
      
      <div className="cosmic-financial-chart">
        <h4>Revenue Growth Trajectory</h4>
        <div className="cosmic-chart-placeholder">
          <PieChart size={48} />
          <p>Revenue Growth: 15% CAGR over 3 years</p>
        </div>
      </div>
    </div>
  </div>
)

// Competitive Advantage Slide
const CompetitiveAdvantageSlide: React.FC = () => (
  <div className="cosmic-slide cosmic-competitive-slide">
    <div className="cosmic-slide-header">
      <h2>Competitive Advantage</h2>
      <div className="cosmic-slide-accent"></div>
    </div>
    
    <div className="cosmic-competitive-content">
      <div className="cosmic-advantage-grid">
        <div className="cosmic-advantage-card">
          <Star size={32} />
          <h4>Premium Quality</h4>
          <p>Superior product quality with rigorous quality control processes and premium raw materials</p>
        </div>
        
        <div className="cosmic-advantage-card">
          <Zap size={32} />
          <h4>Technology Leadership</h4>
          <p>Cutting-edge manufacturing technology and AI-powered optimization systems</p>
        </div>
        
        <div className="cosmic-advantage-card">
          <Globe size={32} />
          <h4>Strategic Location</h4>
          <p>Dubai's strategic position provides access to global markets with excellent logistics</p>
        </div>
        
        <div className="cosmic-advantage-card">
          <Shield size={32} />
          <h4>Regulatory Expertise</h4>
          <p>Deep understanding of international regulations and compliance requirements</p>
        </div>
        
        <div className="cosmic-advantage-card">
          <Users size={32} />
          <h4>Customer Relationships</h4>
          <p>Strong partnerships with key clients and distributors across multiple markets</p>
        </div>
        
        <div className="cosmic-advantage-card">
          <Award size={32} />
          <h4>Certifications</h4>
          <p>ISO 9001, HACCP, and other international quality and safety certifications</p>
        </div>
      </div>
    </div>
  </div>
)

// Growth Strategy Slide
const GrowthStrategySlide: React.FC = () => (
  <div className="cosmic-slide cosmic-growth-slide">
    <div className="cosmic-slide-header">
      <h2>Growth Strategy</h2>
      <div className="cosmic-slide-accent"></div>
    </div>
    
    <div className="cosmic-growth-content">
      <div className="cosmic-growth-overview">
        <h3>Strategic Growth Initiatives</h3>
        <p>Multi-pronged approach to expand market presence and operational capabilities</p>
      </div>
      
      <div className="cosmic-growth-pillars">
        <div className="cosmic-pillar">
          <Factory size={40} />
          <h4>Capacity Expansion</h4>
          <ul>
            <li>New production line installation</li>
            <li>Facility expansion in Dubai</li>
            <li>Increased automation investment</li>
            <li>50% capacity increase by 2025</li>
          </ul>
        </div>
        
        <div className="cosmic-pillar">
          <Globe size={40} />
          <h4>Market Expansion</h4>
          <ul>
            <li>Enter new African markets</li>
            <li>Expand in Southeast Asia</li>
            <li>Develop premium product lines</li>
            <li>Strategic partnerships</li>
          </ul>
        </div>
        
        <div className="cosmic-pillar">
          <Zap size={40} />
          <h4>Innovation & R&D</h4>
          <ul>
            <li>Alternative product development</li>
            <li>Sustainable packaging solutions</li>
            <li>AI-driven optimization</li>
            <li>Premium brand development</li>
          </ul>
        </div>
      </div>
      
      <div className="cosmic-growth-timeline">
        <h4>3-Year Growth Roadmap</h4>
        <div className="cosmic-timeline">
          <div className="cosmic-timeline-item">
            <div className="cosmic-timeline-year">2024</div>
            <div className="cosmic-timeline-content">Capacity expansion Phase 1</div>
          </div>
          <div className="cosmic-timeline-item">
            <div className="cosmic-timeline-year">2025</div>
            <div className="cosmic-timeline-content">New market entry & premium products</div>
          </div>
          <div className="cosmic-timeline-item">
            <div className="cosmic-timeline-year">2026</div>
            <div className="cosmic-timeline-content">Full automation & sustainability initiatives</div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// Investment Opportunity Slide
const InvestmentOpportunitySlide: React.FC = () => (
  <div className="cosmic-slide cosmic-investment-slide">
    <div className="cosmic-slide-header">
      <h2>Investment Opportunity</h2>
      <div className="cosmic-slide-accent"></div>
    </div>
    
    <div className="cosmic-investment-content">
      <div className="cosmic-investment-overview">
        <h3>Seeking Strategic Investment</h3>
        <p>Opportunity to partner with a growing, profitable tobacco manufacturing company</p>
      </div>
      
      <div className="cosmic-investment-details">
        <div className="cosmic-investment-card">
          <DollarSign size={32} />
          <h4>Investment Required</h4>
          <div className="cosmic-investment-amount">$15M - $25M</div>
          <p>For capacity expansion and market growth</p>
        </div>
        
        <div className="cosmic-investment-card">
          <TrendingUp size={32} />
          <h4>Expected Returns</h4>
          <div className="cosmic-investment-amount">25-35% IRR</div>
          <p>Based on projected growth and market expansion</p>
        </div>
        
        <div className="cosmic-investment-card">
          <Target size={32} />
          <h4>Use of Funds</h4>
          <ul>
            <li>40% - Capacity expansion</li>
            <li>30% - Market development</li>
            <li>20% - Technology upgrade</li>
            <li>10% - Working capital</li>
          </ul>
        </div>
      </div>
      
      <div className="cosmic-investment-benefits">
        <h4>Investment Benefits</h4>
        <div className="cosmic-benefit-grid">
          <div className="cosmic-benefit-item">
            <CheckCircle size={20} />
            <span>Proven track record of profitability</span>
          </div>
          <div className="cosmic-benefit-item">
            <CheckCircle size={20} />
            <span>Strong market position in growing industry</span>
          </div>
          <div className="cosmic-benefit-item">
            <CheckCircle size={20} />
            <span>Experienced management team</span>
          </div>
          <div className="cosmic-benefit-item">
            <CheckCircle size={20} />
            <span>Strategic location with global access</span>
          </div>
          <div className="cosmic-benefit-item">
            <CheckCircle size={20} />
            <span>Scalable business model</span>
          </div>
          <div className="cosmic-benefit-item">
            <CheckCircle size={20} />
            <span>Clear exit strategy</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// Contact Slide
const ContactSlide: React.FC = () => (
  <div className="cosmic-slide cosmic-contact-slide">
    <div className="cosmic-slide-header">
      <h2>Contact & Next Steps</h2>
      <div className="cosmic-slide-accent"></div>
    </div>
    
    <div className="cosmic-contact-content">
      <div className="cosmic-contact-overview">
        <h3>Ready to Partner with Us?</h3>
        <p>Let's discuss how we can create mutual value and drive growth together</p>
      </div>
      
      <div className="cosmic-contact-info">
        <div className="cosmic-contact-card">
          <Building2 size={32} />
          <h4>Company Address</h4>
          <p>Azure Tobacco Industrial FZCO<br />
          Dubai, United Arab Emirates<br />
          Business Bay, Dubai International Financial Centre</p>
        </div>
        
        <div className="cosmic-contact-card">
          <Phone size={32} />
          <h4>Contact Information</h4>
          <p>Phone: +971 4 XXX XXXX<br />
          Email: info@azuretobacco.com<br />
          Website: www.azuretobacco.com</p>
        </div>
        
        <div className="cosmic-contact-card">
          <Calendar size={32} />
          <h4>Next Steps</h4>
          <ul>
            <li>Schedule a facility visit</li>
            <li>Detailed due diligence</li>
            <li>Investment terms discussion</li>
            <li>Partnership agreement</li>
          </ul>
        </div>
      </div>
      
      <div className="cosmic-contact-cta">
        <div className="cosmic-cta-content">
          <h4>Thank You for Your Interest</h4>
          <p>We look forward to discussing this exciting opportunity with you</p>
          <div className="cosmic-cta-buttons">
            <button className="cosmic-cta-btn primary">
              <Mail size={16} />
              Schedule Meeting
            </button>
            <button className="cosmic-cta-btn secondary">
              <FileText size={16} />
              Request Proposal
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default StandalonePitchDeck


