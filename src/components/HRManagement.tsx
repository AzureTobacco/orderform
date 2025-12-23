import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
  Clock,
  User,
  Building,
  Star,
  Target,
  BarChart3,
  Activity,
  CheckCircle,
  AlertTriangle,
  UserCheck
} from 'lucide-react'
import HRDashboard from './hr/HRDashboard'
import AttendanceTracker from './hr/AttendanceTracker'
import type { HREmployee, AttendanceRecord, LeaveRequest, HRStats } from '../types/hr'
import { AnimatedCounter, StatusBadge } from './ModernUI'

interface HRManagementProps {}

const HRManagement: React.FC<HRManagementProps> = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [employees, setEmployees] = useState<HREmployee[]>([])
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedEmployee, setSelectedEmployee] = useState<HREmployee | null>(null)
  const [showCheckInModal, setShowCheckInModal] = useState(false)
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false)

  useEffect(() => {
    loadEmployees()
    loadAttendanceRecords()
    loadLeaveRequests()
  }, [])

  const loadEmployees = () => {
    const sampleEmployees: HREmployee[] = [
      {
        id: 'emp-001',
        employeeId: 'AZT-001',
        name: 'Ahmed Al-Rashid',
        firstName: 'Ahmed',
        lastName: 'Al-Rashid',
        email: 'ahmed@azuretobacco.com',
        department: 'Production',
        position: 'Production Manager',
        hireDate: '2023-01-15',
        status: 'active',
        avatar: '👨‍💼',
        phone: '+971 50 123 4567',
        salary: 8500
      },
      {
        id: 'emp-002',
        employeeId: 'AZT-002',
        name: 'Sarah Johnson',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah@azuretobacco.com',
        department: 'Quality Control',
        position: 'QC Specialist',
        hireDate: '2023-03-20',
        status: 'active',
        avatar: '👩‍🔬',
        phone: '+971 50 234 5678',
        salary: 6500
      },
      {
        id: 'emp-003',
        employeeId: 'AZT-003',
        name: 'Mohammed Hassan',
        firstName: 'Mohammed',
        lastName: 'Hassan',
        email: 'mohammed@azuretobacco.com',
        department: 'Warehouse',
        position: 'Warehouse Supervisor',
        hireDate: '2023-02-10',
        status: 'active',
        avatar: '👨‍🏭',
        phone: '+971 50 345 6789',
        salary: 5500
      },
      {
        id: 'emp-004',
        employeeId: 'AZT-004',
        name: 'Lisa Chen',
        firstName: 'Lisa',
        lastName: 'Chen',
        email: 'lisa@azuretobacco.com',
        department: 'Finance',
        position: 'Financial Analyst',
        hireDate: '2023-04-05',
        status: 'active',
        avatar: '👩‍💼',
        phone: '+971 50 456 7890',
        salary: 7000
      },
      {
        id: 'emp-005',
        employeeId: 'AZT-005',
        name: 'Omar Abdullah',
        firstName: 'Omar',
        lastName: 'Abdullah',
        email: 'omar@azuretobacco.com',
        department: 'Sales',
        position: 'Sales Representative',
        hireDate: '2023-05-12',
        status: 'on-leave',
        avatar: '👨‍💻',
        phone: '+971 50 567 8901',
        salary: 4500
      }
    ]
    setEmployees(sampleEmployees)
  }

  const loadAttendanceRecords = () => {
    const today = new Date()
    const sampleRecords: AttendanceRecord[] = []
    
    // Generate attendance records for the last 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      employees.forEach((emp) => {
        if (emp.status === 'active') {
          const checkInTime = new Date(date)
          checkInTime.setHours(8 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60))
          
          const checkOutTime = new Date(checkInTime)
          checkOutTime.setHours(checkInTime.getHours() + 8 + Math.floor(Math.random() * 2))
          
          const totalHours = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60)
          
          let status: AttendanceRecord['status'] = 'present'
          if (checkInTime.getHours() > 9) status = 'late'
          if (totalHours > 9) status = 'overtime'
          if (Math.random() < 0.1) status = 'absent'
          
          if (status !== 'absent') {
            sampleRecords.push({
              id: `att-${emp.id}-${dateStr}`,
              employeeId: emp.id,
              employeeName: emp.name,
              date: dateStr,
              checkIn: checkInTime.toTimeString().slice(0, 5),
              checkOut: checkOutTime.toTimeString().slice(0, 5),
              totalHours: Math.round(totalHours * 100) / 100,
              status
            })
          } else {
            sampleRecords.push({
              id: `att-${emp.id}-${dateStr}`,
              employeeId: emp.id,
              employeeName: emp.name,
              date: dateStr,
              checkIn: '',
              status: 'absent'
            })
          }
        }
      })
    }
    setAttendanceRecords(sampleRecords)
  }

  const loadLeaveRequests = () => {
    const sampleRequests: LeaveRequest[] = [
      {
        id: 'leave-001',
        employeeId: 'emp-005',
        employeeName: 'Omar Abdullah',
        type: 'annual',
        startDate: '2024-01-20',
        endDate: '2024-01-25',
        days: 5,
        reason: 'Family vacation',
        status: 'approved',
        appliedDate: '2024-01-10',
        approvedBy: 'Ahmed Al-Rashid'
      },
      {
        id: 'leave-002',
        employeeId: 'emp-002',
        employeeName: 'Sarah Johnson',
        type: 'sick',
        startDate: '2024-01-18',
        endDate: '2024-01-18',
        days: 1,
        reason: 'Medical appointment',
        status: 'pending',
        appliedDate: '2024-01-17'
      },
      {
        id: 'leave-003',
        employeeId: 'emp-003',
        employeeName: 'Mohammed Hassan',
        type: 'emergency',
        startDate: '2024-01-22',
        endDate: '2024-01-23',
        days: 2,
        reason: 'Family emergency',
        status: 'approved',
        appliedDate: '2024-01-21',
        approvedBy: 'Ahmed Al-Rashid'
      }
    ]
    setLeaveRequests(sampleRequests)
  }

  // Calculate HR statistics
  const calculateStats = (): HRStats => {
    const totalEmployees = employees.length
    const activeEmployees = employees.filter(emp => emp.status === 'active').length
    const onLeaveEmployees = employees.filter(emp => emp.status === 'on-leave').length
    const todayAttendance = attendanceRecords.filter(record => record.date === selectedDate)
    const presentToday = todayAttendance.filter(record => record.status !== 'absent').length
    const absentToday = todayAttendance.filter(record => record.status === 'absent').length
    const pendingLeaves = leaveRequests.filter(req => req.status === 'pending').length

    return {
      totalEmployees,
      activeEmployees,
      onLeaveEmployees,
      presentToday,
      absentToday,
      pendingLeaves
    }
  }

  const handleCheckIn = (employeeId: string, time: string) => {
    const employee = employees.find(emp => emp.id === employeeId)
    if (!employee) return

    const newRecord: AttendanceRecord = {
      id: `att-${employeeId}-${selectedDate}-${Date.now()}`,
      employeeId,
      employeeName: employee.name,
      date: selectedDate,
      checkIn: time,
      status: 'present'
    }

    setAttendanceRecords(prev => [newRecord, ...prev.filter(r => !(r.employeeId === employeeId && r.date === selectedDate))])
    setShowCheckInModal(false)
    setSelectedEmployee(null)
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'checkin':
        setShowCheckInModal(true)
        break
      case 'attendance':
        setActiveTab('attendance')
        break
      case 'leaves':
        setActiveTab('leaves')
        break
      case 'employees':
        setActiveTab('employees')
        break
    }
  }

  const stats = calculateStats()
  const todayAttendance = attendanceRecords.filter(record => record.date === selectedDate)

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
                HR Management System
              </h1>
              <p style={{
                color: 'rgba(6, 182, 212, 0.7)',
                fontSize: '16px',
                margin: '0'
              }}>
                Employee attendance, leave management, and HR operations
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
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
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'attendance', label: 'Attendance', icon: '🕐' },
            { id: 'leaves', label: 'Leave Management', icon: '📝' },
            { id: 'employees', label: 'Employees', icon: '👥' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: activeTab === tab.id ? 'linear-gradient(135deg, #06b6d4, #0891b2)' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'rgba(6, 182, 212, 0.7)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === tab.id ? '600' : '400',
                transition: 'all 0.3s ease'
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {activeTab === 'dashboard' && (
            <HRDashboard
              stats={stats}
              todayAttendance={todayAttendance}
              employees={employees}
              onQuickAction={handleQuickAction}
            />
          )}
          
          {activeTab === 'attendance' && (
            <AttendanceTracker
              attendanceRecords={attendanceRecords}
              employees={employees}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          )}
          
          {activeTab === 'leaves' && (
            <div style={{
              background: 'rgba(30, 41, 59, 0.3)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: '12px',
              padding: '48px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
              <h3 style={{ color: 'white', marginBottom: '8px' }}>Leave Management</h3>
              <p style={{ color: 'rgba(6, 182, 212, 0.7)' }}>Module coming soon...</p>
            </div>
          )}
          
          {activeTab === 'employees' && (
            <div>
              {/* Employee Management Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                <h2 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                  👥 Employee Management
                </h2>
                <button
                  onClick={() => setShowAddEmployeeModal(true)}
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
                    fontWeight: '600'
                  }}
                >
                  <span>+</span>
                  Add Employee
                </button>
              </div>

              {/* Employee Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '24px'
              }}>
                {employees.map((employee) => (
                  <div
                    key={employee.id}
                    style={{
                      background: 'rgba(30, 41, 59, 0.3)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(6, 182, 212, 0.2)',
                      borderRadius: '12px',
                      padding: '24px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
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
                          justifyContent: 'center',
                          fontSize: '24px'
                        }}>
                          {employee.avatar}
                        </div>
                        <div>
                          <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                            {employee.name}
                          </h3>
                          <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                            {employee.employeeId}
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
                          backgroundColor: employee.status === 'active' ? '#10b981' : employee.status === 'on-leave' ? '#f59e0b' : '#ef4444'
                        }}
                      >
                        {employee.status.toUpperCase()}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>💼</span>
                        <span style={{ fontSize: '14px', color: 'rgba(6, 182, 212, 0.7)' }}>
                          {employee.position}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>🏢</span>
                        <span style={{ fontSize: '14px', color: 'rgba(6, 182, 212, 0.7)' }}>
                          {employee.department}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>📧</span>
                        <span style={{ fontSize: '14px', color: 'rgba(6, 182, 212, 0.7)' }}>
                          {employee.email}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>📞</span>
                        <span style={{ fontSize: '14px', color: 'rgba(6, 182, 212, 0.7)' }}>
                          {employee.phone}
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
                          ${employee.salary.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)' }}>
                          Monthly Salary
                        </div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>
                          {new Date(employee.hireDate).getFullYear()}
                        </div>
                        <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)' }}>
                          Hire Year
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        style={{
                          flex: 1,
                          padding: '8px 16px',
                          background: 'rgba(6, 182, 212, 0.2)',
                          color: '#06b6d4',
                          border: '1px solid rgba(6, 182, 212, 0.3)',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        style={{
                          flex: 1,
                          padding: '8px 16px',
                          background: 'rgba(107, 114, 128, 0.2)',
                          color: 'rgba(6, 182, 212, 0.7)',
                          border: '1px solid rgba(107, 114, 128, 0.3)',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Check-In Modal */}
      {showCheckInModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h3 style={{ marginBottom: '24px', color: 'white', fontSize: '20px' }}>
              🕐 Manual Check-In
            </h3>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: 'white'
              }}>
                Select Employee:
              </label>
              <select
                value={selectedEmployee?.id || ''}
                onChange={(e) => setSelectedEmployee(employees.find(emp => emp.id === e.target.value) || null)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: 'rgba(30, 41, 59, 0.7)',
                  color: 'white',
                  outline: 'none'
                }}
              >
                <option value="">Select employee...</option>
                {employees.filter(emp => emp.status === 'active').map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} - {emp.department}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                onClick={() => {
                  if (selectedEmployee) {
                    const now = new Date()
                    handleCheckIn(selectedEmployee.id, now.toTimeString().slice(0, 5))
                  }
                }}
                disabled={!selectedEmployee}
                style={{
                  flex: 1,
                  background: selectedEmployee ? 'linear-gradient(135deg, #06b6d4, #0891b2)' : 'rgba(107, 114, 128, 0.5)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 20px',
                  cursor: selectedEmployee ? 'pointer' : 'not-allowed',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                ✅ Check In Now
              </button>
              <button
                onClick={() => {
                  setShowCheckInModal(false)
                  setSelectedEmployee(null)
                }}
                style={{
                  flex: 1,
                  background: 'rgba(107, 114, 128, 0.3)',
                  color: 'white',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                  padding: '12px 20px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {showAddEmployeeModal && (
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
                👤 Add New Employee
              </h2>
              <button
                onClick={() => setShowAddEmployeeModal(false)}
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
              setShowAddEmployeeModal(false)
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    First Name *
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
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    Last Name *
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
                    placeholder="Enter last name"
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
                    placeholder="employee@azuretobacco.com"
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
                    placeholder="+971 50 123 4567"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    Department *
                  </label>
                  <select
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
                  >
                    <option value="">Select Department</option>
                    <option value="Production">Production</option>
                    <option value="Quality Control">Quality Control</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Finance">Finance</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">Human Resources</option>
                    <option value="IT">Information Technology</option>
                    <option value="Administration">Administration</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    Position *
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
                    placeholder="Job title/position"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    Hire Date *
                  </label>
                  <input
                    type="date"
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
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    Monthly Salary (AED)
                  </label>
                  <input
                    type="number"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                    placeholder="5000"
                    min="1000"
                    step="100"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                  Employee Avatar
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
                  {['👨‍💼', '👩‍💼', '👨‍🔬', '👩‍🔬', '👨‍🏭', '👩‍🏭', '👨‍💻', '👩‍💻', '👨‍🔧', '👩‍🔧', '👨‍🍳', '👩‍🍳'].map((avatar, index) => (
                    <button
                      key={index}
                      type="button"
                      style={{
                        padding: '12px',
                        background: 'rgba(51, 65, 85, 0.5)',
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '24px',
                        aspectRatio: '1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowAddEmployeeModal(false)}
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
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default HRManagement 