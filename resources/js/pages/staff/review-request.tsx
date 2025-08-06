import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import InputError from '@/components/input-error';

interface InformationRequest {
    id: number;
    request_number: string;
    applicant_name: string;
    applicant_address: string;
    applicant_phone: string;
    applicant_email?: string;
    applicant_nik: string;
    request_subject: string;
    request_purpose: string;
    status: string;
    status_label: string;
    documents?: string[];
    created_at: string;
    submitted_at?: string;
    public_body: {
        name: string;
        code: string;
        address?: string;
    };
}

interface StaffMember {
    id: number;
    name: string;
}

interface Props {
    request: InformationRequest;
    staffMembers: StaffMember[];
    [key: string]: unknown;
}

export default function ReviewRequest({ request, staffMembers }: Props) {
    const [reviewAction, setReviewAction] = useState<'accept' | 'request_completion'>('accept');
    
    const { data, setData, post, processing, errors } = useForm({
        action: 'accept' as 'accept' | 'request_completion',
        notes: '',
        completion_notes: '',
        assigned_staff_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setData('action', reviewAction);
        post(route('staff.review.store', request.id));
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppShell>
            <Head title={`Review Permohonan ${request.request_number}`} />
            
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        ✅ Review Permohonan #{request.request_number}
                    </h1>
                    <p className="text-gray-600">Lakukan verifikasi formal dan tentukan tindak lanjut permohonan</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Request Details (Left Column) */}
                    <div className="space-y-6">
                        {/* Status */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold">Status Permohonan</h3>
                                        <Badge className="mt-1 bg-yellow-100 text-yellow-800">
                                            {request.status_label}
                                        </Badge>
                                    </div>
                                    <div className="text-right text-sm text-gray-600">
                                        <p>Diajukan: {request.submitted_at && formatDate(request.submitted_at)}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Applicant Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">👤 Data Pemohon</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <label className="font-medium text-gray-500">Nama Lengkap</label>
                                        <p className="text-gray-900">{request.applicant_name}</p>
                                    </div>
                                    <div>
                                        <label className="font-medium text-gray-500">NIK/Identitas</label>
                                        <p className="text-gray-900">{request.applicant_nik}</p>
                                    </div>
                                    <div>
                                        <label className="font-medium text-gray-500">Telepon</label>
                                        <p className="text-gray-900">{request.applicant_phone}</p>
                                    </div>
                                    {request.applicant_email && (
                                        <div>
                                            <label className="font-medium text-gray-500">Email</label>
                                            <p className="text-gray-900">{request.applicant_email}</p>
                                        </div>
                                    )}
                                    <div className="col-span-2">
                                        <label className="font-medium text-gray-500">Alamat</label>
                                        <p className="text-gray-900">{request.applicant_address}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Request Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">🏢 Detail Permohonan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Badan Publik Termohon</label>
                                    <p className="text-gray-900">{request.public_body.name}</p>
                                    <p className="text-sm text-gray-600">{request.public_body.code}</p>
                                </div>
                                
                                <Separator />
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Substansi Permohonan</label>
                                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                                        <p className="text-sm text-gray-900 whitespace-pre-wrap">{request.request_subject}</p>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Tujuan Permohonan</label>
                                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                                        <p className="text-sm text-gray-900 whitespace-pre-wrap">{request.request_purpose}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Documents */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">📎 Dokumen Pendukung</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {request.documents && request.documents.length > 0 ? (
                                    <div className="space-y-2">
                                        {request.documents.map((doc, index) => (
                                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <span className="text-lg">📄</span>
                                                <span className="text-sm text-gray-700">{doc}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm">Tidak ada dokumen yang di-upload</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Review Form (Right Column) */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">📋 Formulir Review</CardTitle>
                                <CardDescription>Lakukan verifikasi formal dan tentukan tindak lanjut</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Review Checklist */}
                                    <div className="space-y-4">
                                        <h4 className="font-medium">Checklist Verifikasi</h4>
                                        
                                        <div className="space-y-3 text-sm">
                                            <label className="flex items-center">
                                                <input type="checkbox" className="mr-2" />
                                                Kelengkapan identitas pemohon (nama, NIK/identitas, alamat, kontak)
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" className="mr-2" />
                                                Kejelasan substansi informasi yang diminta
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" className="mr-2" />
                                                Tujuan permohonan sesuai dengan UU KIP
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" className="mr-2" />
                                                Legal standing pemohon (hak mengajukan permohonan)
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" className="mr-2" />
                                                Badan publik termohon sesuai dengan substansi
                                            </label>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Action Selection */}
                                    <div>
                                        <Label className="text-base font-medium">Keputusan Review</Label>
                                        <Tabs 
                                            value={reviewAction} 
                                            onValueChange={(value) => setReviewAction(value as 'accept' | 'request_completion')}
                                            className="mt-2"
                                        >
                                            <TabsList className="grid w-full grid-cols-2">
                                                <TabsTrigger value="accept" className="text-sm">✅ Terima</TabsTrigger>
                                                <TabsTrigger value="request_completion" className="text-sm">📝 Minta Kelengkapan</TabsTrigger>
                                            </TabsList>
                                            
                                            <TabsContent value="accept" className="space-y-4 mt-4">
                                                <Alert>
                                                    <AlertDescription>
                                                        Permohonan akan diterima dan diteruskan untuk diproses lebih lanjut.
                                                    </AlertDescription>
                                                </Alert>
                                                
                                                <div>
                                                    <Label htmlFor="assigned_staff_id">Tugaskan ke Staf</Label>
                                                    <Select 
                                                        value={data.assigned_staff_id} 
                                                        onValueChange={(value) => setData('assigned_staff_id', value)}
                                                    >
                                                        <SelectTrigger className="mt-1">
                                                            <SelectValue placeholder="Pilih staf yang bertanggung jawab" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {staffMembers.map((staff) => (
                                                                <SelectItem key={staff.id} value={staff.id.toString()}>
                                                                    {staff.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div>
                                                    <Label htmlFor="notes">Catatan Review</Label>
                                                    <Textarea
                                                        id="notes"
                                                        value={data.notes}
                                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('notes', e.target.value)}
                                                        className="mt-1"
                                                        placeholder="Tambahkan catatan untuk permohonan yang diterima..."
                                                        rows={3}
                                                    />
                                                    <InputError message={errors.notes} className="mt-2" />
                                                </div>
                                            </TabsContent>
                                            
                                            <TabsContent value="request_completion" className="space-y-4 mt-4">
                                                <Alert className="border-orange-200 bg-orange-50">
                                                    <AlertDescription className="text-orange-800">
                                                        Permohonan akan dikembalikan ke pemohon untuk melengkapi data/dokumen.
                                                    </AlertDescription>
                                                </Alert>
                                                
                                                <div>
                                                    <Label htmlFor="completion_notes">Catatan Kelengkapan *</Label>
                                                    <Textarea
                                                        id="completion_notes"
                                                        value={data.completion_notes}
                                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('completion_notes', e.target.value)}
                                                        className="mt-1"
                                                        placeholder="Jelaskan data atau dokumen apa yang perlu dilengkapi..."
                                                        rows={4}
                                                        required={reviewAction === 'request_completion'}
                                                    />
                                                    <InputError message={errors.completion_notes} className="mt-2" />
                                                </div>
                                            </TabsContent>
                                        </Tabs>
                                    </div>

                                    {/* Submit Buttons */}
                                    <div className="flex gap-4 pt-4">
                                        <Button 
                                            type="button" 
                                            variant="outline"
                                            onClick={() => window.history.back()}
                                            className="flex-1"
                                        >
                                            ❌ Batal
                                        </Button>
                                        <Button 
                                            type="submit" 
                                            disabled={processing}
                                            className={`flex-1 ${reviewAction === 'accept' 
                                                ? 'bg-green-600 hover:bg-green-700' 
                                                : 'bg-orange-600 hover:bg-orange-700'
                                            }`}
                                        >
                                            {processing ? '⏳ Memproses...' : (
                                                reviewAction === 'accept' 
                                                    ? '✅ Terima Permohonan' 
                                                    : '📝 Minta Kelengkapan'
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}