import type { Core } from '@strapi/strapi';
import { sendEmailToSubscribers } from '../utils/sendEmailToSubscribers';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  async send(ctx) {
    try {
      const post = ctx.request.body;

      if (!post || !post.title || !post.description) {
        return ctx.badRequest('Missing required fields: title, description, or slug');
      }

      await sendEmailToSubscribers(post, strapi);

      ctx.body = { message: 'Emails sent successfully' };
    } catch (error) {
      strapi.log.error('Error sending emails:', error);
      ctx.internalServerError('Failed to send emails');
    }
  },
});

export default controller;
