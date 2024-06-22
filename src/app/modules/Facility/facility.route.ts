import express from 'express';
import { userControllers } from './user.controller';

import { facilityController } from './facility.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../Registration/user.constant';


const router = express.Router();

router.post('/',auth(USER_ROLE.user), facilityController.createFacility);
router.get('/', facilityController.getAllFacility);
router.put('/:id', facilityController.updateFacility);
router.delete('/:id', facilityController.deleteFacility);


export const FacilityRoutes = router;
