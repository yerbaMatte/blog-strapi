import { factories } from "@strapi/strapi";
import crypto from "crypto";

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
            subject: "Confirm Your Newsletter Subscription!",
            text: `Hello! 
            
            Thank you for subscribing to Code Brew by @yerbamatte. 
            
            I'm thrilled to have you with me!

Please verify your email by clicking on the link below:
${verificationLink}

Once verified, you'll receive the latest news, updates, and insights on all things, delivered straight to your inbox!

Happy brewing,  
@yerbaMatte
`,
            html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px;">
          
          <div style="display: flex; align-items: center; justify-content: center; width: 100%;">
    <div style="display: flex; align-items: center; justify-content: center; max-width: fit-content;">
            <svg width="40px" height="40px" viewBox="0 0 48 48" fill="#000000" xmlns="http://www.w3.org/2000/svg" style="margin-right: 10px;">
              <path d="M39.580078 1.9941406 A 1.50015 1.50015 0 0 0 39.035156 2.0742188L35.132812 3.3457031L35.103516 3.3574219C32.973703 4.1550658 31.195652 5.6835617 30.091797 7.6699219C30.091797 7.6699219 30.089844 7.6699219 30.089844 7.6699219L30.082031 7.6894531L30.039062 7.7714844L28.208984 12.667969C27.052003 12.865401 25.647338 13 24 13C19.66 13 16.979688 12.07 16.179688 11.5C16.979688 10.93 19.66 10 24 10C24.7 10 25.360469 10.020312 25.980469 10.070312L27.080078 7.1601562C25.980078 7.0501562 24.92 7 24 7C20.598149 7 15.257647 7.6619276 13.552734 9.9257812 A 1.50015 1.50015 0 0 0 13.320312 10.173828C13.320312 10.173828 12.536919 11.167614 11.746094 12.369141C11.350681 12.969904 10.949638 13.624605 10.625 14.277344C10.300362 14.930083 10 15.517212 10 16.394531C10 16.563 10.013687 16.728396 10.037109 16.890625C8.8130173 18.299926 5 23.262428 5 30.568359C5 35.537722 7.6190476 39.324858 11.255859 41.648438C14.892672 43.972017 19.514706 45 24 45C28.485294 45 33.107328 43.972017 36.744141 41.648438C40.380953 39.324858 43 35.537722 43 30.568359C43 23.262428 39.186983 18.299926 37.962891 16.890625C37.986313 16.728396 38 16.563 38 16.394531C38 15.517212 37.699638 14.930083 37.375 14.277344C37.050362 13.624605 36.649319 12.969904 36.253906 12.369141C35.463081 11.167614 34.679688 10.173828 34.679688 10.173828 A 1.50015 1.50015 0 0 0 34.439453 9.9277344C34.090598 9.4654123 33.598448 9.0679725 32.992188 8.7324219C33.752823 7.5718136 34.8403 6.661454 36.148438 6.1699219L39.964844 4.9257812 A 1.50015 1.50015 0 0 0 39.580078 1.9941406 z M 14.365234 13.859375C16.583166 15.493693 21.029526 16 24 16C25.620701 16 27.675282 15.840459 29.576172 15.439453 A 1.5002762 1.5002762 0 0 0 29.771484 15.390625C31.278116 15.056526 32.669459 14.570677 33.634766 13.859375C33.675163 13.919694 33.70561 13.958023 33.746094 14.019531C34.100681 14.558268 34.449638 15.13502 34.6875 15.613281C34.925362 16.091542 35 16.534851 35 16.394531C35 16.562825 34.91998 16.838403 34.480469 17.259766C34.040952 17.681128 33.274932 18.166563 32.265625 18.583984C30.24701 19.418827 27.279709 20 24 20C20.720291 20 17.75299 19.418827 15.734375 18.583984C14.725068 18.166563 13.959048 17.681128 13.519531 17.259766C13.080015 16.838403 13 16.562825 13 16.394531C13 16.534851 13.07464 16.091542 13.3125 15.613281C13.550362 15.13502 13.899319 14.558268 14.253906 14.019531C14.29439 13.958023 14.324837 13.919694 14.365234 13.859375 z M 11.677734 19.623047C12.468853 20.317805 13.445435 20.882981 14.587891 21.355469C17.093276 22.391626 20.375709 23 24 23C27.624291 23 30.906724 22.391626 33.412109 21.355469C34.554565 20.882981 35.531147 20.317805 36.322266 19.623047C37.645227 21.363662 40 25.197922 40 30.568359C40 34.529996 38.119047 37.20997 35.130859 39.119141C32.142672 41.028311 28.014706 42 24 42C19.985294 42 15.857328 41.028311 12.869141 39.119141C9.8809524 37.20997 8 34.529996 8 30.568359C8 25.197922 10.354773 21.363662 11.677734 19.623047 z"/>
            </svg>
            </div>
            <h2 style="flex: 1; margin: 0; color: #4caf4f; font-size: 20px;">Welcome to Code Brew!</h2>
          </div>
          <p style="font-size: 16px; color: #333;">Thank you for subscribing to the Code Brew by <a href="https://blog.yerbamatte.com/about" 
          style="
            display: inline;
            color: #4caf4f;
            font-weight: bold;
          "
        >@yerbamatte</a>.</p>
          <p style="font-size: 16px; color: #333;">
            Please verify your email by clicking on the link below:
          </p>
          <a href="${verificationLink}" 
          style="
            display: inline-block;
            background-color: #4caf4f;
            color: white;
            text-decoration: none;
            font-weight: bold;
            padding: 12px 24px;
            font-size: 18px;
            border-radius: 5px;
            margin-top: 10px;
          "
        >
          ☕ Verify Your Email
        </a>


          
          <p style="font-size: 16px; color: #333;">Once verified, you’ll be part of the Code Brew community!</p>
          <p style="font-size: 16px; color: #333;">I'm excited to keep you updated with exclusive insights, brewing tips, and the latest from the world of Software Engineering.</p>
          
          <p style="font-size: 16px; color: #333;">Happy brewing,<br><a href="https://blog.yerbamatte.com/about" 
          style="
            display: inline;
            color: #4caf4f;
            font-weight: bold;
          "
        >@yerbamatte</a></p>
          <hr>
          <p style="font-size: 12px; color: #666;">If you did not sign up for this subscription, please disregard this email.</p>
        </div>
      `,
          });
        ctx.send({
          message: "Please check your mailbox to verify!",
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
