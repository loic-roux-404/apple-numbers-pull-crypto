// Imports
import cmcApi from './cmcApi'
import { friendlyDate } from './utils/date' 

(() => {
    'use strict';

    const app = Application('Numbers')
    app.includeStandardAdditions = true
 
    const table = app.documents()[0].sheets()[0].tables()[0]
    const cellsRange = table.cellRange()

    const quotes = cmcApi.getQuotes(
        cellsRange
        .cells()
        .flatMap(
            cell => cell.column().address() === 1 ? cell.value() : []
        )
    )

    let coinObj = {}
    let quote = {}
    cellsRange.cells().forEach(cell => {
        if (cell.column().address() === 1) {
            coinObj = quotes[cell.value()]
            quote = coinObj.quote[cmcApi.defaultsParams.convert]
            return [];
        } else if (cell.column().address() === 2) { 
            cell.value = quote.price
        } else if (cell.column().address() === 3) {
            cell.value = friendlyDate(new Date(coinObj.last_updated))
        }
    })
})();