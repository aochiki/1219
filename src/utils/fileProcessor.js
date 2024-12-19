import Papa from 'papaparse';
import { HeaderMapper } from './headerMapper';
import { DataFormatter } from './dataFormatter';
import { ExcelProcessor } from './excelProcessor';
import { FileTypeDetector } from './fileTypeDetector';
import { NextoneProcessor } from './nextoneProcessor';
import { DataExtractor } from './dataExtractor';

export class FileProcessor {
    static async processFile(file) {
        try {
            const fileType = FileTypeDetector.detectFileType(file);
            const isNexTone = FileTypeDetector.isNexToneFile(file.name);
            
            if (isNexTone) {
                return await NextoneProcessor.processFile(file);
            }

            switch (fileType) {
                case 'csv':
                    return await this.processCSV(file);
                case 'txt':
                    return await this.processTXT(file);
                case 'excel':
                    return await ExcelProcessor.processExcel(file);
                default:
                    throw new Error(`未対応のファイル形式です: ${file.name}`);
            }
        } catch (error) {
            console.error('ファイル処理エラー:', error);
            throw error;
        }
    }

    static processCSV(file) {
        return new Promise((resolve, reject) => {
            Papa.parse(file, {
                header: false,
                skipEmptyLines: true,
                complete: (results) => {
                    try {
                        const data = DataExtractor.extractData(results.data);
                        resolve(data);
                    } catch (error) {
                        reject(error);
                    }
                },
                error: (error) => reject(new Error(`CSVパースエラー: ${error.message}`))
            });
        });
    }

    static async processTXT(file) {
        try {
            const text = await file.text();
            const rows = text.split('\n')
                .filter(line => line.trim())
                .map(line => line.split('\t').map(cell => cell.trim()));
            
            return DataExtractor.extractData(rows);
        } catch (error) {
            console.error('TXTファイル処理エラー:', error);
            throw error;
        }
    }

    static combineData(dataArray) {
        if (!Array.isArray(dataArray) || dataArray.length === 0) {
            return [];
        }

        const combinedData = dataArray.flat().filter(row => 
            Object.keys(row).length > 0 && 
            Object.values(row).some(value => value)
        );

        return DataFormatter.formatData(combinedData);
    }
}