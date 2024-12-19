import { HEADERS } from './headers';

export const HEADER_MAPPINGS = {
    // 英語 -> 日本語
    'ISRC': HEADERS.ISRC,
    'Project Code': HEADERS.PROJECT_CODE,
    'Vendor Identifier': HEADERS.PROJECT_CODE,
    'Track Name': HEADERS.TRACK_NAME,
    'Content Title': HEADERS.TRACK_NAME,
    'Artist Name': HEADERS.ARTIST_NAME,
    'Volume': HEADERS.QUANTITY,
    'Actual Price': HEADERS.UNIT_PRICE,
    'Total': HEADERS.MASTER_ROYALTY,
    'Service': HEADERS.SERVICE_NAME,
    'Retailer': HEADERS.SERVICE_NAME,
    'Service Name': HEADERS.SERVICE_NAME,
    'Usage Month': HEADERS.USAGE_MONTH,
    'Activity Period': HEADERS.USAGE_MONTH,
    'Period': HEADERS.USAGE_MONTH,
    'Album': HEADERS.ALBUM_NAME,
    'Album Name': HEADERS.ALBUM_NAME,
    'Release Title': HEADERS.ALBUM_NAME,
    'Product Name': HEADERS.ALBUM_NAME,
    'Label': HEADERS.LABEL_NAME,
    'Label Name': HEADERS.LABEL_NAME,
    'Label/Studio/Network': HEADERS.LABEL_NAME,
    'Imprint Label': HEADERS.LABEL_NAME,
    'Publisher': HEADERS.LABEL_NAME,
    'Mech. Administrative Fee': HEADERS.COPYRIGHT_UNIT_PRICE,
    'Label Share Net Receipts': HEADERS.TOTAL_PAYMENT,
    'Trans Type Description': HEADERS.DISTRIBUTION_TYPE,

    // カタカナ・日本語
    'サービス': HEADERS.SERVICE_NAME,
    'サービス名': HEADERS.SERVICE_NAME,
    'アルバム': HEADERS.ALBUM_NAME,
    'アルバム名': HEADERS.ALBUM_NAME,
    '商品名': HEADERS.ALBUM_NAME,
    'レーベル': HEADERS.LABEL_NAME,
    'レーベル名': HEADERS.LABEL_NAME,
    'レーベル/スタジオ/ネットワーク': HEADERS.LABEL_NAME,
    '配信元': HEADERS.LABEL_NAME,
    '期間': HEADERS.USAGE_MONTH,
    '利用期間': HEADERS.USAGE_MONTH,
    '配信区分': HEADERS.DISTRIBUTION_TYPE,
    'コンテンツタイトル': HEADERS.TRACK_NAME,
    '楽曲名': HEADERS.TRACK_NAME,
    'アーティスト': HEADERS.ARTIST_NAME,
    'アーティスト名': HEADERS.ARTIST_NAME,
    '原盤ID': HEADERS.PROJECT_CODE,
    '原盤/アルバムコード': HEADERS.PROJECT_CODE
};