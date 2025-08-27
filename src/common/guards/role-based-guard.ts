import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const request = context.switchToHttp().getRequest();

        try {
            // If no specific roles required, just check if authenticated
            if (!requiredRoles) {
                return true;
            }

            // Check if user has required role
            const hasRole = requiredRoles.some((role) => {
                if (role === Role.ADMIN) {
                    return request.user.role.name === 'Admin';
                }
                if (role === Role.MEMBER) {
                    return true; // Any authenticated user
                }
                return request.user.role === role;
            });

            if (!hasRole) {
                throw new ForbiddenException('Insufficient privileges');
            }

            return true;
        } catch (error) {
            if (error instanceof ForbiddenException) {
                throw error;
            }
            throw new UnauthorizedException('Invalid token');
        }
    }
}