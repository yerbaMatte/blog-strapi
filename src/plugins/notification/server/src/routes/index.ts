export default [
  {
    method: 'POST',
    path: '/send-notification',
    handler: 'controller.send',
    config: {
      policies: [],
      auth: false,
    },
  },
];
