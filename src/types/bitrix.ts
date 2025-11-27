export interface BitrixResponseTime {
  start: number
  finish: number
  duration: number
  processing: number
  date_start: string
  date_finish: string
  operating_reset_at?: number
  operating?: number
}

export interface BitrixResponse<T> {
  result: T
  next?: number
  total?: number
  time: BitrixResponseTime
  error?: string
  error_description?: string
}

export const BitrixFieldTypes = [
  'string',
  'integer',
  'double',
  'char',
  'boolean',
  'datetime',
  'date',
  'crm_status',
  'crm_category',
  'crm_currency',
  'crm_company',
  'crm_contact',
  'crm_lead',
  'crm_quote',
  'crm',
  'employee',
  'enumeration',
  'file',
  'money',
] as const

export type BitrixFieldType = (typeof BitrixFieldTypes)[number] | string

export interface BitrixFieldDescription {
  type: BitrixFieldType
  isRequired: boolean
  isReadOnly: boolean
  isImmutable: boolean
  isMultiple: boolean
  isDynamic: boolean
  title: string
  settings?: {
    [key: string]: string
  }
  items?: {
    ID: string
    VALUE: string
  }[]
}

export interface BitrixFields {
  [key: string]: BitrixFieldDescription
}

export interface BitrixDeal {
  ID: string
  TITLE: string
  STAGE_SEMANTIC_ID: string
  STAGE_ID: string
  ASSIGNED_BY_ID: string
  CREATED_BY_ID: string
  DATE_CREATE: string
  CLOSEDATE: string | null
  CATEGORY_ID: string
  CURRENCY_ID: string
  OPPORTUNITY: string
  SOURCE_ID: string | null
  UTM_SOURCE: string | null
  LEAD_ID: string | null
}

export interface BitrixStatus {
  ID: string
  ENTITY_ID: string
  STATUS_ID: string
  NAME: string
  NAME_INIT: string
  SORT: string
  SYSTEM: 'Y' | 'N'
  CATEGORY_ID: string | null
  COLOR: string | null
  SEMANTICS: string | null
  EXTRA?: {
    SEMANTICS?: string | null
    COLOR?: string | null
    [key: string]: any
  }
}

export interface BitrixUser {
  ID: string
  XML_ID: string
  ACTIVE: boolean
  NAME: string
  LAST_NAME: string
  IS_ONLINE: 'Y' | 'N'
  TIME_ZONE?: string
  TIMESTAMP_X: Record<string, never> | string | null
  DATE_REGISTER: string
  PERSONAL_GENDER: string
  PERSONAL_BIRTHDAY: string
  PERSONAL_PHOTO?: string
  LAST_ACTIVITY_DATE: Record<string, never> | string | null
  WORK_POSITION?: string
  UF_EMPLOYMENT_DATE: string
  UF_DEPARTMENT: number[]
  USER_TYPE: string
}
