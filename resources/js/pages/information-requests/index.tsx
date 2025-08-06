import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InformationRequest {
    id: number;
    request_number: string;
    applicant_name: string;
    status: string;
    status_label: string;
    public_body: {
        name: string;
    };
    created_at: string;
    submitted_at?: string;
}

interface PublicBody {
    id: number;
    name: string;
}

interface PaginationLink {
    url?: string;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    requests: {
        data: InformationRequest[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    publicBodies: PublicBody[];
    filters: {
        status?: string;
        public_body?: string;
        assigned?: string;
    };
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

export default function InformationRequestsIndex({ requests, publicBodies, filters }: Props) {
    const handleFilterChange = (key: string, value: string) => {
        router.get('/information-requests', { ...filters, [key]: value });
    };

    const clearFilters = () => {
        router.get('/information-requests');
    };

    return (
        <AppShell>
            <Head title="Daftar Permohonan Informasi" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">📋 Daftar Permohonan Informasi</h1>
                        <p className="text-gray-600">Kelola dan pantau semua permohonan informasi publik</p>
                    </div>
                    
                    <Link href="/information-requests/create">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            ➕ Buat Permohonan Baru
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">🔍 Filter Permohonan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
                                <Select 
                                    value={filters.status || ''} 
                                    onValueChange={(value) => handleFilterChange('status', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Semua Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Semua Status</SelectItem>
                                        <SelectItem value="submitted">Diajukan</SelectItem>
                                        <SelectItem value="under_review">Sedang Ditinjau</SelectItem>
                                        <SelectItem value="needs_completion">Perlu Dilengkapi</SelectItem>
                                        <SelectItem value="accepted">Diterima</SelectItem>
                                        <SelectItem value="in_process">Sedang Diproses</SelectItem>
                                        <SelectItem value="decided">Diputus</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Badan Publik</label>
                                <Select 
                                    value={filters.public_body || ''} 
                                    onValueChange={(value) => handleFilterChange('public_body', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Semua Badan Publik" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Semua Badan Publik</SelectItem>
                                        {publicBodies.map((body) => (
                                            <SelectItem key={body.id} value={body.id.toString()}>
                                                {body.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Penugasan</label>
                                <Select 
                                    value={filters.assigned || ''} 
                                    onValueChange={(value) => handleFilterChange('assigned', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Semua Permohonan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Semua Permohonan</SelectItem>
                                        <SelectItem value="true">Ditugaskan ke Saya</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-end">
                                <Button variant="outline" onClick={clearFilters} className="w-full">
                                    🗑️ Bersihkan Filter
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Results */}
                <div className="space-y-4">
                    {requests.data.length > 0 ? (
                        <>
                            {requests.data.map((request) => (
                                <Card key={request.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                            <div className="flex-1 space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="font-semibold text-lg text-gray-900">
                                                        #{request.request_number}
                                                    </h3>
                                                    <Badge 
                                                        className={statusColors[request.status as keyof typeof statusColors]}
                                                    >
                                                        {request.status_label}
                                                    </Badge>
                                                </div>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                                    <div>
                                                        <span className="font-medium">Pemohon:</span> {request.applicant_name}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Badan Publik:</span> {request.public_body.name}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Dibuat:</span> {' '}
                                                        {new Date(request.created_at).toLocaleDateString('id-ID', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </div>
                                                    {request.submitted_at && (
                                                        <div>
                                                            <span className="font-medium">Diajukan:</span> {' '}
                                                            {new Date(request.submitted_at).toLocaleDateString('id-ID', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="flex gap-2">
                                                <Link href={`/information-requests/${request.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        👁️ Lihat
                                                    </Button>
                                                </Link>
                                                
                                                {request.status === 'submitted' && (
                                                    <Link href={`/staff/review/${request.id}`}>
                                                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                                            ✅ Review
                                                        </Button>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Pagination */}
                            {requests.meta.last_page > 1 && (
                                <div className="flex justify-center">
                                    <div className="flex gap-2">
                                        {requests.links.map((link, index: number) => (
                                            <Button
                                                key={index}
                                                variant={link.active ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => link.url && router.get(link.url)}
                                                disabled={!link.url}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <Card>
                            <CardContent className="p-12 text-center">
                                <div className="text-6xl mb-4">📭</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Tidak Ada Permohonan
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Belum ada permohonan informasi yang sesuai dengan filter yang dipilih.
                                </p>
                                <Link href="/information-requests/create">
                                    <Button>
                                        ➕ Buat Permohonan Pertama
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppShell>
    );
}