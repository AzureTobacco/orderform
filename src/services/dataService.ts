// Data Models
export interface Employee {
  id: string
  employeeId: string
  firstName: string
  lastName: string
  name: string // Keep for backward compatibility
  position: string
  department: string
  email: string
  phone: string
  hireDate: Date | string
  salary: number
  status: 'active' | 'inactive' | 'terminated'
  avatar?: string
  
  // Personal Details
  dateOfBirth: Date
  nationality: string
  address: string
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }
  
  // Documents
  passportNumber: string
  passportExpiry: Date
  emiratesId: string
  emiratesIdExpiry: Date
  visaNumber?: string
  visaExpiry?: Date
  contractDocument?: string
  
  // Work Details
  workLocation: string
  reportingManager: string
  workSchedule: string
  probationPeriod?: number
  
  // Leave Balance
  annualLeave: number
  sickLeave: number
  personalLeave: number
}

export interface TimeEntry {
  id: string
  employeeId: string
  date: Date
  clockIn: string
  clockOut?: string
  breakTime: number
  totalHours: number
  overtime: number
  status: 'present' | 'absent' | 'late' | 'half-day'
  notes?: string
}

export interface LeaveRequest {
  id: string
  employeeId: string
  employeeName: string
  leaveType: 'annual' | 'sick' | 'personal' | 'maternity' | 'emergency'
  startDate: Date
  endDate: Date
  days: number
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  approvedBy?: string
  approvalDate?: Date
  comments?: string
}

export interface RawMaterial {
  id: string
  name: string
  type: 'tobacco-leaf' | 'tobacco-blend' | 'chemical' | 'flavoring' | 'packaging' | 'accessories'
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  unit: string
  pricePerUnit: number
  supplierId: string
  location: string
  lastUpdated: string
  expiryDate?: string
  qualityGrade?: string
  origin?: string
  nicotineContent?: number
  moistureContent?: number
}

export interface Supplier {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
  materials: string[]
  rating: number
  status: 'active' | 'inactive'
}

export interface ProductionBatch {
  id: string
  batchNumber: string
  productType: string
  quantity: number
  unit: string
  stage: 'preparation' | 'blending' | 'flavoring' | 'curing' | 'drying' | 'quality-check' | 'packaging' | 'completed'
  operatorId: string
  startDate: string
  expectedEndDate: string
  actualEndDate?: string
  priority: 'high' | 'medium' | 'low'
  qualityScore?: number
  materials: Array<{ materialId: string; quantity: number }>
  notes?: string
}

export interface Client {
  id: string
  name: string
  type: 'distributor' | 'retailer' | 'manufacturer'
  country: string
  currency: string
  contactPerson: string
  email: string
  phone: string
  address: string
  creditLimit: number
  paymentTerms: number
  vatNumber?: string
  status: 'active' | 'inactive'
  totalOrders: number
  totalValue: number
}

export interface Order {
  id: string
  orderNumber: string
  clientId: string
  items: Array<{ productId: string; quantity: number; price: number }>
  totalAmount: number
  currency: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  orderDate: string
  expectedDelivery: string
  actualDelivery?: string
  priority: 'high' | 'medium' | 'low'
}

export interface QualityTest {
  id: string
  batchId: string
  testType: 'moisture' | 'nicotine' | 'ph' | 'contamination' | 'visual' | 'aroma' | 'burn-rate' | 'ash-content' | 'tar-content' | 'carbon-monoxide'
  result: 'pass' | 'fail' | 'pending' | 'conditional'
  value?: number
  unit?: string
  testDate: string
  technicianId: string
  notes?: string
  complianceStatus: 'compliant' | 'non-compliant' | 'pending-review'
  regulatoryStandard?: string
  correctiveActions?: string[]
  retestRequired?: boolean
  retestDate?: string
}

// Data Service Class
class DataService {
  private storageKey = 'erp-data'
  
  // Initialize with sample data if none exists
  private initializeData() {
    const existingData = localStorage.getItem(this.storageKey)
    if (!existingData) {
      const initialData = {
        employees: this.generateSampleEmployees(),
        rawMaterials: this.generateSampleMaterials(),
        suppliers: this.generateSampleSuppliers(),
        productionBatches: this.generateSampleBatches(),
        clients: this.generateSampleClients(),
        orders: this.generateSampleOrders(),
        qualityTests: this.generateSampleQualityTests()
      }
      localStorage.setItem(this.storageKey, JSON.stringify(initialData))
    }
  }

