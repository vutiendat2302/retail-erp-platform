import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:8084',
  headers: {
    'Content-Type': 'application/json',
  },
  transformResponse: [(data) => {
    if (typeof data === 'string') {
      try {
        // 🔧 FIX: Replace tất cả các field ID có số lớn
        let fixedData = data;
        
        // Fix các pattern ID khác nhau
        const idPatterns = [
          /"id":\s*(\d{15,})/g,          // "id": 123456789
          /"Id":\s*(\d{15,})/g,          // "Id": 123456789  
          /"orderId":\s*(\d{15,})/g,     // "orderId": 123456789
          /"orderID":\s*(\d{15,})/g,     // "orderID": 123456789
          /"productId":\s*(\d{15,})/g,   // "productId": 123456789
          /"customerId":\s*(\d{15,})/g,  // "customerId": 123456789
        ];
        
        idPatterns.forEach(pattern => {
          const patternName = pattern.source.split('"')[1]; // Extract field name
          fixedData = fixedData.replace(pattern, `"${patternName}":"$1"`);
        });
        
        return JSON.parse(fixedData);
      } catch (e) {
        console.error('JSON parse error:', e);
        return data;
      }
    }
    return data;
  }]
});
export default api;
