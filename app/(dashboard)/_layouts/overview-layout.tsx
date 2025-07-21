import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  ClipboardList,
  Target,
  UserCheck,
  CheckCircle,
  TrendingUp,
  FileText,
  Award,
} from 'lucide-react';
import Header from '../_layouts/header';
import { Session } from 'next-auth';
import { AchievementLabel, FindingStatus, Period } from '@/lib/generated/prisma';
import { DashboardSummary } from '@/lib/types';
import { getStatusVariant } from '@/lib/utils';
import IdealCriteriaTable from '../_components/ideal-criteria-table';

interface IProps {
  user: Session['user'];
  periods: Period[];
  data: DashboardSummary;
  periodId: string;
}

function OverviewLayout({ user, periods, data, periodId }: IProps) {
  const { achievementLabelSummary, findingStatusSummary, ...summary } = data;

  return (
    <div className="min-h-screen space-y-4">
      <Header periods={periods} periodId={periodId} />

      <div>
        <h2 className="text-xl font-semibold tracking-wide">Selamat datang, {user.name}!</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-green-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kriteria</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalCriteriaAudit}</div>
            <p className="text-xs text-muted-foreground">Kriteria SPMI</p>
          </CardContent>
        </Card>

        <Card className="bg-sky-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Indikator</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalIndicatorAudit}</div>
            <p className="text-xs text-muted-foreground">Indikator audit</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Auditee</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalAuditee}</div>
            <p className="text-xs text-muted-foreground">Dosen & Staff</p>
          </CardContent>
        </Card>

        <Card className="bg-yellow-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Auditor</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalAuditor}</div>
            <p className="text-xs text-muted-foreground">Auditor internal</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress Audit</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.completedIndicatorAudit}/{summary.totalIndicatorAudit}</div>
            <Progress value={summary.progressAudit} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {summary.progressAudit}% indikator selesai
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Capaian</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{summary.averageAchievement} dari 4</div>
            <Progress value={(summary.averageAchievement / 4) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Dari indikator yang selesai</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tingkat Kesesuaian</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{summary.matchingRate}%</div>
            <Progress value={summary.matchingRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Kesesuaian dengan standar</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid items-start grid-cols-1 md:grid-cols-3 gap-4">
        <IdealCriteriaTable periodId={periodId} />

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Ringkasan Status Temuan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.keys(findingStatusSummary).map((key) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm font-medium capitalize">{key.toLowerCase().replaceAll('_', ' ')}</span>
                    <Badge variant={getStatusVariant(key as FindingStatus)}>
                      {findingStatusSummary[key as FindingStatus]} indikator
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Ringkasan Status Capaian
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.keys(achievementLabelSummary).map((key) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm font-medium capitalize">{key.toLowerCase().replaceAll('_', ' ')}</span>
                    <Badge variant={getStatusVariant(key as AchievementLabel)}>
                      {achievementLabelSummary[key as AchievementLabel]} indikator
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OverviewLayout;