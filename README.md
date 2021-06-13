# Number Pull cryptocurrency prices

Pull crypto prices from **coinmarketcap** in Mac os Apple Numbers

#### Tools used
- jxa (javascript for automation)
- Apple Numbers Objective C exposed library
- [creat-jxa-app](https://github.com/aheissenberger/macos-jxa-bundler/tree/main/packages/create-jxa-app)

## Usage

- name your sheet : 'pull-crypto-sheet'
- name table(s): 'pull-crypto-table'
- The table need to be of the form.

|CMC coin symbol | price  | last refresh |
|:--------------:|-------:|-------------:|
|BNB             | 0.00   | Date string  |

> You can also take the example from here : [example Numbers file](./assets/example-crypto-portfolio.numbers)):

In a second part we need to run the jxa script

- Grab the `.app` file in Github releases and put it in `~/Applications` folder

- **Or** download the the js script in Github release and use it from **cli** :
`osascript pull-cryptos-prices.js`

## Contribution

#### To debug :

```bash
npm run build && npm run run-script
```
or
```bash
npm run start &;
npm run run-script # on each edit
```
