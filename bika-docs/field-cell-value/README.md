# Bika Field Cell Value Documentation

Comprehensive documentation for all Bika field types and their corresponding data formats when using OpenAPI.

## Overview

This documentation details how to work with different field types in Bika, including their read and write formats, data types, and usage examples.

## Contents

- [Overview](./overview.md) - Field models (read vs write) and error handling
- [Text Fields](./text-fields.md) - Single line text, multi-line text, URL, email, phone
- [Numeric Fields](./numeric-fields.md) - Number, currency, percent, rating
- [Selection Fields](./selection-fields.md) - Checkbox, single select, multi-select
- [Date & Time Fields](./date-time-fields.md) - DateTime, date range
- [File Fields](./file-fields.md) - Attachments and file handling
- [System Fields](./system-fields.md) - Auto-generated fields (AutoNumber, created/modified time & by)
- [Relationship Fields](./relationship-fields.md) - Member, link, lookup fields
- [Computed Fields](./computed-fields.md) - Formula fields
- [Quick Reference](./quick-reference.md) - Quick lookup table for all field types

## Key Concepts

### Read vs Write

- **Read**: Data format when the interface response is returned (getting data from API)
- **Write**: Data format required when editing field cells (submitting data to API)

### Cell Formats

When reading data, you can specify the format:
- `cellFormat: json` - Returns structured data objects
- `cellFormat: string` - Returns formatted string representations
