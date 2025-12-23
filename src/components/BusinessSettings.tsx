import React, { useState } from 'react'

interface CompanyDetails {
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  email: string
  website: string
  taxId: string
  registrationNumber: string
}

interface BankingDetails {
  bankName: string
  accountName: string
  accountNumber: string
  routingNumber: string
  swiftCode: string
  iban: string
  branch: string
}

interface DocumentTemplate {
  headerColor: string
  logoPosition: 'left' | 'center' | 'right'
  showLogo: boolean
  footerText: string
  termsAndConditions: string
  paymentTerms: string
  currency: string
  taxRate: number
}

const BusinessSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('company')
  
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({
    name: 'Azure Tobacco Industrial FZCO',
    address: '123 Business District',
    city: 'Dubai',
    state: 'Dubai',
    zipCode: '12345',
    country: 'United Arab Emirates',
    phone: '+971 4 123 4567',
    email: 'info@azuretobacco.com',
    website: 'www.azuretobacco.com',
    taxId: 'TAX123456789',
    registrationNumber: 'REG987654321'
  })

  const [bankingDetails, setBankingDetails] = useState<BankingDetails>({
    bankName: 'Emirates NBD Bank',
    accountName: 'Azure Tobacco Industrial FZCO',
    accountNumber: '1234567890',
    routingNumber: '021000021',
    swiftCode: 'EBILAEAD',
    iban: 'AE070331234567890123456',
    branch: 'Business Bay Branch'
  })

  const [documentTemplate, setDocumentTemplate] = useState<DocumentTemplate>({
    headerColor: '#1e3a8a',
    logoPosition: 'left',
    showLogo: true,
    footerText: 'Thank you for your business! Premium quality hookah tobacco since 2020.',
    termsAndConditions: 'Payment is due within 30 days. Late payments may incur additional charges.',
    paymentTerms: 'Net 30 days',
    currency: 'AED',
    taxRate: 5
  })

  const tabs = [
    { id: 'company', name: 'Company Details', icon: '🏢' },
    { id: 'banking', name: 'Banking Details', icon: '🏦' },
    { id: 'documents', name: 'Document Templates', icon: '📄' },
    { id: 'preview', name: 'Preview', icon: '👁️' }
  ]

  const tabStyle = (isActive: boolean) => ({
    padding: '1rem 1.5rem',
    background: isActive ? 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' : 'transparent',
    color: isActive ? '#ffffff' : '#64748b',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    minWidth: '160px'
  })

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '0.95rem',
    background: '#ffffff',
    transition: 'all 0.3s ease'
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#374151',
    fontSize: '0.9rem'
  }

  const cardStyle = {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0'
  }

  const renderCompanyDetails = () => (
    <div style={cardStyle}>
      <h3 style={{ marginBottom: '2rem', color: '#1e3a8a', fontSize: '1.5rem', fontWeight: '700' }}>
        🏢 Company Information
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div>
          <label style={labelStyle}>Company Name</label>
          <input
            type="text"
            value={companyDetails.name}
            onChange={(e) => setCompanyDetails({...companyDetails, name: e.target.value})}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Email Address</label>
          <input
            type="email"
            value={companyDetails.email}
            onChange={(e) => setCompanyDetails({...companyDetails, email: e.target.value})}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Phone Number</label>
          <input
            type="tel"
            value={companyDetails.phone}
            onChange={(e) => setCompanyDetails({...companyDetails, phone: e.target.value})}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Website</label>
          <input
            type="url"
            value={companyDetails.website}
            onChange={(e) => setCompanyDetails({...companyDetails, website: e.target.value})}
            style={inputStyle}
          />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Address</label>
          <input
            type="text"
            value={companyDetails.address}
            onChange={(e) => setCompanyDetails({...companyDetails, address: e.target.value})}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>City</label>
          <input
            type="text"
            value={companyDetails.city}
            onChange={(e) => setCompanyDetails({...companyDetails, city: e.target.value})}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>State/Province</label>
          <input
            type="text"
            value={companyDetails.state}
            onChange={(e) => setCompanyDetails({...companyDetails, state: e.target.value})}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>ZIP/Postal Code</label>
          <input
            type="text"
            value={companyDetails.zipCode}
            onChange={(e) => setCompanyDetails({...companyDetails, zipCode: e.target.value})}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Country</label>
          <input
            type="text"
            value={companyDetails.country}
            onChange={(e) => setCompanyDetails({...companyDetails, country: e.target.value})}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Tax ID</label>
          <input
            type="text"
            value={companyDetails.taxId}
            onChange={(e) => setCompanyDetails({...companyDetails, taxId: e.target.value})}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Registration Number</label>
          <input
            type="text"
            value={companyDetails.registrationNumber}
            onChange={(e) => setCompanyDetails({...companyDetails, registrationNumber: e.target.value})}
            style={inputStyle}
          />
        </div>
      </div>
    </div>
  )

  const renderBankingDetails = () => (
    <div style={cardStyle}>
      <h3 style={{ marginBottom: '2rem', color: '#1e3a8a', fontSize: '1.5rem', fontWeight: '700' }}>
        🏦 Banking Information
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div>
          <label style={labelStyle}>Bank Name</label>
          <input
            type="text"
            value={bankingDetails.bankName}
            onChange={(e) => setBankingDetails({...bankingDetails, bankName: e.target.value})}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Account Name</label>
          <input
            type="text"
            value={bankingDetails.accountName}
            onChange={(e) => setBankingDetails({...bankingDetails, accountName: e.target.value})}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Account Number</label>
          <input
            type="text"
            value={bankingDetails.accountNumber}
            onChange={(e) => setBankingDetails({...bankingDetails, accountNumber: e.target.value})}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Routing Number</label>
          <input
            type="text"
            value={bankingDetails.routingNumber}
            onChange={(e) => setBankingDetails({...bankingDetails, routingNumber: e.target.value})}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>SWIFT Code</label>
          <input
            type="text"
            value={bankingDetails.swiftCode}
            onChange={(e) => setBankingDetails({...bankingDetails, swiftCode: e.target.value})}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>IBAN</label>
          <input
            type="text"
            value={bankingDetails.iban}
            onChange={(e) => setBankingDetails({...bankingDetails, iban: e.target.value})}
            style={inputStyle}
          />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Branch</label>
          <input
            type="text"
            value={bankingDetails.branch}
            onChange={(e) => setBankingDetails({...bankingDetails, branch: e.target.value})}
            style={inputStyle}
          />
        </div>
      </div>
    </div>
  )

  const renderDocumentTemplates = () => (
    <div style={cardStyle}>
      <h3 style={{ marginBottom: '2rem', color: '#1e3a8a', fontSize: '1.5rem', fontWeight: '700' }}>
        📄 Document Template Settings
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div>
          <label style={labelStyle}>Header Color</label>
          <input
            type="color"
            value={documentTemplate.headerColor}
            onChange={(e) => setDocumentTemplate({...documentTemplate, headerColor: e.target.value})}
            style={{...inputStyle, height: '50px'}}
          />
        </div>
        <div>
          <label style={labelStyle}>Logo Position</label>
          <select
            value={documentTemplate.logoPosition}
            onChange={(e) => setDocumentTemplate({...documentTemplate, logoPosition: e.target.value as 'left' | 'center' | 'right'})}
            style={inputStyle}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Currency</label>
          <select
            value={documentTemplate.currency}
            onChange={(e) => setDocumentTemplate({...documentTemplate, currency: e.target.value})}
            style={inputStyle}
          >
            <option value="AED">AED - UAE Dirham</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Tax Rate (%)</label>
          <input
            type="number"
            value={documentTemplate.taxRate}
            onChange={(e) => setDocumentTemplate({...documentTemplate, taxRate: parseFloat(e.target.value)})}
            style={inputStyle}
            min="0"
            max="100"
            step="0.1"
          />
        </div>
        <div>
          <label style={labelStyle}>Payment Terms</label>
          <input
            type="text"
            value={documentTemplate.paymentTerms}
            onChange={(e) => setDocumentTemplate({...documentTemplate, paymentTerms: e.target.value})}
            style={inputStyle}
          />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Footer Text</label>
          <textarea
            value={documentTemplate.footerText}
            onChange={(e) => setDocumentTemplate({...documentTemplate, footerText: e.target.value})}
            style={{...inputStyle, minHeight: '80px', resize: 'vertical'}}
          />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Terms and Conditions</label>
          <textarea
            value={documentTemplate.termsAndConditions}
            onChange={(e) => setDocumentTemplate({...documentTemplate, termsAndConditions: e.target.value})}
            style={{...inputStyle, minHeight: '120px', resize: 'vertical'}}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={documentTemplate.showLogo}
            onChange={(e) => setDocumentTemplate({...documentTemplate, showLogo: e.target.checked})}
            style={{ width: 'auto' }}
          />
          <label style={{...labelStyle, marginBottom: 0}}>Show Logo on Documents</label>
        </div>
      </div>
    </div>
  )

  const renderPreview = () => (
    <div style={cardStyle}>
      <h3 style={{ marginBottom: '2rem', color: '#1e3a8a', fontSize: '1.5rem', fontWeight: '700' }}>
        👁️ Document Preview
      </h3>
      <div style={{
        border: '2px solid #e2e8f0',
        borderRadius: '12px',
        padding: '2rem',
        background: '#ffffff',
        minHeight: '600px'
      }}>
        {/* Document Header */}
        <div style={{
          background: documentTemplate.headerColor,
          color: '#ffffff',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ textAlign: documentTemplate.logoPosition }}>
            {documentTemplate.showLogo && (
              <div style={{
                width: '120px',
                height: '60px',
                background: 'linear-gradient(135deg, #4dd0e1 0%, #26c6da 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                AZURE
              </div>
            )}
            <h2 style={{ margin: 0, fontSize: '1.8rem' }}>INVOICE</h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>Invoice #INV-2024-001</div>
            <div>Date: {new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* Company Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <h4 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>From:</h4>
            <div style={{ lineHeight: '1.6' }}>
              <strong>{companyDetails.name}</strong><br />
              {companyDetails.address}<br />
              {companyDetails.city}, {companyDetails.state} {companyDetails.zipCode}<br />
              {companyDetails.country}<br />
              Phone: {companyDetails.phone}<br />
              Email: {companyDetails.email}
            </div>
          </div>
          <div>
            <h4 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>To:</h4>
            <div style={{ lineHeight: '1.6' }}>
              <strong>Sample Client</strong><br />
              123 Client Street<br />
              Client City, State 12345<br />
              Country
            </div>
          </div>
        </div>

        {/* Sample Items */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>Item</th>
              <th style={{ padding: '1rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>Qty</th>
              <th style={{ padding: '1rem', textAlign: 'right', border: '1px solid #e2e8f0' }}>Price</th>
              <th style={{ padding: '1rem', textAlign: 'right', border: '1px solid #e2e8f0' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '1rem', border: '1px solid #e2e8f0' }}>Premium Tobacco Blend</td>
              <td style={{ padding: '1rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>10</td>
              <td style={{ padding: '1rem', textAlign: 'right', border: '1px solid #e2e8f0' }}>{documentTemplate.currency} 50.00</td>
              <td style={{ padding: '1rem', textAlign: 'right', border: '1px solid #e2e8f0' }}>{documentTemplate.currency} 500.00</td>
            </tr>
          </tbody>
        </table>

        {/* Totals */}
        <div style={{ textAlign: 'right', marginBottom: '2rem' }}>
          <div style={{ marginBottom: '0.5rem' }}>Subtotal: {documentTemplate.currency} 500.00</div>
          <div style={{ marginBottom: '0.5rem' }}>Tax ({documentTemplate.taxRate}%): {documentTemplate.currency} {(500 * documentTemplate.taxRate / 100).toFixed(2)}</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e3a8a' }}>
            Total: {documentTemplate.currency} {(500 + (500 * documentTemplate.taxRate / 100)).toFixed(2)}
          </div>
        </div>

        {/* Payment Terms */}
        <div style={{ marginBottom: '1rem' }}>
          <strong>Payment Terms:</strong> {documentTemplate.paymentTerms}
        </div>

        {/* Banking Details */}
        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          <strong>Banking Details:</strong><br />
          Bank: {bankingDetails.bankName}<br />
          Account: {bankingDetails.accountName}<br />
          Account Number: {bankingDetails.accountNumber}<br />
          IBAN: {bankingDetails.iban}
        </div>

        {/* Terms and Footer */}
        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Terms & Conditions:</strong><br />
            {documentTemplate.termsAndConditions}
          </div>
          <div style={{ textAlign: 'center', fontStyle: 'italic' }}>
            {documentTemplate.footerText}
          </div>
        </div>
      </div>
    </div>
  )

  const saveSettings = () => {
    // In a real application, this would save to a backend
    alert('Settings saved successfully!')
  }

  return (
    <div style={{
      padding: '2rem',
      background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          color: '#ffffff'
        }}>
          <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '800' }}>⚙️ Business Settings</h1>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.1rem', opacity: 0.9 }}>
            Configure your company details, banking information, and document templates
          </p>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          background: '#ffffff',
          padding: '1rem',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          overflowX: 'auto'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={tabStyle(activeTab === tab.id)}
            >
              <span>{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ marginBottom: '2rem' }}>
          {activeTab === 'company' && renderCompanyDetails()}
          {activeTab === 'banking' && renderBankingDetails()}
          {activeTab === 'documents' && renderDocumentTemplates()}
          {activeTab === 'preview' && renderPreview()}
        </div>

        {/* Save Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={saveSettings}
            style={{
              background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '1rem 3rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(30, 58, 138, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            💾 Save All Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default BusinessSettings 