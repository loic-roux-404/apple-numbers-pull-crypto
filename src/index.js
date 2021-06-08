import cmcApi from './cmcApi';
import { friendlyDate } from './utils/date';

/**
 * Only for Macos-x (Less Yosemite)
 * Pull crypto price in your number sheet
 * Needed :
 *  - first sheet with a table of tree columns in the body
 * Usage :
 *  - osascript pull-cryptos-prices.js 
 */
(() => {
    'use strict';

    const app = Application('Numbers');
    app.includeStandardAdditions = true;
    // TODO: use a config table
    const table = app.documents()[0].sheets()[0].tables()[0];
    const cellsRange = table.cellRange();

    // Simple Helper
    const testValidValueCell = cell => {
        return cell.column().address() === 1 &&
            cell.row().address() > table.headerRowCount() &&
            cell.row().address() <= (table.rowCount() - table.footerRowCount()) &&
            cell.value() != null;
    }

    const quotes = cmcApi.getQuotes(
        cellsRange
            .cells()
            .flatMap(cell => testValidValueCell(cell) ? cell.value() : [])
    );

    let coinObj = null;
    let quote = null;
    cellsRange.cells().forEach(cell => {
        if (testValidValueCell(cell)) {
            coinObj = quotes[cell.value()]
            quote = coinObj.quote[cmcApi.defaultsParams.convert]
            return [];
        } else if (coinObj != null && cell.column().address() === 2) {
            cell.value = quote.price
        } else if (coinObj != null && cell.column().address() === 3) {
            cell.value = friendlyDate(new Date(coinObj.last_updated))
            coinObj = null
            quote = null
        }
    })
})();
