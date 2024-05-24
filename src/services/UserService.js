// import AbstractService from "./AbstractService";
// import Logger from "../common/Logger";
// import Cookies from "js-cookie";

// class UserService extends AbstractService {
//   constructor() {
//     super();
//     this.logger = new Logger("UserService");
//     this.language = "en";
//     this.GUEST = {
//       id: -1,
//       name: "Guest",
//       email: "guest@quant-ux.com",
//       role: "guest",
//       lastlogin: 0,
//       lastNotification: 0,
//       tos: false,
//       paidUntil: 0,
//       plan: "Free",
//     };
//   }

//   async signup(data) {
//     return this._post("https://app.quant-ux.com/#/rest/user", data);
//   }

//   async login(data) {
//     let user = await this._post("rest/login/", data);
//     if (!user.errors) {
//       this.setUser(user);
//     }
//     return user;
//   }

//   save(userID, data) {
//     return this._post("rest/user/" + userID + ".json", data);
//   }

//   logout() {
//     localStorage.removeItem("quxUser");
//     Cookies.remove("quxUserLoggedIn");
//     Cookies.remove("quxUserLoggedIn", { path: "/" });
//     Cookies.remove("quxUserLoggedIn", { path: "/", domain: "quant-ux.com" });
//     return this._delete("rest/login/");
//   }

//   reset(email) {
//     return this._post("/rest/user/password/request", { email: email });
//   }

//   reset2(email, password, token) {
//     let data = {
//       email: email,
//       password: password,
//       key: token,
//     };
//     return this._post("/rest/user/password/set", data);
//   }

//   retire() {
//     this.logger.info("retire()", "enter > Oh oh");
//     return this._get("/rest/retire");
//   }

//   load() {
//     if (!this.user) {
//       this.logger.info("getUser()", "load");
//       let s = Cookies.get("quxUserLoggedIn");
//       if (s == undefined || s === null || s === "") {
//         this.logger.info("getUser()", "from localstorage");
//         s = localStorage.getItem("quxUser");
//       }
//       if (s) {
//         try {
//           const user = JSON.parse(s);
//           this.setTTL(user);
//           if (this.isValidUser(user)) {
//             this.user = user;
//             this.setToken(this.getToken());
//           } else {
//             this.user = this.GUEST;
//           }
//         } catch (error) {
//           this.logger.error("getUser", "could not parse", s);
//           this.user = this.GUEST;
//         }
//       } else {
//         this.user = this.GUEST;
//       }
//     }
//     return this.user;
//   }

//   async loadById(id) {
//     return await this._get("/rest/user/" + id + ".json");
//   }

//   getNotications() {
//     return this._get("/rest/notifications.json");
//   }

//   setLastNotication() {
//     return this._post("/rest/user/notification/last.json");
//   }

//   getLastNotication() {
//     return this._get("/rest/user/notification/last.json");
//   }

//   getUser() {
//     return this.user;
//   }

//   getToken() {

//     if (!this.user) {
//       this.load();
//     }

//     if (this.user && this.user.token) {
//       if (this.isValidUser(this.user)) {
//         return this.user.token;
//       } else {
//         this.logger.error("getToken", "Error > Token has timed out");
//         if (this.errorHandler) {
//           this.errorHandler("", {
//             tokenTimedOut: true,
//           });
//         }
//       }
//     }
//     return null;
//   }

//   isValidUser(u) {
//     if (u.exp && u.exp > 0) {
//       if (u.exp > new Date().getTime()) {
//         return true;
//       } else {
//         this.logger.error("isValidUser", "Error > Token has timed out");
//         this.logout();
//         location.href = "#/";
//       }
//     }
//     return false;
//   }

//   setTTL(u) {
//     if (u.token) {
//       let jwt = this.parseJwt(u.token);
//       if (jwt) {

//         u.exp = jwt.exp * 1000;
//         if (this.ttlTimeout) {
//           clearTimeout(this.ttlTimeout);
//         }
//         let waitTime = u.exp - new Date().getTime() - 5 * 60 * 1000;
//         this.ttlTimeout = setTimeout(() => {
//           location.href = `#/logout.html`;
//         }, waitTime);
//         this.logger.log(-1, "setTTL", "User valid until", new Date(u.exp));
//         this.logger.log(
//           -1,
//           "setTTL",
//           "Auto loggout  in " + waitTime / 1000 + " sec"
//         );
//       } else {
//         this.logger.log(-1, "setTTL", "exit > NO token");
//       }
//     }
//   }

