// Node.js script to clear local storage (simulate browser environment)

function clearLocalStorage() {
    try {
      const localStorage = require('node-localstorage');
      localStorage.clear();
      console.log('Local storage cleared successfully.');
    } catch (error) {
      console.error('Error clearing local storage:', error);
    }
  }
  
  // Example usage:
  clearLocalStorage();