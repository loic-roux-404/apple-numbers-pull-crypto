// Imports
import cmcApi from './cmcApi'

((options) => {
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
            
    let tmp = {}
    cellsRange.cells().forEach(cell => {
        if (cell.column().address() === 1) {
            tmp = cell.value()
            return [];
        } else if (cell.column().address() === 2) { 
            cell.value = quotes[tmp].quote[cmcApi.defaultsParams.convert].price
        }
    })
})();