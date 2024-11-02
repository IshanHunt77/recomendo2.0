import { Router } from 'express';
import {router as adminRoutes} from './admin'; // Ensure this points to the correct path
import { userRoutes } from './user';
const routes = Router();

// Use the admin routes under the '/admin' path
routes.use('/admin', adminRoutes);
routes.use('/api/v1',userRoutes)

export default routes;