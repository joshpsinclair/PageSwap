export interface IPropertyError {
  property: string;
  message: string;
}

export interface IValidationError {
  propertyErrors: IPropertyError[];
}
