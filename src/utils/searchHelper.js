// Helper to parse 'Ward_Name' like 'Aathikulam(WD013)' to integer 13
export const extractWardNo = (wardNameString) => {
  if (!wardNameString) return null;
  // Rule: Identify pattern (WDXXX), remove WD, convert to integer
  // Regex looks for (WD followed by optional zeros then digits)
  const match = wardNameString.match(/\(WD0*(\d+)\)/i);
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  // Fallback for strings that might just have WDXXX without brackets
  const match2 = wardNameString.match(/WD0*(\d+)/i);
  if (match2 && match2[1]) {
    return parseInt(match2[1], 10);
  }
  return null;
};

// Flatten JSON into a searchable array
export const flattenLocalityData = (localityJson) => {
  const searchIndex = [];

  if (!Array.isArray(localityJson)) return searchIndex;

  localityJson.forEach(zoneObj => {
    const zoneName = zoneObj.Zone;
    if (Array.isArray(zoneObj.Wards)) {
      zoneObj.Wards.forEach(wardObj => {
        const fullWardName = wardObj.Ward_Name;
        const cleanWardName = fullWardName.split('(')[0].trim();
        const wardNo = extractWardNo(fullWardName);

        // Map the Ward itself
        searchIndex.push({
          type: 'ward',
          id: `w-${wardObj.Ward_ID}`,
          title: cleanWardName,
          ward_no: wardNo,
          zone: zoneName,
          displayLabel: `${cleanWardName} (Ward ${wardNo})`
        });

        // Map the Streets
        if (Array.isArray(wardObj.Streets)) {
          wardObj.Streets.forEach(street => {
            searchIndex.push({
              type: 'street',
              id: `s-${street.Street_ID}`,
              title: street.Street_Name,
              ward_no: wardNo,
              ward_name: cleanWardName,
              zone: zoneName,
              displayLabel: `${street.Street_Name} - Ward ${wardNo}`
            });
          });
        }
      });
    }
  });

  return searchIndex;
};
