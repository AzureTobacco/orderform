import React from "react"

const BusinessManagement: React.FC = () => {
  return (
    <div style={{ padding: "2rem", position: "relative" }}>
      {/* Cosmic Header */}
      <h1 className="gradient-cosmic" style={{
        marginBottom: "2rem", 
        fontSize: "2.5rem", 
        fontWeight: "800",
        fontFamily: "var(--cosmic-font-primary)",
        textAlign: "center",
        textShadow: "0 0 30px rgba(0, 255, 255, 0.5)"
      }}>
        💼 Business Management Portal
      </h1>
      
      {/* Cosmic Background Effect */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "300px",
        height: "300px",
        background: "radial-gradient(ellipse, rgba(0, 255, 255, 0.1) 0%, transparent 70%)",
        borderRadius: "50%",
        zIndex: -1
      }} />
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "2rem",
        marginTop: "2rem"
      }}>
        <div className="cosmic-metric" style={{
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "3px",
            background: "var(--aurora-gradient)",
            animation: "aurora-flow 3s linear infinite"
          }} />
          <h2 className="text-cosmic-primary" style={{ 
            marginBottom: "1rem",
            fontFamily: "var(--cosmic-font-primary)",
            textShadow: "0 0 10px var(--neon-cyan)"
          }}>
            📊 Business Overview
          </h2>
          <div className="cosmic-metric-value" style={{
            marginBottom: "0.5rem"
          }}>
            $2.4M
          </div>
          <div className="cosmic-metric-label">
            🚀 Annual Revenue
          </div>
          <div style={{
            marginTop: "1rem",
            fontSize: "0.9rem",
            color: "#00ff80",
            textShadow: "0 0 10px #00ff80"
          }}>
            ⭐ +18.5% Growth
          </div>
        </div>

        <div className="cosmic-metric" style={{
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "3px",
            background: "var(--aurora-gradient)",
            animation: "aurora-flow 3s linear infinite"
          }} />
          <h2 className="text-cosmic-primary" style={{ 
            marginBottom: "1rem",
            fontFamily: "var(--cosmic-font-primary)",
            textShadow: "0 0 10px var(--neon-cyan)"
          }}>
            👥 Client Management
          </h2>
          <div className="cosmic-metric-value" style={{
            marginBottom: "0.5rem"
          }}>
            247
          </div>
          <div className="cosmic-metric-label">
            🌟 Active Clients
          </div>
          <div style={{
            marginTop: "1rem",
            fontSize: "0.9rem",
            color: "#00ff80",
            textShadow: "0 0 10px #00ff80"
          }}>
            ✨ +12% This Month
          </div>
        </div>

        <div className="cosmic-metric" style={{
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "3px",
            background: "var(--aurora-gradient)",
            animation: "aurora-flow 3s linear infinite"
          }} />
          <h2 className="text-cosmic-primary" style={{ 
            marginBottom: "1rem",
            fontFamily: "var(--cosmic-font-primary)",
            textShadow: "0 0 10px var(--neon-cyan)"
          }}>
            📈 Analytics
          </h2>
          <div className="cosmic-metric-value" style={{
            marginBottom: "0.5rem"
          }}>
            +15%
          </div>
          <div className="cosmic-metric-label">
            🌌 Growth Rate
          </div>
          <div style={{
            marginTop: "1rem",
            fontSize: "0.9rem",
            color: "#00ffff",
            textShadow: "0 0 10px #00ffff"
          }}>
            🚀 Accelerating
          </div>
        </div>

        <div className="cosmic-metric" style={{
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "3px",
            background: "var(--aurora-gradient)",
            animation: "aurora-flow 3s linear infinite"
          }} />
          <h2 className="text-cosmic-primary" style={{ 
            marginBottom: "1rem",
            fontFamily: "var(--cosmic-font-primary)",
            textShadow: "0 0 10px var(--neon-cyan)"
          }}>
            👨‍💼 HR Management
          </h2>
          <div className="cosmic-metric-value" style={{
            marginBottom: "0.5rem"
          }}>
            85
          </div>
          <div className="cosmic-metric-label">
            ⭐ Employees
          </div>
          <div style={{
            marginTop: "1rem",
            fontSize: "0.9rem",
            color: "#00ff80",
            textShadow: "0 0 10px #00ff80"
          }}>
            🌟 98% Satisfaction
          </div>
        </div>
      </div>

      {/* Cosmic Action Center */}
      <div style={{
        marginTop: "3rem",
        textAlign: "center"
      }}>
        <h3 className="text-cosmic-primary" style={{
          fontSize: "1.5rem",
          fontFamily: "var(--cosmic-font-primary)",
          marginBottom: "2rem",
          textShadow: "0 0 15px var(--neon-cyan)"
        }}>
          🌌 Quick Actions
        </h3>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
          flexWrap: "wrap"
        }}>
          <button className="cosmic-button">
            🚀 Generate Report
          </button>
          <button className="cosmic-button">
            ✨ View Analytics
          </button>
          <button className="cosmic-button">
            🌟 Manage Clients
          </button>
        </div>
      </div>
    </div>
  )
}

export default BusinessManagement
