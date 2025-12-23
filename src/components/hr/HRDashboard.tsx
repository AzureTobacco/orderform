import React from 'react'
import { Users } from 'lucide-react'
import type { HRStats, HREmployee, AttendanceRecord } from '../../types/hr'

interface HRDashboardProps {
  stats: HRStats
  todayAttendance: AttendanceRecord[]
  employees: HREmployee[]
  onQuickAction: (action: string) => void
}

const HRDashboard: React.FC<HRDashboardProps> = ({ 
  stats, 
  todayAttendance, 
  employees,
  onQuickAction 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'present': case 'approved': return '#10b981'
      case 'late': case 'pending': return '#f59e0b'
      case 'absent': case 'rejected': case 'inactive': return '#ef4444'
      case 'on-leave': case 'half-day': return '#8b5cf6'
      case 'overtime': return '#06b6d4'
      default: return '#6b7280'
    }
  }

  return (
    <div>
      {/* Key Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Total Employees Card */}
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
                Total Employees
              </h3>
              <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                Active workforce
              </p>
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
            {stats.totalEmployees}
          </div>
          <div style={{ fontSize: '14px', color: '#10b981', marginTop: '8px' }}>
            All departments
          </div>
        </div>

        {/* Present Today Card */}
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
              <span style={{ fontSize: '24px' }}>✅</span>
            </div>
            <div>
              <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                Present Today
              </h3>
              <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                Currently at work
              </p>
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
            {stats.presentToday}
          </div>
          <div style={{ fontSize: '14px', color: '#10b981', marginTop: '8px' }}>
            Attendance rate: {stats.totalEmployees > 0 ? Math.round((stats.presentToday / stats.totalEmployees) * 100) : 0}%
          </div>
        </div>

        {/* Absent Today Card */}
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
              background: stats.absentToday > 0 ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '24px' }}>{stats.absentToday > 0 ? '❌' : '✅'}</span>
            </div>
            <div>
              <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                Absent Today
              </h3>
              <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                Not present
              </p>
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
            {stats.absentToday}
          </div>
          <div style={{ fontSize: '14px', color: stats.absentToday > 0 ? '#ef4444' : '#10b981', marginTop: '8px' }}>
            {stats.absentToday === 0 ? 'Perfect attendance!' : 'Needs attention'}
          </div>
        </div>

        {/* Pending Leaves Card */}
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
              background: stats.pendingLeaves > 0 ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '24px' }}>📝</span>
            </div>
            <div>
              <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                Pending Leaves
              </h3>
              <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                Awaiting approval
              </p>
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
            {stats.pendingLeaves}
          </div>
          <div style={{ fontSize: '14px', color: stats.pendingLeaves > 0 ? '#f59e0b' : '#10b981', marginTop: '8px' }}>
            {stats.pendingLeaves === 0 ? 'All processed' : 'Requires review'}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.3)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(6, 182, 212, 0.2)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '32px'
      }}>
        <h3 style={{ marginBottom: '24px', color: 'white', fontSize: '18px', fontWeight: '600' }}>
          ⚡ Quick Actions
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <button
            onClick={() => onQuickAction('checkin')}
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '16px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'transform 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <span>🕐</span> Manual Check-In
          </button>
          
          <button
            onClick={() => onQuickAction('attendance')}
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '16px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'transform 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <span>📊</span> View Attendance
          </button>

          <button
            onClick={() => onQuickAction('leaves')}
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '16px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'transform 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <span>📝</span> Manage Leaves
          </button>

          <button
            onClick={() => onQuickAction('employees')}
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '16px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'transform 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <span>👥</span> Manage Employees
          </button>
        </div>
      </div>

      {/* Today's Attendance Summary */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.3)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(6, 182, 212, 0.2)',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <h3 style={{ marginBottom: '24px', color: 'white', fontSize: '18px', fontWeight: '600' }}>
          📅 Today's Attendance Summary
        </h3>
        <div style={{ display: 'grid', gap: '12px' }}>
          {todayAttendance.map(record => {
            const employee = employees.find(emp => emp.id === record.employeeId)
            return (
              <div key={record.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                background: 'rgba(51, 65, 85, 0.3)',
                borderRadius: '8px',
                border: '1px solid rgba(6, 182, 212, 0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '24px' }}>
                    {employee?.avatar || '👤'}
                  </span>
                  <div>
                    <div style={{ fontWeight: '600', color: 'white' }}>{record.employeeName}</div>
                    <div style={{ fontSize: '14px', color: 'rgba(6, 182, 212, 0.7)' }}>
                      {employee?.department}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {record.status !== 'absent' && (
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '14px', color: 'white' }}>
                        {record.checkIn} - {record.checkOut || 'Working'}
                      </div>
                      {record.totalHours && (
                        <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)' }}>
                          {record.totalHours}h
                        </div>
                      )}
                    </div>
                  )}
                  <span style={{
                    background: getStatusColor(record.status),
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {record.status.toUpperCase()}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HRDashboard 