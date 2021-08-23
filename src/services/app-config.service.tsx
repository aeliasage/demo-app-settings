export default class AppConfig {
  /**
   * Use to get the data found in the second file (config file)
   */
  public static getContactHost(): Promise<string> {
    try {
      // Local development only - expect a .env file
      if (process.env.NODE_ENV === 'development') {
        return Promise.resolve<string>(
          process.env.REACT_APP_CONTACTS_HOST ?? 'REACT_APP_CONTACTS_HOST'
        );
      }
      // We fetch this from our static files copied in from the public folder
      return fetch('config.json').then<string>((response) => {
        return response.json().then<string>((config) => {
          return config.contacts_host;
        });
      });
    } catch (responseError) {
      console.log(responseError); // eslint-disable-line no-console
      throw responseError;
    }
  }

  public static getLedgerSetupHost(): Promise<string> {
    try {
      // Local development only - expect a .env file
      if (process.env.NODE_ENV === 'development') {
        return Promise.resolve<string>(
          process.env.REACT_APP_GENERAL_LEDGER_SETUP_HOST ??
            'REACT_APP_GENERAL_LEDGER_SETUP_HOST'
        );
      }
      // We fetch this from our static files copied in from the public folder
      return fetch('config.json').then<string>((response) => {
        return response.json().then<string>((config) => {
          return config.general_ledger_setup_host;
        });
      });
    } catch (responseError) {
      console.log(responseError); // eslint-disable-line no-console
      throw responseError;
    }
  }
}
