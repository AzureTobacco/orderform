import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Download,
  RefreshCw,
  Eye,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  User,
  Building,
  Star,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Heart,
  Zap,
  Award
} from 'lucide-react'
import { AnimatedCounter, StatusBadge } from './ModernUI'

interface Customer {
  id: string
  name: string
  company: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  industry: string
  customerType: 'individual' | 'business' | 'enterprise'
  status: 'active' | 'inactive' | 'prospect' | 'churned'
  registrationDate: string
  lastContact: string
  totalOrders: number
  totalSpent: number
  lifetimeValue: number
  satisfactionScore: number
  riskLevel: 'low' | 'medium' | 'high'
  assignedTo: string
  tags: string[]
  notes: string
}

interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone: string
  source: string
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
  score: number
  estimatedValue: number
  probability: number
  expectedCloseDate: string
  assignedTo: string
  lastActivity: string
  notes: string
}

interface Communication {
  id: string
  customerId: string
  type: 'email' | 'phone' | 'meeting' | 'note'
  subject: string
  content: string
  date: string
  direction: 'inbound' | 'outbound'
  status: 'completed' | 'scheduled' | 'cancelled'
  assignedTo: string
}

const CRMManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'customers' | 'leads' | 'communications' | 'analytics'>('customers')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  // Sample data
  const [customers] = useState<Customer[]>([
    {
      id: 'CUST001',
      name: 'Ahmed Al-Rashid',
      company: 'Dubai Tobacco Trading LLC',
      email: 'ahmed@dubaitobacco.ae',
      phone: '+971-4-555-0123',
      address: 'Sheikh Zayed Road, Dubai',
      city: 'Dubai',
      country: 'UAE',
      industry: 'Tobacco Distribution',
      customerType: 'business',
      status: 'active',
      registrationDate: '2023-01-15',
      lastContact: '2024-05-28',
      totalOrders: 45,
      totalSpent: 2850000,
      lifetimeValue: 3200000,
      satisfactionScore: 9.2,
      riskLevel: 'low',
      assignedTo: 'Sarah Johnson',
      tags: ['Premium Client', 'High Volume', 'UAE'],
      notes: 'Long-term partner, prefers premium tobacco blends'
    },
    {
      id: 'CUST002',
      name: 'Mohammed bin Khalid',
      company: 'Riyadh Tobacco Imports',
      email: 'mohammed@riyadhtobacco.sa',
      phone: '+966-11-555-0456',
      address: 'King Fahd Road, Riyadh',
      city: 'Riyadh',
      country: 'Saudi Arabia',
      industry: 'Import/Export',
      customerType: 'enterprise',
      status: 'active',
      registrationDate: '2022-08-20',
      lastContact: '2024-05-30',
      totalOrders: 78,
      totalSpent: 4650000,
      lifetimeValue: 5200000,
      satisfactionScore: 8.8,
      riskLevel: 'low',
      assignedTo: 'Michael Chen',
      tags: ['Enterprise', 'Saudi Arabia', 'Bulk Orders'],
      notes: 'Largest client in Saudi market, quarterly contracts'
    },
    {
      id: 'CUST003',
      name: 'Fatima Al-Zahra',
      company: 'Gulf Tobacco Retailers',
      email: 'fatima@gulftobacco.com',
      phone: '+971-6-555-0789',
      address: 'Corniche Road, Sharjah',
      city: 'Sharjah',
      country: 'UAE',
      industry: 'Retail',
      customerType: 'business',
      status: 'prospect',
      registrationDate: '2024-03-10',
      lastContact: '2024-05-25',
      totalOrders: 8,
      totalSpent: 450000,
      lifetimeValue: 800000,
      satisfactionScore: 7.5,
      riskLevel: 'medium',
      assignedTo: 'Sarah Johnson',
      tags: ['New Client', 'Retail Chain', 'Growth Potential'],
      notes: 'Expanding retail chain, potential for significant growth'
    }
  ])

  const [leads] = useState<Lead[]>([
    {
      id: 'LEAD001',
      name: 'Omar Al-Mansouri',
      company: 'Abu Dhabi Premium Tobacco',
      email: 'omar@adptobacco.ae',
      phone: '+971-2-555-0321',
      source: 'Trade Show',
      status: 'qualified',
      score: 85,
      estimatedValue: 1200000,
      probability: 75,
      expectedCloseDate: '2024-07-15',
      assignedTo: 'Sarah Johnson',
      lastActivity: '2024-05-29',
      notes: 'Interested in premium blend products, decision maker confirmed'
    },
    {
      id: 'LEAD002',
      name: 'Khalid Al-Otaibi',
      company: 'Jeddah Tobacco Distributors',
      email: 'khalid@jeddahtobacco.sa',
      phone: '+966-12-555-0654',
      source: 'Website',
      status: 'proposal',
      score: 92,
      estimatedValue: 2800000,
      probability: 85,
      expectedCloseDate: '2024-06-30',
      assignedTo: 'Michael Chen',
      lastActivity: '2024-05-30',
      notes: 'Proposal submitted, awaiting final approval from board'
    },
    {
      id: 'LEAD003',
      name: 'Aisha Al-Qasimi',
      company: 'Northern Emirates Tobacco',
      email: 'aisha@netobacco.ae',
      phone: '+971-7-555-0987',
      source: 'Referral',
      status: 'new',
      score: 65,
      estimatedValue: 650000,
      probability: 45,
      expectedCloseDate: '2024-08-20',
      assignedTo: 'David Rodriguez',
      lastActivity: '2024-05-27',
      notes: 'Initial contact made, scheduling product demonstration'
    }
  ])

  const [communications] = useState<Communication[]>([
    {
      id: 'COMM001',
      customerId: 'CUST001',
      type: 'email',
      subject: 'Q2 Order Confirmation',
      content: 'Confirming your Q2 order for premium tobacco blends...',
      date: '2024-05-28',
      direction: 'outbound',
      status: 'completed',
      assignedTo: 'Sarah Johnson'
    },
    {
      id: 'COMM002',
      customerId: 'CUST002',
      type: 'phone',
      subject: 'Contract Renewal Discussion',
      content: 'Discussed annual contract renewal terms and pricing...',
      date: '2024-05-30',
      direction: 'outbound',
      status: 'completed',
      assignedTo: 'Michael Chen'
    },
    {
      id: 'COMM003',
      customerId: 'CUST003',
      type: 'meeting',
      subject: 'Product Demonstration',
      content: 'Scheduled product demonstration for new tobacco lines...',
      date: '2024-06-05',
      direction: 'outbound',
      status: 'scheduled',
      assignedTo: 'Sarah Johnson'
    }
  ])

  // Filter functions
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterStatus === 'all' || customer.status === filterStatus
      return matchesSearch && matchesFilter
    })
  }, [customers, searchTerm, filterStatus])

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterStatus === 'all' || lead.status === filterStatus
      return matchesSearch && matchesFilter
    })
  }, [leads, searchTerm, filterStatus])

  // Analytics calculations
  const analytics = useMemo(() => {
    const totalCustomers = customers.length
    const activeCustomers = customers.filter(c => c.status === 'active').length
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0)
    const avgSatisfaction = customers.reduce((sum, c) => sum + c.satisfactionScore, 0) / customers.length
    const totalLeads = leads.length
    const qualifiedLeads = leads.filter(l => l.status === 'qualified' || l.status === 'proposal').length
    const pipelineValue = leads.reduce((sum, l) => sum + l.estimatedValue, 0)
    const avgLeadScore = leads.reduce((sum, l) => sum + l.score, 0) / leads.length

    return {
      totalCustomers,
      activeCustomers,
      totalRevenue,
      avgSatisfaction,
      totalLeads,
      qualifiedLeads,
      pipelineValue,
      avgLeadScore,
      conversionRate: (qualifiedLeads / totalLeads) * 100,
      customerRetention: (activeCustomers / totalCustomers) * 100
    }
  }, [customers, leads])

  const getStatusColor = (status: string) => {
    const colors = {
      active: '#4caf50',
      inactive: '#ff9800',
      prospect: '#2196f3',
      churned: '#f44336',
      new: '#9c27b0',
      contacted: '#ff9800',
      qualified: '#4caf50',
      proposal: '#2196f3',
      negotiation: '#ff5722',
      won: '#4caf50',
      lost: '#f44336'
    }
    return colors[status as keyof typeof colors] || '#666'
  }

  const getRiskColor = (risk: string) => {
    const colors = {
      low: '#4caf50',
      medium: '#ff9800',
      high: '#f44336'
    }
    return colors[risk as keyof typeof colors] || '#666'
  }

  // Helper functions for analytics
  const getTotalCustomers = () => analytics.totalCustomers
  const getActiveCustomers = () => analytics.activeCustomers
  const getTotalRevenue = () => analytics.totalRevenue
  const getAverageOrderValue = () => {
    const totalOrders = customers.reduce((sum, c) => sum + c.totalOrders, 0)
    return totalOrders > 0 ? analytics.totalRevenue / totalOrders : 0
  }

  const renderCustomersTab = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Action Bar */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '16px', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#06b6d4', 
              width: '16px', 
              height: '16px' 
            }} />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                paddingLeft: '40px',
                paddingRight: '16px',
                paddingTop: '8px',
                paddingBottom: '8px',
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '8px',
                color: 'white',
                width: '256px',
                outline: 'none'
              }}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '8px 16px',
              background: 'rgba(30, 41, 59, 0.5)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: '8px',
              color: 'white',
              outline: 'none'
            }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="prospect">Prospect</option>
            <option value="churned">Churned</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            <Plus style={{ width: '16px', height: '16px' }} />
            Add Customer
          </button>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(51, 65, 85, 0.5)',
            color: '#06b6d4',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            <Download style={{ width: '16px', height: '16px' }} />
            Export
          </button>
        </div>
      </div>

      {/* Customers Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '24px'
      }}>
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            style={{
              background: 'rgba(30, 41, 59, 0.3)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: '12px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={() => setSelectedCustomer(customer)}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLDivElement
              target.style.borderColor = 'rgba(6, 182, 212, 0.4)'
              target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLDivElement
              target.style.borderColor = 'rgba(6, 182, 212, 0.2)'
              target.style.transform = 'translateY(0)'
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              justifyContent: 'space-between', 
              marginBottom: '16px' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <User style={{ width: '24px', height: '24px', color: 'white' }} />
                </div>
                <div>
                  <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                    {customer.name}
                  </h3>
                  <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                    {customer.company}
                  </p>
                </div>
              </div>
              <span
                style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: 'white',
                  backgroundColor: getStatusColor(customer.status)
                }}
              >
                {customer.status.toUpperCase()}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail style={{ width: '16px', height: '16px', color: 'rgba(6, 182, 212, 0.7)' }} />
                <span style={{ fontSize: '14px', color: 'rgba(6, 182, 212, 0.7)' }}>
                  {customer.email}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone style={{ width: '16px', height: '16px', color: 'rgba(6, 182, 212, 0.7)' }} />
                <span style={{ fontSize: '14px', color: 'rgba(6, 182, 212, 0.7)' }}>
                  {customer.phone}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin style={{ width: '16px', height: '16px', color: 'rgba(6, 182, 212, 0.7)' }} />
                <span style={{ fontSize: '14px', color: 'rgba(6, 182, 212, 0.7)' }}>
                  {customer.city}, {customer.country}
                </span>
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '16px', 
              marginBottom: '16px' 
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>
                  {customer.totalOrders}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)' }}>
                  Orders
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>
                  ${(customer.totalSpent / 1000000).toFixed(1)}M
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)' }}>
                  Spent
                </div>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Star style={{ width: '16px', height: '16px', color: '#fbbf24' }} />
                <span style={{ fontSize: '14px', color: 'white' }}>
                  {customer.satisfactionScore}/10
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: getRiskColor(customer.riskLevel)
                  }}
                />
                <span style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)', textTransform: 'capitalize' }}>
                  {customer.riskLevel} Risk
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {customer.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  style={{
                    padding: '4px 8px',
                    background: 'rgba(6, 182, 212, 0.2)',
                    color: '#06b6d4',
                    fontSize: '12px',
                    borderRadius: '12px'
                  }}
                >
                  {tag}
                </span>
              ))}
              {customer.tags.length > 2 && (
                <span style={{
                  padding: '4px 8px',
                  background: 'rgba(51, 65, 85, 0.5)',
                  color: 'rgba(6, 182, 212, 0.7)',
                  fontSize: '12px',
                  borderRadius: '12px'
                }}>
                  +{customer.tags.length - 2}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderLeadsTab = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Action Bar */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '16px', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#06b6d4', 
              width: '16px', 
              height: '16px' 
            }} />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                paddingLeft: '40px',
                paddingRight: '16px',
                paddingTop: '8px',
                paddingBottom: '8px',
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '8px',
                color: 'white',
                width: '256px',
                outline: 'none'
              }}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '8px 16px',
              background: 'rgba(30, 41, 59, 0.5)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: '8px',
              color: 'white',
              outline: 'none'
            }}
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="negotiation">Negotiation</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            <Plus style={{ width: '16px', height: '16px' }} />
            Add Lead
          </button>
        </div>
      </div>

      {/* Leads Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '24px'
      }}>
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            style={{
              background: 'rgba(30, 41, 59, 0.3)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: '12px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={() => setSelectedLead(lead)}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLDivElement
              target.style.borderColor = 'rgba(6, 182, 212, 0.4)'
              target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLDivElement
              target.style.borderColor = 'rgba(6, 182, 212, 0.2)'
              target.style.transform = 'translateY(0)'
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              justifyContent: 'space-between', 
              marginBottom: '16px' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Target style={{ width: '24px', height: '24px', color: 'white' }} />
                </div>
                <div>
                  <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                    {lead.name}
                  </h3>
                  <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                    {lead.company}
                  </p>
                </div>
              </div>
              <span
                style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: 'white',
                  backgroundColor: getStatusColor(lead.status)
                }}
              >
                {lead.status.toUpperCase()}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail style={{ width: '16px', height: '16px', color: 'rgba(6, 182, 212, 0.7)' }} />
                <span style={{ fontSize: '14px', color: 'rgba(6, 182, 212, 0.7)' }}>
                  {lead.email}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone style={{ width: '16px', height: '16px', color: 'rgba(6, 182, 212, 0.7)' }} />
                <span style={{ fontSize: '14px', color: 'rgba(6, 182, 212, 0.7)' }}>
                  {lead.phone}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp style={{ width: '16px', height: '16px', color: 'rgba(6, 182, 212, 0.7)' }} />
                <span style={{ fontSize: '14px', color: 'rgba(6, 182, 212, 0.7)' }}>
                  Source: {lead.source}
                </span>
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '16px', 
              marginBottom: '16px' 
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>
                  {lead.score}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)' }}>
                  Score
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>
                  ${(lead.estimatedValue / 1000000).toFixed(1)}M
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)' }}>
                  Value
                </div>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity style={{ width: '16px', height: '16px', color: '#10b981' }} />
                <span style={{ fontSize: '14px', color: 'white' }}>
                  {lead.probability}% Probability
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar style={{ width: '16px', height: '16px', color: 'rgba(6, 182, 212, 0.7)' }} />
                <span style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)' }}>
                  {new Date(lead.expectedCloseDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div style={{ 
              width: '100%', 
              height: '4px', 
              background: 'rgba(51, 65, 85, 0.5)', 
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div
                style={{
                  width: `${lead.probability}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #10b981, #059669)',
                  borderRadius: '2px',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderCommunicationsTab = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Action Bar */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '16px', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#06b6d4', 
              width: '16px', 
              height: '16px' 
            }} />
            <input
              type="text"
              placeholder="Search communications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                paddingLeft: '40px',
                paddingRight: '16px',
                paddingTop: '8px',
                paddingBottom: '8px',
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '8px',
                color: 'white',
                width: '256px',
                outline: 'none'
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            <Plus style={{ width: '16px', height: '16px' }} />
            Add Communication
          </button>
        </div>
      </div>

      {/* Communications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {communications.map((comm) => {
          const customer = customers.find(c => c.id === comm.customerId)
          return (
            <div
              key={comm.id}
              style={{
                background: 'rgba(30, 41, 59, 0.3)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                justifyContent: 'space-between', 
                marginBottom: '16px' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: comm.type === 'email' ? 'linear-gradient(135deg, #f59e0b, #d97706)' :
                               comm.type === 'phone' ? 'linear-gradient(135deg, #10b981, #059669)' :
                               comm.type === 'meeting' ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' :
                               'linear-gradient(135deg, #06b6d4, #0891b2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {comm.type === 'email' && <Mail style={{ width: '24px', height: '24px', color: 'white' }} />}
                    {comm.type === 'phone' && <Phone style={{ width: '24px', height: '24px', color: 'white' }} />}
                    {comm.type === 'meeting' && <Calendar style={{ width: '24px', height: '24px', color: 'white' }} />}
                    {comm.type === 'note' && <MessageSquare style={{ width: '24px', height: '24px', color: 'white' }} />}
                  </div>
                  <div>
                    <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                      {comm.subject}
                    </h3>
                    <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                      {comm.type.charAt(0).toUpperCase() + comm.type.slice(1)} • {comm.direction}
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', color: 'white', marginBottom: '4px' }}>
                    {new Date(comm.date).toLocaleDateString()}
                  </div>
                  <span
                    style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: 'white',
                      backgroundColor: comm.status === 'completed' ? '#10b981' : 
                                     comm.status === 'scheduled' ? '#f59e0b' : '#ef4444'
                    }}
                  >
                    {comm.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <p style={{ color: 'rgba(6, 182, 212, 0.8)', fontSize: '14px', lineHeight: '1.5' }}>
                  {comm.content}
                </p>
              </div>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                fontSize: '12px',
                color: 'rgba(6, 182, 212, 0.7)'
              }}>
                <span>Assigned to: {comm.assignedTo}</span>
                <span>Customer ID: {comm.customerId}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderAnalyticsTab = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px'
      }}>
        <div style={{
          background: 'rgba(30, 41, 59, 0.3)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Users style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
            <div>
              <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                Total Customers
              </h3>
              <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                Active & Prospects
              </p>
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
            {getTotalCustomers()}
          </div>
          <div style={{ fontSize: '14px', color: '#10b981', marginTop: '8px' }}>
            +12% from last month
          </div>
        </div>

        <div style={{
          background: 'rgba(30, 41, 59, 0.3)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <DollarSign style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
            <div>
              <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                Total Revenue
              </h3>
              <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                All time
              </p>
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
            ${(getTotalRevenue() / 1000000).toFixed(1)}M
          </div>
          <div style={{ fontSize: '14px', color: '#10b981', marginTop: '8px' }}>
            +8% from last month
          </div>
        </div>

        <div style={{
          background: 'rgba(30, 41, 59, 0.3)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUp style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
            <div>
              <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                Avg Order Value
              </h3>
              <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                Per customer
              </p>
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
            ${(getAverageOrderValue() / 1000).toFixed(0)}K
          </div>
          <div style={{ fontSize: '14px', color: '#10b981', marginTop: '8px' }}>
            +15% from last month
          </div>
        </div>

        <div style={{
          background: 'rgba(30, 41, 59, 0.3)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
            <div>
              <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                Active Customers
              </h3>
              <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                Currently active
              </p>
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
            {getActiveCustomers()}
          </div>
          <div style={{ fontSize: '14px', color: '#10b981', marginTop: '8px' }}>
            +5% from last month
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px'
      }}>
        <div style={{
          background: 'rgba(30, 41, 59, 0.3)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '16px' }}>
            Customer Distribution by Status
          </h3>
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PieChart style={{ width: '64px', height: '64px', color: 'rgba(6, 182, 212, 0.5)' }} />
            <span style={{ marginLeft: '16px', color: 'rgba(6, 182, 212, 0.7)' }}>
              Chart visualization would go here
            </span>
          </div>
        </div>

        <div style={{
          background: 'rgba(30, 41, 59, 0.3)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '16px' }}>
            Revenue Trend
          </h3>
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BarChart3 style={{ width: '64px', height: '64px', color: 'rgba(6, 182, 212, 0.5)' }} />
            <span style={{ marginLeft: '16px', color: 'rgba(6, 182, 212, 0.7)' }}>
              Chart visualization would go here
            </span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      padding: '24px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Users style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 4px 0'
              }}>
                CRM Management
              </h1>
              <p style={{
                color: 'rgba(6, 182, 212, 0.7)',
                fontSize: '16px',
                margin: '0'
              }}>
                Manage customers, leads, and communications
              </p>
            </div>
          </div>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: 'rgba(51, 65, 85, 0.5)',
            color: '#06b6d4',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            <RefreshCw style={{ width: '16px', height: '16px' }} />
            Refresh Data
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '32px',
          background: 'rgba(30, 41, 59, 0.3)',
          padding: '8px',
          borderRadius: '12px',
          border: '1px solid rgba(6, 182, 212, 0.2)'
        }}>
          {[
            { key: 'customers', label: 'Customers', icon: Users },
            { key: 'leads', label: 'Leads', icon: Target },
            { key: 'communications', label: 'Communications', icon: MessageSquare },
            { key: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: activeTab === key ? 'linear-gradient(135deg, #06b6d4, #0891b2)' : 'transparent',
                color: activeTab === key ? 'white' : 'rgba(6, 182, 212, 0.7)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === key ? '600' : '400',
                transition: 'all 0.3s ease'
              }}
            >
              <Icon style={{ width: '16px', height: '16px' }} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'customers' && renderCustomersTab()}
          {activeTab === 'leads' && renderLeadsTab()}
          {activeTab === 'communications' && renderCommunicationsTab()}
          {activeTab === 'analytics' && renderAnalyticsTab()}
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            background: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                Add New Customer
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(6, 182, 212, 0.7)',
                  cursor: 'pointer',
                  fontSize: '24px',
                  padding: '8px'
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault()
              // Here you would typically handle form submission
              setShowAddModal(false)
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                    placeholder="Enter customer name"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    Company
                  </label>
                  <input
                    type="text"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                    placeholder="customer@email.com"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                    placeholder="+971-4-555-0123"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    City
                  </label>
                  <input
                    type="text"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                    placeholder="Dubai"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    Country
                  </label>
                  <input
                    type="text"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                    placeholder="UAE"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    Industry
                  </label>
                  <select
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  >
                    <option value="">Select Industry</option>
                    <option value="tobacco-distribution">Tobacco Distribution</option>
                    <option value="import-export">Import/Export</option>
                    <option value="retail">Retail</option>
                    <option value="wholesale">Wholesale</option>
                    <option value="manufacturing">Manufacturing</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    Customer Type
                  </label>
                  <select
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  >
                    <option value="individual">Individual</option>
                    <option value="business">Business</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                  Address
                </label>
                <textarea
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(51, 65, 85, 0.5)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                  placeholder="Enter full address"
                />
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                  Notes
                </label>
                <textarea
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(51, 65, 85, 0.5)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                  placeholder="Additional notes about the customer"
                />
              </div>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{
                    padding: '12px 24px',
                    background: 'rgba(51, 65, 85, 0.5)',
                    color: 'rgba(6, 182, 212, 0.7)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CRMManagement
