import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'; // import mta3 Injectable, CanActivate w ExecutionContext mta3 NestJS
import { Reflector } from '@nestjs/core'; // import mta3 Reflector 
import { UserRole } from '../entities/user.entity'; // import roles mta3 user

@Injectable() // decorator mta3 guard
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // injection mta3 Reflector

  canActivate(context: ExecutionContext): boolean {
    // njibou roles required 
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true; // idha ma famach roles required, n5alou l accès
    }
    
    // njibou user mta3 request
    const { user } = context.switchToHttp().getRequest();
    // nverifyw kan role mta3 user ymatchi m3a wahed men requiredRoles
    return requiredRoles.some((role) => user.role === role);
  }
}
