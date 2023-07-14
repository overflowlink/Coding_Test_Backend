import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface,
         ValidationArguments } from 'class-validator';
  
@ValidatorConstraint()
export class IsValidPasswordConstraint implements ValidatorConstraintInterface {
    validate(password: any, _: ValidationArguments): boolean {
        return this.__isValidLength(password) &&
               this.__isAllCharTypeContains(password) &&
               this.__isNotContainInvalidSpecailChars(password)
    }

    __isValidLength(password: string): boolean {
      return (password.length >= 8) && (password.length <= 32)
    }

    __isAllCharTypeContains(password: string): boolean {
      return this.__isContainAlphaCharType(password) &&
             this.__isContainDigitCharType(password) &&
             this.__isContainSpecailCharType(password)
    }

    __isContainAlphaCharType(password: string): boolean {
      return (password.match(/[a-zA-Z]/) != null)
    }

    __isContainDigitCharType(password: string): boolean {
      return (password.match(/[0-9]/) != null)
    }

    __isContainSpecailCharType(password: string): boolean {
      return (password.match(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/) != null)
    }

    __isNotContainInvalidSpecailChars(password: string): boolean {
      return (password.match(/[\<\>\(\)\#\'\/\|]/) == null)
    }

    
    defaultMessage(_: ValidationArguments): string {
        return "Invalid password format"
    }
}
  
export function IsValidPassword(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string): void {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsValidPasswordConstraint,
      });
    };
}