//   parseJwt(token) {
//     try {
//       var base64Url = token.split(".")[1];
//       var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//       var jsonPayload = decodeURIComponent(
//         atob(base64)
//           .split("")
//           .map(function (c) {
//             return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//           })
//           .join("")
//       );
//       return JSON.parse(jsonPayload);
//     } catch (e) {
//       this.logger.error("parseJwt", "error > could not parse token", e);
//     }
//     return null;
//   }

//   setUser(u) {
//     this.setTTL(u);
//     this.user = u;
//     localStorage.setItem("quxUser", JSON.stringify(u));
//     Cookies.set("quxUserLoggedIn", JSON.stringify(u), {
//       domain: "quant-ux.com",
//       expires: 7,
//       secure: true,
//       path: "/",
//     });
//   }

//   setLanguage(langauge) {
//     this.language = langauge;
//     localStorage.setItem("quxLanguage", this.language);
//   }

//   getLanguage() {
//     let s = localStorage.getItem("quxLanguage");
//     if (s) {
//       this.language = s;
//     } else {
//       this.language = navigator.language;
//     }
//     return this.language;
//   }

//   contact(name, email, message) {
//     return this._post("/rest/contact", {
//       name: name,
//       email: email,
//       message: message,
//     });
//   }

//   deleteImage(user) {
//     return this._delete("/rest/user/" + user.id + "/images/" + user.image);
//   }
// }
// export default new UserService();

// new code
// import AbstractService from "./AbstractService";
// import Logger from "../common/Logger";
// import Cookies from "js-cookie";

// class UserService extends AbstractService {
//   constructor() {
//     super();
//     this.logger = new Logger("UserService");
//     this.language = "en";
//     this.DEFAULT_USER = {
//       id: 1,
//       name: "Default User",
//       email: "default@quant-ux.com",
//       role: "user",
//       lastlogin: new Date().getTime(),
//       lastNotification: new Date().getTime(),
//       tos: true,
//       paidUntil: new Date().getTime() + 365 * 24 * 60 * 60 * 1000, 
//       plan: "free",
//       token: "default_valid_token_here",
//       exp: new Date().getTime() + 60 * 60 * 1000, 
//     };


//     this.setUser(this.DEFAULT_USER);
//   }

//   async signup(data) {
//     return this._post("https://app.quant-ux.com/#/rest/user", data);
//   }

//   async login(data) {
//     let user = await this._post("rest/login/", data);
//     if (!user.errors) {
//       this.setUser(user);
//     }
//     return user;
//   }

//   save(userID, data) {
//     return this._post("rest/user/" + userID + ".json", data);
//   }

//   logout() {
//     localStorage.removeItem("quxUser");
//     Cookies.remove("quxUserLoggedIn");
//     Cookies.remove("quxUserLoggedIn", { path: "/" });
//     Cookies.remove("quxUserLoggedIn", { path: "/", domain: "quant-ux.com" });
//     this.user = this.DEFAULT_USER; 
//     return this._delete("rest/login/");
//   }

//   reset(email) {
//     return this._post("/rest/user/password/request", { email: email });
//   }

//   reset2(email, password, token) {
//     let data = {
//       email: email,
//       password: password,
//       key: token,
//     };
//     return this._post("/rest/user/password/set", data);
//   }

//   retire() {
//     this.logger.info("retire()", "enter > Oh oh");
//     return this._get("/rest/retire");
//   }

//   load() {
//     if (!this.user || this.user === this.DEFAULT_USER) {
//       this.logger.info("getUser()", "load");
//       let s = Cookies.get("quxUserLoggedIn");
//       if (!s) {
//         this.logger.info("getUser()", "from localstorage");
//         s = localStorage.getItem("quxUser");
//       }
//       if (s) {
//         try {
//           const user = JSON.parse(s);
//           this.setTTL(user);
//           if (this.isValidUser(user)) {
//             this.user = user;
//             this.setToken(this.getToken());
//           } else {
//             this.user = this.DEFAULT_USER;
//           }
//         } catch (error) {
//           this.logger.error("getUser", "could not parse", s);
//           this.user = this.DEFAULT_USER;
//         }
//       } else {
//         this.user = this.DEFAULT_USER;
//       }
//     }
//     return this.user;
//   }

