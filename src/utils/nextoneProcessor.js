import * as XLSX from 'xlsx';
import { HeaderMapper } from './headerMapper';
import { DataFormatter } from './dataFormatter';
import { HeaderDetector } from './headerDetector';

export class NextoneProcessor {
    static async processFile(file) {
        try {
            const workbook = await this.readWorkbook(file);
            const dlSheet = this.findDLSheet(workbook.SheetNames);
            if (!dlSheet) {
                throw new Error('DLシートが見つかりません');
            }

            const worksheet = workbook.Sheets[dlSheet];
            const rawData = XLSX.utils.sheet_to_json(worksheet, {
                header: 1,
                raw: false,
                defval: '',
                blankrows: false
            });

            return this.processNextoneData(rawData);
        } catch (error) {
            console.error('NexToneファイル処理エラー:', error);
            throw error;
        }
    }

    static findDLSheet(sheetNames) {
        return sheetNames.find(name => 
            name.toLowerCase() === 'dl' ||
            name.toLowerCase().startsWith('dl_') ||
            name.toLowerCase().startsWith('dl ') ||
            name.includes('データ')
        );
    }

    static processNextoneData(rawData) {
        if (rawData.length < 2) {
            throw new Error('データが不十分です');
        }

        // NexToneファイルは2行目がヘッダー
        const headers = HeaderMapper.normalizeHeaders(rawData[1]);
        const data = rawData.slice(2)
            .filter(row => row.some(cell => cell !== ''))
            .map(row => {
                const obj = {};
                headers.forEach((header, index) => {
                    if (header) {
                        obj[header] = row[index]?.toString().trim() || '';
                    }
                });
                return obj;
            });

        return DataFormatter.formatData(data);
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
                    reject(new Error('Excelファイルの読み込みに失敗しました'));
                }
            };
            reader.onerror = () => reject(new Error('ファイルの読み込みに失敗しました'));
            reader.readAsArrayBuffer(file);
        });
    }
}