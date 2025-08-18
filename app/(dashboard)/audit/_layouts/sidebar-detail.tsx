import React from 'react'
import { History } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { getStatusVariant } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { AchievementLabel, FindingStatus } from '@/lib/generated/prisma';
import { getIndicatorAuditLogs } from '@/data/indicator-audit';
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline"
import { id } from 'date-fns/locale';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface IProps {
  achievement: number;
  achievementLabel: AchievementLabel;
  findingStatus: FindingStatus;
  indicatorAuditId: string;
}

async function SidebarDetail({
  achievement,
  achievementLabel,
  findingStatus,
  indicatorAuditId
}: IProps) {
  const res = await getIndicatorAuditLogs(indicatorAuditId);
  if (res?.error) throw Error(res.message);

  const { logs, remaining } = res.data!;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Aktivitas Audit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Timeline>
            {logs.length === 0 && (
              <div className="w-full flex flex-col gap-2 items-center justify-center">
                <History className="w-10 h-10 text-muted-foreground" />
                <p className="text-sm">Belum ada aktivitas audit</p>
              </div>
            )}
            {logs.map((item, index) => (
              <TimelineItem
                key={item.id}
                step={index + 1}
                className="group-data-[orientation=vertical]/timeline:ms-10 group-data-[orientation=vertical]/timeline:not-last:pb-4"
              >
                <TimelineHeader>
                  <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                  <TimelineTitle className="mt-0.5">
                    {item.user.name}{" "}
                    <span className="text-muted-foreground text-sm font-normal capitalize">
                      ({item.user.access?.role.toLowerCase()})
                    </span>
                  </TimelineTitle>
                  <Link href={`/profil/${item.user.access!.id}`}>
                    <TimelineIndicator className="bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7">
                      <img
                        src={item.user.image || ''}
                        alt={item.user.name}
                        className="size-6 rounded-full"
                      />
                    </TimelineIndicator>
                  </Link>
                </TimelineHeader>
                <TimelineContent className="text-foreground mt-2 rounded-lg border px-4 py-3">
                  {item.note}
                  <TimelineDate className="mt-1 mb-0 capitalize">
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                      locale: id,
                    })}
                  </TimelineDate>
                </TimelineContent>
              </TimelineItem>
            ))}
            {remaining > 0 && (
              <TimelineItem
                step={logs.length + 1}
                className="group-data-[orientation=vertical]/timeline:ms-10 group-data-[orientation=vertical]/timeline:not-last:pb-4"
              >
                <TimelineHeader>
                  <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                  <TimelineTitle className="mt-0.5">
                    {remaining}+ Aktivitas
                  </TimelineTitle>
                  <TimelineIndicator className="bg-primary/20 dark:bg-muted/50 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7" />
                </TimelineHeader>
              </TimelineItem>
            )}
          </Timeline>
        </CardContent>
      </Card>

      {/* Status Summary */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle>
            Ringkasan Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tingkat Capaian</span>
            <span className="text-sm font-medium">{achievement}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Kategori</span>
            <Badge variant={getStatusVariant(achievementLabel)} className="capitalize">
              {achievementLabel.toLowerCase().replaceAll('_', ' ')}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status Audit</span>
            <Badge variant={getStatusVariant(findingStatus)} className="capitalize">
              {findingStatus.toLowerCase().replaceAll('_', ' ')}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SidebarDetail