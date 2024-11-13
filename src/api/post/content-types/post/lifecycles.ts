const sendEmailToSubscribers = async (post) => {
  const { title, slug, description } = post;

  const subscribers = await strapi
    .documents("api::subscriber.subscriber")
    .findMany({
      filters: {
        isVerified: true,
      },
    });

  const emailContent = {
    subject: `🧉 Fresh Brew Alert! Check out the latest scoop: ${title}`,
    text: `Hey there! Just wanted to let you know: "${title}" is hot off the press!\n\nHere's a sneak peek:\n${description}\n\nDive in here: ${process.env.DOMAIN_URL}/blog/${slug}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px;">
        <h1 style="font-size: 26px;">📢 Heads Up! New Brew Just Dropped</h1>
        <h2 style="color: #4caf4f; font-size: 24px;"><em>"${title}"</em></h2>
        
        <p style="font-size: 18px;">Hey there, caffeinated reader! ☕️</p>
        
        <p style="font-size: 16px;">
          I know you’ve got great taste, and guess what? The latest article, <strong>"${title}"</strong>, is live and brewing with fresh insights!
        </p>
        
        <p style="font-size: 18px; font-weight: bold; margin: 20px 0;">Here’s a sneak peek:</p>
        
        <blockquote style="color: #555; font-style: italic; margin: 15px 0; font-size: 16px; padding-left: 15px; border-left: 5px solid #4caf4f;">
          ${description}
        </blockquote>
        
        <p style="font-size: 18px; font-weight: bold; margin: 20px 0;">Don’t miss out! It’s waiting for you to take that first sip:</p>
        
        <a href="${process.env.DOMAIN_URL}/posts/${slug}" 
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
          ☕ Read the Full Post
        </a>
        
        <p style="font-size: 16px; margin-top: 20px;">
          So, cozy up, take a deep sip of knowledge, and let me know what you think!
        </p>
        
        <p style="font-size: 16px;">Happy reading,<br>
          Your friendly blog barista, <strong>@yerbaMatte</strong></p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ccc;">
        
        <p style="font-size: 12px; color: #666;">
          (P.S. Don’t be a stranger! I love hearing from my community, so feel free to hit reply.)
        </p>
      </div>
    `,
  };

  const emailPromises = subscribers.map((subscriber) =>
    strapi
      .plugin("email")
      .service("email")
      .send({
        to: subscriber.email,
        ...emailContent,
      })
  );

  await Promise.all(emailPromises);
};

export default {
  async afterUpdate({ result }) {
    await sendEmailToSubscribers(result);
  },
};
