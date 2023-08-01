import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface,
         ValidationArguments } from 'class-validator';
  
@ValidatorConstraint()
export class IsValidNameConstraint implements ValidatorConstraintInterface {
    validate(name: any, _: ValidationArguments): boolean {
        const IS_VALID_LENGTH:boolean = ((name.length >= 5) && (name.length <= 32))
        if(!IS_VALID_LENGTH) return false

        const IS_NOT_CONTAIN_INVALID_SPECAIL_CHARS:boolean = (name.match(/[\<\>\(\)\#\'\/\|]/) == null)
        if(!IS_NOT_CONTAIN_INVALID_SPECAIL_CHARS) return false


        return true
    }
    
    defaultMessage(_: ValidationArguments): string {
        return "Invalid name format"
    }
}
  
export function IsValidName(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string): void {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsValidNameConstraint,
      })
    }
}
