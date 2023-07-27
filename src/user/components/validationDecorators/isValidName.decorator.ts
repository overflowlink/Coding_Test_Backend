import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface,
         ValidationArguments } from 'class-validator';
  
@ValidatorConstraint()
export class IsValidNameConstraint implements ValidatorConstraintInterface {
    validate(name: any, _: ValidationArguments): boolean {
        let isValidLength:boolean = false
        //#region isValidLength(name: string): boolean
        isValidLength = ((name.length >= 5) && (name.length <= 32))
        //#endregion
        if(!isValidLength) return false

        let isNotContainInvalidSpecailChars:boolean = false
        //#region isNotContainInvalidSpecailChars(name: string): boolean
        isNotContainInvalidSpecailChars = (name.match(/[\<\>\(\)\#\'\/\|]/) == null)
        //#endregion
        if(!isNotContainInvalidSpecailChars) return false

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
      });
    };
}
