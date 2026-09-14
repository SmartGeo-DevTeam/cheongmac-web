export type InlineContentValue = string;

export type InlineContentData = Record<string, InlineContentValue>;

export type InlineContentFieldType =
  | 'text'
  | 'textarea'
  | 'editor'
  | 'url'
  | 'image';

export type InlineContentField = {
  key: string;
  label: string;
  type: InlineContentFieldType;
  placeholder?: string;
  description?: string;
  rows?: number;
  required?: boolean;
};

export type InlineContentSaveResult = {
  ok: boolean;
  error?: string;
  success?: string;
  data?: InlineContentData;
};

export type InlineContentUploadResult = {
  ok: boolean;
  error?: string;
  success?: string;
  url?: string;
};
