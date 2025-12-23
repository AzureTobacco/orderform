import React, { useState, useEffect } from 'react'
import { Building2, Plus, Edit, Trash2, Search, DollarSign, CreditCard, MapPin, Phone, Mail, TrendingUp, Users } from 'lucide-react'
import { dataService } from '../services/dataService'
import type { Client, Order } from '../services/dataService'

interface ClientManagementProps {}

const ClientManagement: React.FC<ClientManagementProps> = () => {
  const [clients, setClients] = useState<Client[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredClients, setFilteredClients] = useState<Client[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTier, setFilterTier] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)

  const clientTypes = ['distributor', 'retailer', 'manufacturer']
  const currencies = ['AED', 'USD', 'EUR', 'GBP', 'SGD']
  const exchangeRates = {
    AED: 1,
    USD: 0.27,
    EUR: 0.25,
    GBP: 0.21,
    SGD: 0.37
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    filterClients()
  }, [clients, searchTerm, filterTier, filterStatus])

  const loadData = () => {
    setLoading(true)
    try {
      const clientData = dataService.getClients()
      const orderData = dataService.getOrders()
      
      setClients(clientData)
      setOrders(orderData)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterClients = () => {
    let filtered = clients

    if (searchTerm) {
      filtered = filtered.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterTier !== 'all') {
      filtered = filtered.filter(client => client.type === filterTier)
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(client => client.status === filterStatus)
    }

    setFilteredClients(filtered)
  }

  const handleAddClient = (clientData: Omit<Client, 'id'>) => {
    try {
      const newClient = dataService.addClient(clientData)
      setClients(prev => [...prev, newClient])
      setShowAddModal(false)
    } catch (error) {
      console.error('Error adding client:', error)
    }
  }

  const handleEditClient = (clientData: Partial<Client>) => {
    if (!selectedClient) return
    
    try {
      const updatedClient = dataService.updateClient(selectedClient.id, clientData)
      if (updatedClient) {
        setClients(prev => prev.map(client => 
          client.id === selectedClient.id ? updatedClient : client
        ))
        setShowEditModal(false)
        setSelectedClient(null)
      }
    } catch (error) {
      console.error('Error updating client:', error)
    }
  }

  const handleDeleteClient = (id: string) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        const success = dataService.deleteClient(id)
        if (success) {
          setClients(prev => prev.filter(client => client.id !== id))
        }
      } catch (error) {
        console.error('Error deleting client:', error)
      }
    }
  }

  const getClientOrders = (clientId: string) => {
    return orders.filter(order => order.clientId === clientId)
  }

  const getUniqueCountries = () => {
    const countries = [...new Set(clients.map(client => client.country))]
    return countries.sort()
  }

  const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string) => {
    if (fromCurrency === toCurrency) return amount
    const aedAmount = amount / exchangeRates[fromCurrency as keyof typeof exchangeRates]
    return aedAmount * exchangeRates[toCurrency as keyof typeof exchangeRates]
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981'
      case 'inactive': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'distributor': return '#3b82f6'
      case 'retailer': return '#8b5cf6'
      case 'manufacturer': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  const getTotalClients = () => clients.length
  const getActiveClients = () => clients.filter(client => client.status === 'active').length
  const getTotalRevenue = () => {
    return clients.reduce((total, client) => total + client.totalValue, 0)
  }
  const getAverageOrderValue = () => {
    const totalOrders = clients.reduce((total, client) => total + client.totalOrders, 0)
    const totalValue = getTotalRevenue()
    return totalOrders > 0 ? totalValue / totalOrders : 0
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        color: 'var(--text-secondary)'
      }}>
        Loading client data...
      </div>
    )
  }

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
              <Building2 style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 4px 0'
              }}>
                Client Management
              </h1>
              <p style={{
                color: 'rgba(6, 182, 212, 0.7)',
                fontSize: '16px',
                margin: '0'
              }}>
                Customer relationship management with multi-currency support
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
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
            <Plus style={{ width: '20px', height: '20px' }} />
            Add Client
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
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
                  Total Clients
                </h3>
                <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                  All registered clients
                </p>
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
              {getTotalClients()}
            </div>
            <div style={{ fontSize: '14px', color: '#10b981', marginTop: '8px' }}>
              Active client base
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
                <TrendingUp style={{ width: '24px', height: '24px', color: 'white' }} />
              </div>
              <div>
                <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                  Active Clients
                </h3>
                <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                  Currently active
                </p>
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
              {getActiveClients()}
            </div>
            <div style={{ fontSize: '14px', color: '#10b981', marginTop: '8px' }}>
              Engaged partnerships
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
                <DollarSign style={{ width: '24px', height: '24px', color: 'white' }} />
              </div>
              <div>
                <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                  Total Revenue (AED)
                </h3>
                <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                  All time revenue
                </p>
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
              {getTotalRevenue().toLocaleString()}
            </div>
            <div style={{ fontSize: '14px', color: '#10b981', marginTop: '8px' }}>
              Revenue generated
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
                <CreditCard style={{ width: '24px', height: '24px', color: 'white' }} />
              </div>
              <div>
                <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                  Avg Order Value (AED)
                </h3>
                <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                  Per client average
                </p>
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
              {getAverageOrderValue().toLocaleString()}
            </div>
            <div style={{ fontSize: '14px', color: '#10b981', marginTop: '8px' }}>
              Order value metric
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.3)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            <div style={{ position: 'relative' }}>
              <Search style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(6, 182, 212, 0.7)',
                width: '20px',
                height: '20px'
              }} />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 44px',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              style={{
                padding: '12px',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '8px',
                background: 'rgba(15, 23, 42, 0.8)',
                color: 'white',
                fontSize: '14px'
              }}
            >
              <option value="all">All Types</option>
              {clientTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: '12px',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '8px',
                background: 'rgba(15, 23, 42, 0.8)',
                color: 'white',
                fontSize: '14px'
              }}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Clients Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: '24px'
        }}>
          {filteredClients.map((client) => {
            const clientOrders = getClientOrders(client.id)
            const localCurrencyValue = convertCurrency(client.totalValue, 'AED', client.currency)
            const usdValue = convertCurrency(client.totalValue, 'AED', 'USD')
            
            return (
              <div key={client.id} style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '20px',
                position: 'relative'
              }}>
                {/* Status Badge */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  background: `${getStatusColor(client.status)}20`,
                  color: getStatusColor(client.status),
                  textTransform: 'uppercase'
                }}>
                  {client.status}
                </div>

                {/* Client Header */}
                <div style={{ marginBottom: '16px', paddingRight: '80px' }}>
                  <h3 style={{ 
                    color: 'var(--text-primary)', 
                    margin: '0 0 8px 0',
                    fontSize: '18px',
                    fontWeight: '600'
                  }}>
                    {client.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{
                      background: `${getTypeColor(client.type)}20`,
                      color: getTypeColor(client.type),
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {client.type}
                    </span>
                    <span style={{
                      background: 'rgba(77, 208, 225, 0.1)',
                      color: 'var(--azure-primary)',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {client.currency}
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <MapPin size={14} style={{ color: 'var(--text-secondary)' }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                      {client.country}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <Mail size={14} style={{ color: 'var(--text-secondary)' }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                      {client.email}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={14} style={{ color: 'var(--text-secondary)' }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                      {client.phone}
                    </span>
                  </div>
                </div>

                {/* Financial Info */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  <div>
                    <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0', fontSize: '12px' }}>
                      Credit Limit
                    </p>
                    <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '14px', fontWeight: '500' }}>
                      {formatCurrency(client.creditLimit, client.currency)}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0', fontSize: '12px' }}>
                      Payment Terms
                    </p>
                    <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '14px', fontWeight: '500' }}>
                      {client.paymentTerms} days
                    </p>
                  </div>
                </div>

                {/* Multi-Currency Values */}
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ color: 'var(--text-secondary)', margin: '0 0 8px 0', fontSize: '12px' }}>
                    Total Value
                  </p>
                  <div style={{ 
                    background: 'rgba(77, 208, 225, 0.05)',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(77, 208, 225, 0.1)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>Local ({client.currency}):</span>
                      <span style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500' }}>
                        {formatCurrency(localCurrencyValue, client.currency)}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>AED:</span>
                      <span style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500' }}>
                        {formatCurrency(client.totalValue, 'AED')}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>USD:</span>
                      <span style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500' }}>
                        {formatCurrency(usdValue, 'USD')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Statistics */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  <div>
                    <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0', fontSize: '12px' }}>
                      Total Orders
                    </p>
                    <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '14px', fontWeight: '500' }}>
                      {client.totalOrders}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0', fontSize: '12px' }}>
                      Recent Orders
                    </p>
                    <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '14px', fontWeight: '500' }}>
                      {clientOrders.length}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  justifyContent: 'flex-end'
                }}>
                  <button
                    onClick={() => {
                      setSelectedClient(client)
                      setShowEditModal(true)
                    }}
                    style={{
                      background: 'rgba(77, 208, 225, 0.1)',
                      border: '1px solid var(--azure-primary)',
                      color: 'var(--azure-primary)',
                      padding: '8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteClient(client.id)}
                    style={{
                      background: 'rgba(248, 113, 113, 0.1)',
                      border: '1px solid #f87171',
                      color: '#f87171',
                      padding: '8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {filteredClients.length === 0 && (
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center',
            color: 'var(--text-secondary)'
          }}>
            No clients found matching your criteria.
          </div>
        )}

        {/* Add Client Modal */}
        {showAddModal && (
          <ClientModal
            title="Add New Client"
            onSave={handleAddClient}
            onClose={() => setShowAddModal(false)}
          />
        )}

        {/* Edit Client Modal */}
        {showEditModal && selectedClient && (
          <ClientModal
            title="Edit Client"
            client={selectedClient}
            onSave={handleEditClient}
            onClose={() => {
              setShowEditModal(false)
              setSelectedClient(null)
            }}
          />
        )}
      </div>
    </div>
  )
}

