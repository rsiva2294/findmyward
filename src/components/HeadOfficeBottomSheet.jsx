import React from 'react';
import { X, Phone, Building2, User, Users, ShieldCheck } from 'lucide-react';

const HeadOfficeBottomSheet = ({ isOpen, onClose, data }) => {
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
        <div className="contacts-header">
          <button className="close-sheet-btn" onClick={onClose}>
            <X size={20} />
          </button>
          <div className="contacts-subtitle">ADMINISTRATION</div>
          <h2 className="contacts-title">Corporation Head Office</h2>
        </div>

        <div className="contacts-scroll-area">
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
          <div className="contact-section-group">
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
      </div>
    </div>
  );
};

export default HeadOfficeBottomSheet;
