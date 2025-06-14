const fetchData = async (endpoint, method = "GET", body, token = null) => {
  try {
    const apiUrl = import.meta.env.VITE_DEV_API_BASE_URL;

    const response = await fetch(`${apiUrl}/${endpoint}`, {
      method,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    console.log(response);
    if (!response.ok) {
      if (response.status === 403) {
        //If token is invalid or missing, clear token and redirect to login
        localStorage.removeItem("token");
        throw new Error("Unauthorized!");
      }
      const errorData = await response.json();
      console.error(`Error ${method} from ${endpoint}:`, errorData);
      throw new Error(
        `Error ${method} form ${endpoint}: ${errorData.message} || ${response.statusText}`
      );
    }
    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMenu = async () => {
  return fetchData("api/products/", "GET", null, null);
};

export const saveOrder = async (body) => {
  return fetchData("api/orders/", "POST", body, null )
}

export const getOrders = async () => {
  return fetchData("/api/orders/", "GET", null, null)
}