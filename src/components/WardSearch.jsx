import React, { useState, useRef, useEffect } from 'react';
import { Search, Map as MapIcon, Navigation, Loader2 } from 'lucide-react';

const WardSearch = ({ localityIndex, onSelect, onDetectLocation, isDetecting }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  // Close dropdown when picking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    
    if (!val.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    if (!localityIndex || localityIndex.length === 0) return;

    const lowerVal = val.toLowerCase();
    
    // Normalize query for numeric matching: removes 'wd' and leading zeros
    const numericQuery = lowerVal.replace(/^wd0*/, '').replace(/^0+/, '');
    
    // Filter matching streets and wards
    const matched = localityIndex.filter(item => {
      // 1. Match in Title/Street Name
      const matchTitle = item.title?.toLowerCase().includes(lowerVal);
      
      // 2. Match in Ward number
      const itemWardNo = item.ward_no?.toString() || '';
      const matchNo = (numericQuery !== '' && itemWardNo === numericQuery) || 
                      itemWardNo.includes(lowerVal);
      
      // 3. Match in display label (contains Ward 94 etc)
      const matchDisplay = item.displayLabel?.toLowerCase().includes(lowerVal);

      return matchTitle || matchNo || matchDisplay;
    });

    setResults(matched.slice(0, 8)); // show top 8
    setIsOpen(true);
  };

  const handleSelect = (e, item) => {
    if (e) e.stopPropagation();
    setQuery(item.title);
    setIsOpen(false);
    onSelect(item);
  };

  return (
    <div className="search-container-wrapper" ref={searchRef} style={{ width: '100%', maxWidth: '440px', position: 'relative' }}>
      <div className="search-container">
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: '12px' }}>
          <Search size={22} strokeWidth={2.5} color="var(--primary)" style={{ opacity: 0.8 }} />
          <input 
            className="search-input"
            placeholder="Search street, ward name or number..." 
            value={query}
            onChange={handleSearch}
            onFocus={() => { if(results.length > 0) setIsOpen(true) }}
          />
        </div>
        
        <button 
          className={`locate-btn ${isDetecting ? 'detecting' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            if (onDetectLocation) onDetectLocation();
          }}
          disabled={isDetecting}
          title="Locate me"
          type="button"
        >
          {isDetecting ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Navigation size={20} />
          )}
        </button>
      </div>

      {isOpen && query.trim() !== '' && (
        <div className="search-results-dropdown">
          {results.length === 0 ? (
             <div style={{ padding: '20px', textAlign: 'center' }}>
               <div style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 500 }}>
                 No matching ward or street found
               </div>
               <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>
                 Try searching for a ward number (e.g., "94") or a major street
               </div>
             </div>
          ) : (
            results.map((r, i) => (
              <div 
                key={r.id || i} 
                className="result-item"
                onClick={(e) => handleSelect(e, r)}
              >
                <div className="result-item-main">
                  <div className="result-icon-wrapper">
                    {r.type === 'street' ? (
                      <Navigation size={16} color="var(--primary)" strokeWidth={2.5} />
                    ) : (
                      <MapIcon size={16} color="var(--success)" strokeWidth={2.5} />
                    )}
                  </div>
                  <span className="result-title">{r.title}</span>
                </div>
                <div className="result-meta">
                  Ward {r.ward_no}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default WardSearch;
