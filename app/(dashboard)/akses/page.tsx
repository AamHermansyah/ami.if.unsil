"use client"

import React from 'react'
import Header from './_layouts/header'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Ban } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import AddAccessDialog from './_components/add-access-dialog';

// Contoh data dummy
const aksesUsers = [
  {
    id: '1',
    email: 'budi@unsil.ac.id',
    peran: 'Auditor',
    createdAt: new Date(),
    status: 'Aktif',
  },
  {
    id: '2',
    email: 'dewi@unsil.ac.id',
    peran: 'Auditee',
    createdAt: new Date(),
    status: 'Nonaktif',
  },
]

function AksesPage() {
  return (
    <div className="space-y-4">
      <Header />
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Daftar Email</CardTitle>
            <AddAccessDialog />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Peran</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Dibuat</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aksesUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.peran}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'Aktif' ? 'success' : 'destructive'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(user.createdAt, 'eeee, d MMMM y')}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="icon">
                          <Ban className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AksesPage