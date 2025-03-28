export type ProfileDTO = {
  id?: number;
  document?: FileDTO;
  fields?: FieldBaseDTO[];
  postProfilationActions?: PostProfilationActionDTO[];
  constrainRoleBehaviour?: number;
  attachments?: string[];
  notes?: NoteDTO[];
  paNotes?: string[];
  authorityData?: AuthorityDataDTO;
  generatePaProtocol?: boolean;
  fileWritingSettings?: DocumentsWritingSettingsDTO;
  fileRequired?: boolean;
  fileMandatoryCondition?: string;
};

export type FileDTO = {
  fileNames?: string[];
  bufferIds?: string[];
};

export type FieldBaseDTO = {
  name?: string;
  value?: string | number | boolean | null;
  externalId?: string;
  description?: string;
  order?: number;
  dataSource?: string;
  required?: boolean;
  formula?: string;
  className: string;
  locked?: boolean;
  comboGruppiId?: string;
  dependencyFields?: DependencyFieldItem[];
  associations?: AssocitationFieldItem[];
  isAdditional?: boolean;
  visible?: boolean;
  predefinedProfileFormula?: string;
  visibilityCondition?: string;
  mandatoryCondition?: string;
  addressBookDefaultFilter?: number;
  enabledAddressBook?: number[];
  columns?: number;
  dataSourceDiscriminator?: string;
};

export type PostProfilationActionDTO = {
  shortDescription?: string;
  description?: string;
  action?: number;
  visible?: boolean;
  value?: boolean;
};

export type NoteDTO = {
  id?: number;
  docnumber?: number;
  user?: number;
  userCompleteName?: string;
  creationDate?: string;
  comment?: string;
  revision?: number;
  aosflag?: boolean;
  countersTable?: number;
  externalId?: number;
};

export type AuthorityDataDTO = {
  id?: number;
  docNumber?: number;
  protocol?: string;
  protocolDate?: string;
  office?: string;
  person?: string;
  shipping?: string;
  yourReferent?: string;
};

export type DocumentsWritingSettingsDTO = {
  blacklistFileExtensions?: string[];
  whitelistFileExtensions?: string[];
  minFileSize?: number;
  maxFileSize?: number;
};

export type DependencyFieldItem = {
  fieldClassName?: string;
  fieldId?: string;
};

export type AssocitationFieldItem = {
  fieldName?: string;
  association?: string;
};
