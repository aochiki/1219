import * as XLSX from 'xlsx';
import { HeaderMapper } from './headerMapper';
import { DataFormatter } from './dataFormatter';
import { HeaderDetector } from './headerDetector';

export class ExcelProcessor {
    static async processExcel(file, isNexTone) {
        try {
            const workbook = await this.readWorkbook(file);
            const firstSheet = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheet];
            
            const rawData = XLSX.utils.sheet_to_json(worksheet, {
                header: 1,
                raw: false,
                defval: '',
                blankrows: false
            });

            if (rawData.length === 0) {
                throw new Error('データが不十分です');
            }

            const headerRowIndex = HeaderDetector.detectHeaderRow(rawData);
            const headers = HeaderMapper.normalizeHeaders(rawData[headerRowIndex]);

            const data = rawData.slice(headerRowIndex + 1)
                .filter(row => row.some(cell => cell !== ''))
                .map(row => {
                    const obj = {};
                    headers.forEach((header, index) => {
                        if (header && row[index] !== undefined) {
                            obj[header] = row[index]?.toString().trim() || '';
                        }
                    });
                    return obj;
                });

            return DataFormatter.formatData(data);
        } catch (error) {
            console.error('Excelファイル処理エラー:', error);
            throw error;
        }
    }

    static async readWorkbook(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    resolve(workbook);
                } catch (error) {
                    reject(new Error(`Excelファイル読み込みエラー: ${error.message}`));
                }
            };

            reader.onerror = () => reject(new Error('ファイル読み込みエラー'));
            reader.readAsArrayBuffer(file);
        });
    }
}