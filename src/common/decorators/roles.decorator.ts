import { SetMetadata } from '@nestjs/common';

export enum Role {
  MEMBER = 'Member',
  ADMIN = 'Admin',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);