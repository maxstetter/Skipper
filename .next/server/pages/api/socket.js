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
exports.id = "pages/api/socket";
exports.ids = ["pages/api/socket"];
exports.modules = {

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

module.exports = import("socket.io");;

/***/ }),

/***/ "(api)/./pages/api/socket.js":
/*!*****************************!*\
  !*** ./pages/api/socket.js ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! socket.io */ \"socket.io\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([socket_io__WEBPACK_IMPORTED_MODULE_0__]);\nsocket_io__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nfunction SocketHandler(req, res) {\n    if (res.socket.server.io) {\n        console.log(\"Socket is already running...\");\n    //res.end() // Get rid of this later\n    } else {\n        console.log(\"Socket is initializing...\");\n        const io = new socket_io__WEBPACK_IMPORTED_MODULE_0__.Server(res.socket.server);\n        res.socket.server.io = io;\n        io.on(\"connection\", (socket)=>{\n            console.log(`User Connected: ${socket.id}`);\n            socket.on(\"sendMessage\", (data)=>{\n                console.log(`Message for ${data.room} received.`);\n                socket.to(data.room).emit(\"receiveMessage\", data);\n            });\n            socket.on(\"joinRoom\", (data)=>{\n                socket.join(data);\n                console.log(`${socket.id} joined room ${data}`);\n            //socket.to(data).emit('receiveJoinRoom', data);\n            });\n            socket.on(\"sendVote\", (data)=>{\n                console.log(`Vote from ${socket.id}.`);\n                socket.to(data.room).emit(\"receiveVote\", data);\n            });\n            socket.on(\"sendUpdate\", (data)=>{\n                console.log(`Update from ${socket.id}. Package: ${data.pckg}`);\n                socket.to(data.room).emit(\"receiveUpdate\", data);\n            });\n            socket.on(\"sendUpdateRequest\", (data)=>{\n                console.log(`Update request from ${socket.id}.`);\n                socket.to(data.room).emit(\"receiveUpdateRequest\", data);\n            });\n        });\n    }\n    // const io = new Server(res.socket.server)\n    // res.socket.server.io = io\n    res.end();\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocketHandler);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvc29ja2V0LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQW1DO0FBRW5DLFNBQVNDLGNBQWNDLEdBQUcsRUFBRUMsR0FBRyxFQUFDO0lBQzVCLElBQUlBLElBQUlDLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDQyxFQUFFLEVBQUU7UUFDdEJDLFFBQVFDLEdBQUcsQ0FBQztJQUVaLG9DQUFvQztJQUN4QyxPQUFPO1FBQ0hELFFBQVFDLEdBQUcsQ0FBQztRQUNaLE1BQU1GLEtBQUssSUFBSU4sNkNBQU1BLENBQUNHLElBQUlDLE1BQU0sQ0FBQ0MsTUFBTTtRQUN2Q0YsSUFBSUMsTUFBTSxDQUFDQyxNQUFNLENBQUNDLEVBQUUsR0FBR0E7UUFFdkJBLEdBQUdHLEVBQUUsQ0FBQyxjQUFjTCxDQUFBQSxTQUFVO1lBQzFCRyxRQUFRQyxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRUosT0FBT00sRUFBRSxDQUFDLENBQUM7WUFFMUNOLE9BQU9LLEVBQUUsQ0FBQyxlQUFlLENBQUNFLE9BQVM7Z0JBQy9CSixRQUFRQyxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUVHLEtBQUtDLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ2hEUixPQUFPUyxFQUFFLENBQUNGLEtBQUtDLElBQUksRUFBRUUsSUFBSSxDQUFDLGtCQUFrQkg7WUFDaEQ7WUFFQVAsT0FBT0ssRUFBRSxDQUFDLFlBQVksQ0FBQ0UsT0FBUztnQkFDNUJQLE9BQU9XLElBQUksQ0FBQ0o7Z0JBQ1pKLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLEVBQUVKLE9BQU9NLEVBQUUsQ0FBQyxhQUFhLEVBQUVDLEtBQUssQ0FBQztZQUM5QyxnREFBZ0Q7WUFDcEQ7WUFFQVAsT0FBT0ssRUFBRSxDQUFDLFlBQVksQ0FBQ0UsT0FBUztnQkFDNUJKLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRUosT0FBT00sRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDckNOLE9BQU9TLEVBQUUsQ0FBQ0YsS0FBS0MsSUFBSSxFQUFFRSxJQUFJLENBQUMsZUFBZUg7WUFDN0M7WUFFQVAsT0FBT0ssRUFBRSxDQUFDLGNBQWMsQ0FBQ0UsT0FBUztnQkFDOUJKLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRUosT0FBT00sRUFBRSxDQUFDLFdBQVcsRUFBRUMsS0FBS0ssSUFBSSxDQUFDLENBQUM7Z0JBQzdEWixPQUFPUyxFQUFFLENBQUNGLEtBQUtDLElBQUksRUFBRUUsSUFBSSxDQUFDLGlCQUFpQkg7WUFDL0M7WUFFQVAsT0FBT0ssRUFBRSxDQUFDLHFCQUFxQixDQUFDRSxPQUFTO2dCQUNyQ0osUUFBUUMsR0FBRyxDQUFDLENBQUMsb0JBQW9CLEVBQUVKLE9BQU9NLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DTixPQUFPUyxFQUFFLENBQUNGLEtBQUtDLElBQUksRUFBRUUsSUFBSSxDQUFDLHdCQUF3Qkg7WUFDdEQ7UUFFSjtJQUVKLENBQUM7SUFFRCwyQ0FBMkM7SUFDM0MsNEJBQTRCO0lBSTVCUixJQUFJYyxHQUFHO0FBQ1g7QUFFQSxpRUFBZWhCLGFBQWFBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9za2lwcGVyLy4vcGFnZXMvYXBpL3NvY2tldC5qcz85MzViIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlcnZlciB9IGZyb20gJ3NvY2tldC5pbyc7XG5cbmZ1bmN0aW9uIFNvY2tldEhhbmRsZXIocmVxLCByZXMpe1xuICAgIGlmIChyZXMuc29ja2V0LnNlcnZlci5pbykge1xuICAgICAgICBjb25zb2xlLmxvZygnU29ja2V0IGlzIGFscmVhZHkgcnVubmluZy4uLicpO1xuICAgICAgICBcbiAgICAgICAgLy9yZXMuZW5kKCkgLy8gR2V0IHJpZCBvZiB0aGlzIGxhdGVyXG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1NvY2tldCBpcyBpbml0aWFsaXppbmcuLi4nKTtcbiAgICAgICAgY29uc3QgaW8gPSBuZXcgU2VydmVyKHJlcy5zb2NrZXQuc2VydmVyKVxuICAgICAgICByZXMuc29ja2V0LnNlcnZlci5pbyA9IGlvXG4gICAgICAgIFxuICAgICAgICBpby5vbignY29ubmVjdGlvbicsIHNvY2tldCA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgVXNlciBDb25uZWN0ZWQ6ICR7c29ja2V0LmlkfWApXG5cbiAgICAgICAgICAgIHNvY2tldC5vbignc2VuZE1lc3NhZ2UnLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBNZXNzYWdlIGZvciAke2RhdGEucm9vbX0gcmVjZWl2ZWQuYCk7XG4gICAgICAgICAgICAgICAgc29ja2V0LnRvKGRhdGEucm9vbSkuZW1pdCgncmVjZWl2ZU1lc3NhZ2UnLCBkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzb2NrZXQub24oJ2pvaW5Sb29tJywgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBzb2NrZXQuam9pbihkYXRhKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtzb2NrZXQuaWR9IGpvaW5lZCByb29tICR7ZGF0YX1gKTtcbiAgICAgICAgICAgICAgICAvL3NvY2tldC50byhkYXRhKS5lbWl0KCdyZWNlaXZlSm9pblJvb20nLCBkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzb2NrZXQub24oJ3NlbmRWb3RlJywgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVm90ZSBmcm9tICR7c29ja2V0LmlkfS5gKTtcbiAgICAgICAgICAgICAgICBzb2NrZXQudG8oZGF0YS5yb29tKS5lbWl0KCdyZWNlaXZlVm90ZScsIGRhdGEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNvY2tldC5vbignc2VuZFVwZGF0ZScsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFVwZGF0ZSBmcm9tICR7c29ja2V0LmlkfS4gUGFja2FnZTogJHtkYXRhLnBja2d9YCk7XG4gICAgICAgICAgICAgICAgc29ja2V0LnRvKGRhdGEucm9vbSkuZW1pdCgncmVjZWl2ZVVwZGF0ZScsIGRhdGEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNvY2tldC5vbignc2VuZFVwZGF0ZVJlcXVlc3QnLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVcGRhdGUgcmVxdWVzdCBmcm9tICR7c29ja2V0LmlkfS5gKTtcbiAgICAgICAgICAgICAgICBzb2NrZXQudG8oZGF0YS5yb29tKS5lbWl0KCdyZWNlaXZlVXBkYXRlUmVxdWVzdCcsIGRhdGEpO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8vIGNvbnN0IGlvID0gbmV3IFNlcnZlcihyZXMuc29ja2V0LnNlcnZlcilcbiAgICAvLyByZXMuc29ja2V0LnNlcnZlci5pbyA9IGlvXG5cblxuXG4gICAgcmVzLmVuZCgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBTb2NrZXRIYW5kbGVyIl0sIm5hbWVzIjpbIlNlcnZlciIsIlNvY2tldEhhbmRsZXIiLCJyZXEiLCJyZXMiLCJzb2NrZXQiLCJzZXJ2ZXIiLCJpbyIsImNvbnNvbGUiLCJsb2ciLCJvbiIsImlkIiwiZGF0YSIsInJvb20iLCJ0byIsImVtaXQiLCJqb2luIiwicGNrZyIsImVuZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/socket.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/socket.js"));
module.exports = __webpack_exports__;

})();