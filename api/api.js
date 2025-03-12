export const fetchUsers = async () => {
    try {
      const response = await fetch("https://random-data-api.com/api/users/random_user?size=80");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };
  