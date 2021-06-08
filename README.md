# Number Pull cryptocurrency prices

Pull crypto prices from **coinmarketcap** in Mac os Apple Numbers 

#### Tools
- jxa (javascript for automation) 
- Apple Numbers Objective C exposed library

## Usage

- First table in first sheet need to be of the form. 

|CMC coin symbol | price  | last refresh |
|:--------------:|-------:|-------------:|
|BNB             | 0.00   | Date string  |

> You can also take the example from here : [example Numbers file](./assets/example-crypto-portfolio.numbers)):

In a second part we need to run the jxa script

- Grab the `.app` file in Github releases and put it in `~/Applications` folder

- **Or** download the the js script in Github release and use it from **cli** :
`osascript pull-cryptos-prices.js`

## Roadmap

- [ ] Config in a Numbers table instead of always taking the first
- [ ] Refacto index.js script with more SRP functions

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
