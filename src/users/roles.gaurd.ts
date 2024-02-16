import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';
import { Role } from './entities/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        //reflectior :  get the details about the metadata
        const roles = this.reflector.getAllAndOverride<Role[]>('roles',
            //get metadata for specific context
            [context.getHandler(), context.getClass()]);
        if (!roles) {
            return true;
        }
        const user = {
            name: "Sherlock225B",
            roles: [Role.ADMIN]
        };
        return roles.some(role => user.roles.includes(role));
    }
}