import { dataService } from './dataService'

// Automation Rule Types
export interface AutomationRule {
  id: string
  name: string
  description: string
  trigger: AutomationTrigger
  conditions: AutomationCondition[]
  actions: AutomationAction[]
  isActive: boolean
  createdAt: string
  lastExecuted?: string
  executionCount: number
}

export interface AutomationTrigger {
  type: 'inventory_low' | 'order_placed' | 'quality_fail' | 'schedule' | 'manual'
  config: Record<string, any>
}

export interface AutomationCondition {
  field: string
  operator: 'equals' | 'greater_than' | 'less_than' | 'contains' | 'not_equals'
  value: any
}

export interface AutomationAction {
  type: 'send_email' | 'create_order' | 'update_inventory' | 'send_notification' | 'webhook' | 'generate_report'
  config: Record<string, any>
}

export interface IntegrationConfig {
  id: string
  name: string
  type: 'email' | 'sms' | 'webhook' | 'api' | 'database'
  endpoint?: string
  apiKey?: string
  credentials?: Record<string, string>
  isActive: boolean
}

class AutomationService {
  private rules: AutomationRule[] = []
  private integrations: IntegrationConfig[] = []

  constructor() {
    this.initializeDefaultRules()
    this.initializeDefaultIntegrations()
    this.startScheduler()
  }

  // Initialize default automation rules
  private initializeDefaultRules() {
    this.rules = [
      {
        id: 'auto-reorder-1',
        name: 'Auto Reorder Low Stock Items',
        description: 'Automatically create purchase orders when inventory falls below minimum threshold',
        trigger: {
          type: 'inventory_low',
          config: { checkInterval: 3600000 } // Check every hour
        },
        conditions: [
          { field: 'currentStock', operator: 'less_than', value: 'minStock' },
          { field: 'type', operator: 'equals', value: 'tobacco' }
        ],
        actions: [
          {
            type: 'create_order',
            config: {
              orderType: 'purchase',
              quantity: 'maxStock - currentStock',
              priority: 'medium'
            }
          },
          {
            type: 'send_notification',
            config: {
              message: 'Auto reorder created for {materialName}',
              recipients: ['inventory@azure.com']
            }
          }
        ],
        isActive: true,
        createdAt: new Date().toISOString(),
        executionCount: 0
      },
      {
        id: 'quality-alert-1',
        name: 'Quality Control Alert',
        description: 'Send alerts when quality tests fail',
        trigger: {
          type: 'quality_fail',
          config: {}
        },
        conditions: [
          { field: 'result', operator: 'equals', value: 'fail' }
        ],
        actions: [
          {
            type: 'send_email',
            config: {
              to: ['quality@azure.com', 'production@azure.com'],
              subject: 'Quality Test Failed - Batch {batchId}',
              template: 'quality_alert'
            }
          },
          {
            type: 'update_inventory',
            config: {
              action: 'quarantine',
              reason: 'quality_failure'
            }
          }
        ],
        isActive: true,
        createdAt: new Date().toISOString(),
        executionCount: 0
      },
      {
        id: 'order-confirmation-1',
        name: 'Order Confirmation Email',
        description: 'Send confirmation email when order is placed',
        trigger: {
          type: 'order_placed',
          config: {}
        },
        conditions: [],
        actions: [
          {
            type: 'send_email',
            config: {
              to: ['{clientEmail}'],
              subject: 'Order Confirmation - {orderNumber}',
              template: 'order_confirmation'
            }
          }
        ],
        isActive: true,
        createdAt: new Date().toISOString(),
        executionCount: 0
      },
      {
        id: 'daily-report-1',
        name: 'Daily Production Report',
        description: 'Generate and send daily production reports',
        trigger: {
          type: 'schedule',
          config: { cron: '0 18 * * *' } // 6 PM daily
        },
        conditions: [],
        actions: [
          {
            type: 'generate_report',
            config: {
              reportType: 'production_summary',
              period: 'daily'
            }
          },
          {
            type: 'send_email',
            config: {
              to: ['management@azure.com'],
              subject: 'Daily Production Report - {date}',
              template: 'daily_report'
            }
          }
        ],
        isActive: true,
        createdAt: new Date().toISOString(),
        executionCount: 0
      }
    ]
  }

