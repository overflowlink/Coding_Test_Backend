import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface,
         ValidationArguments } from 'class-validator';
  
@ValidatorConstraint()
export class IsValidPasswordConstraint implements ValidatorConstraintInterface {
    validate(password: any, _: ValidationArguments): boolean {
      let isValidLength:boolean = false
      //#region isValidLength(password: string): boolean
      isValidLength = ((password.length >= 8) && (password.length <= 32))
      //#endregion
      if(!isValidLength) return false 

      let isAllCharTypeContains:boolean = false
      //#region isAllCharTypeContains(password: string): boolean
      let isContainAlphaCharType:boolean = false
      //#region isContainAlphaCharType(password: string): boolean
      isContainAlphaCharType = (password.match(/[a-zA-Z]/) != null)
      //#endregion

      let isContainDigitCharType:boolean = false
      //#region isContainDigitCharType(password: string): boolean
      isContainDigitCharType = (password.match(/[0-9]/) != null)
      //#endregion

      let isContainSpecailCharType:boolean = false
      //#region isContainSpecailCharType(password: string): boolean
      isContainSpecailCharType = (password.match(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/) != null)
      //#endregion

      isAllCharTypeContains = isContainAlphaCharType && isContainDigitCharType && isContainSpecailCharType
      //#endregion
      if(!isAllCharTypeContains) return false

      let isNotContainInvalidSpecailChars:boolean = false
      //#region isNotContainInvalidSpecailChars(password: string): boolean
      isNotContainInvalidSpecailChars = (password.match(/[\<\>\(\)\#\'\/\|]/) == null)
      //#endregion
      if(!isNotContainInvalidSpecailChars) return false

      return true
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
