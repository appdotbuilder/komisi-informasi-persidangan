import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
    staff_notes?: string;
    completion_notes?: string;
    created_at: string;
    submitted_at?: string;
    reviewed_at?: string;
    decided_at?: string;
    public_body: {
        name: string;
        code: string;
        address?: string;
    };
    applicant?: {
        name: string;
        email: string;
    };
    assigned_staff?: {
        name: string;
        email: string;
    };
}

interface Props {
    request: InformationRequest;
    [key: string]: unknown;
}

const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    submitted: 'bg-blue-100 text-blue-800',
    under_review: 'bg-yellow-100 text-yellow-800',
    needs_completion: 'bg-orange-100 text-orange-800',
    accepted: 'bg-green-100 text-green-800',
    in_process: 'bg-purple-100 text-purple-800',
    decided: 'bg-indigo-100 text-indigo-800',
    closed: 'bg-gray-100 text-gray-800',
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

export default function ShowInformationRequest({ request }: Props) {
    return (
        <AppShell>
            <Head title={`Permohonan ${request.request_number}`} />
            
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            📋 Permohonan #{request.request_number}
                        </h1>
                        <div className="flex items-center gap-3 mt-2">
                            <Badge className={statusColors[request.status as keyof typeof statusColors]}>
                                {request.status_label}
                            </Badge>
                            <span className="text-sm text-gray-600">
                                Dibuat {formatDate(request.created_at)}
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex gap-2">
                        <Link href="/information-requests">
                            <Button variant="outline">
                                ← Kembali ke Daftar
                            </Button>
                        </Link>
                        
                        {request.status === 'submitted' && (
                            <Link href={`/staff/review/${request.id}`}>
                                <Button className="bg-green-600 hover:bg-green-700">
                                    ✅ Review Permohonan
                                </Button>
                            </Link>
                        )}
                        
                        <Link href={`/information-requests/${request.id}/edit`}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                ✏️ Edit
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Timeline */}
                <Card>
                    <CardHeader>
                        <CardTitle>📅 Timeline Permohonan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mt-1"></div>
                                <div>
                                    <p className="font-medium">Permohonan Dibuat</p>
                                    <p className="text-sm text-gray-600">{formatDate(request.created_at)}</p>
                                </div>
                            </div>
                            
                            {request.submitted_at && (
                                <div className="flex items-start gap-4">
                                    <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                                    <div>
                                        <p className="font-medium">Permohonan Diajukan</p>
                                        <p className="text-sm text-gray-600">{formatDate(request.submitted_at)}</p>
                                    </div>
                                </div>
                            )}
                            
                            {request.reviewed_at && (
                                <div className="flex items-start gap-4">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full mt-1"></div>
                                    <div>
                                        <p className="font-medium">Permohonan Ditinjau</p>
                                        <p className="text-sm text-gray-600">{formatDate(request.reviewed_at)}</p>
                                        {request.assigned_staff && (
                                            <p className="text-sm text-gray-500">
                                                Oleh: {request.assigned_staff.name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                            
                            {request.decided_at && (
                                <div className="flex items-start gap-4">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full mt-1"></div>
                                    <div>
                                        <p className="font-medium">Keputusan Diambil</p>
                                        <p className="text-sm text-gray-600">{formatDate(request.decided_at)}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Applicant Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>👤 Data Pemohon</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Nama Lengkap</label>
                                    <p className="text-gray-900">{request.applicant_name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">NIK/Identitas</label>
                                    <p className="text-gray-900">{request.applicant_nik}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Nomor Telepon</label>
                                    <p className="text-gray-900">{request.applicant_phone}</p>
                                </div>
                                {request.applicant_email && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Email</label>
                                        <p className="text-gray-900">{request.applicant_email}</p>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Alamat</label>
                                <p className="text-gray-900">{request.applicant_address}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Request Details */}
                <Card>
                    <CardHeader>
                        <CardTitle>🏢 Detail Permohonan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Badan Publik Termohon</label>
                            <p className="text-gray-900 font-medium">{request.public_body.name}</p>
                            <p className="text-sm text-gray-600">{request.public_body.code}</p>
                            {request.public_body.address && (
                                <p className="text-sm text-gray-600">{request.public_body.address}</p>
                            )}
                        </div>
                        
                        <Separator />
                        
                        <div>
                            <label className="text-sm font-medium text-gray-500">Substansi Permohonan</label>
                            <p className="text-gray-900 mt-1 whitespace-pre-wrap">{request.request_subject}</p>
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium text-gray-500">Tujuan Permohonan</label>
                            <p className="text-gray-900 mt-1 whitespace-pre-wrap">{request.request_purpose}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Documents */}
                {request.documents && request.documents.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>📎 Dokumen Pendukung</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {request.documents.map((doc, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <span className="text-2xl">📄</span>
                                        <span className="text-sm text-gray-700">{doc}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Staff Notes */}
                {(request.staff_notes || request.completion_notes) && (
                    <Card>
                        <CardHeader>
                            <CardTitle>💬 Catatan Staf</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {request.staff_notes && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Catatan Review</label>
                                    <p className="text-gray-900 mt-1 whitespace-pre-wrap">{request.staff_notes}</p>
                                </div>
                            )}
                            
                            {request.completion_notes && (
                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                    <label className="text-sm font-medium text-orange-700">Catatan Kelengkapan</label>
                                    <p className="text-orange-900 mt-1 whitespace-pre-wrap">{request.completion_notes}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppShell>
    );
}