  // Initialize default integrations
  private initializeDefaultIntegrations() {
    this.integrations = [
      {
        id: 'email-smtp',
        name: 'SMTP Email Service',
        type: 'email',
        endpoint: 'smtp.azure.com',
        credentials: {
          username: 'noreply@azure.com',
          password: '***'
        },
        isActive: true
      },
      {
        id: 'sms-twilio',
        name: 'Twilio SMS',
        type: 'sms',
        endpoint: 'https://api.twilio.com/2010-04-01',
        apiKey: 'twilio_api_key',
        isActive: false
      },
      {
        id: 'webhook-slack',
        name: 'Slack Notifications',
        type: 'webhook',
        endpoint: 'https://hooks.slack.com/services/...',
        isActive: true
      },
      {
        id: 'api-accounting',
        name: 'QuickBooks Integration',
        type: 'api',
        endpoint: 'https://sandbox-quickbooks.api.intuit.com',
        apiKey: 'qb_api_key',
        isActive: false
      }
    ]
  }

  // Start the automation scheduler
  private startScheduler() {
    setInterval(() => {
      this.checkScheduledRules()
      this.checkInventoryRules()
    }, 60000) // Check every minute
  }

  // Check scheduled automation rules
  private async checkScheduledRules() {
    const scheduledRules = this.rules.filter(rule => 
      rule.isActive && rule.trigger.type === 'schedule'
    )

    for (const rule of scheduledRules) {
      if (this.shouldExecuteScheduledRule(rule)) {
        await this.executeRule(rule, {})
      }
    }
  }

  // Check inventory-based rules
  private async checkInventoryRules() {
    const inventoryRules = this.rules.filter(rule => 
      rule.isActive && rule.trigger.type === 'inventory_low'
    )

    if (inventoryRules.length === 0) return

    const materials = dataService.getRawMaterials()
    const lowStockItems = materials.filter(material => 
      material.currentStock <= material.minStock
    )

    for (const item of lowStockItems) {
      for (const rule of inventoryRules) {
        if (this.evaluateConditions(rule.conditions, item)) {
          await this.executeRule(rule, { material: item })
        }
      }
    }
  }

  // Execute automation rule
  private async executeRule(rule: AutomationRule, context: Record<string, any>) {
    try {
      console.log(`Executing automation rule: ${rule.name}`)
      
      for (const action of rule.actions) {
        await this.executeAction(action, context)
      }

      // Update execution count and last executed time
      rule.executionCount++
      rule.lastExecuted = new Date().toISOString()

      console.log(`Successfully executed rule: ${rule.name}`)
    } catch (error) {
      console.error(`Failed to execute rule ${rule.name}:`, error)
    }
  }

  // Execute individual action
  private async executeAction(action: AutomationAction, context: Record<string, any>) {
    switch (action.type) {
      case 'send_email':
        await this.sendEmail(action.config, context)
        break
      case 'send_notification':
        await this.sendNotification(action.config, context)
        break
      case 'create_order':
        await this.createOrder(action.config, context)
        break
      case 'update_inventory':
        await this.updateInventory(action.config, context)
        break
      case 'webhook':
        await this.callWebhook(action.config, context)
        break
      case 'generate_report':
        await this.generateReport(action.config, context)
        break
      default:
        console.warn(`Unknown action type: ${action.type}`)
    }
  }

