/**
 * Type definitions for Bika.ai API
 */

/**
 * Base API response structure
 */
export interface BikaApiResponse<T = unknown> {
  success: boolean;
  code: number;
  message: string;
  data?: T;
}

/**
 * Space information
 */
export interface BikaSpace {
  id: string;
  name: string;
  // Add more fields as needed based on API response
}

/**
 * Database/Node information
 */
export interface BikaDatabase {
  id: string;
  name: string;
  type: 'database';
  // Add more fields as needed
}

/**
 * Record cell values - supports all Bika field types
 */
export interface BikaRecordCells {
  [fieldName: string]: CellValue;
}

/**
 * Cell value types for all field types
 */
export type CellValue =
  | string                    // Text, URL, Email, Phone, Single Select, DateTime
  | number                    // Number, Currency, Percent, Rating, AutoNumber
  | boolean                   // Checkbox
  | string[]                  // Multi Select, Link
  | AttachmentValue[]         // Attachment
  | MemberValue[]             // Member
  | UserValue                 // Created By, Modified By
  | null;                     // Empty values

/**
 * Attachment value structure
 */
export interface AttachmentValue {
  id: string;
  name?: string;
}

/**
 * Member value structure
 */
export interface MemberValue {
  id: string;
  type: 'Member' | 'Team' | 'Role';
  name: string;
}

/**
 * User value structure (for Created By / Modified By)
 */
export interface UserValue {
  id: string;
  name: string;
}

/**
 * Record structure
 */
export interface BikaRecord {
  id: string;
  cells: BikaRecordCells;
}

/**
 * Create record request
 */
export interface CreateRecordRequest {
  cells: BikaRecordCells;
}

/**
 * Update record request
 */
export interface UpdateRecordRequest {
  id: string;
  cells: BikaRecordCells;
}

/**
 * Create records request (batch operation)
 */
export interface CreateRecordsRequest {
  fieldKey?: 'name' | 'id';
  records: Array<{
    fields: BikaRecordCells;
  }>;
}

/**
 * Update records request (batch operation)
 */
export interface UpdateRecordsRequest {
  fieldKey?: 'name' | 'id';
  records: Array<{
    id: string;
    fields: BikaRecordCells;
  }>;
}

/**
 * Delete records request (batch operation)
 */
export interface DeleteRecordsRequest {
  records: string[];
}

/**
 * System meta information
 */
export interface BikaSystemMeta {
  version: string;
  appEnv: string;
  hostname: string;
  headers: Record<string, string>;
}

/**
 * Attachment upload response
 */
export interface AttachmentUploadResponse {
  id: string;
  name: string;
  size: number;
  url: string;
}

/**
 * Automation trigger
 */
export interface BikaAutomationTrigger {
  id: string;
  name: string;
  eventType: string;
  // Add more fields as needed
}

/**
 * Webhook registration
 */
export interface WebhookRegistration {
  eventType: string;
  name: string;
  description: string;
  callbackURL: string;
}

/**
 * Outgoing webhook
 */
export interface BikaOutgoingWebhook {
  id: string;
  name: string;
  url: string;
  // Add more fields as needed based on actual API response
  [key: string]: unknown;
}

/**
 * User notification preferences
 */
export interface UserNotificationSettings {
  email: boolean;
  push: boolean;
  SMS: boolean;
}

/**
 * User settings and preferences
 */
export interface UserSettings {
  themeMode?: string;
  themeStyle?: string;
  customColors?: string;
  locale?: string;
  notification?: UserNotificationSettings;
  questionaire?: boolean;
}

/**
 * User avatar information
 */
export interface UserAvatar {
  type: string;
  url: string;
}

/**
 * Node type first visit flags
 */
export interface NodeTypeFirstVisits {
  [nodeType: string]: boolean;
}

/**
 * User metadata
 */
export interface UserMetadata {
  referralCode?: string;
  referralUserId?: string;
  referralAwarded?: boolean;
  mobileAppInstallAward?: boolean;
  isChinaUser?: boolean;
  isPremiumPlanNotified?: boolean;
  nodeTypeFirstVisits?: NodeTypeFirstVisits;
}

/**
 * User profile
 */
export interface BikaUserProfile {
  id: string;
  name: string;
  email: string | null;
  phone?: string | null;
  settings?: UserSettings;
  timeZone?: string;
  avatar: UserAvatar;
  metadata?: UserMetadata;
  createdAt?: string;
}

/**
 * Node tree structure (value object schema)
 * Represents node metadata and hierarchical structure
 */
export interface BikaNodeTree {
  id: string;
  name?: string;
  type?: string; // e.g., 'database', 'automation', 'dashboard', 'document', 'ai_chatbot'
  parentId?: string;
  spaceId?: string;
  icon?: string;
  // Additional fields will be determined from actual API response
  [key: string]: unknown; // Allow for additional fields
}
