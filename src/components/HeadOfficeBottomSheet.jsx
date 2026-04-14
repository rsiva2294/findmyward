import React, { useState } from 'react';
import { X, Phone, Building2, User, Users, ShieldCheck, ExternalLink, MessageCircle, AlertCircle, Globe, Share2, MapPin, Mail, Info, Contact2 } from 'lucide-react';

const HeadOfficeBottomSheet = ({ isOpen, onClose, data }) => {
  const [activeTab, setActiveTab] = useState('info'); // 'info' or 'directory'

  if (!isOpen || !data) return null;

  const { head_office } = data;

  const ContactCard = ({ designation, name, phone, email }) => {
    return (
      <div className="contact-card">
        <div className="contact-info">
          <span className="contact-designation">{designation}</span>
          <span className="contact-name">{name}</span>
          {email && <span style={{fontSize: '10px', color: 'var(--text-muted)'}}>{email}</span>}
        </div>
        {phone ? (
          <a href={`tel:${phone.replace(/\s/g, '')}`} className="call-btn" title={`Call ${name}`}>
            <Phone size={20} />
          </a>
        ) : (
          <div className="call-btn disabled">
            <Phone size={20} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="contacts-overlay" onClick={onClose}>
      <div className="contacts-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="contacts-header" style={{ paddingBottom: '16px' }}>
          <button className="close-sheet-btn" onClick={onClose}>
            <X size={20} />
          </button>
          <div className="contacts-subtitle">ADMINISTRATION</div>
          <h2 className="contacts-title">Corporation Head Office</h2>
        </div>

        {/* Premium Segmented Tabs */}
        <div className="tabs-bar" style={{ 
          padding: '0 24px 16px 24px', 
          background: 'white',
          borderBottom: '1px solid var(--border)',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{ 
            display: 'flex', 
            background: '#F1F5F9', // Light slate
            padding: '4px', 
            borderRadius: '14px',
            gap: '4px'
          }}>
            <button 
              onClick={() => setActiveTab('info')}
              className={activeTab === 'info' ? 'active' : ''}
              style={{ 
                flex: 1, 
                height: '38px', 
                fontSize: '13px', 
                fontWeight: '700',
                borderRadius: '11px',
                backgroundColor: activeTab === 'info' ? 'white' : 'transparent',
                color: activeTab === 'info' ? 'var(--primary)' : 'var(--text-muted)',
                border: 'none',
                boxShadow: activeTab === 'info' ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                lineHeight: 1
              }}
            >
              <Info size={16} />
              <span style={{ lineHeight: 1 }}>Quick Info</span>
            </button>
            <button 
              onClick={() => setActiveTab('directory')}
              className={activeTab === 'directory' ? 'active' : ''}
              style={{ 
                flex: 1, 
                height: '38px', 
                fontSize: '13px', 
                fontWeight: '700',
                borderRadius: '11px',
                backgroundColor: activeTab === 'directory' ? 'white' : 'transparent',
                color: activeTab === 'directory' ? 'var(--primary)' : 'var(--text-muted)',
                border: 'none',
                boxShadow: activeTab === 'directory' ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                lineHeight: 1
              }}
            >
              <Contact2 size={16} />
              <span style={{ lineHeight: 1 }}>Directory</span>
            </button>
          </div>
        </div>

        <div className="contacts-scroll-area">
          {activeTab === 'info' ? (
            <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
              {/* Quick Support Actions */}
              <div className="contact-section-group" style={{ marginBottom: '24px' }}>
                <h3 className="section-title">
                  <AlertCircle size={18} className="section-icon" />
                  Quick Support & Grievances
                </h3>
                <div className="quick-actions-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                  <a 
                    href="https://maduraipublic.grievancecell.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-btn"
                    style={{ background: '#EEF2FF', color: '#4338CA', border: '1px solid #C7D2FE', padding: '12px', borderRadius: '12px', textDecoration: 'none', fontSize: '12px', fontWeight: '700' }}
                  >
                    <ExternalLink size={16} />
                    Grievance Portal
                  </a>
                  <a 
                    href="https://api.whatsapp.com/send?phone=919600112811" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-btn"
                    style={{ background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', padding: '12px', borderRadius: '12px', textDecoration: 'none', fontSize: '12px', fontWeight: '700' }}
                  >
                    <MessageCircle size={16} />
                    WhatsApp HQ
                  </a>
                  <a 
                    href="tel:+914522540333" 
                    className="action-btn"
                    style={{ background: '#FFF7ED', color: '#C2410C', border: '1px solid #FFEDD5', padding: '12px', borderRadius: '12px', textDecoration: 'none', fontSize: '12px', fontWeight: '700' }}
                  >
                    <Phone size={16} />
                    Landline HQ
                  </a>
                  <a 
                    href="tel:+919003990030" 
                    className="action-btn"
                    style={{ background: '#FDF2F8', color: '#BE185D', border: '1px solid #FCE7F3', padding: '12px', borderRadius: '12px', textDecoration: 'none', fontSize: '12px', fontWeight: '700' }}
                  >
                    <Phone size={16} />
                    Mobile Hotline
                  </a>
                </div>
              </div>

              {/* Office Location & Map */}
              <div className="contact-section-group" style={{ marginBottom: '24px' }}>
                <h3 className="section-title">
                  <MapPin size={18} className="section-icon" />
                  Main Office Location
                </h3>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '16px', marginTop: '12px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>Arignar Anna Maligai (HQs)</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '12px' }}>
                    Thallakulam, Madurai - 625 002.<br />
                    Tamil Nadu, India.
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--primary)', fontWeight: '600', marginBottom: '16px' }}>
                    <Mail size={14} />
                    maduraicorporation@tn.gov.in
                  </div>
                  
                  <div style={{ width: '100%', height: '200px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.9701860632013!2d78.1390279!3d9.936438599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c5c0b20d107b%3A0x2be95ad78d03b493!2sMadurai%20Corporation%20Aringar%20Anna%20Maligai!5e0!3m2!1sen!2sin!4v1776153739994!5m2!1sen!2sin" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen="" 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Social Media Connect */}
              <div className="contact-section-group" style={{ marginBottom: '24px' }}>
                <h3 className="section-title">
                  <Share2 size={18} className="section-icon" />
                  Official Social Handles
                </h3>
                <div className="social-actions-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                  <a 
                    href="https://www.facebook.com/corporationofmadurai/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-btn"
                    style={{ background: '#F0F7FF', color: '#1877F2', border: '1px solid #D1E5FF', padding: '12px', borderRadius: '12px', textDecoration: 'none', fontSize: '13px', fontWeight: '700' }}
                  >
                    <Globe size={18} />
                    Facebook
                  </a>
                  <a 
                    href="https://x.com/mdu_corp" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-btn"
                    style={{ background: '#F8F8F8', color: '#000000', border: '1px solid #E5E5E5', padding: '12px', borderRadius: '12px', textDecoration: 'none', fontSize: '13px', fontWeight: '700' }}
                  >
                    <Share2 size={18} />
                    X (Twitter)
                  </a>
                </div>
                <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>
                  Follow for latest updates and announcements
                </div>
              </div>
            </div>
          ) : (
            <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
              {/* Top Leadership */}
              <div className="contact-section-group">
                <h3 className="section-title">
                  <ShieldCheck size={18} className="section-icon" />
                  Top Leadership
                </h3>
                <div className="contact-cards-grid">
                  <ContactCard 
                    designation="Commissioner" 
                    name={head_office.commissioner.name} 
                    phone={head_office.commissioner.phone} 
                    email={head_office.commissioner.email}
                  />
                  {head_office.deputy_commissioners.map((dc, idx) => (
                    <ContactCard 
                      key={idx}
                      designation="Deputy Commissioner" 
                      name={dc.name} 
                      phone={dc.phone} 
                      email={dc.email}
                    />
                  ))}
                </div>
              </div>

              {/* Assistant Commissioners by Zone */}
              <div className="contact-section-group">
                <h3 className="section-title">
                  <Building2 size={18} className="section-icon" />
                  Zone Administration (ACs)
                </h3>
                <div className="contact-cards-grid">
                  {head_office.assistant_commissioners_by_zone.map((ac, idx) => (
                    <ContactCard 
                      key={idx}
                      designation={`Assistant Commissioner (${ac.zone})`} 
                      name={ac.name} 
                      phone={ac.mobile || ac.landline} 
                    />
                  ))}
                </div>
              </div>

              {/* Department Officials */}
              <div className="contact-section-group" style={{ marginBottom: '24px' }}>
                <h3 className="section-title">
                  <Users size={18} className="section-icon" />
                  Department Heads & HQs
                </h3>
                <div className="contact-cards-grid">
                  {head_office.officials.map((off, idx) => (
                    <ContactCard 
                      key={idx}
                      designation={off.designation} 
                      name={off.name} 
                      phone={off.phone} 
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeadOfficeBottomSheet;
