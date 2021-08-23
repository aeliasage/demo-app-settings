import AppConfig from './app-config.service';

export default class BaseRoutes {
  static async Contacts(): Promise<string> {
    return (await AppConfig.getContactHost()) + '/contact';
  }
}
