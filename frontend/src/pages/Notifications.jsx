import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { 
  Bell, 
  Check, 
  Trash2, 
  Info, 
  CheckCircle, 
  XCircle, 
  Clock,
  ChevronRight,
  MailOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data.data);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await api.patch(`/notifications/read/${id}`);
      setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/notifications/delete/${id}`);
      setNotifications(notifications.filter(n => n._id !== id));
    } catch (err) {
      console.error("Failed to delete notification", err);
    }
  };

  const markAllAsRead = async () => {
    const unread = notifications.filter(n => !n.isRead);
    try {
      await Promise.all(unread.map(n => api.patch(`/notifications/read/${n._id}`)));
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  };

  if (loading) return <div className="animate-pulse space-y-4 py-12 max-w-3xl mx-auto">{[1,2,3,4].map(i => <div key={i} className="h-20 bg-gray-100 rounded-2xl" />)}</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Bell className="w-8 h-8 mr-3 text-primary-600" />
            Notifications
          </h1>
          <p className="text-gray-500 mt-1">Stay updated with your applications and alerts.</p>
        </div>
        {notifications.some(n => !n.isRead) && (
          <button 
            onClick={markAllAsRead}
            className="text-primary-600 text-sm font-bold flex items-center hover:underline bg-primary-50 px-4 py-2 rounded-full"
          >
            <MailOpen className="w-4 h-4 mr-2" />
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              key={notif._id} 
              className={`group card relative !p-5 flex items-start space-x-4 transition-all ${
                notif.isRead ? 'bg-white opacity-70' : 'bg-primary-50/50 border-primary-200 ring-2 ring-primary-50 ring-offset-0'
              }`}
            >
              <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                notif.message.includes('Selected') ? 'bg-green-100 text-green-600' :
                notif.message.includes('Rejected') ? 'bg-red-100 text-red-600' :
                'bg-primary-100 text-primary-600'
              }`}>
                {notif.message.includes('Selected') ? <CheckCircle className="w-5 h-5" /> :
                 notif.message.includes('Rejected') ? <XCircle className="w-5 h-5" /> :
                 <Info className="w-5 h-5" />}
              </div>

              <div className="flex-grow pr-12">
                <p className={`text-gray-900 ${notif.isRead ? 'font-medium' : 'font-bold'}`}>
                  {notif.message}
                </p>
                <p className="text-xs text-gray-400 mt-2 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {new Date(notif.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                {!notif.isRead && (
                  <button 
                    onClick={() => markAsRead(notif._id)}
                    className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                    title="Mark as read"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                )}
                <button 
                  onClick={() => deleteNotification(notif._id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {notifications.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <MailOpen className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No notifications</h3>
            <p className="text-gray-500">You're all caught up! New alerts will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
