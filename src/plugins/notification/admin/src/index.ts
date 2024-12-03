import { NotificationPanel } from './components/NotificationPanel';
import type { PanelComponent } from '@strapi/content-manager/strapi-admin';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { StrapiApp } from '@strapi/strapi/admin';

interface ContentManagerPlugin {
  apis: {
    addEditViewSidePanel: (panels: PanelComponent[]) => void;
  };
}

export default {
  register(app: StrapiApp) {
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  bootstrap(app: StrapiApp) {
    const contentManagerPlugin = app.getPlugin(
      'content-manager'
    ) as unknown as ContentManagerPlugin;

    contentManagerPlugin.apis.addEditViewSidePanel([NotificationPanel]);
  },
};
