import { PLUGIN_ID } from './pluginId';

const wow = () => {
  return {
    label: 'Test',
    icon: null,
    disabled: false,
    type: 'default',
    variant: 'secondary',
    onClick: () => {
      alert('Button clicked!');
    },
  };
};

export default {
  register(app: any) {
    app.registerPlugin({
      id: PLUGIN_ID,
      name: PLUGIN_ID,
    });
  },

  bootstrap(app: any) {
    const contentManager = app.getPlugin('content-manager');

    if (contentManager) {
      // Adding the bulk action properly with the correct shape
      contentManager.apis.addBulkAction([wow]);
    }
  },

  async registerTrads(app: any) {
    return [];
  },
};
