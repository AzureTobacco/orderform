import React from 'react'
import type { AttendanceRecord, HREmployee } from '../../types/hr'

interface AttendanceTrackerProps {
  attendanceRecords: AttendanceRecord[]
  employees: HREmployee[]
  selectedDate: string
  onDateChange: (date: string) => void
}

const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({
  attendanceRecords,
  employees,
  selectedDate,
  onDateChange
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': case 'active': return '#10b981'
      case 'late': case 'pending': return '#f59e0b'
      case 'absent': case 'inactive': return '#ef4444'
      case 'half-day': case 'on-leave': return '#8b5cf6'
      case 'overtime': return '#06b6d4'
      default: return '#6b7280'
    }
  }

  const filteredRecords = attendanceRecords.filter(record => record.date === selectedDate)

  return (
    <div>
      {/* Date Selector */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.3)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(6, 182, 212, 0.2)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '32px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <label style={{ fontWeight: '600', color: 'white', fontSize: '16px' }}>
            📅 Select Date:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '2px solid rgba(6, 182, 212, 0.3)',
              borderRadius: '8px',
              fontSize: '14px',
              background: 'rgba(30, 41, 59, 0.5)',
              color: 'white',
              outline: 'none'
            }}
          />
          <button
            onClick={() => onDateChange(new Date().toISOString().split('T')[0])}
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 20px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            📅 Today
          </button>
        </div>
      </div>

      {/* Attendance Summary */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.3)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(6, 182, 212, 0.2)',
        borderRadius: '12px',
        marginBottom: '24px',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
          color: 'white',
          padding: '20px 24px',
          fontSize: '18px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span>📊</span>
          Attendance Records - {new Date(selectedDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>

        {/* Statistics Bar */}
        <div style={{
          padding: '16px 24px',
          background: 'rgba(51, 65, 85, 0.3)',
          borderBottom: '1px solid rgba(6, 182, 212, 0.1)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
              {filteredRecords.filter(r => r.status === 'present' || r.status === 'overtime').length}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)' }}>Present</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>
              {filteredRecords.filter(r => r.status === 'late').length}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)' }}>Late</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444' }}>
              {filteredRecords.filter(r => r.status === 'absent').length}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)' }}>Absent</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#06b6d4' }}>
              {filteredRecords.filter(r => r.status === 'overtime').length}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)' }}>Overtime</div>
          </div>
        </div>
        
        {/* Attendance Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(51, 65, 85, 0.3)' }}>
                <th style={{ 
                  padding: '16px 20px', 
                  textAlign: 'left', 
                  fontWeight: '600', 
                  color: 'white',
                  fontSize: '14px'
                }}>
                  Employee
                </th>
                <th style={{ 
                  padding: '16px 20px', 
                  textAlign: 'left', 
                  fontWeight: '600', 
                  color: 'white',
                  fontSize: '14px'
                }}>
                  Department
                </th>
                <th style={{ 
                  padding: '16px 20px', 
                  textAlign: 'left', 
                  fontWeight: '600', 
                  color: 'white',
                  fontSize: '14px'
                }}>
                  Check In
                </th>
                <th style={{ 
                  padding: '16px 20px', 
                  textAlign: 'left', 
                  fontWeight: '600', 
                  color: 'white',
                  fontSize: '14px'
                }}>
                  Check Out
                </th>
                <th style={{ 
                  padding: '16px 20px', 
                  textAlign: 'left', 
                  fontWeight: '600', 
                  color: 'white',
                  fontSize: '14px'
                }}>
                  Total Hours
                </th>
                <th style={{ 
                  padding: '16px 20px', 
                  textAlign: 'left', 
                  fontWeight: '600', 
                  color: 'white',
                  fontSize: '14px'
                }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{
                    padding: '48px 20px',
                    textAlign: 'center',
                    color: 'rgba(6, 182, 212, 0.7)',
                    fontSize: '16px'
                  }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
                    No attendance records found for this date
                  </td>
                </tr>
              ) : (
                filteredRecords.map((record, index) => {
                  const employee = employees.find(emp => emp.id === record.employeeId)
                  return (
                    <tr key={record.id} style={{
                      borderBottom: '1px solid rgba(6, 182, 212, 0.1)',
                      background: index % 2 === 0 ? 'rgba(30, 41, 59, 0.2)' : 'rgba(51, 65, 85, 0.2)',
                      transition: 'background-color 0.2s ease'
                    }}>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '20px' }}>
                            {employee?.avatar || '👤'}
                          </span>
                          <div>
                            <div style={{ 
                              fontWeight: '600', 
                              color: 'white',
                              fontSize: '14px'
                            }}>
                              {record.employeeName}
                            </div>
                            <div style={{ 
                              fontSize: '12px', 
                              color: 'rgba(6, 182, 212, 0.7)' 
                            }}>
                              ID: {employee?.employeeId || record.employeeId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ 
                        padding: '16px 20px', 
                        color: 'rgba(6, 182, 212, 0.9)',
                        fontSize: '14px'
                      }}>
                        {employee?.department || '-'}
                      </td>
                      <td style={{ 
                        padding: '16px 20px', 
                        color: 'white',
                        fontSize: '14px',
                        fontFamily: 'monospace'
                      }}>
                        {record.checkIn || '-'}
                      </td>
                      <td style={{ 
                        padding: '16px 20px', 
                        color: 'white',
                        fontSize: '14px',
                        fontFamily: 'monospace'
                      }}>
                        {record.checkOut || (record.status !== 'absent' ? 'Working...' : '-')}
                      </td>
                      <td style={{ 
                        padding: '16px 20px', 
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}>
                        {record.totalHours ? `${record.totalHours}h` : '-'}
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          background: getStatusColor(record.status),
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AttendanceTracker 