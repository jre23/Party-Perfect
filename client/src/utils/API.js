import axios from "axios";

export default {
     getParties: function (uid) {
          return axios.get("/api/parties/all/" + uid);
     },
     createParty: function (formObject) {
          return axios.post("/api/parties/" + formObject.creator, formObject);
     },
     getParty: function (id) {
          return axios.get("/api/parties/" + id);
     },
     updateParty: function (id, updates) {
          return axios.put("/api/parties/" + id, updates);
     },
     saveParty: function (id, uid) {
          return axios.put("/api/parties/save/" + id + "/" + uid);
     },
     deleteParty: function (id, uid) {
          return axios.delete("/api/parties/" + id + "/" + uid);
     },
     updateUser: function (uid) {
          return axios.put("/api/users/" + uid);
     },
     checkUser: function (uid) {
          return axios.get("/api/users/check/" + uid);
     },
     createUser: function (userData) {
          return axios.post("/api/users/signup", userData);
     },
     getMapBoxData: function (id) {
          return axios.get("/api/parties/mapbox/" + id);
     },
};
