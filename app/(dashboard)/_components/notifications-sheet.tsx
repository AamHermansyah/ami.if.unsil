import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Bell,
  CheckCheck,
  Circle,
  Clock,
  Info,
  Trash2,
  User,
  Award,
  CheckCircle,
  MessageSquare,
  X,
  BellOff,
  ClipboardCheck,
  Activity
} from 'lucide-react';

// TypeScript interfaces
interface Notification {
  id: string;
  title: string;
  description: string;
  category: 'system' | 'verification' | 'deadline' | 'achievement' | 'update' | 'message';
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  timestamp: string;
  from?: string;
  actionUrl?: string;
  actionLabel?: string;
  relatedData?: {
    type: 'dosen' | 'publikasi' | 'produk' | 'target';
    name: string;
    id: string;
  };
}

interface NotificationGroup {
  date: string;
  notifications: Notification[];
}

const notifications: Notification[] = [
  {
    id: '1',
    title: 'Publikasi Baru Perlu Verifikasi',
    description: 'Dr. Ahmad Fauzi telah mensubmit publikasi "Machine Learning Approach" untuk diverifikasi',
    category: 'verification',
    type: 'warning',
    isRead: false,
    timestamp: '2024-03-20T10:30:00',
    from: 'Dr. Ahmad Fauzi',
    actionUrl: '/laporan/penelitian/0412089001',
    actionLabel: 'Verifikasi Sekarang',
    relatedData: {
      type: 'publikasi',
      name: 'Machine Learning Approach for Sentiment Analysis',
      id: 'pub-001'
    }
  },
  {
    id: '2',
    title: 'Target AMI Tercapai!',
    description: 'Target publikasi internasional bereputasi untuk tahun 2024 telah tercapai',
    category: 'achievement',
    type: 'success',
    isRead: false,
    timestamp: '2024-03-20T09:00:00',
    from: 'System',
    actionUrl: '/laporan',
    actionLabel: 'Lihat Detail',
    relatedData: {
      type: 'target',
      name: 'Publikasi Internasional Bereputasi',
      id: 'target-001'
    }
  },
  {
    id: '3',
    title: 'Deadline Audit Mendekati',
    description: 'Audit semester genap 2023/2024 harus diselesaikan dalam 5 hari',
    category: 'deadline',
    type: 'error',
    isRead: false,
    timestamp: '2024-03-19T14:00:00',
    from: 'System',
    actionUrl: '/monitoring',
    actionLabel: 'Cek Progress'
  },
  {
    id: '4',
    title: 'Data Tendik Diperbarui',
    description: 'Budi Santoso telah memperbarui data profil dan sertifikasi',
    category: 'update',
    type: 'info',
    isRead: true,
    timestamp: '2024-03-19T11:20:00',
    from: 'Budi Santoso',
    relatedData: {
      type: 'dosen',
      name: 'Budi Santoso',
      id: 'tendik-003'
    }
  },
  {
    id: '5',
    title: 'Pesan dari Dosen',
    description: 'Dr. Siti Nurhaliza menanyakan tentang proses verifikasi produk penelitian',
    category: 'message',
    type: 'info',
    isRead: true,
    timestamp: '2024-03-18T16:45:00',
    from: 'Dr. Siti Nurhaliza',
    actionUrl: '/messages',
    actionLabel: 'Balas Pesan'
  },
  {
    id: '6',
    title: 'Produk Penelitian Terverifikasi',
    description: 'Aplikasi Monitoring Kualitas Air telah berhasil diverifikasi',
    category: 'verification',
    type: 'success',
    isRead: true,
    timestamp: '2024-03-18T10:00:00',
    from: 'System',
    relatedData: {
      type: 'produk',
      name: 'Aplikasi Monitoring Kualitas Air',
      id: 'prod-001'
    }
  }
];

