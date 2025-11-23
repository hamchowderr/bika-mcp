/**
 * Bika MCP Resources
 *
 * Provides static reference information about Bika node types, field types, views, and formulas
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Documentation file mappings
 */
const docFiles: Record<string, string> = {
  'bika://docs/api/basic-concepts': join(__dirname, '../../bika-docs/api/basic-concepts.md'),
  'bika://docs/api/authentication': join(__dirname, '../../bika-docs/api/authentication.md'),
  'bika://docs/api/system-endpoints': join(__dirname, '../../bika-docs/api/system-endpoints.md'),
  'bika://docs/api/database-operations': join(__dirname, '../../bika-docs/api/database-operations.md'),
  'bika://docs/api/user-endpoints': join(__dirname, '../../bika-docs/api/user-endpoints.md'),
  'bika://docs/api/other-endpoints': join(__dirname, '../../bika-docs/api/other-endpoints.md'),
  'bika://docs/api/examples': join(__dirname, '../../bika-docs/api/examples.md'),
  'bika://docs/field-cell-value/overview': join(__dirname, '../../bika-docs/field-cell-value/overview.md'),
  'bika://docs/field-cell-value/text-fields': join(__dirname, '../../bika-docs/field-cell-value/text-fields.md'),
  'bika://docs/field-cell-value/numeric-fields': join(__dirname, '../../bika-docs/field-cell-value/numeric-fields.md'),
  'bika://docs/field-cell-value/selection-fields': join(__dirname, '../../bika-docs/field-cell-value/selection-fields.md'),
  'bika://docs/field-cell-value/date-time-fields': join(__dirname, '../../bika-docs/field-cell-value/date-time-fields.md'),
  'bika://docs/field-cell-value/file-fields': join(__dirname, '../../bika-docs/field-cell-value/file-fields.md'),
  'bika://docs/field-cell-value/system-fields': join(__dirname, '../../bika-docs/field-cell-value/system-fields.md'),
  'bika://docs/field-cell-value/relationship-fields': join(__dirname, '../../bika-docs/field-cell-value/relationship-fields.md'),
  'bika://docs/field-cell-value/computed-fields': join(__dirname, '../../bika-docs/field-cell-value/computed-fields.md'),
  'bika://docs/field-cell-value/quick-reference': join(__dirname, '../../bika-docs/field-cell-value/quick-reference.md'),
  'bika://docs/filter-query-language/syntax': join(__dirname, '../../bika-docs/filter-query-language/syntax.md'),
  'bika://docs/filter-query-language/logical-operators': join(__dirname, '../../bika-docs/filter-query-language/logical-operators.md'),
  'bika://docs/filter-query-language/comparison-operators': join(__dirname, '../../bika-docs/filter-query-language/comparison-operators.md'),
  'bika://docs/filter-query-language/field-queries': join(__dirname, '../../bika-docs/filter-query-language/field-queries.md'),
  'bika://docs/filter-query-language/examples': join(__dirname, '../../bika-docs/filter-query-language/examples.md'),
  'bika://docs/filter-query-language/best-practices': join(__dirname, '../../bika-docs/filter-query-language/best-practices.md'),
};

/**
 * Node resource types in Bika
 */
export const nodeTypes = [
  { type: 'Folder', icon: 'Folder', description: 'Folder for storing and managing files' },
  { type: 'Database', icon: 'Database', description: 'The database is similar to a spreadsheet but more versatile. Each database consists of rows and columns, where rows represent records and columns represent fields.' },
  { type: 'Document', icon: 'Document', description: 'A resource for creating and storing documents' },
  { type: 'File', icon: 'File', description: 'A resource for storing and managing pure files' },
  { type: 'Automation', icon: 'Automation', description: 'A resource for setting up and managing automation workflows' },
  { type: 'Dashboard', icon: 'Dashboard', description: 'A dashboard for summarizing and displaying key data' },
  { type: 'AI Page', icon: 'AI Page', description: 'Code a page via React / Vue with Bika Page Data API' },
  { type: 'Form', icon: 'Form', description: 'The form feature allows you to create custom forms to collect and input data into specified databases.' },
  { type: 'AI Agent', icon: 'AI Agent', description: 'A resource for artificial intelligence features' },
  { type: 'Mirror', icon: 'Mirror', description: 'A resource for synchronizing and reflecting data' },
];

