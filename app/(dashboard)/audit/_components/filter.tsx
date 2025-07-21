import InputSearch from '@/components/shared/input-search';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react'
import { AchievementLabel, Criteria, CriteriaAudit, FindingStatus } from '@/lib/generated/prisma';

interface IProps {
  criterias: (CriteriaAudit & { criteria: Criteria })[];
}

const achievementOpts = Object.values(AchievementLabel);
const findingOpts = Object.values(FindingStatus);

function Filter({ criterias }: IProps) {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const criteriaId = searchParams.get('criteriaId') || '';
  const achievementLabel = searchParams.get('achievementLabel') || '';
  const findingStatus = searchParams.get('findingStatus') || '';

  const handleFilterChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'all' || (type === 'q' && !value)) {
      params.delete(type);
    } else {
      params.set(type, value.trim());
    }

    params.set('page', '1');

    navigate.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full grid grid-cols-2 md:flex gap-2 md:gap-4 mt-3">
      <InputSearch
        defaultValue={q}
        placeholder="Cari indikator atau kode..."
        onChange={(value) => handleFilterChange('q', value)}
        className="col-span-2 sm:col-span-1"
      />
      <Select
        defaultValue={criteriaId}
        onValueChange={(value) => handleFilterChange('criteriaId', value)}
      >
        <SelectTrigger className="col-span-2 sm:col-span-1 w-full md:w-24">
          <SelectValue placeholder="Kriteria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua</SelectItem>
          {criterias.map(item => (
            <SelectItem key={item.criteria.code} value={item.id}>
              {item.criteria.code} - {item.criteria.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        defaultValue={achievementLabel}
        onValueChange={(value) => handleFilterChange('achievementLabel', value)}
      >
        <SelectTrigger className="w-full md:w-44 capitalize">
          <SelectValue placeholder="Capaian" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua</SelectItem>
          {achievementOpts.map(item => (
            <SelectItem key={item} value={item} className="capitalize">
              {item.replaceAll('_', ' ').toLowerCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        defaultValue={findingStatus}
        onValueChange={(value) => handleFilterChange('findingStatus', value)}
      >
        <SelectTrigger className="w-full md:w-32 capitalize">
          <SelectValue placeholder="Temuan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua</SelectItem>
          {findingOpts.map(item => (
            <SelectItem key={item} value={item} className="capitalize">
              {item.replaceAll('_', ' ').toLowerCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default Filter