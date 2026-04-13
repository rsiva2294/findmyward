import React, { useState } from 'react';
import { X, Phone, User, Trash2, HardHat, Wallet, Building2 } from 'lucide-react';

const WardContactsBottomSheet = ({ isOpen, onClose, wardContacts, zoneContacts, wardName, wardNo, zoneName }) => {
  const [activeFilter, setActiveFilter] = useState(null); // 'garbage', 'road', 'water', 'tax', 'zone'

  if (!isOpen) return null;

  const toggleFilter = (filterKey) => {
    setActiveFilter(activeFilter === filterKey ? null : filterKey);
  };

  const parseContact = (name, phone) => {
    if (!name) return { name: 'Not Available', phone: null };
    
    // Check if phone is already provided
    if (phone && phone.trim()) return { name: name.trim(), phone: phone.trim() };
    
    // Try to extract phone from name if it contains 10 digits
    const phoneMatch = name.match(/(\d{10})/);
    if (phoneMatch) {
      const extractedPhone = phoneMatch[1];
      const cleanedName = name.replace(extractedPhone, '').replace(/\t+/g, ' ').trim();
      return { name: cleanedName, phone: extractedPhone };
    }
    
    return { name: name.trim(), phone: null };
  };

  const ContactCard = ({ designation, name, phone }) => {
    const contact = parseContact(name, phone);
    
    return (
      <div className="contact-card">
        <div className="contact-info">
          <span className="contact-designation">{designation}</span>
          <span className="contact-name">{contact.name}</span>
        </div>
        {contact.phone ? (
          <a href={`tel:${contact.phone}`} className="call-btn" title={`Call ${contact.name}`}>
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

  // Visibility logic based on active filter
  const isSectionVisible = (section) => {
    if (!activeFilter) return true;
    if (activeFilter === 'garbage') return section === 'sanitation';
    if (activeFilter === 'road' || activeFilter === 'water') return section === 'engineering';
    if (activeFilter === 'tax') return section === 'revenue';
    if (activeFilter === 'zone') return section === 'zone';
    return false;
  };

  return (
    <div className="contacts-overlay" onClick={onClose}>
      <div className="contacts-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="contacts-header">
          <button className="close-sheet-btn" onClick={onClose}>
            <X size={20} />
          </button>
          <div className="contacts-subtitle">{zoneName}</div>
          <h2 className="contacts-title">Ward {wardNo} – {wardName}</h2>
          {wardContacts?.area && (
            <div className="contacts-area">
              {wardContacts.area}
            </div>
          )}
        </div>

        <div className="smart-helper-container">
          <span className="smart-helper-label">
            {activeFilter ? "Filtering by Category" : "What do you need help with?"}
            {activeFilter && (
              <button 
                onClick={() => setActiveFilter(null)} 
                style={{float:'right', background:'none', color:'var(--primary)', border:'none', fontSize:'11px', fontWeight:800, cursor:'pointer'}}
              >
                SHOW ALL
              </button>
            )}
          </span>
          <div className="smart-helper-buttons">
            <button className={`helper-chip ${activeFilter === 'garbage' ? 'active' : ''}`} onClick={() => toggleFilter('garbage')}>🧹 Garbage</button>
            <button className={`helper-chip ${activeFilter === 'road' ? 'active' : ''}`} onClick={() => toggleFilter('road')}>🏗️ Road</button>
            <button className={`helper-chip ${activeFilter === 'water' ? 'active' : ''}`} onClick={() => toggleFilter('water')}>💧 Water</button>
            <button className={`helper-chip ${activeFilter === 'tax' ? 'active' : ''}`} onClick={() => toggleFilter('tax')}>💰 Tax</button>
            <button className={`helper-chip ${activeFilter === 'zone' ? 'active' : ''}`} onClick={() => toggleFilter('zone')}>🏢 Zone</button>
          </div>
        </div>

        <div className="contacts-scroll-area">
          {/* Councillor - Only show when no filter is active */}
          {!activeFilter && (
            <div className="contact-section-group">
              <h3 className="section-title">
                <User size={18} className="section-icon" />
                Councillor
              </h3>
              <div className="contact-cards-grid">
                <ContactCard 
                  designation="Councillor" 
                  name={wardContacts.councillor_name} 
                  phone={wardContacts.councillor_phone} 
                />
              </div>
            </div>
          )}

          {/* Sanitation */}
          {isSectionVisible('sanitation') && (
            <div className="contact-section-group">
              <h3 className="section-title">
                <Trash2 size={18} className="section-icon" />
                Sanitation
              </h3>
              <div className="contact-cards-grid">
                <ContactCard 
                  designation="Sanitary Inspector" 
                  name={wardContacts.sanitary_inspector_name} 
                  phone={wardContacts.sanitary_inspector_phone} 
                />
                <ContactCard 
                  designation="Sanitary Supervisor" 
                  name={wardContacts.sanitary_supervisor_name} 
                  phone={wardContacts.sanitary_supervisor_phone} 
                />
              </div>
            </div>
          )}

          {/* Engineering / Water / Road */}
          {isSectionVisible('engineering') && (
            <div className="contact-section-group">
              <h3 className="section-title">
                <HardHat size={18} className="section-icon" />
                Engineering (Road/Water)
              </h3>
              <div className="contact-cards-grid">
                <ContactCard 
                  designation="AE / JE (Engineering)" 
                  name={wardContacts.engineering_ae_name} 
                  phone={wardContacts.engineering_ae_phone} 
                />
                {wardContacts.engineering_sa_name && (
                  <ContactCard 
                    designation="Skilled Assistant" 
                    name={wardContacts.engineering_sa_name} 
                    phone={wardContacts.engineering_sa_phone} 
                  />
                )}
              </div>
            </div>
          )}

          {/* Revenue */}
          {isSectionVisible('revenue') && (
            <div className="contact-section-group">
              <h3 className="section-title">
                <Wallet size={18} className="section-icon" />
                Revenue & Tax
              </h3>
              <div className="contact-cards-grid">
                <ContactCard 
                  designation="Bill Collector" 
                  name={wardContacts.bill_collector_name} 
                  phone={wardContacts.bill_collector_phone} 
                />
              </div>
            </div>
          )}

          {/* Zone Office */}
          {isSectionVisible('zone') && (
            <div className="contact-section-group">
              <h3 className="section-title">
                <Building2 size={18} className="section-icon" />
                Zone Office (All Officials)
              </h3>
              <div className="contact-cards-grid">
                {zoneContacts && zoneContacts.officials && zoneContacts.officials.map((off, idx) => (
                  <ContactCard 
                    key={idx}
                    designation={off.designation} 
                    name={off.name} 
                    phone={off.phone} 
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WardContactsBottomSheet;