/**
 * Database view types
 */
export const viewTypes = [
  { type: 'Grid', icon: 'Grid', description: 'The grid view offers a spreadsheet-like layout where users can view and manage data in a structured manner.' },
  { type: 'Gallery', icon: 'Gallery', description: 'The gallery view displays records in a card format, using images from record attachments as covers.' },
  { type: 'Kanban', icon: 'Kanban', description: 'The kanban view displays data in card format, with each column representing a status or category.' },
  { type: 'Gantt', icon: 'Gantt', description: 'The Gantt view displays project progress on a timeline (Coming Soon)' },
  { type: 'Form', icon: 'Form', description: 'The form view allows users to create custom forms for easy data entry and collection (Coming Soon)' },
];

/**
 * Database field types
 */
export const fieldTypes = [
  { type: 'Single Line Text', icon: 'Single Line Text', description: 'Stores brief single-line text, suitable for titles, names and other concise information' },
  { type: 'Multi-line Text', icon: 'Multi-line Text', description: 'Used for storing long text content, such as detailed descriptions, comments or article body text' },
  { type: 'Checkbox', icon: 'Checkbox', description: 'Provides a yes/no option checkbox, suitable for status marking or simple boolean value selection' },
  { type: 'Currency', icon: 'Currency', description: 'Specifically for storing and formatting currency amounts, supporting different currency symbols and precision settings' },
  { type: 'Date Time', icon: 'Date Time', description: 'Stores precise date and time information, suitable for scenarios that require recording exact time points' },
  { type: 'Date Range', icon: 'Date Range', description: 'Stores time periods or date ranges, including start and end time points' },
  { type: 'Number', icon: 'Number', description: 'Stores numeric data, supports integers and decimals, can set precision and format' },
  { type: 'Percentage', icon: 'Percentage', description: 'Stores percentage values, automatically formatted as percentages' },
  { type: 'Phone', icon: 'Phone', description: 'Specifically for storing phone numbers' },
  { type: 'Email', icon: 'Email', description: 'Specifically for storing email addresses' },
  { type: 'Rating', icon: 'Rating', description: 'Stores rating information in the form of stars or numerical values' },
  { type: 'Single Select', icon: 'Single Select', description: 'Selects a single option from a predefined list of options' },
  { type: 'Multi Select', icon: 'Multi Select', description: 'Selects multiple options from a predefined list of options' },
  { type: 'URL', icon: 'URL', description: 'Stores web link addresses, supports direct link jumping for access' },
  { type: 'Member', icon: 'Member', description: 'Stores system member information, can select single or multiple members as field values' },
  { type: 'Created By', icon: 'Created By', description: 'Automatically records the user information of who created the record' },
  { type: 'Modified By', icon: 'Modified By', description: 'Automatically records the user information of who last modified the record' },
  { type: 'Created Time', icon: 'Created Time', description: 'Automatically generated date and time string when a new record is created' },
  { type: 'Modified Time', icon: 'Modified Time', description: 'Automatically generated date and time string when a record is updated' },
  { type: 'Link', icon: 'Link', description: 'Creates bidirectional associations with other databases' },
  { type: 'Attachment', icon: 'Attachment', description: 'Allows uploading and storing various types of files as record attachments' },
  { type: 'Formula', icon: 'Formula', description: 'Automatically calculates values through formulas, can reference other fields' },
  { type: 'Auto Number', icon: 'Auto Number', description: 'Automatically generates a unique sequence number for each new record' },
  { type: 'Lookup', icon: 'Lookup', description: 'Automatically looks up and displays values of specific fields from linked databases' },
  { type: 'AI Text', icon: 'AI Text', description: 'AI-generated text content that can reference data within database' },
  { type: 'Document', icon: 'Document', description: 'Stores rich text documents that support Markdown format' },
];

