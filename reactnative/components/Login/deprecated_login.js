import axios from "axios";

const API_URL = "https://appetite.kr31sw1chs.de";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/UserService/Authenticate", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email, name, password) {
    return axios.post(API_URL + "/UserService", {
      email,
      name,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();