//   async loadById(id) {
//     return await this._get("/rest/user/" + id + ".json");
//   }

//   getNotications() {
//     return this._get("/rest/notifications.json");
//   }

//   setLastNotication() {
//     return this._post("/rest/user/notification/last.json");
//   }

//   getLastNotication() {
//     return this._get("/rest/user/notification/last.json");
//   }

//   getUser() {
//     return this.user;
//   }

//   getToken() {
//     if (!this.user) {
//       this.load();
//     }

//     if (this.user && this.user.token) {
//       if (this.isValidUser(this.user)) {
//         return this.user.token;
//       } else {
//         this.logger.error("getToken", "Error > Token has timed out");
//         if (this.errorHandler) {
//           this.errorHandler("", {
//             tokenTimedOut: true,
//           });
//         }
//       }
//     }
//     return null;
//   }

//   isValidUser(u) {
//     if (u === this.DEFAULT_USER) {
//       return true;
//     }

//     if (u.exp && u.exp > 0) {
//       if (u.exp > new Date().getTime()) {
//         return true;
//       } else {
//         this.logger.error("isValidUser", "Error > Token has timed out");
//         this.logout();
//         location.href = "#/";
//       }
//     }
//     return false;
//   }

//   setTTL(u) {
//     if (u.token) {
//       let jwt = this.parseJwt(u.token);
//       if (jwt) {
//         u.exp = jwt.exp * 1000;
//         if (this.ttlTimeout) {
//           clearTimeout(this.ttlTimeout);
//         }
//         let waitTime = u.exp - new Date().getTime() - 5 * 60 * 1000;
//         this.ttlTimeout = setTimeout(() => {
//           location.href = `#/logout.html`;
//         }, waitTime);
//         this.logger.log(-1, "setTTL", "User valid until", new Date(u.exp));
//         this.logger.log(
//           -1,
//           "setTTL",
//           "Auto loggout  in " + waitTime / 1000 + " sec"
//         );
//       } else {
//         this.logger.log(-1, "setTTL", "exit > NO token");
//       }
//     }
//   }

//   parseJwt(token) {
//     try {
//       var base64Url = token.split(".")[1];
//       var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//       var jsonPayload = decodeURIComponent(
//         atob(base64)
//           .split("")
//           .map(function (c) {
//             return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//           })
//           .join("")
//       );
//       return JSON.parse(jsonPayload);
//     } catch (e) {
//       this.logger.error("parseJwt", "error > could not parse token", e);
//     }
//     return null;
//   }

//   setUser(u) {
//     this.setTTL(u);
//     this.user = u;
//     localStorage.setItem("quxUser", JSON.stringify(u));
//     Cookies.set("quxUserLoggedIn", JSON.stringify(u), {
//       domain: "quant-ux.com",
//       expires: 7,
//       secure: true,
//       path: "/",
//     });
//   }

//   setLanguage(langauge) {
//     this.language = langauge;
//     localStorage.setItem("quxLanguage", this.language);
//   }

//   getLanguage() {
//     let s = localStorage.getItem("quxLanguage");
//     if (s) {
//       this.language = s;
//     } else {
//       this.language = navigator.language;
//     }
//     return this.language;
//   }

//   contact(name, email, message) {
//     return this._post("/rest/contact", {
//       name: name,
//       email: email,
//       message: message,
//     });
//   }

//   deleteImage(user) {
//     return this._delete("/rest/user/" + user.id + "/images/" + user.image);
//   }
// }

// export default new UserService();

// new code
import AbstractService from "./AbstractService";
import Logger from "../common/Logger";
import Cookies from "js-cookie";

class UserService extends AbstractService {
  constructor() {
    super();
    this.logger = new Logger("UserService");
    this.language = "en";
    this.DEFAULT_USER = {
      id: 1,
      name: "Default User",
      email: "default@quant-ux.com",
      role: "user",
      lastlogin: new Date().getTime(),
      lastNotification: new Date().getTime(),
      tos: true,
      paidUntil: new Date().getTime() + 365 * 24 * 60 * 60 * 1000, // 1 year from now
      plan: "free",
      token: "default_valid_token_here",
      exp: new Date().getTime() + 60 * 60 * 1000, // Token valid for 1 hour
    };

    // Attempt to load user automatically
    this.user = this.load();
  }

  async signup(data) {
    return this._post("https://app.quant-ux.com/#/rest/user", data);
  }

