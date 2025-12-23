import React, { useState } from 'react';

// Types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  workstations: string[];
  permissions: string[];
  progress: any[];
}

interface UserForm {
  name: string;
  email: string;
  role: string;
  status: string;
  workstations: string[];
  permissions: string[];
}

// Dummy data for initial scaffold
const initialUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@company.com', role: 'Operator', status: 'Active', workstations: ['Receiving'], permissions: ['view'], progress: [] },
  { id: 2, name: 'Jane Smith', email: 'jane@company.com', role: 'Supervisor', status: 'Active', workstations: ['Blending', 'QC Lab'], permissions: ['view', 'edit', 'signoff'], progress: [] },
];

const roles = ['Admin', 'Supervisor', 'Operator'];
const allPermissions = ['view', 'edit', 'signoff'];
const allWorkstations = ['Receiving', 'Blending', 'QC Lab', 'Packaging'];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'permissions' | 'workstations' | 'progress'>('permissions');

  // Modal form state
  const [form, setForm] = useState<UserForm>({
    name: '',
    email: '',
    role: roles[0],
    status: 'Active',
    workstations: [],
    permissions: [],
  });

  const openAddUser = () => {
    setEditingUser(null);
    setForm({ name: '', email: '', role: roles[0], status: 'Active', workstations: [], permissions: [] });
    setShowModal(true);
    setActiveTab('permissions');
  };

  const openEditUser = (user: User) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      workstations: [...user.workstations],
      permissions: [...user.permissions],
    });
    setShowModal(true);
    setActiveTab('permissions');
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '32px',
        paddingBottom: '16px',
        borderBottom: '1px solid rgba(0, 212, 255, 0.2)'
      }}>
        <div>
          <h1 style={{ 
            color: 'var(--cosmic-star-white)', 
            fontSize: '2rem', 
            fontWeight: '600',
            margin: '0 0 8px 0',
            fontFamily: 'var(--cosmic-font-primary)'
          }}>
            User Management
          </h1>
          <p style={{ 
            color: 'var(--text-secondary)', 
            margin: '0',
            fontSize: '0.95rem'
          }}>
            Manage user accounts, permissions, and workstation assignments
          </p>
        </div>
        <button 
          onClick={openAddUser}
          style={{
            background: 'linear-gradient(135deg, var(--cosmic-primary), var(--cosmic-secondary))',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            color: 'white',
            fontWeight: '500',
            cursor: 'pointer',
            fontSize: '0.95rem',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 212, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          + Add User
        </button>
      </div>

      {/* Users Table */}
      <div style={{
        background: 'rgba(22, 33, 62, 0.8)',
        borderRadius: '12px',
        border: '1px solid rgba(0, 212, 255, 0.2)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{
              background: 'rgba(0, 212, 255, 0.1)',
              borderBottom: '1px solid rgba(0, 212, 255, 0.2)'
            }}>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                color: 'var(--cosmic-star-white)',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>Name</th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                color: 'var(--cosmic-star-white)',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>Email</th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                color: 'var(--cosmic-star-white)',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>Role</th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                color: 'var(--cosmic-star-white)',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>Status</th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                color: 'var(--cosmic-star-white)',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>Workstations</th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                color: 'var(--cosmic-star-white)',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} style={{
                borderBottom: index < users.length - 1 ? '1px solid rgba(0, 212, 255, 0.1)' : 'none',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 212, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              >
                <td style={{
                  padding: '16px',
                  color: 'var(--cosmic-star-white)',
                  fontWeight: '500'
                }}>{user.name}</td>
                <td style={{
                  padding: '16px',
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem'
                }}>{user.email}</td>
                <td style={{
                  padding: '16px',
                  color: 'var(--cosmic-accent-cyan)',
                  fontWeight: '500'
                }}>{user.role}</td>
                <td style={{
                  padding: '16px'
                }}>
                  <span style={{
                    background: user.status === 'Active' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)',
                    color: user.status === 'Active' ? '#00ff00' : '#ff4444',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>
                    {user.status}
                  </span>
                </td>
                <td style={{
                  padding: '16px',
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem'
                }}>{user.workstations.join(', ')}</td>
                <td style={{
                  padding: '16px'
                }}>
                  <button 
                    onClick={() => openEditUser(user)}
                    style={{
                      background: 'rgba(0, 212, 255, 0.1)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      color: 'var(--cosmic-accent-cyan)',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      marginRight: '8px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 212, 255, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
                    }}
                  >
                    Edit
                  </button>
                  <button 
                    style={{
                      background: 'rgba(255, 68, 68, 0.1)',
                      border: '1px solid rgba(255, 68, 68, 0.3)',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      color: '#ff4444',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 68, 68, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 68, 68, 0.1)';
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit User */}
      {showModal && (
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
          zIndex: 1000
        }}
        onClick={closeModal}
        >
          <div style={{
            background: 'rgba(22, 33, 62, 0.95)',
            borderRadius: '16px',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            padding: '32px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(0, 212, 255, 0.2)'
            }}>
              <h2 style={{
                color: 'var(--cosmic-star-white)',
                fontSize: '1.5rem',
                fontWeight: '600',
                margin: 0,
                fontFamily: 'var(--cosmic-font-primary)'
              }}>
                {editingUser ? 'Edit User' : 'Add New User'}
              </h2>
              <button 
                onClick={closeModal}
                style={{
                  background: 'none',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  borderRadius: '6px',
                  padding: '8px',
                  color: 'var(--cosmic-star-white)',
                  cursor: 'pointer',
                  fontSize: '1.2rem'
                }}
              >
                ×
              </button>
            </div>

            {/* Form Fields */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: 'var(--cosmic-star-white)',
                  fontWeight: '500',
                  fontSize: '0.9rem'
                }}>
                  Full Name
                </label>
                <input 
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(22, 33, 62, 0.8)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '8px',
                    color: 'var(--cosmic-star-white)',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                  placeholder="Enter full name"
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: 'var(--cosmic-star-white)',
                  fontWeight: '500',
                  fontSize: '0.9rem'
                }}>
                  Email Address
                </label>
                <input 
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(22, 33, 62, 0.8)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '8px',
                    color: 'var(--cosmic-star-white)',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                  placeholder="Enter email address"
                />
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: 'var(--cosmic-star-white)',
                    fontWeight: '500',
                    fontSize: '0.9rem'
                  }}>
                    Role
                  </label>
                  <select 
                    value={form.role}
                    onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(22, 33, 62, 0.8)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      borderRadius: '8px',
                      color: 'var(--cosmic-star-white)',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div style={{ flex: 1 }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: 'var(--cosmic-star-white)',
                    fontWeight: '500',
                    fontSize: '0.9rem'
                  }}>
                    Status
                  </label>
                  <select 
                    value={form.status}
                    onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(22, 33, 62, 0.8)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      borderRadius: '8px',
                      color: 'var(--cosmic-star-white)',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '20px',
                borderBottom: '1px solid rgba(0, 212, 255, 0.2)'
              }}>
                {[
                  { id: 'permissions', label: 'Permissions' },
                  { id: 'workstations', label: 'Workstations' },
                  { id: 'progress', label: 'Progress' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    style={{
                      background: activeTab === tab.id ? 'rgba(0, 212, 255, 0.2)' : 'transparent',
                      border: 'none',
                      padding: '12px 20px',
                      color: activeTab === tab.id ? 'var(--cosmic-accent-cyan)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontWeight: activeTab === tab.id ? '600' : '400',
                      fontSize: '0.9rem',
                      borderBottom: activeTab === tab.id ? '2px solid var(--cosmic-accent-cyan)' : '2px solid transparent',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'permissions' && (
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '12px',
                    color: 'var(--cosmic-star-white)',
                    fontWeight: '500',
                    fontSize: '0.9rem'
                  }}>
                    User Permissions
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {allPermissions.map(permission => (
                      <label key={permission} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        padding: '8px 12px',
                        background: form.permissions.includes(permission) ? 'rgba(0, 212, 255, 0.1)' : 'rgba(22, 33, 62, 0.5)',
                        border: `1px solid ${form.permissions.includes(permission) ? 'rgba(0, 212, 255, 0.3)' : 'rgba(0, 212, 255, 0.1)'}`,
                        borderRadius: '6px',
                        transition: 'all 0.2s ease'
                      }}>
                        <input 
                          type="checkbox"
                          checked={form.permissions.includes(permission)}
                          onChange={e => {
                            setForm(f => ({
                              ...f,
                              permissions: e.target.checked 
                                ? [...f.permissions, permission] 
                                : f.permissions.filter(p => p !== permission)
                            }))
                          }}
                          style={{
                            accentColor: 'var(--cosmic-accent-cyan)',
                            transform: 'scale(1.2)'
                          }}
                        />
                        <span style={{
                          color: form.permissions.includes(permission) ? 'var(--cosmic-accent-cyan)' : 'var(--text-secondary)',
                          fontWeight: form.permissions.includes(permission) ? '500' : '400',
                          textTransform: 'capitalize'
                        }}>
                          {permission}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'workstations' && (
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '12px',
                    color: 'var(--cosmic-star-white)',
                    fontWeight: '500',
                    fontSize: '0.9rem'
                  }}>
                    Assign Workstations
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {allWorkstations.map(workstation => (
                      <label key={workstation} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        padding: '8px 12px',
                        background: form.workstations.includes(workstation) ? 'rgba(0, 212, 255, 0.1)' : 'rgba(22, 33, 62, 0.5)',
                        border: `1px solid ${form.workstations.includes(workstation) ? 'rgba(0, 212, 255, 0.3)' : 'rgba(0, 212, 255, 0.1)'}`,
                        borderRadius: '6px',
                        transition: 'all 0.2s ease'
                      }}>
                        <input 
                          type="checkbox"
                          checked={form.workstations.includes(workstation)}
                          onChange={e => {
                            setForm(f => ({
                              ...f,
                              workstations: e.target.checked 
                                ? [...f.workstations, workstation] 
                                : f.workstations.filter(w => w !== workstation)
                            }))
                          }}
                          style={{
                            accentColor: 'var(--cosmic-accent-cyan)',
                            transform: 'scale(1.2)'
                          }}
                        />
                        <span style={{
                          color: form.workstations.includes(workstation) ? 'var(--cosmic-accent-cyan)' : 'var(--text-secondary)',
                          fontWeight: form.workstations.includes(workstation) ? '500' : '400'
                        }}>
                          {workstation}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'progress' && (
                <div style={{
                  padding: '20px',
                  background: 'rgba(22, 33, 62, 0.5)',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 212, 255, 0.1)',
                  textAlign: 'center'
                }}>
                  <p style={{
                    color: 'var(--text-secondary)',
                    margin: '0',
                    fontSize: '0.9rem'
                  }}>
                    Progress sign-off and paper trail functionality will be implemented here.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(0, 212, 255, 0.2)'
            }}>
              <button 
                onClick={closeModal}
                style={{
                  background: 'rgba(22, 33, 62, 0.8)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
                  e.currentTarget.style.color = 'var(--cosmic-star-white)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(22, 33, 62, 0.8)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                Cancel
              </button>
              <button 
                style={{
                  background: 'linear-gradient(135deg, var(--cosmic-primary), var(--cosmic-secondary))',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 212, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {editingUser ? 'Update User' : 'Create User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 