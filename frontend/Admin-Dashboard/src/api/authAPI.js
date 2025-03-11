// export const API_BASE_URL = "https://erp-r0hx.onrender.com/api/auth";

export const adminSignUp = async (userData) => {
  try {
    const response = await fetch(
      "https://erp-r0hx.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Signup failed!");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const adminLogin = async (credentials) => {
  try {
    const response = await fetch(
      "https://erp-r0hx.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Login failed! Check your credentials."
      );
    }

    const data = await response.json();
    localStorage.setItem("token", data.token); // Store token for authentication
    localStorage.setItem("adminName", data.user.name); // Store admin's name

    return data;
  } catch (error) {
    throw error;
  }
};
