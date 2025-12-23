import React, { useState } from 'react';
import { 
  Settings, 
  Users, 
  Bell, 
  Shield, 
  Palette, 
  Monitor, 
  Globe, 
  Database,
  Lock,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Mail,
  Smartphone,
  Volume2,
  VolumeX,
  Sun,
  Moon
} from 'lucide-react';

const SystemConfiguration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      companyName: 'Azure Tobacco Industrial FZCO',
      timezone: 'Asia/Dubai',
      language: 'English',
      currency: 'AED',
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      soundEnabled: true,
      lowStockAlerts: true,
      productionAlerts: true,
      qualityAlerts: true,
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAttempts: 3,
    },
    appearance: {
      theme: 'cosmic',
      sidebarAutoHide: true,
      compactMode: false,
      animationsEnabled: true,
    },
    system: {
      autoBackup: true,
      backupFrequency: 'daily',
      dataRetention: 365,
      debugMode: false,
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to backend
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'system', label: 'System', icon: Database },
  ];

  const renderGeneralSettings = () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--cosmic-star-white)' }}>
          Company Name
        </label>
        <input
          type="text"
          value={settings.general.companyName}
          onChange={(e) => handleSettingChange('general', 'companyName', e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'rgba(22, 33, 62, 0.6)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            borderRadius: '6px',
            color: 'var(--cosmic-star-white)',
            fontSize: '0.9rem',
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--cosmic-star-white)' }}>
            Timezone
          </label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(22, 33, 62, 0.6)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              borderRadius: '6px',
              color: 'var(--cosmic-star-white)',
              fontSize: '0.9rem',
            }}
          >
            <option value="Asia/Dubai">Asia/Dubai (UTC+4)</option>
            <option value="UTC">UTC (UTC+0)</option>
            <option value="America/New_York">America/New_York (UTC-5)</option>
            <option value="Europe/London">Europe/London (UTC+0)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--cosmic-star-white)' }}>
            Language
          </label>
          <select
            value={settings.general.language}
            onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(22, 33, 62, 0.6)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              borderRadius: '6px',
              color: 'var(--cosmic-star-white)',
              fontSize: '0.9rem',
            }}
          >
            <option value="English">English</option>
            <option value="Arabic">العربية</option>
            <option value="French">Français</option>
            <option value="German">Deutsch</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <h3 style={{ color: 'var(--cosmic-star-white)', marginBottom: '1rem' }}>Notification Preferences</h3>
      
      {[
        { key: 'emailNotifications', label: 'Email Notifications', icon: Mail },
        { key: 'smsNotifications', label: 'SMS Notifications', icon: Smartphone },
        { key: 'pushNotifications', label: 'Push Notifications', icon: Bell },
        { key: 'soundEnabled', label: 'Sound Notifications', icon: settings.notifications.soundEnabled ? Volume2 : VolumeX },
      ].map(({ key, label, icon: Icon }) => (
        <div key={key} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
          background: 'rgba(22, 33, 62, 0.6)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          borderRadius: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Icon size={20} color="var(--cosmic-accent-cyan)" />
            <span style={{ color: 'var(--cosmic-star-white)', fontWeight: '500' }}>{label}</span>
          </div>
          <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
            <input
              type="checkbox"
              checked={settings.notifications[key as keyof typeof settings.notifications] as boolean}
              onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: settings.notifications[key as keyof typeof settings.notifications] 
                ? 'var(--cosmic-accent-cyan)' 
                : 'rgba(100, 116, 139, 0.5)',
              borderRadius: '24px',
              transition: '0.3s',
            }}>
              <span style={{
                position: 'absolute',
                content: '',
                height: '18px',
                width: '18px',
                left: settings.notifications[key as keyof typeof settings.notifications] ? '29px' : '3px',
                bottom: '3px',
                background: 'white',
                borderRadius: '50%',
                transition: '0.3s',
              }} />
            </span>
          </label>
        </div>
      ))}

      <h3 style={{ color: 'var(--cosmic-star-white)', marginTop: '2rem', marginBottom: '1rem' }}>Alert Types</h3>
      
      {[
        { key: 'lowStockAlerts', label: 'Low Stock Alerts', desc: 'Get notified when inventory is low' },
        { key: 'productionAlerts', label: 'Production Alerts', desc: 'Notifications for production issues' },
        { key: 'qualityAlerts', label: 'Quality Control Alerts', desc: 'Quality check notifications' },
      ].map(({ key, label, desc }) => (
        <div key={key} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
          background: 'rgba(22, 33, 62, 0.6)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          borderRadius: '8px',
        }}>
          <div>
            <div style={{ color: 'var(--cosmic-star-white)', fontWeight: '500', marginBottom: '0.25rem' }}>{label}</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem' }}>{desc}</div>
          </div>
          <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
            <input
              type="checkbox"
              checked={settings.notifications[key as keyof typeof settings.notifications] as boolean}
              onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: settings.notifications[key as keyof typeof settings.notifications] 
                ? 'var(--cosmic-accent-cyan)' 
                : 'rgba(100, 116, 139, 0.5)',
              borderRadius: '24px',
              transition: '0.3s',
            }}>
              <span style={{
                position: 'absolute',
                content: '',
                height: '18px',
                width: '18px',
                left: settings.notifications[key as keyof typeof settings.notifications] ? '29px' : '3px',
                bottom: '3px',
                background: 'white',
                borderRadius: '50%',
                transition: '0.3s',
              }} />
            </span>
          </label>
        </div>
      ))}
    </div>
  );

  const renderSecuritySettings = () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div style={{
        padding: '1rem',
        background: 'rgba(22, 33, 62, 0.6)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
        borderRadius: '8px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <Lock size={20} color="var(--cosmic-accent-cyan)" />
          <span style={{ color: 'var(--cosmic-star-white)', fontWeight: '500' }}>Two-Factor Authentication</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
            Enhanced security for your account
          </span>
          <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
            <input
              type="checkbox"
              checked={settings.security.twoFactorAuth}
              onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: settings.security.twoFactorAuth 
                ? 'var(--cosmic-accent-cyan)' 
                : 'rgba(100, 116, 139, 0.5)',
              borderRadius: '24px',
              transition: '0.3s',
            }}>
              <span style={{
                position: 'absolute',
                content: '',
                height: '18px',
                width: '18px',
                left: settings.security.twoFactorAuth ? '29px' : '3px',
                bottom: '3px',
                background: 'white',
                borderRadius: '50%',
                transition: '0.3s',
              }} />
            </span>
          </label>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--cosmic-star-white)' }}>
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(22, 33, 62, 0.6)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              borderRadius: '6px',
              color: 'var(--cosmic-star-white)',
              fontSize: '0.9rem',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--cosmic-star-white)' }}>
            Password Expiry (days)
          </label>
          <input
            type="number"
            value={settings.security.passwordExpiry}
            onChange={(e) => handleSettingChange('security', 'passwordExpiry', parseInt(e.target.value))}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(22, 33, 62, 0.6)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              borderRadius: '6px',
              color: 'var(--cosmic-star-white)',
              fontSize: '0.9rem',
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div style={{
        padding: '1rem',
        background: 'rgba(22, 33, 62, 0.6)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
        borderRadius: '8px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <Palette size={20} color="var(--cosmic-accent-cyan)" />
          <span style={{ color: 'var(--cosmic-star-white)', fontWeight: '500' }}>Theme</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
          {[
            { id: 'cosmic', label: 'Cosmic', icon: Sun },
            { id: 'dark', label: 'Dark', icon: Moon },
            { id: 'light', label: 'Light', icon: Sun },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleSettingChange('appearance', 'theme', id)}
              style={{
                padding: '0.75rem',
                background: settings.appearance.theme === id 
                  ? 'var(--cosmic-accent-cyan)' 
                  : 'rgba(100, 116, 139, 0.3)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                borderRadius: '6px',
                color: 'var(--cosmic-star-white)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
              }}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {[
        { key: 'sidebarAutoHide', label: 'Auto-hide Sidebar', desc: 'Automatically minimize sidebar when not in use' },
        { key: 'compactMode', label: 'Compact Mode', desc: 'Use smaller spacing for more content' },
        { key: 'animationsEnabled', label: 'Enable Animations', desc: 'Show smooth transitions and effects' },
      ].map(({ key, label, desc }) => (
        <div key={key} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
          background: 'rgba(22, 33, 62, 0.6)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          borderRadius: '8px',
        }}>
          <div>
            <div style={{ color: 'var(--cosmic-star-white)', fontWeight: '500', marginBottom: '0.25rem' }}>{label}</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem' }}>{desc}</div>
          </div>
          <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
            <input
              type="checkbox"
              checked={settings.appearance[key as keyof typeof settings.appearance] as boolean}
              onChange={(e) => handleSettingChange('appearance', key, e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: settings.appearance[key as keyof typeof settings.appearance] 
                ? 'var(--cosmic-accent-cyan)' 
                : 'rgba(100, 116, 139, 0.5)',
              borderRadius: '24px',
              transition: '0.3s',
            }}>
              <span style={{
                position: 'absolute',
                content: '',
                height: '18px',
                width: '18px',
                left: settings.appearance[key as keyof typeof settings.appearance] ? '29px' : '3px',
                bottom: '3px',
                background: 'white',
                borderRadius: '50%',
                transition: '0.3s',
              }} />
            </span>
          </label>
        </div>
      ))}
    </div>
  );

  const renderSystemSettings = () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div style={{
        padding: '1rem',
        background: 'rgba(22, 33, 62, 0.6)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
        borderRadius: '8px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <Database size={20} color="var(--cosmic-accent-cyan)" />
          <span style={{ color: 'var(--cosmic-star-white)', fontWeight: '500' }}>Backup Settings</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
            Automatic Data Backup
          </span>
          <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
            <input
              type="checkbox"
              checked={settings.system.autoBackup}
              onChange={(e) => handleSettingChange('system', 'autoBackup', e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: settings.system.autoBackup 
                ? 'var(--cosmic-accent-cyan)' 
                : 'rgba(100, 116, 139, 0.5)',
              borderRadius: '24px',
              transition: '0.3s',
            }}>
              <span style={{
                position: 'absolute',
                content: '',
                height: '18px',
                width: '18px',
                left: settings.system.autoBackup ? '29px' : '3px',
                bottom: '3px',
                background: 'white',
                borderRadius: '50%',
                transition: '0.3s',
              }} />
            </span>
          </label>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--cosmic-star-white)' }}>
            Backup Frequency
          </label>
          <select
            value={settings.system.backupFrequency}
            onChange={(e) => handleSettingChange('system', 'backupFrequency', e.target.value)}
            disabled={!settings.system.autoBackup}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(22, 33, 62, 0.6)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              borderRadius: '6px',
              color: 'var(--cosmic-star-white)',
              fontSize: '0.9rem',
              opacity: settings.system.autoBackup ? 1 : 0.5,
            }}
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--cosmic-star-white)' }}>
          Data Retention (days)
        </label>
        <input
          type="number"
          value={settings.system.dataRetention}
          onChange={(e) => handleSettingChange('system', 'dataRetention', parseInt(e.target.value))}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'rgba(22, 33, 62, 0.6)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            borderRadius: '6px',
            color: 'var(--cosmic-star-white)',
            fontSize: '0.9rem',
          }}
        />
        <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '0.5rem' }}>
          How long to keep data before archiving
        </p>
      </div>
    </div>
  );

  return (
    <div style={{
      background: 'rgba(22, 33, 62, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      border: '1px solid rgba(0, 212, 255, 0.2)',
      padding: '2rem',
      color: 'var(--cosmic-star-white)',
      maxHeight: '85vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, var(--cosmic-accent-cyan), var(--cosmic-accent-purple))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem',
        }}>
          System Configuration
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1rem' }}>
          Manage your ERP system settings and preferences
        </p>
      </div>

      <div style={{ display: 'flex', flex: 1, gap: '2rem', overflow: 'hidden' }}>
        {/* Sidebar Tabs */}
        <div style={{
          minWidth: '200px',
          background: 'rgba(15, 23, 42, 0.8)',
          borderRadius: '12px',
          padding: '1rem',
          border: '1px solid rgba(0, 212, 255, 0.1)',
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                marginBottom: '0.5rem',
                background: activeTab === tab.id 
                  ? 'rgba(0, 212, 255, 0.2)' 
                  : 'transparent',
                border: activeTab === tab.id 
                  ? '1px solid rgba(0, 212, 255, 0.4)' 
                  : '1px solid transparent',
                borderRadius: '8px',
                color: activeTab === tab.id 
                  ? 'var(--cosmic-accent-cyan)' 
                  : 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: activeTab === tab.id ? '600' : '400',
                transition: 'all 0.3s ease',
              }}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={{
          flex: 1,
          background: 'rgba(15, 23, 42, 0.8)',
          borderRadius: '12px',
          padding: '1.5rem',
          border: '1px solid rgba(0, 212, 255, 0.1)',
          overflow: 'auto',
        }}>
          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'notifications' && renderNotificationSettings()}
          {activeTab === 'security' && renderSecuritySettings()}
          {activeTab === 'appearance' && renderAppearanceSettings()}
          {activeTab === 'system' && renderSystemSettings()}
        </div>
      </div>

      {/* Footer Actions */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        marginTop: '2rem',
        paddingTop: '1rem',
        borderTop: '1px solid rgba(0, 212, 255, 0.2)',
      }}>
        <button
          onClick={() => window.location.reload()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: 'rgba(100, 116, 139, 0.3)',
            border: '1px solid rgba(100, 116, 139, 0.5)',
            borderRadius: '8px',
            color: 'var(--cosmic-star-white)',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease',
          }}
        >
          <RefreshCw size={16} />
          Reset
        </button>
        <button
          onClick={handleSaveSettings}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, var(--cosmic-accent-cyan), var(--cosmic-accent-purple))',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'all 0.3s ease',
          }}
        >
          <Save size={16} />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SystemConfiguration; 