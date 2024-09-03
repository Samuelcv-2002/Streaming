import { sign } from 'jsonwebtoken';
import { JWT_KEY } from '../config/env';

export function generateToken(payload: any): string {
    return sign(payload, JWT_KEY as string, { expiresIn: '1h' }); // Expira en 1 hora
}
