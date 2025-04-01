export type PredefinedProfileDTO = {
  id?: number;
  name?: string;
  postProfilationActions?: Array<PostProfilationActionDTO>;
  userCompleteName?: string;
  creationDate?: string;
  documentType?: number;
  aoo?: string;
  user?: number;
  collaborationTemplateId?: string;
  fields?: Array<FieldBaseDTO>;
};

export type PostProfilationActionDTO = {
  shortDescription?: string;
  description?: string;
  action?: number;
  visible?: boolean;
  value?: boolean;
};

export type FieldBaseDTO = {
  name?: string;
  value: any;
  externalId?: string;
  description?: string;
  order?: number;
  dataSource?: string;
  required?: boolean;
  formula?: string;
  className: string;
  locked?: boolean;
  comboGruppiId?: string;
  dependencyFields?: Array<DependencyFieldItem>;
  associations?: Array<AssocitationFieldItem>;
  isAdditional?: boolean;
  visible?: boolean;
  predefinedProfileFormula?: string;
  visibilityCondition?: string;
  mandatoryCondition?: string;
  addressBookDefaultFilter?: number;
  enabledAddressBook?: Array<number>;
  columns?: number;
  dataSourceDiscriminator?: string;
};

export type DependencyFieldItem = {
  fieldClassName?: string;
  fieldId: string;
};

export type AssocitationFieldItem = {
  fieldName: string;
  association: string;
};
