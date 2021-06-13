export default class NumbersDoc {
    constructor(config) {
        this.app = Application('Numbers')
        this.app.includeStandardAdditions = true
        this.config = config
        this.document = this.getDocument()
    }

    getDocument() {
        if (0 in this.app.documents()) {
            return this.app.documents()[0]
        } else {
            throw new Error('No document open')
        }
    }

    findTableByName({ sheetName, tableName }) {
        return this.document
            .sheets()
            .find(sheet => sheet.name().toLowerCase() === sheetName.toLowerCase())
            .tables()
            .find(table => table.name().toLowerCase() === tableName.toLowerCase())
    }

    findTableByNameWithConfig() {
        return this.findTableByName(this.config)
    }
}
