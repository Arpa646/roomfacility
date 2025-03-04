"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const facility_controller_1 = require("./facility.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../Registration/user.constant");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.user), facility_controller_1.facilityController.createFacility);
router.get('/', facility_controller_1.facilityController.getAllFacility);
router.put('/:id', facility_controller_1.facilityController.updateFacility);
router.delete('/:id', facility_controller_1.facilityController.deleteFacility);
exports.FacilityRoutes = router;
