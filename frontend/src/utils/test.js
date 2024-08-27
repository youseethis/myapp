// Import the generateRandomPassword function correctly
import generateRandomPassword from './passwordUtils';

// Define a function to generate a password
const password = () =>{
const getPassword = () => {
    const password = generateRandomPassword(12); // Generate a password of length 12
    return password; // Return the generated password
};

// Example usage
const generatedPassword = getPassword();
//console.log('Generated Password:', generatedPassword);
}

export default password