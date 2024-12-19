import { HeaderMapper } from './headerMapper';
import { DataFormatter } from './dataFormatter';
import { HeaderDetector } from './headerDetector';

export class DataExtractor {
    static extractData(rows) {
        if (!Array.isArray(rows) || rows.length === 0) {
            throw new Error('ファイルが空です');
        }

        const headerRowIndex = HeaderDetector.detectHeaderRow(rows);
        const headers = HeaderMapper.normalizeHeaders(rows[headerRowIndex]);
        
        const data = rows.slice(headerRowIndex + 1)
            .filter(row => row.some(cell => cell))
            .map(row => this.createRowObject(row, headers));

        return DataFormatter.formatData(data);
    }

    static createRowObject(row, headers) {
        const obj = {};
        headers.forEach((header, index) => {
            if (header) {
                obj[header] = row[index]?.toString().trim() || '';
            }
        });
        return obj;
    }
}