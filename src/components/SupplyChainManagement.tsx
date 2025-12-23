import React from "react"
import { Truck, Package, Clock, DollarSign, TrendingUp, Users, BarChart3, RefreshCw } from 'lucide-react'

const SupplyChainManagement: React.FC = () => {
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
              <Truck style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 4px 0'
              }}>
                Supply Chain Management
              </h1>
              <p style={{
                color: 'rgba(6, 182, 212, 0.7)',
                fontSize: '16px',
                margin: '0'
              }}>
                Manage suppliers, shipments, and logistics operations
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

        {/* Metrics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
                  Active Suppliers
                </h3>
                <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                  Verified partners
                </p>
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
              47
            </div>
            <div style={{ fontSize: '14px', color: '#10b981', marginTop: '8px' }}>
              +5% from last month
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
                <Package style={{ width: '24px', height: '24px', color: 'white' }} />
              </div>
              <div>
                <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                  Shipments in Transit
                </h3>
                <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                  Active deliveries
                </p>
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
              89
            </div>
            <div style={{ fontSize: '14px', color: '#10b981', marginTop: '8px' }}>
              +12% from last week
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
                <Clock style={{ width: '24px', height: '24px', color: 'white' }} />
              </div>
              <div>
                <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                  Avg Delivery Time
                </h3>
                <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                  Days average
                </p>
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
              2.3
            </div>
            <div style={{ fontSize: '14px', color: '#10b981', marginTop: '8px' }}>
              -0.5 days improved
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
                <DollarSign style={{ width: '24px', height: '24px', color: 'white' }} />
              </div>
              <div>
                <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                  Cost Savings
                </h3>
                <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                  This quarter
                </p>
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
              $125K
            </div>
            <div style={{ fontSize: '14px', color: '#10b981', marginTop: '8px' }}>
              +18% from last quarter
            </div>
          </div>
        </div>

        {/* Additional Content Sections */}
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
              Supply Chain Performance
            </h3>
            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BarChart3 style={{ width: '64px', height: '64px', color: 'rgba(6, 182, 212, 0.5)' }} />
              <span style={{ marginLeft: '16px', color: 'rgba(6, 182, 212, 0.7)' }}>
                Performance charts would go here
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
              Recent Shipments
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { id: 'SH001', destination: 'Dubai', status: 'In Transit', eta: '2 hours' },
                { id: 'SH002', destination: 'Riyadh', status: 'Delivered', eta: 'Completed' },
                { id: 'SH003', destination: 'Abu Dhabi', status: 'Processing', eta: '4 hours' }
              ].map((shipment) => (
                <div key={shipment.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  background: 'rgba(51, 65, 85, 0.3)',
                  borderRadius: '8px',
                  border: '1px solid rgba(6, 182, 212, 0.1)'
                }}>
                  <div>
                    <div style={{ color: 'white', fontWeight: '500' }}>{shipment.id}</div>
                    <div style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px' }}>{shipment.destination}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      color: shipment.status === 'Delivered' ? '#10b981' : 
                             shipment.status === 'In Transit' ? '#f59e0b' : '#06b6d4',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      {shipment.status}
                    </div>
                    <div style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '12px' }}>{shipment.eta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupplyChainManagement
