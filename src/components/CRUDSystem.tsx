import React, { useState, useRef } from 'react'

interface FileUpload {
  id: string
  name: string
  type: string
  size: number
  uploadDate: string
  url: string
}

interface CRUDItem {
  id: string
  title: string
  description: string
  category: string
  status: string
  createdDate: string
  updatedDate: string
  files: FileUpload[]
  metadata: Record<string, any>
}

const CRUDSystem: React.FC = () => {
  const [items, setItems] = useState<CRUDItem[]>([
    {
      id: '1',
      title: 'Premium Tobacco Batch #001',
      description: 'High-quality Virginia tobacco batch for premium cigars',
      category: 'Inventory',
      status: 'Active',
      createdDate: '2024-01-15',
      updatedDate: '2024-01-20',
      files: [],
      metadata: { weight: '500kg', quality: 'A+' }
    },
    {
      id: '2',
      title: 'Client Order #2024-001',
      description: 'Large order from Premium Tobacco Distributors',
      category: 'Orders',
      status: 'Processing',
      createdDate: '2024-01-18',
      updatedDate: '2024-01-22',
      files: [],
      metadata: { amount: '$15,000', client: 'Premium Distributors' }
    }
  ])

  const [selectedItem, setSelectedItem] = useState<CRUDItem | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<Partial<CRUDItem>>({
    title: '',
    description: '',
    category: 'Inventory',
    status: 'Active',
    files: [],
    metadata: {}
  })

  const categories = ['All', 'Inventory', 'Orders', 'Production', 'Quality', 'Financial', 'HR', 'Clients']
  const statuses = ['Active', 'Inactive', 'Processing', 'Completed', 'Pending', 'Cancelled']

  const handleFileUpload = async (files: FileList) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
    const maxSize = 10 * 1024 * 1024 // 10MB

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      
      if (!allowedTypes.includes(file.type)) {
        alert(`File ${file.name} is not supported. Please upload PDF, JPG, JPEG, or PNG files.`)
        continue
      }

      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`)
        continue
      }

      // Simulate file upload with progress
      const fileId = Date.now().toString() + i
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }))

      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100))
        setUploadProgress(prev => ({ ...prev, [fileId]: progress }))
      }

      // Create file URL (in real app, this would be from server)
      const fileUrl = URL.createObjectURL(file)
      
      const newFile: FileUpload = {
        id: fileId,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date().toISOString().split('T')[0],
        url: fileUrl
      }

      setFormData(prev => ({
        ...prev,
        files: [...(prev.files || []), newFile]
      }))

      setUploadProgress(prev => {
        const newProgress = { ...prev }
        delete newProgress[fileId]
        return newProgress
      })
    }
  }

  const handleCreate = () => {
    if (!formData.title || !formData.description) {
      alert('Please fill in all required fields')
      return
    }

    const newItem: CRUDItem = {
      id: Date.now().toString(),
      title: formData.title!,
      description: formData.description!,
      category: formData.category!,
      status: formData.status!,
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
      files: formData.files || [],
      metadata: formData.metadata || {}
    }

    setItems(prev => [newItem, ...prev])
    setIsCreating(false)
    setFormData({
      title: '',
      description: '',
      category: 'Inventory',
      status: 'Active',
      files: [],
      metadata: {}
    })
  }

  const handleUpdate = () => {
    if (!selectedItem || !formData.title || !formData.description) {
      alert('Please fill in all required fields')
      return
    }

    setItems(prev => prev.map(item => 
      item.id === selectedItem.id 
        ? {
            ...item,
            ...formData,
            updatedDate: new Date().toISOString().split('T')[0]
          } as CRUDItem
        : item
    ))

    setIsEditing(false)
    setSelectedItem(null)
    setFormData({
      title: '',
      description: '',
      category: 'Inventory',
      status: 'Active',
      files: [],
      metadata: {}
    })
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(prev => prev.filter(item => item.id !== id))
      if (selectedItem?.id === id) {
        setSelectedItem(null)
      }
    }
  }

  const handleEdit = (item: CRUDItem) => {
    setSelectedItem(item)
    setFormData(item)
    setIsEditing(true)
    setIsCreating(false)
  }

  const handleView = (item: CRUDItem) => {
    setSelectedItem(item)
    setIsEditing(false)
    setIsCreating(false)
  }

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const containerStyle = {
    padding: '2rem',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    borderRadius: '20px',
    minHeight: '600px'
  }

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    padding: '1rem 0',
    borderBottom: '2px solid #dee2e6'
  }

  const buttonStyle = (variant: 'primary' | 'secondary' | 'danger' = 'primary') => ({
    padding: '0.75rem 1.5rem',
    borderRadius: '10px',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: variant === 'primary' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' :
                variant === 'danger' ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)' :
                'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
    color: '#ffffff',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  })

  const cardStyle = {
    background: '#ffffff',
    borderRadius: '15px',
    padding: '1.5rem',
    marginBottom: '1rem',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    border: '1px solid #e9ecef',
    transition: 'all 0.3s ease'
  }

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '8px',
    border: '2px solid #e9ecef',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
    marginBottom: '1rem'
  }

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer'
  }

  const fileUploadStyle = {
    border: '2px dashed #667eea',
    borderRadius: '10px',
    padding: '2rem',
    textAlign: 'center' as const,
    background: 'rgba(102, 126, 234, 0.05)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h2 style={{ margin: 0, color: '#2c3e50', fontSize: '2rem' }}>📋 CRUD Management System</h2>
          <p style={{ margin: '0.5rem 0 0 0', color: '#6c757d' }}>Create, Read, Update, Delete with File Management</p>
        </div>
        <button
          style={buttonStyle('primary')}
          onClick={() => {
            setIsCreating(true)
            setIsEditing(false)
            setSelectedItem(null)
            setFormData({
              title: '',
              description: '',
              category: 'Inventory',
              status: 'Active',
              files: [],
              metadata: {}
            })
          }}
        >
          ➕ Create New Item
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Left Panel - List View */}
        <div>
          {/* Search and Filter */}
          <div style={{ marginBottom: '1.5rem' }}>
            <input
              type="text"
              placeholder="🔍 Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={inputStyle}
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={selectStyle}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Items List */}
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {filteredItems.map(item => (
              <div
                key={item.id}
                style={{
                  ...cardStyle,
                  cursor: 'pointer',
                  border: selectedItem?.id === item.id ? '2px solid #667eea' : '1px solid #e9ecef'
                }}
                onClick={() => handleView(item)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>{item.title}</h4>
                    <p style={{ margin: '0 0 0.5rem 0', color: '#6c757d', fontSize: '0.9rem' }}>
                      {item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#6c757d' }}>
                      <span>📁 {item.category}</span>
                      <span>🔄 {item.status}</span>
                      <span>📅 {item.updatedDate}</span>
                      <span>📎 {item.files.length} files</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      style={{ ...buttonStyle('secondary'), padding: '0.5rem', fontSize: '0.8rem' }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEdit(item)
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      style={{ ...buttonStyle('danger'), padding: '0.5rem', fontSize: '0.8rem' }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(item.id)
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Detail/Form View */}
        <div>
          {(isCreating || isEditing) ? (
            <div style={cardStyle}>
              <h3 style={{ margin: '0 0 1.5rem 0', color: '#2c3e50' }}>
                {isCreating ? '➕ Create New Item' : '✏️ Edit Item'}
              </h3>

              <input
                type="text"
                placeholder="Title *"
                value={formData.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                style={inputStyle}
              />

              <textarea
                placeholder="Description *"
                value={formData.description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
              />

              <select
                value={formData.category || 'Inventory'}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                style={selectStyle}
              >
                {categories.filter(cat => cat !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={formData.status || 'Active'}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                style={selectStyle}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>

              {/* File Upload Area */}
              <div
                style={fileUploadStyle}
                onClick={() => fileInputRef.current?.click()}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📁</div>
                <p style={{ margin: 0, color: '#667eea', fontWeight: '600' }}>
                  Click to upload files or drag and drop
                </p>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: '#6c757d' }}>
                  Supports PDF, JPG, JPEG, PNG (Max 10MB each)
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ display: 'none' }}
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
              />

              {/* Upload Progress */}
              {Object.entries(uploadProgress).map(([fileId, progress]) => (
                <div key={fileId} style={{ margin: '1rem 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.9rem' }}>Uploading...</span>
                    <span style={{ fontSize: '0.9rem' }}>{progress}%</span>
                  </div>
                  <div style={{ background: '#e9ecef', borderRadius: '10px', height: '8px' }}>
                    <div
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        height: '100%',
                        borderRadius: '10px',
                        width: `${progress}%`,
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* Uploaded Files */}
              {formData.files && formData.files.length > 0 && (
                <div style={{ margin: '1rem 0' }}>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>📎 Uploaded Files</h4>
                  {formData.files.map(file => (
                    <div
                      key={file.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.5rem',
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        marginBottom: '0.5rem'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{file.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>
                          {formatFileSize(file.size)} • {file.uploadDate}
                        </div>
                      </div>
                      <button
                        style={{ ...buttonStyle('danger'), padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            files: prev.files?.filter(f => f.id !== file.id) || []
                          }))
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button
                  style={buttonStyle('primary')}
                  onClick={isCreating ? handleCreate : handleUpdate}
                >
                  {isCreating ? '✅ Create' : '💾 Update'}
                </button>
                <button
                  style={buttonStyle('secondary')}
                  onClick={() => {
                    setIsCreating(false)
                    setIsEditing(false)
                    setSelectedItem(null)
                    setFormData({
                      title: '',
                      description: '',
                      category: 'Inventory',
                      status: 'Active',
                      files: [],
                      metadata: {}
                    })
                  }}
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          ) : selectedItem ? (
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, color: '#2c3e50' }}>📄 Item Details</h3>
                <button
                  style={buttonStyle('primary')}
                  onClick={() => handleEdit(selectedItem)}
                >
                  ✏️ Edit
                </button>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>{selectedItem.title}</h4>
                <p style={{ margin: '0 0 1rem 0', color: '#6c757d', lineHeight: '1.6' }}>
                  {selectedItem.description}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <strong>Category:</strong> {selectedItem.category}
                </div>
                <div>
                  <strong>Status:</strong> {selectedItem.status}
                </div>
                <div>
                  <strong>Created:</strong> {selectedItem.createdDate}
                </div>
                <div>
                  <strong>Updated:</strong> {selectedItem.updatedDate}
                </div>
              </div>

              {selectedItem.files.length > 0 && (
                <div>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>📎 Attached Files</h4>
                  {selectedItem.files.map(file => (
                    <div
                      key={file.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem',
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        marginBottom: '0.5rem'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: '600' }}>{file.name}</div>
                        <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                          {formatFileSize(file.size)} • Uploaded {file.uploadDate}
                        </div>
                      </div>
                      <button
                        style={buttonStyle('primary')}
                        onClick={() => window.open(file.url, '_blank')}
                      >
                        👁️ View
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div style={{ ...cardStyle, textAlign: 'center', padding: '3rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
              <h3 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>Select an item to view details</h3>
              <p style={{ margin: 0, color: '#6c757d' }}>
                Choose an item from the list or create a new one to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CRUDSystem 