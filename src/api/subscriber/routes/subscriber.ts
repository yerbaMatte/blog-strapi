export default {
  routes: [
    {
      method: "POST",
      path: "/subscriber/subscribe",
      handler: "subscriber.subscribe",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/subscriber/verify/:token",
      handler: "subscriber.verify",
      config: {
        auth: false,
      },
    },
  ],
};
