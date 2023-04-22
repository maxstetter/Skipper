"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/login";
exports.ids = ["pages/api/login"];
exports.modules = {

/***/ "spotify-web-api-node":
/*!***************************************!*\
  !*** external "spotify-web-api-node" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("spotify-web-api-node");

/***/ }),

/***/ "(api)/./pages/api/login.js":
/*!****************************!*\
  !*** ./pages/api/login.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\nconst SpotifyWebApi = __webpack_require__(/*! spotify-web-api-node */ \"spotify-web-api-node\");\n//const URL = 'https://skipp-er.herokuapp.com/'\nconst URL = \"http://localhost:3000\";\n/* \nFUNCTIONALITY:\nhandles requests at '/login' when users decide to host a session and\nthus need to login with their spotify account. \n\nHOW:\nUses SpotifyWebApi node package to make a request to spotify api at clientID\nand Secret bt using the code given from login.\nReturns tokens for other spotify api calls.\n*/ //TODO: remove secret from github repo.\nfunction handler(req, res) {\n    const code = req.body.code;\n    const spotifyApi = new SpotifyWebApi({\n        redirectUri: URL,\n        //redirectUri: 'http://localhost:3000',\n        clientId: \"8600f707689e46bd9426b2afd625d379\",\n        clientSecret: \"f30da561b7894a9abc84375defae71eb\"\n    });\n    spotifyApi.authorizationCodeGrant(code).then((data)=>{\n        res.json({\n            accessToken: data.body.access_token,\n            refreshToken: data.body.refresh_token,\n            expiresIn: data.body.expires_in\n        });\n    }).catch((err)=>{\n        //console.log('Error: ', err);\n        res.status(400);\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvbG9naW4uanMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLGdCQUFnQkMsbUJBQU9BLENBQUM7QUFDOUIsK0NBQStDO0FBQy9DLE1BQU1DLE1BQU07QUFFWjs7Ozs7Ozs7O0FBU0EsR0FHQSx1Q0FBdUM7QUFDeEIsU0FBU0MsUUFBUUMsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFDdEMsTUFBTUMsT0FBT0YsSUFBSUcsSUFBSSxDQUFDRCxJQUFJO0lBQzFCLE1BQU1FLGFBQWEsSUFBSVIsY0FBYztRQUNqQ1MsYUFBYVA7UUFDYix1Q0FBdUM7UUFDdkNRLFVBQVU7UUFDVkMsY0FBYztJQUNsQjtJQUVBSCxXQUFXSSxzQkFBc0IsQ0FBQ04sTUFDakNPLElBQUksQ0FBQ0MsQ0FBQUEsT0FBUTtRQUNWVCxJQUFJVSxJQUFJLENBQUM7WUFDTEMsYUFBYUYsS0FBS1AsSUFBSSxDQUFDVSxZQUFZO1lBQ25DQyxjQUFjSixLQUFLUCxJQUFJLENBQUNZLGFBQWE7WUFDckNDLFdBQVdOLEtBQUtQLElBQUksQ0FBQ2MsVUFBVTtRQUNuQztJQUNKLEdBQUdDLEtBQUssQ0FBQ0MsQ0FBQUEsTUFBTztRQUNaLDhCQUE4QjtRQUM5QmxCLElBQUltQixNQUFNLENBQUM7SUFDZjtBQUNKLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9za2lwcGVyLy4vcGFnZXMvYXBpL2xvZ2luLmpzP2FlODgiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU3BvdGlmeVdlYkFwaSA9IHJlcXVpcmUoJ3Nwb3RpZnktd2ViLWFwaS1ub2RlJyk7XG4vL2NvbnN0IFVSTCA9ICdodHRwczovL3NraXBwLWVyLmhlcm9rdWFwcC5jb20vJ1xuY29uc3QgVVJMID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCdcblxuLyogXG5GVU5DVElPTkFMSVRZOlxuaGFuZGxlcyByZXF1ZXN0cyBhdCAnL2xvZ2luJyB3aGVuIHVzZXJzIGRlY2lkZSB0byBob3N0IGEgc2Vzc2lvbiBhbmRcbnRodXMgbmVlZCB0byBsb2dpbiB3aXRoIHRoZWlyIHNwb3RpZnkgYWNjb3VudC4gXG5cbkhPVzpcblVzZXMgU3BvdGlmeVdlYkFwaSBub2RlIHBhY2thZ2UgdG8gbWFrZSBhIHJlcXVlc3QgdG8gc3BvdGlmeSBhcGkgYXQgY2xpZW50SURcbmFuZCBTZWNyZXQgYnQgdXNpbmcgdGhlIGNvZGUgZ2l2ZW4gZnJvbSBsb2dpbi5cblJldHVybnMgdG9rZW5zIGZvciBvdGhlciBzcG90aWZ5IGFwaSBjYWxscy5cbiovXG4gXG5cbi8vVE9ETzogcmVtb3ZlIHNlY3JldCBmcm9tIGdpdGh1YiByZXBvLlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1xuICAgIGNvbnN0IGNvZGUgPSByZXEuYm9keS5jb2RlO1xuICAgIGNvbnN0IHNwb3RpZnlBcGkgPSBuZXcgU3BvdGlmeVdlYkFwaSh7XG4gICAgICAgIHJlZGlyZWN0VXJpOiBVUkwsXG4gICAgICAgIC8vcmVkaXJlY3RVcmk6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnLFxuICAgICAgICBjbGllbnRJZDogJzg2MDBmNzA3Njg5ZTQ2YmQ5NDI2YjJhZmQ2MjVkMzc5JyxcbiAgICAgICAgY2xpZW50U2VjcmV0OiAnZjMwZGE1NjFiNzg5NGE5YWJjODQzNzVkZWZhZTcxZWInLFxuICAgIH0pXG5cbiAgICBzcG90aWZ5QXBpLmF1dGhvcml6YXRpb25Db2RlR3JhbnQoY29kZSlcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgYWNjZXNzVG9rZW46IGRhdGEuYm9keS5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICByZWZyZXNoVG9rZW46IGRhdGEuYm9keS5yZWZyZXNoX3Rva2VuLFxuICAgICAgICAgICAgZXhwaXJlc0luOiBkYXRhLmJvZHkuZXhwaXJlc19pbixcbiAgICAgICAgfSlcbiAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdFcnJvcjogJywgZXJyKTtcbiAgICAgICAgcmVzLnN0YXR1cyg0MDApO1xuICAgIH0pXG59Il0sIm5hbWVzIjpbIlNwb3RpZnlXZWJBcGkiLCJyZXF1aXJlIiwiVVJMIiwiaGFuZGxlciIsInJlcSIsInJlcyIsImNvZGUiLCJib2R5Iiwic3BvdGlmeUFwaSIsInJlZGlyZWN0VXJpIiwiY2xpZW50SWQiLCJjbGllbnRTZWNyZXQiLCJhdXRob3JpemF0aW9uQ29kZUdyYW50IiwidGhlbiIsImRhdGEiLCJqc29uIiwiYWNjZXNzVG9rZW4iLCJhY2Nlc3NfdG9rZW4iLCJyZWZyZXNoVG9rZW4iLCJyZWZyZXNoX3Rva2VuIiwiZXhwaXJlc0luIiwiZXhwaXJlc19pbiIsImNhdGNoIiwiZXJyIiwic3RhdHVzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/login.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/login.js"));
module.exports = __webpack_exports__;

})();