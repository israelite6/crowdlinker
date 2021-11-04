import { SetMetadata } from '@nestjs/common';
import { Permission } from './../enums/permission.enum';
export const PERMISSION_KEY = 'permission';
export const RequiredPermissions = (...permissions: Permission[]) => {
  console.log(permissions);
  return SetMetadata(PERMISSION_KEY, permissions);
};
