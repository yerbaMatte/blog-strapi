import type { PanelComponent, PanelComponentProps } from '@strapi/content-manager/strapi-admin';
import notificationApi from '../api/notification';

const ToolsPanel = ({ document }: { document: any }) => {
  const { description, slug, title } = document;
  console.log(document);

  const handleSendNotification = async () => {
    try {
      const payload = { description, slug, title };
      const response = await notificationApi.sendNotification(payload);
      alert(response.data.message);
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notifications.');
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <button
        style={{
          width: '100%',
          color: 'white',
          fontWeight: '600',
          fontSize: '1.5rem',
          padding: '1.125rem',
          borderRadius: '12px',
          backgroundColor: '#d62e22',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={handleSendNotification}
      >
        Send as a newsletter
      </button>
    </div>
  );
};

export const NotificationPanel: PanelComponent = ({ document }: PanelComponentProps) => {
  return {
    title: 'Tools',
    content: <ToolsPanel document={document} />,
  };
};
