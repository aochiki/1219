import { HEADER_MAPPINGS } from '../constants/headerMappings';

export class HeaderDetector {
    static detectHeaderRow(rows, minMatchCount = 3) {
        if (!Array.isArray(rows) || rows.length === 0) {
            return -1;
        }

        const mappingKeys = new Set(Object.keys(HEADER_MAPPINGS).map(key => 
            key.toLowerCase().trim()
        ));

        for (let i = 0; i < Math.min(5, rows.length); i++) {
            const row = rows[i];
            if (!Array.isArray(row)) continue;

            const matchCount = row.reduce((count, cell) => {
                if (!cell) return count;
                const normalizedCell = cell.toString().toLowerCase().trim();
                return mappingKeys.has(normalizedCell) ? count + 1 : count;
            }, 0);

            if (matchCount >= minMatchCount) {
                return i;
            }
        }

        return 0; // デフォルトで最初の行をヘッダーとして扱う
    }
}