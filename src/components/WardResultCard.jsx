import React from 'react';
import { Share2, MapPin, X, Info, Phone } from 'lucide-react';

const WardResultCard = ({ wardFeature, clearSelection, matchedStreet, onShowContacts }) => {
  if (!wardFeature || !wardFeature.properties) return null;

  const { ward_no, ward_name, zone, ward_code } = wardFeature.properties;

  const handleShare = async () => {
    let textToShare = `I am in Ward ${ward_no} - ${ward_name} (Zone: ${zone}). Check your ward on Madurai: FindMyWard!`;
    if (matchedStreet) {
       textToShare = `${matchedStreet}. Check your ward on Madurai: FindMyWard!`;
    }
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Madurai Ward',
          text: textToShare,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(textToShare);
      alert('Ward details copied to clipboard!');
    }
  };

  return (
    <div className="result-card animate-fade-in">
      <div className="result-card-header">
         <span className="ward-number-badge">WARD {ward_no || 'N/A'}</span>
         <button style={{background:'none', color:'var(--text-muted)'}} onClick={clearSelection}>
            <X size={20} />
         </button>
      </div>
      
      <div>
        <h2 className="ward-name">{ward_name || 'Unknown Location'}</h2>
        <div className="zone-name mt-2" style={{ marginTop: '8px' }}>
          <MapPin size={16} />
          Zone: {zone || 'Unknown Zone'} {ward_code ? `(${ward_code})` : ''}
        </div>
      </div>

      {matchedStreet && (
        <div className="street-info-box">
          <Info size={18} style={{ flexShrink: 0 }} />
          <span>{matchedStreet}</span>
        </div>
      )}

      <div className="result-card-actions" style={{ marginTop: matchedStreet ? '8px' : '12px' }}>
        <button className="action-btn" onClick={handleShare}>
          <Share2 size={18} />
          Share finding
        </button>
        <button 
          className="action-btn" 
          onClick={onShowContacts}
          style={{ background: 'var(--primary)', color: 'white', borderColor: 'var(--primary)' }}
        >
          <Phone size={18} />
          Ward Contacts
        </button>
      </div>
    </div>
  );
};

export default WardResultCard;
