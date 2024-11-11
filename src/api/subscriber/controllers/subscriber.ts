import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::subscriber.subscriber",
  ({ strapi }) => ({
    async subscribe(ctx) {
      const { email } = ctx.request.body;

      const existingSubscriber = await strapi
        .service("api::subscriber.subscriber")
        .find({
          filters: { email },
        });

      if (existingSubscriber && existingSubscriber.results.length > 0) {
        return ctx.send({ message: "Subscriber already exists" }, 400);
      }

      const verificationToken = crypto.randomUUID();

      await strapi.service("api::subscriber.subscriber").create({
        data: {
          email,
          isVerified: false,
          verificationToken,
        },
      });

      const verificationLink = `${process.env.DOMAIN_URL}/verify/${verificationToken}`;

      try {
        await strapi
          .plugin("email")
          .service("email")
          .send({
            to: email,
            subject: "Welcome to Code Brew - Confirm Your Subscription!",
            text: `Hello! Thank you for subscribing to the Code Brew by @yerbamatte. I'm thrilled to have you with me!

Please verify your email by clicking on the link below:
${verificationLink}

Once verified, you'll receive the latest news, updates, and insights on all things, delivered straight to your inbox!

Happy brewing,  
@yerbaMatte
`,
            html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Welcome to Code Brew by @yerbamatte!</h2>
          <p>Hello! Thank you for subscribing to the @yerbaMatte blog. I'm thrilled to have you with me!</p>
          
          <p>
            To start receiving the latest news, updates, and insights on all things, please confirm your subscription by clicking the link below:
          </p>
          <p><a href="${verificationLink}">${verificationLink}</a></p>
          
          <p>Once verified, you’ll be part of the Code Brew community! I'm excited to keep you updated with exclusive insights, brewing tips, and the latest from the world of Software Engineering.</p>
          
          <p>Happy brewing,<br>The @yerbaMatte</p>
          <hr>
          <p style="font-size: 12px; color: #666;">If you did not sign up for this subscription, please disregard this email.</p>
        </div>
      `,
          });
        ctx.send({
          message: "Please check your email to verify.",
        });
      } catch (err) {
        console.error("Error sending email:", err);
        ctx.send(
          {
            message:
              "Subscriber created, but failed to send verification email.",
          },
          500
        );
      }
    },

    async verify(ctx) {
      const { token } = ctx.params;

      const subscriber = await strapi
        .service("api::subscriber.subscriber")
        .find({
          filters: { verificationToken: token },
        });

      if (!subscriber || subscriber.results.length === 0) {
        return ctx.send({ message: "Invalid or expired token" }, 400);
      }

      const subscriberData = subscriber.results[0];

      if (subscriberData.isVerified) {
        return ctx.send({ message: "Subscriber already verified" });
      }

      await strapi
        .service("api::subscriber.subscriber")
        .update(subscriberData.documentId, {
          data: {
            isVerified: true,
            verificationToken: null,
          },
        });

      ctx.send({ message: "Successfully verified" });
    },
  })
);
