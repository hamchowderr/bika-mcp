/**
 * HTML view templates for MCP Apps Extension (SEP-1865)
 *
 * These templates provide interactive UI views that render in sandboxed iframes
 * within MCP-compatible hosts (Claude, ChatGPT, VS Code, etc.)
 */

/** UI resource URIs */
export const VIEW_URIS = {
  recordsTable: 'ui://bika/records-table',
  recordDetail: 'ui://bika/record-detail',
  databaseSchema: 'ui://bika/database-schema',
} as const;

/** Interactive sortable/filterable table view for database records */
export const recordsTableHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bika Records</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    color: var(--color-text-primary, #1a1a2e);
    background: var(--color-background-primary, #ffffff);
    padding: 16px;
  }
  .header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 12px; flex-wrap: wrap; gap: 8px;
  }
  .header h2 { font-size: 16px; font-weight: 600; }
  .meta { font-size: 12px; color: var(--color-text-secondary, #6b7280); }
  .search-bar {
    width: 100%; padding: 8px 12px; margin-bottom: 12px;
    border: 1px solid var(--color-border-primary, #e5e7eb);
    border-radius: var(--border-radius-md, 6px);
    font-size: 13px; outline: none;
    background: var(--color-background-secondary, #f9fafb);
    color: var(--color-text-primary, #1a1a2e);
  }
  .search-bar:focus { border-color: var(--color-border-info, #3b82f6); }
  .table-wrapper { overflow-x: auto; border-radius: var(--border-radius-md, 6px); border: 1px solid var(--color-border-primary, #e5e7eb); }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th {
    background: var(--color-background-secondary, #f3f4f6);
    color: var(--color-text-secondary, #6b7280);
    font-weight: 600; text-align: left;
    padding: 8px 12px; white-space: nowrap; cursor: pointer; user-select: none;
    border-bottom: 1px solid var(--color-border-primary, #e5e7eb);
  }
  th:hover { background: var(--color-background-tertiary, #e5e7eb); }
  th .sort-indicator { margin-left: 4px; opacity: 0.4; }
  th.sorted .sort-indicator { opacity: 1; }
  td {
    padding: 8px 12px;
    border-bottom: 1px solid var(--color-border-primary, #f3f4f6);
    max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  tr:hover td { background: var(--color-background-secondary, #f9fafb); }
  .cell-array { color: var(--color-text-info, #3b82f6); }
  .cell-null { color: var(--color-text-disabled, #9ca3af); font-style: italic; }
  .cell-bool-true { color: var(--color-text-success, #10b981); }
  .cell-bool-false { color: var(--color-text-danger, #ef4444); }
  .no-data { text-align: center; padding: 32px; color: var(--color-text-secondary, #6b7280); }
  .pagination {
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 12px; font-size: 12px; color: var(--color-text-secondary, #6b7280);
  }
</style>
</head>
<body>
<div class="header">
  <h2 id="title">Records</h2>
  <span class="meta" id="meta"></span>
</div>
<input class="search-bar" id="search" type="text" placeholder="Filter records..." />
<div class="table-wrapper">
  <table id="table"><thead id="thead"></thead><tbody id="tbody"></tbody></table>
</div>
<div class="pagination" id="pagination"></div>
<script type="module">
import { App } from '@modelcontextprotocol/ext-apps';
const app = new App({ name: 'bika-records-table', version: '1.0.0' });
let allRecords = [], columns = [], sortCol = null, sortDir = 'asc';
app.ontoolresult = (result) => {
  try {
    const text = result?.content?.find(c => c.type === 'text')?.text;
    if (!text) return;
    const data = JSON.parse(text);
    const records = data.data?.records || data.records || (Array.isArray(data) ? data : []);
    allRecords = records;
    if (records.length > 0) {
      const cells = records[0].fields || records[0].cells || {};
      columns = Object.keys(cells);
    }
    document.getElementById('title').textContent =
      'Records (' + records.length + (data.data?.total ? ' of ' + data.data.total : '') + ')';
    if (data.data?.offset) document.getElementById('pagination').textContent = 'Next offset: ' + data.data.offset;
    render(records);
  } catch (e) {
    document.getElementById('tbody').innerHTML = '<tr><td class="no-data" colspan="99">Error: ' + e.message + '</td></tr>';
  }
};
function render(records) {
  const thead = document.getElementById('thead'), tbody = document.getElementById('tbody');
  if (!records.length) { thead.innerHTML = ''; tbody.innerHTML = '<tr><td class="no-data" colspan="99">No records found</td></tr>'; return; }
  thead.innerHTML = '<tr>' + columns.map(col => {
    const sorted = sortCol === col;
    const arrow = sorted ? (sortDir === 'asc' ? '\\u25B2' : '\\u25BC') : '\\u25B2';
    return '<th class="' + (sorted ? 'sorted' : '') + '" data-col="' + esc(col) + '">' + esc(col) + '<span class="sort-indicator">' + arrow + '</span></th>';
  }).join('') + '</tr>';
  thead.querySelectorAll('th').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.col;
      if (sortCol === col) sortDir = sortDir === 'asc' ? 'desc' : 'asc';
      else { sortCol = col; sortDir = 'asc'; }
      const sorted = [...allRecords].sort((a, b) => {
        const va = String((a.fields || a.cells || {})[col] ?? '');
        const vb = String((b.fields || b.cells || {})[col] ?? '');
        return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
      });
      render(sorted);
    });
  });
  tbody.innerHTML = records.map(rec => {
    const cells = rec.fields || rec.cells || {};
    return '<tr>' + columns.map(col => '<td>' + fmtCell(cells[col]) + '</td>').join('') + '</tr>';
  }).join('');
}
function fmtCell(val) {
  if (val == null) return '<span class="cell-null">-</span>';
  if (typeof val === 'boolean') return '<span class="cell-bool-' + val + '">' + val + '</span>';
  if (Array.isArray(val)) return '<span class="cell-array">[' + val.length + ' items]</span>';
  if (typeof val === 'object') return '<span class="cell-array">{...}</span>';
  return esc(String(val));
}
function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
document.getElementById('search').addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase();
  if (!q) { render(allRecords); return; }
  render(allRecords.filter(rec => {
    const cells = rec.fields || rec.cells || {};
    return Object.values(cells).some(v => v != null && String(v).toLowerCase().includes(q));
  }));
});
app.connect();
</script>
</body>
</html>`;

/** Card-style detail view for a single record */
export const recordDetailHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bika Record Detail</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    color: var(--color-text-primary, #1a1a2e);
    background: var(--color-background-primary, #ffffff);
    padding: 16px;
  }
  .card {
    border: 1px solid var(--color-border-primary, #e5e7eb);
    border-radius: var(--border-radius-md, 8px); overflow: hidden;
  }
  .card-header {
    background: var(--color-background-secondary, #f3f4f6);
    padding: 12px 16px;
    border-bottom: 1px solid var(--color-border-primary, #e5e7eb);
  }
  .card-header h2 { font-size: 15px; font-weight: 600; }
  .card-header .record-id {
    font-size: 11px; color: var(--color-text-secondary, #6b7280);
    margin-top: 2px; font-family: var(--font-mono, monospace);
  }
  .field-row { display: flex; border-bottom: 1px solid var(--color-border-primary, #f3f4f6); }
  .field-row:last-child { border-bottom: none; }
  .field-label {
    flex: 0 0 160px; padding: 10px 16px;
    font-weight: 600; font-size: 13px;
    color: var(--color-text-secondary, #6b7280);
    background: var(--color-background-secondary, #fafbfc);
    border-right: 1px solid var(--color-border-primary, #f3f4f6);
    word-break: break-word;
  }
  .field-value { flex: 1; padding: 10px 16px; font-size: 13px; word-break: break-word; min-width: 0; }
  .val-null { color: var(--color-text-disabled, #9ca3af); font-style: italic; }
  .val-bool { font-weight: 500; }
  .val-bool.true { color: var(--color-text-success, #10b981); }
  .val-bool.false { color: var(--color-text-danger, #ef4444); }
  .val-array, .val-object {
    background: var(--color-background-secondary, #f9fafb);
    padding: 8px; border-radius: 4px;
    font-family: var(--font-mono, monospace); font-size: 12px;
    white-space: pre-wrap; max-height: 200px; overflow-y: auto;
  }
  .val-url a { color: var(--color-text-info, #3b82f6); text-decoration: none; }
  .val-url a:hover { text-decoration: underline; }
  .no-data { text-align: center; padding: 32px; color: var(--color-text-secondary, #6b7280); }
</style>
</head>
<body>
<div class="card" id="card"><div class="no-data">Loading record...</div></div>
<script type="module">
import { App } from '@modelcontextprotocol/ext-apps';
const app = new App({ name: 'bika-record-detail', version: '1.0.0' });
app.ontoolresult = (result) => {
  try {
    const text = result?.content?.find(c => c.type === 'text')?.text;
    if (!text) return;
    const data = JSON.parse(text);
    const record = data.data || data;
    const fields = record.fields || record.cells || {};
    const recordId = record.id || record.recordId || '';
    document.getElementById('card').innerHTML =
      '<div class="card-header"><h2>Record Detail</h2><div class="record-id">' + esc(recordId) + '</div></div>' +
      Object.entries(fields).map(([key, val]) =>
        '<div class="field-row"><div class="field-label">' + esc(key) + '</div><div class="field-value">' + fmtVal(val) + '</div></div>'
      ).join('');
  } catch (e) {
    document.getElementById('card').innerHTML = '<div class="no-data">Error: ' + e.message + '</div>';
  }
};
function fmtVal(val) {
  if (val == null) return '<span class="val-null">Empty</span>';
  if (typeof val === 'boolean') return '<span class="val-bool ' + val + '">' + val + '</span>';
  if (Array.isArray(val)) return '<div class="val-array">' + esc(JSON.stringify(val, null, 2)) + '</div>';
  if (typeof val === 'object') return '<div class="val-object">' + esc(JSON.stringify(val, null, 2)) + '</div>';
  const s = String(val);
  if (/^https?:\\/\\//.test(s)) return '<span class="val-url"><a href="' + esc(s) + '" target="_blank" rel="noopener">' + esc(s) + '</a></span>';
  return esc(s);
}
function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
app.connect();
</script>
</body>
</html>`;

/** Visual schema viewer for database field definitions */
export const databaseSchemaHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bika Database Schema</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    color: var(--color-text-primary, #1a1a2e);
    background: var(--color-background-primary, #ffffff);
    padding: 16px;
  }
  h2 { font-size: 16px; font-weight: 600; margin-bottom: 12px; }
  .meta { font-size: 12px; color: var(--color-text-secondary, #6b7280); margin-bottom: 16px; }
  .field-card {
    border: 1px solid var(--color-border-primary, #e5e7eb);
    border-radius: var(--border-radius-md, 6px);
    margin-bottom: 8px; overflow: hidden; transition: box-shadow 0.15s;
  }
  .field-card:hover { box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1)); }
  .field-header {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 14px; cursor: pointer; user-select: none;
    background: var(--color-background-secondary, #fafbfc);
  }
  .field-name { font-weight: 600; font-size: 13px; flex: 1; }
  .field-type {
    font-size: 11px; padding: 2px 8px;
    border-radius: var(--border-radius-full, 12px); font-weight: 500; white-space: nowrap;
  }
  .type-text { background: #dbeafe; color: #1e40af; }
  .type-number { background: #fef3c7; color: #92400e; }
  .type-date { background: #ede9fe; color: #5b21b6; }
  .type-bool { background: #d1fae5; color: #065f46; }
  .type-select { background: #fce7f3; color: #9d174d; }
  .type-link { background: #cffafe; color: #155e75; }
  .type-other { background: #f3f4f6; color: #4b5563; }
  .field-expand { font-size: 10px; opacity: 0.5; transition: transform 0.2s; }
  .field-card.open .field-expand { transform: rotate(90deg); }
  .field-details {
    display: none; padding: 10px 14px;
    border-top: 1px solid var(--color-border-primary, #f3f4f6); font-size: 12px;
  }
  .field-card.open .field-details { display: block; }
  .detail-row { display: flex; gap: 8px; padding: 3px 0; }
  .detail-key { color: var(--color-text-secondary, #6b7280); min-width: 100px; font-weight: 500; }
  .detail-val { font-family: var(--font-mono, monospace); color: var(--color-text-primary, #1a1a2e); word-break: break-all; }
  .required-badge {
    font-size: 10px; padding: 1px 6px;
    background: #fee2e2; color: #991b1b;
    border-radius: var(--border-radius-full, 12px);
  }
  .no-data { text-align: center; padding: 32px; color: var(--color-text-secondary, #6b7280); }
</style>
</head>
<body>
<h2 id="title">Database Schema</h2>
<div class="meta" id="meta"></div>
<div id="fields"></div>
<script type="module">
import { App } from '@modelcontextprotocol/ext-apps';
const app = new App({ name: 'bika-database-schema', version: '1.0.0' });
const TC = {
  Text:'type-text',SingleLineText:'type-text',MultiLineText:'type-text',
  Email:'type-text',URL:'type-text',Phone:'type-text',
  Number:'type-number',Currency:'type-number',Percent:'type-number',
  Rating:'type-number',AutoNumber:'type-number',
  DateTime:'type-date',CreatedTime:'type-date',LastModifiedTime:'type-date',
  Checkbox:'type-bool',
  SingleSelect:'type-select',MultiSelect:'type-select',
  Link:'type-link',MagicLink:'type-link',
};
app.ontoolresult = (result) => {
  try {
    const text = result?.content?.find(c => c.type === 'text')?.text;
    if (!text) return;
    const data = JSON.parse(text);
    const fields = data.data?.fields || data.fields || (Array.isArray(data) ? data : []);
    document.getElementById('title').textContent = 'Database Schema (' + fields.length + ' fields)';
    const container = document.getElementById('fields');
    if (!fields.length) { container.innerHTML = '<div class="no-data">No fields found</div>'; return; }
    container.innerHTML = fields.map((f, i) => {
      const typeName = f.type || f.fieldType || 'Unknown';
      const typeClass = TC[typeName] || 'type-other';
      const props = f.property || f.options || {};
      return '<div class="field-card" data-idx="' + i + '">' +
        '<div class="field-header">' +
        '<span class="field-expand">\\u25B6</span>' +
        '<span class="field-name">' + esc(f.name || f.fieldName || '') + '</span>' +
        (f.required ? '<span class="required-badge">Required</span>' : '') +
        '<span class="field-type ' + typeClass + '">' + esc(typeName) + '</span>' +
        '</div>' +
        '<div class="field-details">' +
        (f.id ? dr('ID', f.id) : '') +
        (f.description ? dr('Description', f.description) : '') +
        (f.isPrimary ? dr('Primary', 'Yes') : '') +
        (f.isComputed ? dr('Computed', 'Yes') : '') +
        (Object.keys(props).length ? dr('Properties', JSON.stringify(props, null, 2)) : '') +
        '</div></div>';
    }).join('');
    container.querySelectorAll('.field-header').forEach(h => {
      h.addEventListener('click', () => h.parentElement.classList.toggle('open'));
    });
  } catch (e) {
    document.getElementById('fields').innerHTML = '<div class="no-data">Error: ' + e.message + '</div>';
  }
};
function dr(key, val) { return '<div class="detail-row"><span class="detail-key">' + key + '</span><span class="detail-val">' + esc(String(val)) + '</span></div>'; }
function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
app.connect();
</script>
</body>
</html>`;
