"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//this is gobal handler error crack system all error are catch here
const notFound = (err, req, res, next) => {
    return res.status(400).json({
        success: 'false',
        massage: 'api not found',
        error: ''
    });
};
exports.default = notFound;
