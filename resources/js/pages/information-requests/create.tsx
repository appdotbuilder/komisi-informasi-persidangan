import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';

interface PublicBody {
    id: number;
    name: string;
    code: string;
}

interface Props {
    publicBodies: PublicBody[];
    [key: string]: unknown;
}

export default function CreateInformationRequest({ publicBodies }: Props) {
    const [documents, setDocuments] = useState<string[]>([]);
    
    const { data, setData, post, processing, errors } = useForm({
        applicant_name: '',
        applicant_address: '',
        applicant_phone: '',
        applicant_email: '',
        applicant_nik: '',
        public_body_id: '',
        request_subject: '',
        request_purpose: '',
        documents: [] as string[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('information-requests.store'));
    };

    const addDocument = () => {
        const newDoc = `Dokumen ${documents.length + 1}`;
        setDocuments([...documents, newDoc]);
        setData('documents', [...documents, newDoc]);
    };

    const removeDocument = (index: number) => {
        const newDocs = documents.filter((_, i) => i !== index);
        setDocuments(newDocs);
        setData('documents', newDocs);
    };

    return (
        <AppShell>
            <Head title="Buat Permohonan Informasi Baru" />
            
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">📝 Buat Permohonan Informasi Baru</h1>
                    <p className="text-gray-600">Isi formulir berikut untuk mengajukan permohonan informasi publik</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Applicant Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                👤 Data Pemohon
                            </CardTitle>
                            <CardDescription>
                                Informasi identitas dan kontak pemohon
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="applicant_name">Nama Lengkap *</Label>
                                    <Input
                                        id="applicant_name"
                                        type="text"
                                        value={data.applicant_name}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('applicant_name', e.target.value)}
                                        className="mt-1"
                                        placeholder="Masukkan nama lengkap"
                                    />
                                    <InputError message={errors.applicant_name} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="applicant_nik">NIK/Identitas Lain *</Label>
                                    <Input
                                        id="applicant_nik"
                                        type="text"
                                        value={data.applicant_nik}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('applicant_nik', e.target.value)}
                                        className="mt-1"
                                        placeholder="Masukkan NIK atau identitas lain"
                                    />
                                    <InputError message={errors.applicant_nik} className="mt-2" />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="applicant_address">Alamat *</Label>
                                <Textarea
                                    id="applicant_address"
                                    value={data.applicant_address}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('applicant_address', e.target.value)}
                                    className="mt-1"
                                    placeholder="Masukkan alamat lengkap"
                                    rows={3}
                                />
                                <InputError message={errors.applicant_address} className="mt-2" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="applicant_phone">Nomor Telepon *</Label>
                                    <Input
                                        id="applicant_phone"
                                        type="text"
                                        value={data.applicant_phone}
                                        onChange={(e) => setData('applicant_phone', e.target.value)}
                                        className="mt-1"
                                        placeholder="Masukkan nomor telepon"
                                    />
                                    <InputError message={errors.applicant_phone} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="applicant_email">Email</Label>
                                    <Input
                                        id="applicant_email"
                                        type="email"
                                        value={data.applicant_email}
                                        onChange={(e) => setData('applicant_email', e.target.value)}
                                        className="mt-1"
                                        placeholder="email@contoh.com (opsional)"
                                    />
                                    <InputError message={errors.applicant_email} className="mt-2" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Request Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                🏢 Informasi Permohonan
                            </CardTitle>
                            <CardDescription>
                                Detail permohonan informasi publik
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="public_body_id">Badan Publik Termohon *</Label>
                                <Select 
                                    value={data.public_body_id} 
                                    onValueChange={(value) => setData('public_body_id', value)}
                                >
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Pilih badan publik" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {publicBodies.map((body) => (
                                            <SelectItem key={body.id} value={body.id.toString()}>
                                                <div>
                                                    <div className="font-medium">{body.name}</div>
                                                    <div className="text-xs text-gray-500">{body.code}</div>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.public_body_id} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="request_subject">Substansi Permohonan *</Label>
                                <Textarea
                                    id="request_subject"
                                    value={data.request_subject}
                                    onChange={(e) => setData('request_subject', e.target.value)}
                                    className="mt-1"
                                    placeholder="Jelaskan informasi yang diminta secara detail"
                                    rows={4}
                                />
                                <InputError message={errors.request_subject} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="request_purpose">Tujuan Permohonan *</Label>
                                <Textarea
                                    id="request_purpose"
                                    value={data.request_purpose}
                                    onChange={(e) => setData('request_purpose', e.target.value)}
                                    className="mt-1"
                                    placeholder="Jelaskan tujuan dan kegunaan informasi yang diminta"
                                    rows={3}
                                />
                                <InputError message={errors.request_purpose} className="mt-2" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Supporting Documents */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                📎 Dokumen Pendukung
                            </CardTitle>
                            <CardDescription>
                                Upload dokumen seperti KTP, surat kuasa, bukti permohonan awal
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                <div className="text-4xl mb-2">📄</div>
                                <p className="text-gray-600 mb-4">
                                    Fitur upload dokumen akan segera tersedia
                                </p>
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    onClick={addDocument}
                                    className="mr-2"
                                >
                                    ➕ Tambah Referensi Dokumen
                                </Button>
                            </div>

                            {documents.length > 0 && (
                                <div className="space-y-2">
                                    <Label>Dokumen yang akan di-upload:</Label>
                                    {documents.map((doc, index) => (
                                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                            <span className="text-sm">{doc}</span>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeDocument(index)}
                                            >
                                                🗑️
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Submit Buttons */}
                    <div className="flex gap-4 justify-end">
                        <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            ❌ Batal
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {processing ? '⏳ Mengirim...' : '📤 Ajukan Permohonan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}