  // Generic CRUD operations
  private getData(): any {
    this.initializeData()
    return JSON.parse(localStorage.getItem(this.storageKey) || '{}')
  }

  private saveData(data: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data))
  }

  // Employee operations
  getEmployees(): Employee[] {
    return this.getData().employees || []
  }

  addEmployee(employee: Omit<Employee, 'id'>): Employee {
    const data = this.getData()
    const newEmployee: Employee = {
      ...employee,
      id: this.generateId()
    }
    data.employees = [...(data.employees || []), newEmployee]
    this.saveData(data)
    return newEmployee
  }

  updateEmployee(id: string, updates: Partial<Employee>): Employee | null {
    const data = this.getData()
    const index = data.employees?.findIndex((emp: Employee) => emp.id === id)
    if (index !== -1) {
      data.employees[index] = { ...data.employees[index], ...updates }
      this.saveData(data)
      return data.employees[index]
    }
    return null
  }

  deleteEmployee(id: string): boolean {
    const data = this.getData()
    const initialLength = data.employees?.length || 0
    data.employees = data.employees?.filter((emp: Employee) => emp.id !== id) || []
    this.saveData(data)
    return data.employees.length < initialLength
  }

  // Raw Materials operations
  getRawMaterials(): RawMaterial[] {
    return this.getData().rawMaterials || []
  }

  addRawMaterial(material: Omit<RawMaterial, 'id'>): RawMaterial {
    const data = this.getData()
    const newMaterial: RawMaterial = {
      ...material,
      id: this.generateId(),
      lastUpdated: new Date().toISOString()
    }
    data.rawMaterials = [...(data.rawMaterials || []), newMaterial]
    this.saveData(data)
    return newMaterial
  }

  updateRawMaterial(id: string, updates: Partial<RawMaterial>): RawMaterial | null {
    const data = this.getData()
    const index = data.rawMaterials?.findIndex((mat: RawMaterial) => mat.id === id)
    if (index !== -1) {
      data.rawMaterials[index] = { 
        ...data.rawMaterials[index], 
        ...updates,
        lastUpdated: new Date().toISOString()
      }
      this.saveData(data)
      return data.rawMaterials[index]
    }
    return null
  }

  deleteRawMaterial(id: string): boolean {
    const data = this.getData()
    const initialLength = data.rawMaterials?.length || 0
    data.rawMaterials = data.rawMaterials?.filter((mat: RawMaterial) => mat.id !== id) || []
    this.saveData(data)
    return data.rawMaterials.length < initialLength
  }

  // Production Batch operations
  getProductionBatches(): ProductionBatch[] {
    return this.getData().productionBatches || []
  }

  addProductionBatch(batch: Omit<ProductionBatch, 'id'>): ProductionBatch {
    const data = this.getData()
    const newBatch: ProductionBatch = {
      ...batch,
      id: this.generateId()
    }
    data.productionBatches = [...(data.productionBatches || []), newBatch]
    this.saveData(data)
    return newBatch
  }

  updateProductionBatch(id: string, updates: Partial<ProductionBatch>): ProductionBatch | null {
    const data = this.getData()
    const index = data.productionBatches?.findIndex((batch: ProductionBatch) => batch.id === id)
    if (index !== -1) {
      data.productionBatches[index] = { ...data.productionBatches[index], ...updates }
      this.saveData(data)
      return data.productionBatches[index]
    }
    return null
  }

  // Client operations
  getClients(): Client[] {
    return this.getData().clients || []
  }

  addClient(client: Omit<Client, 'id'>): Client {
    const data = this.getData()
    const newClient: Client = {
      ...client,
      id: this.generateId()
    }
    data.clients = [...(data.clients || []), newClient]
    this.saveData(data)
    return newClient
  }

  updateClient(id: string, updates: Partial<Client>): Client | null {
    const data = this.getData()
    const clients = data.clients || []
    const index = clients.findIndex((client: Client) => client.id === id)
    
    if (index !== -1) {
      clients[index] = { ...clients[index], ...updates }
      this.saveData(data)
      return clients[index]
    }
    return null
  }

  deleteClient(id: string): boolean {
    const data = this.getData()
    const clients = data.clients || []
    const filteredClients = clients.filter((client: Client) => client.id !== id)
    
    if (filteredClients.length !== clients.length) {
      data.clients = filteredClients
      this.saveData(data)
      return true
    }
    return false
  }

  // Order operations
  getOrders(): Order[] {
    const data = this.getData()
    return data.orders || this.generateSampleOrders()
  }

  addOrder(order: Omit<Order, 'id'>): Order {
    const data = this.getData()
    const newOrder: Order = {
      ...order,
      id: this.generateId()
    }
    
    data.orders = [...(data.orders || []), newOrder]
    this.saveData(data)
    return newOrder
  }

  updateOrder(id: string, updates: Partial<Order>): Order | null {
    const data = this.getData()
    const orders = data.orders || []
    const index = orders.findIndex((order: Order) => order.id === id)
    
    if (index !== -1) {
      orders[index] = { ...orders[index], ...updates }
      this.saveData(data)
      return orders[index]
    }
    return null
  }

  // Quality Test operations
  getQualityTests(): QualityTest[] {
    const data = this.getData()
    return data.qualityTests || this.generateSampleQualityTests()
  }

  addQualityTest(test: Omit<QualityTest, 'id'>): QualityTest {
    const data = this.getData()
    const newTest: QualityTest = {
      ...test,
      id: this.generateId()
    }
    
    data.qualityTests = [...(data.qualityTests || []), newTest]
    this.saveData(data)
    return newTest
  }

  updateQualityTest(id: string, updates: Partial<QualityTest>): QualityTest | null {
    const data = this.getData()
    const tests = data.qualityTests || []
    const index = tests.findIndex((test: QualityTest) => test.id === id)
    
    if (index !== -1) {
      tests[index] = { ...tests[index], ...updates }
      this.saveData(data)
      return tests[index]
    }
    return null
  }

  deleteQualityTest(id: string): boolean {
    const data = this.getData()
    const tests = data.qualityTests || []
    const filteredTests = tests.filter((test: QualityTest) => test.id !== id)
    
    if (filteredTests.length !== tests.length) {
      data.qualityTests = filteredTests
      this.saveData(data)
      return true
    }
    return false
  }

  // Utility methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Sample data generators
  private generateSampleEmployees(): Employee[] {
    return [
      {
        id: '1',
        employeeId: 'EMP001',
        firstName: 'Ahmed',
        lastName: 'Al-Rashid',
        name: 'Ahmed Al-Rashid',
        position: 'Production Manager',
        department: 'Production',
        email: 'ahmed@azure-tobacco.com',
        phone: '+971-50-123-4567',
        hireDate: '2022-01-15',
        salary: 8500,
        status: 'active',
        dateOfBirth: new Date('1985-03-15'),
        nationality: 'UAE',
        address: 'Dubai, UAE',
        emergencyContact: {
          name: 'Fatima Al-Rashid',
          relationship: 'Spouse',
          phone: '+971-50-123-4568'
        },
        passportNumber: 'A1234567',
        passportExpiry: new Date('2028-03-15'),
        emiratesId: '784-1985-1234567-1',
        emiratesIdExpiry: new Date('2025-03-15'),
        visaNumber: 'UAE123456789',
        visaExpiry: new Date('2026-01-15'),
        contractDocument: 'contract_ahmed.pdf',
        workLocation: 'Dubai Factory',
        reportingManager: 'CEO',
        workSchedule: '8:00 AM - 5:00 PM',
        probationPeriod: 6,
        annualLeave: 25,
        sickLeave: 15,
        personalLeave: 5
      },
      {
        id: '2',
        employeeId: 'EMP002',
        firstName: 'Fatima',
        lastName: 'Hassan',
        name: 'Fatima Hassan',
        position: 'Quality Control Specialist',
        department: 'Quality',
        email: 'fatima@azure-tobacco.com',
        phone: '+971-50-234-5678',
        hireDate: '2022-03-20',
        salary: 6500,
        status: 'active',
        dateOfBirth: new Date('1990-07-22'),
        nationality: 'UAE',
        address: 'Abu Dhabi, UAE',
        emergencyContact: {
          name: 'Omar Hassan',
          relationship: 'Brother',
          phone: '+971-50-234-5679'
        },
        passportNumber: 'B2345678',
        passportExpiry: new Date('2027-07-22'),
        emiratesId: '784-1990-2345678-2',
        emiratesIdExpiry: new Date('2025-07-22'),
        visaNumber: 'UAE234567890',
        visaExpiry: new Date('2025-12-20'),
        contractDocument: 'contract_fatima.pdf',
        workLocation: 'Dubai Factory',
        reportingManager: 'Ahmed Al-Rashid',
        workSchedule: '8:00 AM - 5:00 PM',
        probationPeriod: 3,
        annualLeave: 22,
        sickLeave: 12,
        personalLeave: 3
      },
      {
        id: '3',
        employeeId: 'EMP003',
        firstName: 'Omar',
        lastName: 'Khalil',
        name: 'Omar Khalil',
        position: 'Warehouse Supervisor',
        department: 'Warehouse',
        email: 'omar@azure-tobacco.com',
        phone: '+971-50-345-6789',
        hireDate: '2021-11-10',
        salary: 5500,
        status: 'active',
        dateOfBirth: new Date('1988-12-05'),
        nationality: 'Egypt',
        address: 'Sharjah, UAE',
        emergencyContact: {
          name: 'Layla Khalil',
          relationship: 'Wife',
          phone: '+971-50-345-6790'
        },
        passportNumber: 'C3456789',
        passportExpiry: new Date('2026-12-05'),
        emiratesId: '784-1988-3456789-3',
        emiratesIdExpiry: new Date('2024-12-05'),
        visaNumber: 'UAE345678901',
        visaExpiry: new Date('2025-11-10'),
        contractDocument: 'contract_omar.pdf',
        workLocation: 'Dubai Warehouse',
        reportingManager: 'Ahmed Al-Rashid',
        workSchedule: '7:00 AM - 4:00 PM',
        probationPeriod: 6,
        annualLeave: 20,
        sickLeave: 10,
        personalLeave: 2
      }
    ]
  }

  private generateSampleMaterials(): RawMaterial[] {
    return [
      {
        id: '1',
        name: 'Virginia Tobacco Leaves',
        type: 'tobacco-leaf',
        category: 'Premium Grade A',
        currentStock: 2500,
        minStock: 500,
        maxStock: 5000,
        unit: 'kg',
        pricePerUnit: 12.50,
        supplierId: '1',
        location: 'Warehouse A-1',
        lastUpdated: new Date().toISOString(),
        qualityGrade: 'A+',
        origin: 'Virginia, USA',
        nicotineContent: 0.5,
        moistureContent: 12.0
      },
      {
        id: '2',
        name: 'Burley Tobacco',
        type: 'tobacco-leaf',
        category: 'Standard Grade B',
        currentStock: 1800,
        minStock: 400,
        maxStock: 3000,
        unit: 'kg',
        pricePerUnit: 9.75,
        supplierId: '1',
        location: 'Warehouse A-2',
        lastUpdated: new Date().toISOString(),
        qualityGrade: 'B+',
        origin: 'Kentucky, USA',
        nicotineContent: 0.3,
        moistureContent: 15.0
      },
      {
        id: '3',
        name: 'Glycerin (USP Grade)',
        type: 'chemical',
        category: 'Humectant',
        currentStock: 500,
        minStock: 100,
        maxStock: 1000,
        unit: 'L',
        pricePerUnit: 4.25,
        supplierId: '2',
        location: 'Chemical Storage C-1',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Propylene Glycol (USP Grade)',
        type: 'chemical',
        category: 'Humectant',
        currentStock: 300,
        minStock: 50,
        maxStock: 800,
        unit: 'L',
        pricePerUnit: 3.50,
        supplierId: '2',
        location: 'Chemical Storage C-2',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '5',
        name: 'Nicotine (USP Grade)',
        type: 'chemical',
        category: 'Flavoring',
        currentStock: 100,
        minStock: 20,
        maxStock: 500,
        unit: 'g',
        pricePerUnit: 25.00,
        supplierId: '3',
        location: 'Flavoring Storage F-1',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '6',
        name: 'Flavor Enhancer (USP Grade)',
        type: 'flavoring',
        category: 'Flavoring',
        currentStock: 200,
        minStock: 50,
        maxStock: 1000,
        unit: 'g',
        pricePerUnit: 10.00,
        supplierId: '3',
        location: 'Flavoring Storage F-2',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '7',
        name: 'Packaging Material (BOPP Film)',
        type: 'packaging',
        category: 'Packaging',
        currentStock: 5000,
        minStock: 1000,
        maxStock: 10000,
        unit: 'm',
        pricePerUnit: 0.50,
        supplierId: '4',
        location: 'Packaging Storage P-1',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '8',
        name: 'Packaging Material (Aluminum Foil)',
        type: 'packaging',
        category: 'Packaging',
        currentStock: 3000,
        minStock: 500,
        maxStock: 8000,
        unit: 'm',
        pricePerUnit: 0.75,
        supplierId: '4',
        location: 'Packaging Storage P-2',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '9',
        name: 'Accessory (Bowl)',
        type: 'accessories',
        category: 'Accessories',
        currentStock: 1000,
        minStock: 200,
        maxStock: 5000,
        unit: 'pcs',
        pricePerUnit: 5.00,
        supplierId: '5',
        location: 'Accessory Storage A-1',
        lastUpdated: new Date().toISOString()
      },
      {
        id: '10',
        name: 'Accessory (Filter)',
        type: 'accessories',
        category: 'Accessories',
        currentStock: 2000,
        minStock: 500,
        maxStock: 10000,
        unit: 'pcs',
        pricePerUnit: 1.50,
        supplierId: '5',
        location: 'Accessory Storage A-2',
        lastUpdated: new Date().toISOString()
      }
    ]
  }

  private generateSampleSuppliers(): Supplier[] {
    return [
      {
        id: '1',
        name: 'Premium Tobacco Suppliers LLC',
        contactPerson: 'John Smith',
        email: 'john@premiumtobacco.com',
        phone: '+1-555-123-4567',
        address: 'Virginia, USA',
        materials: ['Virginia Tobacco Leaves', 'Burley Tobacco'],
        rating: 4.8,
        status: 'active'
      },
      {
        id: '2',
        name: 'Chemical Solutions DMCC',
        contactPerson: 'Sarah Johnson',
        email: 'sarah@chemsolutions.ae',
        phone: '+971-4-123-4567',
        address: 'Dubai, UAE',
        materials: ['Glycerin', 'Propylene Glycol', 'Nicotine'],
        rating: 4.6,
        status: 'active'
      },
      {
        id: '3',
        name: 'Flavoring Solutions DMCC',
        contactPerson: 'Michael Brown',
        email: 'michael@flavoring.com',
        phone: '+971-4-789-0123',
        address: 'Dubai, UAE',
        materials: ['Nicotine', 'Flavor Enhancer'],
        rating: 4.9,
        status: 'active'
      },
      {
        id: '4',
        name: 'Packaging Solutions DMCC',
        contactPerson: 'Emma Davis',
        email: 'emma@packaging.com',
        phone: '+971-4-234-5678',
        address: 'Dubai, UAE',
        materials: ['BOPP Film', 'Aluminum Foil'],
        rating: 4.7,
        status: 'active'
      },
      {
        id: '5',
        name: 'Accessory Solutions DMCC',
        contactPerson: 'David Wilson',
        email: 'david@accessories.com',
        phone: '+971-4-890-1234',
        address: 'Dubai, UAE',
        materials: ['Bowl', 'Filter'],
        rating: 4.5,
        status: 'active'
      }
    ]
  }

  private generateSampleBatches(): ProductionBatch[] {
    return [
      {
        id: '1',
        batchNumber: 'B001',
        productType: 'Premium Blend',
        quantity: 500,
        unit: 'kg',
        stage: 'blending',
        operatorId: '1',
        startDate: '2024-05-30',
        expectedEndDate: '2024-06-05',
        priority: 'high',
        materials: [
          { materialId: '1', quantity: 300 },
          { materialId: '2', quantity: 200 }
        ]
      }
    ]
  }

  private generateSampleClients(): Client[] {
    return [
      {
        id: '1',
        name: 'Global Tobacco Distributors',
        type: 'distributor',
        country: 'Germany',
        currency: 'EUR',
        contactPerson: 'Hans Mueller',
        email: 'hans@globaltobacco.de',
        phone: '+49-30-123-4567',
        address: 'Berlin, Germany',
        creditLimit: 50000,
        paymentTerms: 30,
        status: 'active',
        totalOrders: 15,
        totalValue: 125000
      }
    ]
  }

  private generateSampleOrders(): Order[] {
    return [
      {
        id: '1',
        orderNumber: 'ORD-2024-001',
        clientId: '1',
        items: [
          { productId: '1', quantity: 100, price: 25.00 }
        ],
        totalAmount: 2500,
        currency: 'EUR',
        status: 'processing',
        orderDate: '2024-05-30',
        expectedDelivery: '2024-06-15',
        priority: 'medium'
      }
    ]
  }

  private generateSampleQualityTests(): QualityTest[] {
    return [
      {
        id: '1',
        batchId: '1',
        testType: 'moisture',
        result: 'pass',
        value: 12.5,
        unit: '%',
        testDate: '2024-05-30',
        technicianId: '2',
        complianceStatus: 'compliant',
        regulatoryStandard: 'ISO 6488:2004',
        notes: 'Within acceptable range'
      },
      {
        id: '2',
        batchId: '1',
        testType: 'nicotine',
        result: 'pass',
        value: 0.75,
        unit: 'mg/g',
        testDate: '2024-05-30',
        technicianId: '2',
        complianceStatus: 'compliant',
        regulatoryStandard: 'ISO 10315:2013',
        notes: 'Optimal nicotine content'
      },
      {
        id: '3',
        batchId: '1',
        testType: 'ph',
        result: 'pass',
        value: 6.1,
        unit: 'pH',
        testDate: '2024-05-30',
        technicianId: '2',
        complianceStatus: 'compliant',
        notes: 'Optimal pH level'
      }
    ]
  }

  // Analytics and reporting
  getInventoryValue(): number {
    const materials = this.getRawMaterials()
    return materials.reduce((total, material) => 
      total + (material.currentStock * material.pricePerUnit), 0
    )
  }

  getLowStockItems(): RawMaterial[] {
    const materials = this.getRawMaterials()
    return materials.filter(material => material.currentStock <= material.minStock)
  }

  getActiveProductionBatches(): ProductionBatch[] {
    const batches = this.getProductionBatches()
    return batches.filter(batch => batch.stage !== 'completed')
  }

  getMonthlyRevenue(): number {
    const orders = this.getOrders()
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    
    return orders
      .filter(order => {
        const orderDate = new Date(order.orderDate)
        return orderDate.getMonth() === currentMonth && 
               orderDate.getFullYear() === currentYear &&
               order.status !== 'cancelled'
      })
      .reduce((total, order) => total + order.totalAmount, 0)
  }

  // Search functionality
  searchAll(query: string): any[] {
    const results: any[] = []
    const lowerQuery = query.toLowerCase()

    // Search employees
    this.getEmployees().forEach(emp => {
      if (emp.name.toLowerCase().includes(lowerQuery) || 
          emp.position.toLowerCase().includes(lowerQuery)) {
        results.push({ type: 'employee', data: emp })
      }
    })

    // Search materials
    this.getRawMaterials().forEach(mat => {
      if (mat.name.toLowerCase().includes(lowerQuery) || 
          mat.category.toLowerCase().includes(lowerQuery)) {
        results.push({ type: 'material', data: mat })
      }
    })

    // Search clients
    this.getClients().forEach(client => {
      if (client.name.toLowerCase().includes(lowerQuery) || 
          client.country.toLowerCase().includes(lowerQuery)) {
        results.push({ type: 'client', data: client })
      }
    })

    return results
  }

  getSuppliers(): Supplier[] {
    const data = this.getData()
    return data.suppliers || this.generateSampleSuppliers()
  }

  addSupplier(supplier: Omit<Supplier, 'id'>): Supplier {
    const data = this.getData()
    const newSupplier: Supplier = {
      ...supplier,
      id: this.generateId()
    }
    
    data.suppliers = [...(data.suppliers || []), newSupplier]
    this.saveData(data)
    return newSupplier
  }

  updateSupplier(id: string, updates: Partial<Supplier>): Supplier | null {
    const data = this.getData()
    const suppliers = data.suppliers || []
    const index = suppliers.findIndex((supplier: Supplier) => supplier.id === id)
    
    if (index !== -1) {
      suppliers[index] = { ...suppliers[index], ...updates }
      this.saveData(data)
      return suppliers[index]
    }
    return null
  }

  deleteSupplier(id: string): boolean {
    const data = this.getData()
    const suppliers = data.suppliers || []
    const filteredSuppliers = suppliers.filter((supplier: Supplier) => supplier.id !== id)
    
    if (filteredSuppliers.length !== suppliers.length) {
      data.suppliers = filteredSuppliers
      this.saveData(data)
      return true
    }
    return false
  }
}

// Export singleton instance
export const dataService = new DataService()
export default dataService 