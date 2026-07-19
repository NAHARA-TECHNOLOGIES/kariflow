/**
 * Service to fetch user location data from IP
 */
async function fetchWithTimeout(url: string, timeout = 3000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (e) {
    clearTimeout(id);
    throw e;
  }
}

export async function fetchUserLocation() {
  // Try 1: ipwho.is (Reliable, HTTPS, CORS friendly)
  try {
    const response = await fetchWithTimeout('https://ipwho.is/');
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        return {
          country: data.country || 'Unknown',
          region: data.region || 'Unknown',
          city: data.city || 'Unknown',
          ip: data.ip || 'Unknown',
          method: 'ipwhois'
        };
      }
    }
  } catch { /* silent */ }

  // Try 2: FreeIPAPI (CORS friendly, HTTPS)
  try {
    const response = await fetchWithTimeout('https://freeipapi.com/api/json');
    if (response.ok) {
      const data = await response.json();
      return {
        country: data.countryName || 'Unknown',
        region: data.regionName || 'Unknown',
        city: data.cityName || 'Unknown',
        ip: data.ipAddress || 'Unknown',
        method: 'freeipapi'
      };
    }
  } catch { /* silent */ }

  // Try 3: Cloudflare Trace (Very reliable for IP)
  try {
    const response = await fetchWithTimeout('https://www.cloudflare.com/cdn-cgi/trace');
    if (response.ok) {
      const text = await response.text();
      const data: Record<string, string> = {};
      text.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) data[key] = value.trim();
      });
      
      if (data.ip) {
        return {
          country: data.loc || 'Unknown',
          region: data.colo || 'Cloudflare Trace',
          city: 'Unknown',
          ip: data.ip,
          method: 'cloudflare'
        };
      }
    }
  } catch { /* silent */ }

  // Try 4: DB-IP
  try {
    const response = await fetchWithTimeout('https://api.db-ip.com/v2/free/self');
    if (response.ok) {
      const data = await response.json();
      return {
        country: data.countryName || 'Unknown',
        region: data.stateProv || 'Unknown',
        city: data.city || 'Unknown',
        ip: data.ipAddress || 'Unknown',
        method: 'dbip'
      };
    }
  } catch { /* silent */ }

  return null;
}

/**
 * Global location cache to avoid redundant API calls
 */
let cachedLocation: Record<string, unknown> | null = null;

export async function getCachedLocation() {
  if (cachedLocation) return cachedLocation;
  
  // Try session storage first
  const stored = sessionStorage.getItem('kariflow_user_location');
  if (stored) {
    try {
      cachedLocation = JSON.parse(stored);
      return cachedLocation;
    } catch {
      sessionStorage.removeItem('kariflow_user_location');
    }
  }

  // Fetch new
  try {
    const location = await fetchUserLocation();
    if (location) {
      cachedLocation = location;
      sessionStorage.setItem('kariflow_user_location', JSON.stringify(location));
    }
  } catch {
    console.debug('Location fetch failed');
  }
  
  return cachedLocation;
}
