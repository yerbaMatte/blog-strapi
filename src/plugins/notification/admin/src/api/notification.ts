import axios from 'axios';

type PostBlog = {
  description: string;
  slug: string;
  title: string;
};

const notificationApi = {
  sendNotification: async (post: PostBlog) => {
    return axios.post('/notification/send-notification', post);
  },
};

export default notificationApi;
