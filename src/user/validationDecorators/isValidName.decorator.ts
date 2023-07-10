import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface,
         ValidationArguments } from 'class-validator';
  
@ValidatorConstraint()
export class IsValidNameConstraint implements ValidatorConstraintInterface {
    validate(name: any, _: ValidationArguments): boolean {
        return this.__isValidLength(name) &&
               this.__isNotContainInvalidSpecailChars(name)
    }

    __isValidLength(name: string): boolean {
      return (name.length >= 5) && (name.length <= 32)
    }

    __isNotContainInvalidSpecailChars(name: string): boolean {
      return (name.match(/[\<\>\(\)\#\'\/\|]/) == null)
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
      });
    };
}