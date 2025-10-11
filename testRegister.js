// testRegister.js
import axios from "axios";

const testRegister = async () => {
  try {
    // Change email each time you want to test a new user
    const newUser = {
      name: "Sweetyyy",
      email: `sweetyyy1759906515053@example.com`, // unique email every run
      password: "mypassword123"
    };

    const response = await axios.post("http://localhost:5000/api/users", newUser);
    console.log("✅ Registration Successful:", response.data);
  } catch (error) {
    if (error.response) {
      console.log("❌ Server responded with error:", error.response.data);
    } else {
      console.log("❌ Error:", error.message);
    }
  }
};

testRegister();