/**
 * Formula function categories
 */
export const formulaFunctions = {
  numeric: [
    { name: 'Sum', description: 'Sum together the numbers. Equivalent to number1 + number2 + ...' },
    { name: 'Average', description: 'Returns the average of the numbers' },
    { name: 'Max', description: 'Returns the largest of the given numbers' },
    { name: 'Min', description: 'Returns the minimum value among the numbers' },
    { name: 'Round', description: 'Rounds the value to the number of decimal places given by "precision"' },
    { name: 'RoundUp', description: 'Rounds the value up to the number of decimal places given by "precision"' },
    { name: 'RoundDown', description: 'Rounds the value down to the number of decimal places given by "precision"' },
    { name: 'Ceiling', description: 'Returns the nearest integer multiple of significance that is greater than or equal to the value' },
    { name: 'Floor', description: 'Returns the nearest integer multiple of significance that is less than or equal to the value' },
    { name: 'Abs', description: 'Returns the absolute value of a number' },
    { name: 'Sqrt', description: 'Returns the square root of a number' },
    { name: 'Mod', description: 'Returns the remainder of a division between two numbers' },
    { name: 'Power', description: 'Returns the power of a specified base' },
    { name: 'Exp', description: 'Returns e raised to the power of a specified number' },
    { name: 'Log', description: 'Returns the logarithm of a number with a specified base' },
  ],
  text: [
    { name: 'Concatenate', description: 'Concatenates multiple text values into a single text value' },
    { name: 'Find', description: 'Finds the position of a specific text within content for the first time' },
    { name: 'Search', description: 'Searches for the position of specific text within content for the first time' },
    { name: 'Mid', description: 'Extracts a fixed-length text from a specific position within content' },
    { name: 'Replace', description: 'Replaces a segment of text at a specific position within content with new text' },
    { name: 'Substitute', description: 'Replaces occurrences of a specified text within content with new text' },
    { name: 'Len', description: 'Counts the number of characters in a text' },
    { name: 'Left', description: 'Extracts a given number of characters from the start of a text string' },
    { name: 'Right', description: 'Extracts a given number of characters from the end of a text string' },
    { name: 'Lower', description: 'Converts all uppercase characters in a text string to lowercase' },
    { name: 'Upper', description: 'Converts all uppercase characters in a text string to uppercase' },
    { name: 'Trim', description: 'Removes spaces from the start and end of a text string' },
  ],
  logical: [
    { name: 'If', description: 'Checks whether a condition is met, returns one value if true and another value if false' },
    { name: 'Switch', description: 'Multi-branch selection function that matches an expression against multiple patterns' },
    { name: 'And', description: 'Returns true if all arguments are true; otherwise, returns false' },
    { name: 'Or', description: 'Returns true if any argument is true; otherwise, returns false' },
    { name: 'Not', description: 'Reverses the logical value of its argument' },
    { name: 'True', description: 'Returns the logical value true' },
    { name: 'False', description: 'Returns the logical value false' },
  ],
  datetime: [
    { name: 'Today', description: 'Returns today\'s date (year, month, day)' },
    { name: 'Now', description: 'Returns today\'s date and time, accurate to the second' },
    { name: 'DateAdd', description: 'Adds a fixed time interval to the specified date' },
    { name: 'DatetimeDiff', description: 'Returns the difference between two dates' },
    { name: 'Workday', description: 'Returns the date after a specified number of working days from the start date' },
    { name: 'IsAfter', description: 'Compares if date1 is later than date2' },
    { name: 'IsBefore', description: 'Compares if date1 is earlier than date2' },
    { name: 'IsSame', description: 'Determines if date1 is equal to date2' },
    { name: 'DatetimeFormat', description: 'Formats a date as text in a custom format' },
    { name: 'Year', description: 'Returns the four-digit year corresponding to the specified date' },
    { name: 'Month', description: 'Returns the month corresponding to the specified date' },
    { name: 'Day', description: 'Returns the day of the month for a given date' },
    { name: 'Hour', description: 'Returns the hour of the day for a given date' },
    { name: 'Minute', description: 'Returns the minute of the hour for a given date' },
    { name: 'Second', description: 'Returns the second of the minute for a given date' },
  ],
  array: [
    { name: 'ArrayCompact', description: 'Removes empty strings and null values from an array' },
    { name: 'ArrayUnique', description: 'Returns only the unique items in an array' },
    { name: 'ArrayJoin', description: 'Concatenates all values in an array into a single string with a delimiter' },
    { name: 'ArrayFlatten', description: 'Flattens an array by removing any nested arrays' },
  ],
  aggregate: [
    { name: 'Count', description: 'Counts the number of "number" type values' },
    { name: 'CountA', description: 'Counts the number of non-empty values' },
    { name: 'CountIf', description: 'Counts the number of times a keyword appears in values' },
    { name: 'CountAll', description: 'Counts the number of all values, including empty values' },
  ],
  record: [
    { name: 'RecordID', description: 'Returns the ID of the record' },
    { name: 'CreatedTime', description: 'Returns the creation time of the record' },
    { name: 'LastModifiedTime', description: 'Returns the last modified time of each cell in a row' },
  ],
};