  // Send email action
  private async sendEmail(config: any, context: Record<string, any>) {
    const emailIntegration = this.integrations.find(i => i.type === 'email' && i.isActive)
    if (!emailIntegration) {
      throw new Error('No active email integration found')
    }

    const emailData = {
      to: this.interpolateString(config.to, context),
      subject: this.interpolateString(config.subject, context),
      body: this.interpolateString(config.body || this.getEmailTemplate(config.template), context)
    }

    // Simulate email sending
    console.log('Sending email:', emailData)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  // Send notification action
  private async sendNotification(config: any, context: Record<string, any>) {
    const message = this.interpolateString(config.message, context)
    console.log('Sending notification:', message)
    
    // In a real implementation, this would integrate with your notification system
    // For now, we'll just log it
  }

  // Create order action
  private async createOrder(config: any, context: Record<string, any>) {
    if (config.orderType === 'purchase' && context.material) {
      const material = context.material
      const quantity = material.maxStock - material.currentStock

      const order = {
        materialId: material.id,
        quantity,
        priority: config.priority || 'medium',
        type: 'auto-generated',
        createdAt: new Date().toISOString()
      }

      console.log('Creating auto purchase order:', order)
      // In a real implementation, this would create an actual order
    }
  }

  // Update inventory action
  private async updateInventory(config: any, context: Record<string, any>) {
    console.log('Updating inventory:', config, context)
    // Implementation would update inventory status
  }

  // Call webhook action
  private async callWebhook(config: any, context: Record<string, any>) {
    const webhookIntegration = this.integrations.find(i => i.type === 'webhook' && i.isActive)
    if (!webhookIntegration) {
      throw new Error('No active webhook integration found')
    }

    const payload = {
      ...config.payload,
      context,
      timestamp: new Date().toISOString()
    }

    console.log('Calling webhook:', webhookIntegration.endpoint, payload)
    // Simulate webhook call
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  // Generate report action
  private async generateReport(config: any, context: Record<string, any>) {
    console.log('Generating report:', config.reportType, config.period)
    
    // Simulate report generation
    const reportData = {
      type: config.reportType,
      period: config.period,
      generatedAt: new Date().toISOString(),
      data: this.getReportData(config.reportType, config.period)
    }

    console.log('Report generated:', reportData)
    return reportData
  }

  // Helper methods
  private shouldExecuteScheduledRule(rule: AutomationRule): boolean {
    // Simple cron-like check (in real implementation, use a proper cron library)
    const cron = rule.trigger.config.cron
    if (cron === '0 18 * * *') { // Daily at 6 PM
      const now = new Date()
      return now.getHours() === 18 && now.getMinutes() === 0
    }
    return false
  }

  private evaluateConditions(conditions: AutomationCondition[], data: any): boolean {
    return conditions.every(condition => {
      const fieldValue = data[condition.field]
      const conditionValue = condition.value === 'minStock' ? data.minStock : condition.value

      switch (condition.operator) {
        case 'equals':
          return fieldValue === conditionValue
        case 'not_equals':
          return fieldValue !== conditionValue
        case 'greater_than':
          return fieldValue > conditionValue
        case 'less_than':
          return fieldValue < conditionValue
        case 'contains':
          return String(fieldValue).includes(String(conditionValue))
        default:
          return false
      }
    })
  }

  private interpolateString(template: string | string[], context: Record<string, any>): string | string[] {
    if (Array.isArray(template)) {
      return template.map(t => this.interpolateString(t, context) as string)
    }

    return template.replace(/\{(\w+)\}/g, (match, key) => {
      return context[key] || match
    })
  }

  private getEmailTemplate(templateName: string): string {
    const templates: Record<string, string> = {
      quality_alert: `
        Quality Test Alert
        
        A quality test has failed for batch {batchId}.
        
        Test Details:
        - Test Type: {testType}
        - Result: {result}
        - Date: {testDate}
        
        Please investigate immediately.
      `,
      order_confirmation: `
        Order Confirmation
        
        Thank you for your order!
        
        Order Details:
        - Order Number: {orderNumber}
        - Total Amount: {totalAmount}
        - Expected Delivery: {expectedDelivery}
        
        We'll keep you updated on your order status.
      `,
      daily_report: `
        Daily Production Report - {date}
        
        Production Summary:
        - Batches Completed: {batchesCompleted}
        - Quality Score: {qualityScore}%
        - Efficiency: {efficiency}%
        
        Detailed report attached.
      `
    }

    return templates[templateName] || 'Template not found'
  }

  private getReportData(reportType: string, period: string): any {
    // Mock report data
    switch (reportType) {
      case 'production_summary':
        return {
          batchesCompleted: 12,
          qualityScore: 98.5,
          efficiency: 94.2,
          totalOutput: 2400
        }
      default:
        return {}
    }
  }

  // Public API methods
  public async triggerRule(ruleId: string, context: Record<string, any> = {}) {
    const rule = this.rules.find(r => r.id === ruleId)
    if (!rule) {
      throw new Error(`Rule not found: ${ruleId}`)
    }

    if (!rule.isActive) {
      throw new Error(`Rule is not active: ${ruleId}`)
    }

    await this.executeRule(rule, context)
  }

  public async triggerByEvent(eventType: string, data: any) {
    const relevantRules = this.rules.filter(rule => 
      rule.isActive && rule.trigger.type === eventType
    )

    for (const rule of relevantRules) {
      if (this.evaluateConditions(rule.conditions, data)) {
        await this.executeRule(rule, data)
      }
    }
  }

  public getRules(): AutomationRule[] {
    return [...this.rules]
  }

  public getIntegrations(): IntegrationConfig[] {
    return [...this.integrations]
  }

  public addRule(rule: Omit<AutomationRule, 'id' | 'createdAt' | 'executionCount'>): AutomationRule {
    const newRule: AutomationRule = {
      ...rule,
      id: `rule-${Date.now()}`,
      createdAt: new Date().toISOString(),
      executionCount: 0
    }

    this.rules.push(newRule)
    return newRule
  }

  public updateRule(ruleId: string, updates: Partial<AutomationRule>): AutomationRule | null {
    const ruleIndex = this.rules.findIndex(r => r.id === ruleId)
    if (ruleIndex === -1) return null

    this.rules[ruleIndex] = { ...this.rules[ruleIndex], ...updates }
    return this.rules[ruleIndex]
  }

  public deleteRule(ruleId: string): boolean {
    const initialLength = this.rules.length
    this.rules = this.rules.filter(r => r.id !== ruleId)
    return this.rules.length < initialLength
  }

  public addIntegration(integration: Omit<IntegrationConfig, 'id'>): IntegrationConfig {
    const newIntegration: IntegrationConfig = {
      ...integration,
      id: `integration-${Date.now()}`
    }

    this.integrations.push(newIntegration)
    return newIntegration
  }

  public updateIntegration(integrationId: string, updates: Partial<IntegrationConfig>): IntegrationConfig | null {
    const integrationIndex = this.integrations.findIndex(i => i.id === integrationId)
    if (integrationIndex === -1) return null

    this.integrations[integrationIndex] = { ...this.integrations[integrationIndex], ...updates }
    return this.integrations[integrationIndex]
  }

  // Test integration
  public async testIntegration(integrationId: string): Promise<boolean> {
    const integration = this.integrations.find(i => i.id === integrationId)
    if (!integration) return false

    try {
      switch (integration.type) {
        case 'email':
          console.log('Testing email integration...')
          await new Promise(resolve => setTimeout(resolve, 1000))
          return true
        case 'webhook':
          console.log('Testing webhook integration...')
          await new Promise(resolve => setTimeout(resolve, 500))
          return true
        default:
          return true
      }
    } catch (error) {
      console.error('Integration test failed:', error)
      return false
    }
  }
}

// Export singleton instance
export const automationService = new AutomationService()

// Event triggers for integration with other parts of the system
export const triggerAutomation = {
  orderPlaced: (orderData: any) => automationService.triggerByEvent('order_placed', orderData),
  qualityTestFailed: (testData: any) => automationService.triggerByEvent('quality_fail', testData),
  inventoryLow: (materialData: any) => automationService.triggerByEvent('inventory_low', materialData)
} 