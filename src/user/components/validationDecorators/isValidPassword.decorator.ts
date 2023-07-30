import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface,
         ValidationArguments } from 'class-validator';
  
@ValidatorConstraint()
export class IsValidPasswordConstraint implements ValidatorConstraintInterface {
    validate(password: any, _: ValidationArguments): boolean {
      const IS_VALID_LENGTH:boolean = ((password.length >= 8) && (password.length <= 32))
      if(!IS_VALID_LENGTH) return false

      let isAllCharTypeContains:boolean = false
      const IS_CONTAIN_ALPHA_CHAR_TYPE:boolean = (password.match(/[a-zA-Z]/) != null)
      const IS_CONTAIN_DIGIT_CHAR_TYPE:boolean = (password.match(/[0-9]/) != null)
      const IS_CONTAIN_SPECAIL_CHAR_TYPE:boolean = (password.match(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/) != null)
      isAllCharTypeContains = IS_CONTAIN_ALPHA_CHAR_TYPE && IS_CONTAIN_DIGIT_CHAR_TYPE && IS_CONTAIN_SPECAIL_CHAR_TYPE
      if(!isAllCharTypeContains) return false

      const IS_NOT_CONTAIN_INVALID_SPECAIL_CHAR_TYPE:boolean = (password.match(/[\<\>\(\)\#\'\/\|]/) == null)
      if(!IS_NOT_CONTAIN_INVALID_SPECAIL_CHAR_TYPE) return false


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
