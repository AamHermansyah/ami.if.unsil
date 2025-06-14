'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag } from "emblor"
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import {
  ArrowLeft,
  Save,
  Upload,
  User,
  GraduationCap,
  Briefcase,
  Award,
  FileText,
  CheckCircle,
  AlertTriangle,
  Info,
  Camera,
  ChevronRight
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { InnerTagsInput } from '@/components/core/inner-tags-input';

// TypeScript interfaces
interface DosenFormData {
  // Personal Information
  namaLengkap: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: 'L' | 'P' | '';
  agama: string;
  kewarganegaraan: string;
  alamat: string;
  kota: string;
  provinsi: string;
  kodePos: string;
  email: string;
  telepon: string;

  // Employment Information  
  nidn: string;
  nidk: string;
  nip: string;
  statusKepegawaian: 'Tetap' | 'NIDK' | '';
  tanggalBergabung: string;
  jabatanFungsional: 'Guru Besar' | 'Lektor Kepala' | 'Lektor' | 'Asisten Ahli' | '';
  tmtJabatanFungsional: string;
  golonganPangkat: string;

  // Education Information
  pendidikanTerakhir: 'S1' | 'S2' | 'S3' | '';
  bidangStudi: string;
  universitasAsal: string;
  tahunLulus: string;
  judul: string;

  // Additional Information
  bidangKeahlian: Tag[];

  // Files
  foto: File | null;
  cvFile: File | null;
  ijazahFile: File | null;
  sertifikatFile: File | null;
}

interface FormStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  completed: boolean;
}

const CreateDosenProfilePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState<DosenFormData>({
    namaLengkap: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: '',
    agama: '',
    kewarganegaraan: 'Indonesia',
    alamat: '',
    kota: '',
    provinsi: '',
    kodePos: '',
    email: '',
    telepon: '',
    nidn: '',
    nidk: '',
    nip: '',
    statusKepegawaian: '',
    tanggalBergabung: '',
    jabatanFungsional: '',
    tmtJabatanFungsional: '',
    golonganPangkat: '',
    pendidikanTerakhir: '',
    bidangStudi: '',
    universitasAsal: '',
    tahunLulus: '',
    judul: '',
    bidangKeahlian: [],
    foto: null,
    cvFile: null,
    ijazahFile: null,
    sertifikatFile: null
  });

  const formSteps: FormStep[] = [
    {
      id: 'personal',
      title: 'Informasi Pribadi',
      description: 'Data pribadi dan kontak',
      icon: User,
      completed: false
    },
    {
      id: 'employment',
      title: 'Informasi Kepegawaian',
      description: 'NIDN, status, dan jabatan',
      icon: Briefcase,
      completed: false
    },
    {
      id: 'education',
      title: 'Informasi Pendidikan',
      description: 'Riwayat pendidikan terakhir',
      icon: GraduationCap,
      completed: false
    },
    {
      id: 'additional',
      title: 'Informasi Tambahan',
      description: 'Keahlian',
      icon: Award,
      completed: false
    },
    {
      id: 'documents',
      title: 'Upload Dokumen',
      description: 'Foto, CV, dan dokumen pendukung',
      icon: FileText,
      completed: false
    }
  ];

  const handleInputChange = (field: keyof DosenFormData, value: string | boolean | File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would typically send the data to your API
      console.log('Form data submitted:', formData);

      // Redirect or show success message
      alert('Data dosen berhasil disimpan!');

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Terjadi kesalahan saat menyimpan data');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Personal Information
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="namaLengkap">Nama Lengkap *</Label>
                <Input
                  id="namaLengkap"
                  value={formData.namaLengkap}
                  onChange={(e) => handleInputChange('namaLengkap', e.target.value)}
                  placeholder="Dr. Ahmad Fauzi, M.Kom"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jenisKelamin">Jenis Kelamin *</Label>
                <Select
                  value={formData.jenisKelamin}
                  onValueChange={(value) => handleInputChange("jenisKelamin", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Jenis Kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Laki-laki</SelectItem>
                    <SelectItem value="P">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tempatLahir">Tempat Lahir *</Label>
                <Input
                  id="tempatLahir"
                  value={formData.tempatLahir}
                  onChange={(e) => handleInputChange('tempatLahir', e.target.value)}
                  placeholder="Jakarta"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tanggalLahir">Tanggal Lahir *</Label>
                <Input
                  id="tanggalLahir"
                  type="date"
                  value={formData.tanggalLahir}
                  onChange={(e) => handleInputChange('tanggalLahir', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="agama">Agama</Label>
                <Select
                  value={formData.agama}
                  onValueChange={(value) => handleInputChange("agama", value)}
                >
                  <SelectTrigger className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <SelectValue placeholder="Pilih Agama" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Islam">Islam</SelectItem>
                    <SelectItem value="Kristen">Kristen</SelectItem>
                    <SelectItem value="Katolik">Katolik</SelectItem>
                    <SelectItem value="Hindu">Hindu</SelectItem>
                    <SelectItem value="Buddha">Buddha</SelectItem>
                    <SelectItem value="Konghucu">Konghucu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="kewarganegaraan">Kewarganegaraan</Label>
                <Input
                  id="kewarganegaraan"
                  value={formData.kewarganegaraan}
                  onChange={(e) => handleInputChange('kewarganegaraan', e.target.value)}
                  placeholder="Indonesia"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="ahmad.fauzi@unsil.ac.id"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telepon">Nomor Telepon *</Label>
                <Input
                  id="telepon"
                  value={formData.telepon}
                  onChange={(e) => handleInputChange('telepon', e.target.value)}
                  placeholder="+62 812-3456-7890"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="alamat">Alamat Lengkap</Label>
              <Textarea
                id="alamat"
                value={formData.alamat}
                onChange={(e) => handleInputChange('alamat', e.target.value)}
                placeholder="Jl. Siliwangi No. 24, Tasikmalaya"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="kota">Kota</Label>
                <Input
                  id="kota"
                  value={formData.kota}
                  onChange={(e) => handleInputChange('kota', e.target.value)}
                  placeholder="Tasikmalaya"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="provinsi">Provinsi</Label>
                <Input
                  id="provinsi"
                  value={formData.provinsi}
                  onChange={(e) => handleInputChange('provinsi', e.target.value)}
                  placeholder="Jawa Barat"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="kodePos">Kode Pos</Label>
                <Input
                  id="kodePos"
                  value={formData.kodePos}
                  onChange={(e) => handleInputChange('kodePos', e.target.value)}
                  placeholder="46115"
                />
              </div>
            </div>
          </div>
        );

      case 1: // Employment Information
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="statusKepegawaian">Status Kepegawaian *</Label>
                <Select
                  value={formData.statusKepegawaian}
                  onValueChange={(value) => handleInputChange("statusKepegawaian", value)}
                >
                  <SelectTrigger className="w-full px-3 py-2 border rounded-md">
                    <SelectValue placeholder="Pilih Status Kepegawaian" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tetap">Dosen Tetap</SelectItem>
                    <SelectItem value="NIDK">Dosen NIDK</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.statusKepegawaian === 'Tetap' && (
                <div className="space-y-2">
                  <Label htmlFor="nidn">NIDN *</Label>
                  <Input
                    id="nidn"
                    value={formData.nidn}
                    onChange={(e) => handleInputChange('nidn', e.target.value)}
                    placeholder="0123456789"
                    maxLength={10}
                  />
                </div>
              )}

              {formData.statusKepegawaian === 'NIDK' && (
                <div className="space-y-2">
                  <Label htmlFor="nidk">NIDK *</Label>
                  <Input
                    id="nidk"
                    value={formData.nidk}
                    onChange={(e) => handleInputChange('nidk', e.target.value)}
                    placeholder="8812345678"
                    maxLength={10}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="nip">NIP</Label>
                <Input
                  id="nip"
                  value={formData.nip}
                  onChange={(e) => handleInputChange('nip', e.target.value)}
                  placeholder="198501012018031001"
                  maxLength={18}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tanggalBergabung">Tanggal Bergabung</Label>
                <Input
                  id="tanggalBergabung"
                  type="date"
                  value={formData.tanggalBergabung}
                  onChange={(e) => handleInputChange('tanggalBergabung', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jabatanFungsional">Jabatan Fungsional *</Label>
                <Select
                  value={formData.jabatanFungsional}
                  onValueChange={(value) => handleInputChange("jabatanFungsional", value)}
                >
                  <SelectTrigger className="w-full px-3 py-2 border rounded-md">
                    <SelectValue placeholder="Pilih Jabatan Fungsional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asisten Ahli">Asisten Ahli</SelectItem>
                    <SelectItem value="Lektor">Lektor</SelectItem>
                    <SelectItem value="Lektor Kepala">Lektor Kepala</SelectItem>
                    <SelectItem value="Guru Besar">Guru Besar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tmtJabatanFungsional">TMT Jabatan Fungsional *</Label>
                <Input
                  id="tmtJabatanFungsional"
                  type="date"
                  value={formData.tmtJabatanFungsional}
                  onChange={(e) => handleInputChange('tmtJabatanFungsional', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="golonganPangkat">Golongan/Pangkat</Label>
                <Select
                  value={formData.golonganPangkat}
                  onValueChange={(value) => handleInputChange("golonganPangkat", value)}
                >
                  <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <SelectValue placeholder="Pilih Golongan/Pangkat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="III/a">III/a - Penata Muda</SelectItem>
                    <SelectItem value="III/b">III/b - Penata Muda Tingkat I</SelectItem>
                    <SelectItem value="III/c">III/c - Penata</SelectItem>
                    <SelectItem value="III/d">III/d - Penata Tingkat I</SelectItem>
                    <SelectItem value="IV/a">IV/a - Pembina</SelectItem>
                    <SelectItem value="IV/b">IV/b - Pembina Tingkat I</SelectItem>
                    <SelectItem value="IV/c">IV/c - Pembina Utama Muda</SelectItem>
                    <SelectItem value="IV/d">IV/d - Pembina Utama Madya</SelectItem>
                    <SelectItem value="IV/e">IV/e - Pembina Utama</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Alert variant="info">
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Catatan:</strong>
                <p>
                  NIDN untuk dosen tetap dan NIDK untuk dosen tidak tetap. Pastikan nomor yang dimasukkan sudah sesuai dengan data resmi.
                </p>
              </AlertDescription>
            </Alert>
          </div>
        );

      case 2: // Education Information
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="pendidikanTerakhir">Pendidikan Terakhir *</Label>
                <Select
                  value={formData.pendidikanTerakhir}
                  onValueChange={(value) => handleInputChange("pendidikanTerakhir", value)}
                >
                  <SelectTrigger className="w-full px-3 py-2 border rounded-md">
                    <SelectValue placeholder="Pilih Jenjang Pendidikan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="S1">S1 (Sarjana)</SelectItem>
                    <SelectItem value="S2">S2 (Magister)</SelectItem>
                    <SelectItem value="S3">S3 (Doktor)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bidangStudi">Bidang Studi/Program Studi *</Label>
                <Input
                  id="bidangStudi"
                  value={formData.bidangStudi}
                  onChange={(e) => handleInputChange('bidangStudi', e.target.value)}
                  placeholder="Teknik Informatika"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="universitasAsal">Universitas/Institusi *</Label>
                <Input
                  id="universitasAsal"
                  value={formData.universitasAsal}
                  onChange={(e) => handleInputChange('universitasAsal', e.target.value)}
                  placeholder="Institut Teknologi Bandung"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tahunLulus">Tahun Lulus *</Label>
                <Input
                  id="tahunLulus"
                  type="number"
                  min="1950"
                  max="2024"
                  value={formData.tahunLulus}
                  onChange={(e) => handleInputChange('tahunLulus', e.target.value)}
                  placeholder="2020"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="judul">Judul Skripsi/Tesis/Disertasi</Label>
              <Textarea
                id="judul"
                value={formData.judul}
                onChange={(e) => handleInputChange('judul', e.target.value)}
                placeholder="Implementasi Machine Learning untuk Prediksi..."
                rows={3}
              />
            </div>

            <Alert variant="success">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Tips:</strong>
                <p>
                  Pastikan data pendidikan sesuai dengan ijazah resmi. Informasi ini akan digunakan untuk verifikasi kualifikasi dosen.
                </p>
              </AlertDescription>
            </Alert>
          </div>
        );

      case 3: // Additional Information
        return (
          <div className="space-y-4">
            <div>
              <Label>Bidang Keahlian *</Label>
              <p className="text-sm text-muted-foreground mb-3">Tambahkan bidang keahlian Anda (minimal 1)</p>

              <InnerTagsInput
                placeholder="Contoh: Machine Learning"
                defaultTags={[{ id: "1", text: "Red" }]}
                onChange={(tags) => {
                  setFormData(prev => ({
                    ...prev,
                    bidangKeahlian: tags
                  }));
                }}
              />

              <div className="text-sm text-muted-foreground mt-2">
                Saran bidang keahlian: Artificial Intelligence, Machine Learning, Data Science,
                Computer Vision, Natural Language Processing, Software Engineering, Database Systems
              </div>
            </div>
          </div>
        );

      case 4: // Documents
        return (
          <div className="space-y-6">
            <Alert variant="info">
              <Upload className="h-4 w-4" />
              <AlertDescription>
                <strong>Upload Dokumen:</strong> Semua dokumen bersifat opsional, namun sangat disarankan
                untuk melengkapi profil. Format yang didukung: PDF, JPG, PNG (maksimal 5MB per file).
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="foto">Foto Profil</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      {formData.foto ? formData.foto.name : 'Pilih foto profil'}
                    </p>
                    <input
                      type="file"
                      id="foto"
                      accept="image/*"
                      onChange={(e) => handleInputChange('foto', e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('foto')?.click()}
                    >
                      Pilih File
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvFile">CV/Resume</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      {formData.cvFile ? formData.cvFile.name : 'Upload CV/Resume (PDF)'}
                    </p>
                    <input
                      type="file"
                      id="cvFile"
                      accept=".pdf"
                      onChange={(e) => handleInputChange('cvFile', e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('cvFile')?.click()}
                    >
                      Pilih File
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ijazahFile">Ijazah Terakhir</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <GraduationCap className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      {formData.ijazahFile ? formData.ijazahFile.name : 'Upload ijazah terakhir (PDF)'}
                    </p>
                    <input
                      type="file"
                      id="ijazahFile"
                      accept=".pdf"
                      onChange={(e) => handleInputChange('ijazahFile', e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('ijazahFile')?.click()}
                    >
                      Pilih File
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sertifikatFile">Sertifikat Pendidik</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Award className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      {formData.sertifikatFile ? formData.sertifikatFile.name : 'Upload sertifikat pendidik (PDF)'}
                    </p>
                    <input
                      type="file"
                      id="sertifikatFile"
                      accept=".pdf"
                      onChange={(e) => handleInputChange('sertifikatFile', e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('sertifikatFile')?.click()}
                    >
                      Pilih File
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-4">
              <h4 className="font-medium mb-2">File yang telah diupload:</h4>
              <div className="space-y-2">
                {formData.foto && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Foto Profil: {formData.foto.name}</span>
                  </div>
                )}
                {formData.cvFile && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>CV: {formData.cvFile.name}</span>
                  </div>
                )}
                {formData.ijazahFile && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Ijazah: {formData.ijazahFile.name}</span>
                  </div>
                )}
                {formData.sertifikatFile && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Sertifikat: {formData.sertifikatFile.name}</span>
                  </div>
                )}
                {!formData.foto && !formData.cvFile && !formData.ijazahFile && !formData.sertifikatFile && (
                  <p className="text-sm text-muted-foreground">Belum ada file yang diupload</p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Button variant="ghost" size="sm">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali
      </Button>
      <div className="bg-card rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-bold">
                Data Profil Dosen
              </h1>
              <p className="text-sm text-muted-foreground">
                Lengkapi data profil dosen untuk audit mutu internal
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 order-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {React.createElement(formSteps[currentStep].icon, { className: "w-5 h-5 text-blue-600" })}
                {formSteps[currentStep].title}
              </CardTitle>
              <CardDescription>
                {formSteps[currentStep].description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderStepContent()}

              <Separator />

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Sebelumnya
                </Button>

                {currentStep < formSteps.length - 1 ? (
                  <Button onClick={nextStep}>
                    Selanjutnya
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Simpan Data
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col-reverse lg:flex-col gap-6">
          {/* Progress Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ringkasan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Stepper value={currentStep} orientation="vertical">
                {formSteps.map((step, index) => (
                  <StepperItem
                    key={step.id}
                    step={index + 1}
                    className="relative items-start not-last:flex-1"
                  >
                    <StepperTrigger className="items-start rounded pb-3 last:pb-0">
                      <StepperIndicator />
                      <div className="mt-0.5 space-y-0.5 px-2 text-left">
                        <StepperTitle>{step.title}</StepperTitle>
                        <StepperDescription>{step.description}</StepperDescription>
                      </div>
                    </StepperTrigger>
                    {index + 1 < formSteps.length && (
                      <StepperSeparator className="absolute inset-y-0 top-[calc(1.5rem+0.125rem)] left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none group-data-[orientation=vertical]/stepper:h-[calc(100%-1.5rem-0.25rem)]" />
                    )}
                  </StepperItem>
                ))}
              </Stepper>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informasi Penting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Alert variant="warning">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Field bertanda (*) wajib diisi untuk melanjutkan ke step berikutnya.
                </AlertDescription>
              </Alert>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="block flex-1">Data akan tersimpan ketika klik tombol selanjutnya/submit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="block flex-1">Format dokumen: PDF, JPG, PNG</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="block flex-1">Maksimal ukuran file: 5MB</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateDosenProfilePage;