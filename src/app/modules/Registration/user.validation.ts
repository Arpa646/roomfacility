import { object, string, number, email } from "zod";

export const userValidationSchema = object({
  name: string().min(6, 'Name must be at least 6 characters long'),
  email: string().email('Invalid email address'),
  password: string().min(6, 'Password must be at least 6 characters long'),
  phone: string().min(1, 'Phone is required'),
  role: string().min(1, 'Role is required'),
  address: string().min(1, 'Address is required'),
});
