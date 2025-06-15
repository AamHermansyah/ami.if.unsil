'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'

function AddAccessDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4" />
          Tambah Akses
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tambah Akses Pengguna</DialogTitle>
          <DialogDescription>
            Masukkan email dan peran pengguna yang akan ditambahkan.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-1">
          <Label>Email</Label>
          <Input type="email" placeholder="nama@unsil.ac.id" />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="ghost">Batal</Button>
          <Button>Simpan</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddAccessDialog;
