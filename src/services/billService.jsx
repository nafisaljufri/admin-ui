import axios from "axios";

const API_URL = "https://jwt-auth-eight-neon.vercel.app";

export const getBillsService = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/bills`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Bill Service Error:", error.response);

    throw {
      status: error.response?.status,
      msg: error.response?.data?.msg || "Gagal mengambil data bills",
    };
  }
};
