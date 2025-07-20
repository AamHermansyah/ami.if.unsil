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
  BellOff,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface IProps {
  isScrolled: boolean;
}

function NotificationSheet({ isScrolled }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'relative',
            isScrolled && 'text-white'
          )}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
            9+
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md gap-0">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifikasi
            </SheetTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs mr-4"
            >
              <CheckCheck className="w-4 h-4 mr-1" />
              Tandai Semua
            </Button>
          </div>
          <SheetDescription>
            Anda memiliki 12 notifikasi belum dibaca
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 h-full pb-24">
          <Tabs className="h-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full sm:grid grid-cols-3 mb-4">
              <TabsTrigger value="all" className="relative text-xs sm:text-sm">
                Semua
                <Badge variant="destructive" className="ml-1 size-4.5 sm:size-5">
                  9+
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="unread" className="relative text-xs sm:text-sm">
                Belum Dibaca
                <Badge variant="destructive" className="ml-1 size-4.5 sm:size-5">
                  9+
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="verification" className="text-xs sm:text-sm">
                Verifikasi
                <Badge variant="destructive" className="ml-1 size-4.5 sm:size-5">
                  9+
                </Badge>
              </TabsTrigger>
            </TabsList>

            {/* Filter Options */}
            <div className="flex items-center justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Hapus Semua
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <BellOff className="w-12 h-12 text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">
                  Tidak ada notifikasi
                </p>
              </div>
            </div>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationSheet;