import React from 'react';
import { X, Phone, Mail, Award, MapPin } from 'lucide-react';

const RepresentativesBottomSheet = ({ isOpen, onClose, mla, mp }) => {
  if (!isOpen) return null;

  const RepCard = ({ title, name, party, contact, email, constituency }) => {
    const getPartyColor = (partyName) => {
      if (!partyName) return 'var(--text-muted)';
      const p = partyName.toUpperCase();
      if (p.includes('DMK')) return '#d10000'; // Red accent
      if (p.includes('AIADMK')) return '#007a33'; // Green accent
      if (p.includes('CPI')) return '#da251d'; // Communist Red
      if (p.includes('INC')) return '#000080'; // Navy Blue
      return 'var(--primary)';
    };

    return (
      <div className="rep-card animate-fade-in">
        <div className="rep-header">
          <div className="rep-title-group">
            <span className="rep-type">{title}</span>
            <h3 className="rep-name">{name || 'Information Not Available'}</h3>
          </div>
          <div className="rep-party-badge" style={{ backgroundColor: getPartyColor(party) }}>
            {party}
          </div>
        </div>

        <div className="rep-constituency">
          <MapPin size={14} />
          <span>{constituency}</span>
        </div>

        <div className="rep-actions">
          {contact ? (
            <a href={`tel:${contact}`} className="rep-action-btn call">
              <Phone size={18} />
              <span>Call</span>
            </a>
          ) : (
            <div className="rep-action-btn disabled">
              <Phone size={18} />
              <span>No Phone</span>
            </div>
          )}
          
          {email ? (
            <a href={`mailto:${email}`} className="rep-action-btn email">
              <Mail size={18} />
              <span>Email</span>
            </a>
          ) : (
            <div className="rep-action-btn disabled">
              <Mail size={18} />
              <span>No Email</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="contacts-overlay" onClick={onClose}>
      <div className="contacts-sheet reps-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="contacts-header">
          <button className="close-sheet-btn" onClick={onClose}>
            <X size={20} />
          </button>
          <div className="contacts-subtitle">Political Representation</div>
          <h2 className="contacts-title">Elected Representatives</h2>
        </div>

        <div className="contacts-scroll-area">
          <div className="reps-container">
            {mla && (
              <RepCard 
                title="Member of Legislative Assembly (MLA)"
                name={mla.mla_name}
                party={mla.party}
                contact={mla.contact}
                email={mla.email}
                constituency={`${mla.ac_name} Constituency (AC ${mla.ac_no})`}
              />
            )}

            {mp && (
              <RepCard 
                title="Member of Parliament (MP)"
                name={mp.mp_name}
                party={mp.party}
                contact={mp.contact}
                email={mp.email}
                constituency={`${mp.pc_name} Constituency (PC ${mp.pc_no})`}
              />
            )}

            {!mla && !mp && (
              <div className="no-data-msg">
                Representative information not linked for this location.
              </div>
            )}
            
            <div className="rep-info-note">
              <Award size={14} />
              <span>Constituencies are determined based on the geographic location of the selected ward.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepresentativesBottomSheet;