/**
 * Get all resources
 */
export function getAllResources() {
  const metadataResources = [
    {
      uri: 'bika://node-types',
      name: 'Bika Node Types',
      description: 'Reference information about all Bika node resource types (Database, Automation, Form, etc.)',
      mimeType: 'application/json',
    },
    {
      uri: 'bika://field-types',
      name: 'Bika Field Types',
      description: 'Reference information about all database field types (Text, Number, Date, etc.)',
      mimeType: 'application/json',
    },
    {
      uri: 'bika://view-types',
      name: 'Bika View Types',
      description: 'Reference information about all database view types (Grid, Kanban, Gallery, etc.)',
      mimeType: 'application/json',
    },
    {
      uri: 'bika://formula-functions',
      name: 'Bika Formula Functions',
      description: 'Reference information about all formula functions available in Bika',
      mimeType: 'application/json',
    },
  ];

  const docResources = Object.keys(docFiles).map(uri => ({
    uri,
    name: `Bika Documentation: ${uri.replace('bika://docs/', '')}`,
    description: `Documentation for ${uri.replace('bika://docs/', '').replace(/-/g, ' ')}`,
    mimeType: 'text/markdown',
  }));

  return [...metadataResources, ...docResources];
}

/**
 * Read a specific resource
 */
export function readResource(uri: string) {
  // Check if it's a documentation file
  if (uri.startsWith('bika://docs/') && docFiles[uri]) {
    try {
      const content = readFileSync(docFiles[uri], 'utf-8');
      return {
        contents: [
          {
            uri,
            mimeType: 'text/markdown',
            text: content,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to read documentation file: ${uri}`);
    }
  }

  // Handle metadata resources
  switch (uri) {
    case 'bika://node-types':
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(nodeTypes, null, 2),
          },
        ],
      };

    case 'bika://field-types':
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(fieldTypes, null, 2),
          },
        ],
      };

    case 'bika://view-types':
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(viewTypes, null, 2),
          },
        ],
      };

    case 'bika://formula-functions':
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(formulaFunctions, null, 2),
          },
        ],
      };

    default:
      throw new Error(`Unknown resource: ${uri}`);
  }
}