const NotificationSheet: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const unreadByCategory = {
    all: unreadCount,
    verification: notifications.filter(n => n.category === 'verification' && !n.isRead).length,
    deadline: notifications.filter(n => n.category === 'deadline' && !n.isRead).length,
    achievement: notifications.filter(n => n.category === 'achievement' && !n.isRead).length,
    update: notifications.filter(n => n.category === 'update' && !n.isRead).length,
    message: notifications.filter(n => n.category === 'message' && !n.isRead).length,
  };

  // Group notifications by date
  const groupNotificationsByDate = (notifs: Notification[]): NotificationGroup[] => {
    const groups: { [key: string]: Notification[] } = {};

    notifs.forEach(notif => {
      const date = new Date(notif.timestamp);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let dateKey: string;
      if (date.toDateString() === today.toDateString()) {
        dateKey = 'Hari Ini';
      } else if (date.toDateString() === yesterday.toDateString()) {
        dateKey = 'Kemarin';
      } else {
        dateKey = date.toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(notif);
    });

    return Object.entries(groups).map(([date, notifications]) => ({
      date,
      notifications: notifications.sort((a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
    }));
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notif.isRead;
    return notif.category === activeTab;
  });

  const groupedNotifications = groupNotificationsByDate(filteredNotifications);

  // Get icon based on category
  const getCategoryIcon = (category: string, type: string) => {
    switch (category) {
      case 'verification':
        return type === 'success' ?
          <CheckCircle className="w-4 h-4 text-green-600" /> :
          <ClipboardCheck className="w-4 h-4 text-orange-600" />;
      case 'deadline':
        return <Clock className="w-4 h-4 text-red-600" />;
      case 'achievement':
        return <Award className="w-4 h-4 text-green-600" />;
      case 'update':
        return <Activity className="w-4 h-4 text-blue-600" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-purple-600" />;
      default:
        return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  // Get type color
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Baru saja';
    if (diffMins < 60) return `${diffMins} menit yang lalu`;
    if (diffHours < 24) return `${diffHours} jam yang lalu`;
    if (diffDays < 7) return `${diffDays} hari yang lalu`;

    return date.toLocaleDateString('id-ID');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md gap-0">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifikasi
            </SheetTitle>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs mr-4"
              >
                <CheckCheck className="w-4 h-4 mr-1" />
                Tandai Semua
              </Button>
            )}
          </div>
          <SheetDescription>
            Anda memiliki {unreadCount} notifikasi belum dibaca
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 h-full pb-24">
          <Tabs className="h-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full sm:grid grid-cols-3 mb-4">
              <TabsTrigger value="all" className="relative text-xs sm:text-sm">
                Semua
                {unreadByCategory.all > 0 && (
                  <Badge variant="destructive" className="ml-1 size-4.5 sm:size-5">
                    {unreadByCategory.all}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread" className="relative text-xs sm:text-sm">
                Belum Dibaca
                {unreadByCategory.all > 0 && (
                  <Badge variant="destructive" className="ml-1 size-4.5 sm:size-5">
                    {unreadByCategory.all}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="verification" className="text-xs sm:text-sm">
                Verifikasi
                {unreadByCategory.verification > 0 && (
                  <Badge variant="destructive" className="ml-1 size-4.5 sm:size-5">
                    {unreadByCategory.verification}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Filter Options */}
            <div className="flex items-center justify-end">
              {notifications.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Hapus Semua
                </Button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto">
              {groupedNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <BellOff className="w-12 h-12 text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Tidak ada notifikasi
                  </p>
                </div>
              ) : (
                <div className="space-y-4 pb-4">
                  {groupedNotifications.map((group) => (
                    <div key={group.date}>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">
                        {group.date}
                      </h4>
                      <div className="space-y-2">
                        {group.notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 rounded-lg border transition-colors ${notification.isRead
                              ? 'bg-background hover:bg-muted/50'
                              : 'bg-card border hover:bg-card/80'
                              }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getTypeColor(notification.type)}`}>
                                {getCategoryIcon(notification.category, notification.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1">
                                    <h5 className="font-medium text-sm mb-1 flex items-center gap-2">
                                      {notification.title}
                                      {!notification.isRead && (
                                        <Circle className="w-2 h-2 fill-blue-600 text-blue-600" />
                                      )}
                                    </h5>
                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                      {notification.description}
                                    </p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 shrink-0"
                                  >
                                    <X className="w-3 h-3" />
                                  </Button>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    {notification.from && (
                                      <>
                                        <User className="w-3 h-3" />
                                        <span>{notification.from}</span>
                                        <span>•</span>
                                      </>
                                    )}
                                    <Clock className="w-3 h-3" />
                                    <span>{formatTime(notification.timestamp)}</span>
                                  </div>

                                  {notification.actionUrl && (
                                    <Button
                                      variant="link"
                                      size="sm"
                                      className="text-xs h-auto p-0"
                                    >
                                      {notification.actionLabel || 'Lihat'}
                                    </Button>
                                  )}
                                </div>

                                {notification.relatedData && (
                                  <div className="mt-2 p-2 bg-muted rounded text-xs">
                                    <span className="text-muted-foreground">Terkait: </span>
                                    <span className="font-medium">{notification.relatedData.name}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationSheet;