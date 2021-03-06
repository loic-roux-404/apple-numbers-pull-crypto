import { run } from "./utils/shell"

export default {
    url: 'pro-api.coinmarketcap.com',
    headers: {
      'X-CMC_PRO_API_KEY': '57c7edd3-62c2-4172-9c9e-1ee3130f52b2'
    },
    defaultsParams: {
        convert: 'USD',
    },
    endpoints: {
        quotes: 'v1/cryptocurrency/quotes/latest'
    },
    createUrl (endpoint, params) {
      let url = `https://${this.url}/${endpoint}?`;

      for (const [key, value] of Object.entries({ ...this.defaultsParams, ...params })) {
        url += `${key}=${value}&`;
      }

      return url.slice(0, -1);
    },
    createHeaders(additionals = {}) {
      return Object.entries({...this.headers, ...additionals})
        .map(([headerKey, value]) => `-H '${headerKey}: ${value}'`)
        .join(' ');
    },
    fetch(url, additionalsHeaders = {}) {
      try {
        return JSON.parse(
          run(`curl ${this.createHeaders(additionalsHeaders)} -fsL -G '${url}'`)
        )
      } catch(e) {
        throw new Error('Error while fetching ' + url)
      }
    },
    getQuotes(symbols) {
      const url = this.createUrl(
        this.endpoints.quotes,
        { symbol: symbols.join(',') }
      );

      const { data } = this.fetch(url)

      return data
    }
};