  async login(data) {
    let user = await this._post("rest/login/", data);
    if (!user.errors) {
      this.setUser(user);
    }
    return user;
  }

  save(userID, data) {
    return this._post("rest/user/" + userID + ".json", data);
  }

  logout() {
    localStorage.removeItem("quxUser");
    Cookies.remove("quxUserLoggedIn");
    Cookies.remove("quxUserLoggedIn", { path: "/" });
    Cookies.remove("quxUserLoggedIn", { path: "/", domain: "quant-ux.com" });
    this.user = this.DEFAULT_USER; // Reset to DEFAULT user on logout
    return this._delete("rest/login/");
  }

  reset(email) {
    return this._post("/rest/user/password/request", { email: email });
  }

  reset2(email, password, token) {
    let data = {
      email: email,
      password: password,
      key: token,
    };
    return this._post("/rest/user/password/set", data);
  }

  retire() {
    this.logger.info("retire()", "enter > Oh oh");
    return this._get("/rest/retire");
  }

  load() {
    let user = this.DEFAULT_USER;

    try {
      const userData = Cookies.get("quxUserLoggedIn") || localStorage.getItem("quxUser");
      if (userData) {
        user = JSON.parse(userData);
        this.setTTL(user);
        if (!this.isValidUser(user)) {
          user = this.DEFAULT_USER;
        }
      }
    } catch (error) {
      this.logger.error("load", "Error loading user data", error);
    }

    this.setToken(this.getToken());
    return user;
  }

  async loadById(id) {
    return await this._get("/rest/user/" + id + ".json");
  }

  getNotications() {
    return this._get("/rest/notifications.json");
  }

  setLastNotication() {
    return this._post("/rest/user/notification/last.json");
  }

  getLastNotication() {
    return this._get("/rest/user/notification/last.json");
  }

  getUser() {
    return this.user;
  }

  getToken() {
    if (this.user && this.user.token) {
      if (this.isValidUser(this.user)) {
        return this.user.token;
      } else {
        this.logger.error("getToken", "Error > Token has timed out");
        if (this.errorHandler) {
          this.errorHandler("", {
            tokenTimedOut: true,
          });
        }
      }
    }
    return null;
  }

  isValidUser(u) {
    if (u === this.DEFAULT_USER) {
      return true;
    }

    if (u.exp && u.exp > 0) {
      if (u.exp > new Date().getTime()) {
        return true;
      } else {
        this.logger.error("isValidUser", "Error > Token has timed out");
        this.logout();
        location.href = "#/";
      }
    }
    return false;
  }

  setTTL(u) {
    if (u.token) {
      let jwt = this.parseJwt(u.token);
      if (jwt) {
        u.exp = jwt.exp * 1000;
        if (this.ttlTimeout) {
          clearTimeout(this.ttlTimeout);
        }
        let waitTime = u.exp - new Date().getTime() - 5 * 60 * 1000;
        this.ttlTimeout = setTimeout(() => {
          location.href = `#/logout.html`;
        }, waitTime);
        this.logger.log(-1, "setTTL", "User valid until", new Date(u.exp));
        this.logger.log(
          -1,
          "setTTL",
          "Auto logout in " + waitTime / 1000 + " sec"
        );
      } else {
        this.logger.log(-1, "setTTL", "exit > NO token");
      }
    }
  }

  parseJwt(token) {
    try {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      this.logger.error("parseJwt", "error > could not parse token", e);
    }
    return null;
  }

  setUser(u) {
    this.setTTL(u);
    this.user = u;
    localStorage.setItem("quxUser", JSON.stringify(u));
    Cookies.set("quxUserLoggedIn", JSON.stringify(u), {
      domain: "drag-drop-vuejs-alpha.vercel.app",
      expires: 7,
      secure: true,
      path: "/",
    });
  }

  setLanguage(langauge) {
    this.language = langauge;
    localStorage.setItem("quxLanguage", this.language);
  }

  getLanguage() {
    let s = localStorage.getItem("quxLanguage");
    if (s) {
      this.language = s;
    } else {
      this.language = navigator.language;
    }
    return this.language;
  }

  contact(name, email, message) {
    return this._post("/rest/contact", {
      name: name,
      email: email,
      message: message,
    });
  }

  deleteImage(user) {
    return this._delete("/rest/user/" + user.id + "/images/" + user.image);
  }
}

export default new UserService();
