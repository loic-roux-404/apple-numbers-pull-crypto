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
    createHeaders() {
      return Object.entries(this.headers).map(([headerKey, value]) => {
        return `-H '${headerKey}: ${value}'`;
      }).join(' ');
    },
    getQuotes (symbols) {
      const url = this.createUrl(
        this.endpoints.quotes,
        { symbol: symbols.join(',') }
      );

      const app = Application.currentApplication();
      app.includeStandardAdditions = true;

      const script = `curl ${this.createHeaders()} -fsL -G '${url}'`;
      const { data } = JSON.parse(app.doShellScript(script));

      return data
    }
};