// Client Modal Component
interface ClientModalProps {
  title: string
  client?: Client
  onSave: (data: any) => void
  onClose: () => void
}

const ClientModal: React.FC<ClientModalProps> = ({ title, client, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: client?.name || '',
    type: client?.type || 'distributor',
    country: client?.country || '',
    currency: client?.currency || 'AED',
    contactPerson: client?.contactPerson || '',
    email: client?.email || '',
    phone: client?.phone || '',
    address: client?.address || '',
    creditLimit: client?.creditLimit || 0,
    paymentTerms: client?.paymentTerms || 30,
    vatNumber: client?.vatNumber || '',
    status: client?.status || 'active',
    totalOrders: client?.totalOrders || 0,
    totalValue: client?.totalValue || 0
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const countries = [
    'UAE', 'Saudi Arabia', 'Germany', 'United Kingdom', 'United States',
    'France', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Singapore',
    'Japan', 'Australia', 'Canada', 'Brazil', 'India', 'China'
  ]

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        border: '1px solid rgba(6, 182, 212, 0.3)',
        borderRadius: '16px',
        padding: '32px',
        width: '90%',
        maxWidth: '700px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(6, 182, 212, 0.1)',
        backdropFilter: 'blur(16px)'
      }}>
        <h2 style={{ 
          color: '#ffffff', 
          marginBottom: '24px',
          fontSize: '24px',
          fontWeight: '600',
          textAlign: 'center'
        }}>{title}</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ 
                  color: '#e2e8f0', 
                  display: 'block', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#06b6d4'
                    e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  color: '#e2e8f0', 
                  display: 'block', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Client Type *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                >
                  <option value="distributor">Distributor</option>
                  <option value="retailer">Retailer</option>
                  <option value="manufacturer">Manufacturer</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ 
                  color: '#e2e8f0', 
                  display: 'block', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Country *
                </label>
                <select
                  required
                  value={formData.country}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                >
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ 
                  color: '#e2e8f0', 
                  display: 'block', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Currency *
                </label>
                <select
                  required
                  value={formData.currency}
                  onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                >
                  <option value="AED">AED - UAE Dirham</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="SGD">SGD - Singapore Dollar</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ 
                  color: '#e2e8f0', 
                  display: 'block', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactPerson}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#06b6d4'
                    e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  color: '#e2e8f0', 
                  display: 'block', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#06b6d4'
                    e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ 
                  color: '#e2e8f0', 
                  display: 'block', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#06b6d4'
                    e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  color: '#e2e8f0', 
                  display: 'block', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  VAT Number
                </label>
                <input
                  type="text"
                  value={formData.vatNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, vatNumber: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#06b6d4'
                    e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ 
                color: '#e2e8f0', 
                display: 'block', 
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Address *
              </label>
              <textarea
                required
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  color: '#ffffff',
                  fontSize: '14px',
                  resize: 'vertical',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#06b6d4'
                  e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ 
                  color: '#e2e8f0', 
                  display: 'block', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Credit Limit *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.creditLimit}
                  onChange={(e) => setFormData(prev => ({ ...prev, creditLimit: Number(e.target.value) }))}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#06b6d4'
                    e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  color: '#e2e8f0', 
                  display: 'block', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Payment Terms (days) *
                </label>
                <select
                  required
                  value={formData.paymentTerms}
                  onChange={(e) => setFormData(prev => ({ ...prev, paymentTerms: Number(e.target.value) }))}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                >
                  <option value={15}>15 days</option>
                  <option value={30}>30 days</option>
                  <option value={45}>45 days</option>
                  <option value={60}>60 days</option>
                </select>
              </div>

              <div>
                <label style={{ 
                  color: '#e2e8f0', 
                  display: 'block', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Status *
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            justifyContent: 'flex-end', 
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(6, 182, 212, 0.2)'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '12px 24px',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '8px',
                background: 'transparent',
                color: '#e2e8f0',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement
                target.style.background = 'rgba(6, 182, 212, 0.1)'
                target.style.borderColor = '#06b6d4'
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement
                target.style.background = 'transparent'
                target.style.borderColor = 'rgba(6, 182, 212, 0.3)'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement
                target.style.transform = 'translateY(-1px)'
                target.style.boxShadow = '0 6px 16px rgba(6, 182, 212, 0.4)'
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement
                target.style.transform = 'translateY(0)'
                target.style.boxShadow = '0 4px 12px rgba(6, 182, 212, 0.3)'
              }}
            >
              {client ? 'Update' : 'Add'} Client
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ClientManagement 