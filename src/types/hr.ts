// HR-specific types that don't conflict with the main Employee interface
export interface HREmployee {
  id: string
  employeeId: string
  name: string
  firstName?: string
  lastName?: string
  email: string
  department: string
  position: string
  phone: string
  hireDate: string | Date
  salary: number
  status: 'active' | 'inactive' | 'on-leave' | 'terminated'
  avatar?: string
}

export interface AttendanceRecord {
  id: string
  employeeId: string
  employeeName: string
  date: string
  checkIn: string
  checkOut?: string
  totalHours?: number
  status: 'present' | 'absent' | 'late' | 'half-day' | 'overtime'
  notes?: string
}

export interface LeaveRequest {
  id: string
  employeeId: string
  employeeName: string
  type: 'annual' | 'sick' | 'emergency' | 'maternity' | 'unpaid'
  startDate: string
  endDate: string
  days: number
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  appliedDate: string
  approvedBy?: string
}

export interface HRStats {
  totalEmployees: number
  activeEmployees: number
  onLeaveEmployees: number
  presentToday: number
  absentToday: number
  pendingLeaves: number
} 