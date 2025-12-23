import React from 'react'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const SalesforceComparison: React.FC = () => {
  const comparisons = [
    {
      category: "Sales Cloud (CRM)",
      salesforce: ["Leads Management", "Opportunities/Pipeline", "Accounts", "Contacts", "Deals/Quotes", "Forecasting"],
      ourERP: ["CRM Management", "Orders Management", "Analytics Dashboard"],
      match: "Partial - We have CRM and Orders, need Leads/Pipeline"
    },
    {
      category: "Service Cloud",
      salesforce: ["Cases Management", "Knowledge Base", "Service Contracts", "Customer Portal"],
      ourERP: ["CRM Management", "Orders Management"],
      match: "Partial - Need Cases and Knowledge Base"
    },
    {
      category: "Commerce Cloud",
      salesforce: ["Product Catalog", "Order Management", "Shopping Cart", "Checkout"],
      ourERP: ["Inventory Management", "Orders Management", "Production Management"],
      match: "Good - We have Inventory, Orders, and Production"
    },
    {
      category: "Analytics Cloud",
      salesforce: ["Reports Builder", "Dashboards", "Data Visualization", "Custom Reports"],
      ourERP: ["Analytics Dashboard", "Business Intelligence", "Financial Reports"],
      match: "Excellent - Strong analytics capabilities"
    },
    {
      category: "Marketing Cloud",
      salesforce: ["Campaign Management", "Email Marketing", "Lead Nurturing", "Marketing Automation"],
      ourERP: [],
      match: "Missing - No marketing automation"
    },
    {
      category: "Platform/App Builder",
      salesforce: ["Custom Objects", "Lightning Apps", "Custom Fields", "Workflows"],
      ourERP: ["System Admin"],
      match: "Partial - Need more customization tools"
    },
    {
      category: "Integration Cloud",
      salesforce: ["API Integration", "Data Import/Export", "Third-party Connectors"],
      ourERP: ["System Admin"],
      match: "Basic - Admin features but need APIs"
    },
    {
      category: "Data Management",
      salesforce: ["Data Import Wizard", "Data Export", "Data Quality", "Duplicate Management"],
      ourERP: ["System Admin", "Business Intelligence"],
      match: "Basic - Need data tools"
    },
    {
      category: "Mobile & Collaboration",
      salesforce: ["Mobile App", "Chatter", "Quip", "Teams Collaboration"],
      ourERP: ["Responsive Design"],
      match: "Basic - Need mobile app and collaboration"
    },
    {
      category: "Industry-Specific",
      salesforce: ["Vertical Solutions", "Industry Templates"],
      ourERP: ["Production Management", "Quality Control", "Compliance Management", "Asset Management", "HR Management"],
      match: "Excellent - Strong manufacturing focus"
    },
    {
      category: "AI & Automation",
      salesforce: ["Einstein Analytics", "Predictive Scoring", "AI Insights", "Process Automation"],
      ourERP: ["Business Intelligence", "Analytics Dashboard"],
      match: "Partial - Need AI/ML features"
    },
    {
      category: "Security & Compliance",
      salesforce: ["Role-Based Access", "Data Security", "Audit Trails", "Compliance Reporting"],
      ourERP: ["Compliance Management", "System Admin"],
      match: "Good - Strong compliance focus"
    }
  ]

  return (
    <div className="cosmic-card">
      <div className="cosmic-card-header">
        <h1>Salesforce vs Our ERP System - Feature Comparison</h1>
        <p>Side-by-side comparison of capabilities and features</p>
      </div>
      
      <div className="cosmic-card-content">
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--cosmic-accent-cyan)', marginBottom: '1rem' }}>Summary</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--cosmic-accent-emerald)' }}>75%</div>
              <div style={{ color: 'rgba(255,255,255,0.7)' }}>Feature Coverage</div>
            </div>
            <div style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.3)', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--cosmic-accent-cyan)' }}>12</div>
              <div style={{ color: 'rgba(255,255,255,0.7)' }}>Core Modules</div>
            </div>
            <div style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--cosmic-accent-purple)' }}>5</div>
              <div style={{ color: 'rgba(255,255,255,0.7)' }}>Industry-Specific</div>
            </div>
          </div>
        </div>

        {comparisons.map((comp, index) => (
          <div key={index} style={{ 
            marginBottom: '2rem', 
            padding: '1.5rem', 
            background: 'rgba(255, 255, 255, 0.03)', 
            borderRadius: '12px',
            border: '1px solid rgba(0, 212, 255, 0.1)'
          }}>
            <h3 style={{ color: 'var(--cosmic-accent-cyan)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {comp.category}
              {comp.match.includes('Excellent') && <CheckCircle size={20} style={{ color: 'var(--cosmic-accent-emerald)' }} />}
              {comp.match.includes('Good') && <CheckCircle size={20} style={{ color: 'var(--cosmic-accent-cyan)' }} />}
              {comp.match.includes('Partial') && <AlertCircle size={20} style={{ color: 'var(--cosmic-accent-amber)' }} />}
              {comp.match.includes('Missing') && <XCircle size={20} style={{ color: 'var(--cosmic-accent-rose)' }} />}
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
              <div>
                <h4 style={{ color: 'var(--cosmic-accent-purple)', marginBottom: '0.5rem' }}>Salesforce Features:</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {comp.salesforce.map((feature, i) => (
                    <li key={i} style={{ 
                      padding: '0.5rem', 
                      marginBottom: '0.25rem', 
                      background: 'rgba(139, 92, 246, 0.1)',
                      borderRadius: '4px',
                      color: 'rgba(255,255,255,0.8)'
                    }}>
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 style={{ color: 'var(--cosmic-accent-cyan)', marginBottom: '0.5rem' }}>Our ERP Features:</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {comp.ourERP.length > 0 ? (
                    comp.ourERP.map((feature, i) => (
                      <li key={i} style={{ 
                        padding: '0.5rem', 
                        marginBottom: '0.25rem', 
                        background: 'rgba(0, 212, 255, 0.1)',
                        borderRadius: '4px',
                        color: 'rgba(255,255,255,0.8)'
                      }}>
                        ✓ {feature}
                      </li>
                    ))
                  ) : (
                    <li style={{ 
                      padding: '0.5rem', 
                      color: 'rgba(255,255,255,0.5)',
                      fontStyle: 'italic'
                    }}>
                      Not yet implemented
                    </li>
                  )}
                </ul>
              </div>
            </div>
            
            <div style={{ 
              padding: '0.75rem', 
              background: comp.match.includes('Excellent') ? 'rgba(16, 185, 129, 0.1)' :
                         comp.match.includes('Good') ? 'rgba(0, 212, 255, 0.1)' :
                         comp.match.includes('Partial') ? 'rgba(245, 158, 11, 0.1)' :
                         'rgba(244, 63, 94, 0.1)',
              borderRadius: '8px',
              border: `1px solid ${comp.match.includes('Excellent') ? 'rgba(16, 185, 129, 0.3)' :
                              comp.match.includes('Good') ? 'rgba(0, 212, 255, 0.3)' :
                              comp.match.includes('Partial') ? 'rgba(245, 158, 11, 0.3)' :
                              'rgba(244, 63, 94, 0.3)'}`
            }}>
              <strong style={{ color: 'var(--cosmic-star-white)' }}>Match Status:</strong> {comp.match}
            </div>
          </div>
        ))}

        <div style={{ 
          marginTop: '3rem', 
          padding: '2rem', 
          background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(139, 92, 246, 0.1))',
          borderRadius: '12px',
          border: '1px solid rgba(0, 212, 255, 0.2)'
        }}>
          <h2 style={{ color: 'var(--cosmic-accent-cyan)', marginBottom: '1rem' }}>Key Strengths of Our ERP</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '0.75rem', marginBottom: '0.5rem' }}>✓ <strong>Manufacturing Focus:</strong> Production, Quality Control, Asset Management</li>
            <li style={{ padding: '0.75rem', marginBottom: '0.5rem' }}>✓ <strong>Strong Analytics:</strong> Business Intelligence, Advanced Dashboards</li>
            <li style={{ padding: '0.75rem', marginBottom: '0.5rem' }}>✓ <strong>Compliance & HR:</strong> Compliance Management, HR Management</li>
            <li style={{ padding: '0.75rem', marginBottom: '0.5rem' }}>✓ <strong>Industry-Specific:</strong> Tailored for manufacturing/tobacco industry</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SalesforceComparison







