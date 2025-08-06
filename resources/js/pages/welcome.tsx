import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Props {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    laravelVersion: string;
    phpVersion: string;
    [key: string]: unknown;
}

export default function Welcome({ auth, laravelVersion, phpVersion }: Props) {
    const handleGetStarted = () => {
        if (auth?.user) {
            if (auth.user.role === 'applicant') {
                router.get('/information-requests/create');
            } else {
                router.get('/information-requests');
            }
        } else {
            router.get('/register');
        }
    };

    const handleViewRequests = () => {
        router.get('/information-requests');
    };

    return (
        <>
            <Head title="Sistem Persidangan Komisi Informasi Provinsi" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">📋</span>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">KIP Provinsi</h1>
                                    <p className="text-sm text-gray-600">Komisi Informasi Provinsi</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                {auth?.user ? (
                                    <div className="flex items-center space-x-4">
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900">{auth.user.name}</p>
                                            <Badge variant="secondary" className="text-xs">
                                                {auth.user.role === 'applicant' ? 'Pemohon' : 
                                                 auth.user.role === 'staff' ? 'Staf KIP' : 'Komisioner'}
                                            </Badge>
                                        </div>
                                        <Link 
                                            href="/dashboard"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                        >
                                            Dashboard
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link 
                                            href="/login"
                                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                                        >
                                            Masuk
                                        </Link>
                                        <Link 
                                            href="/register"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            Daftar
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-16 lg:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                                📊 Sistem Persidangan 
                                <span className="block text-blue-600">Komisi Informasi Provinsi</span>
                            </h1>
                            <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                                Platform digital untuk mengelola proses permohonan informasi publik dari pendaftaran hingga putusan dengan mudah dan transparan
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Button 
                                    onClick={handleGetStarted}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg h-auto"
                                    size="lg"
                                >
                                    🚀 {auth?.user ? 
                                        (auth.user.role === 'applicant' ? 'Ajukan Permohonan' : 'Kelola Permohonan') 
                                        : 'Mulai Sekarang'
                                    }
                                </Button>
                                {auth?.user && (
                                    <Button 
                                        onClick={handleViewRequests}
                                        variant="outline"
                                        className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg h-auto"
                                        size="lg"
                                    >
                                        📋 Lihat Daftar Permohonan
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fitur Unggulan Sistem</h2>
                            <p className="text-lg text-gray-600">Mendukung tiga peran pengguna dengan fungsi yang komprehensif</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Pemohon Features */}
                            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                        <span className="text-3xl">👤</span>
                                    </div>
                                    <CardTitle className="text-blue-600">Untuk Pemohon</CardTitle>
                                    <CardDescription>Mudah mengajukan permohonan informasi publik</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 text-sm text-gray-600">
                                        <li className="flex items-center">
                                            <span className="text-green-500 mr-2">✅</span>
                                            Pendaftaran permohonan dengan data lengkap
                                        </li>
                                        <li className="flex items-center">
                                            <span className="text-green-500 mr-2">✅</span>
                                            Upload dokumen pendukung (KTP, surat kuasa)
                                        </li>
                                        <li className="flex items-center">
                                            <span className="text-green-500 mr-2">✅</span>
                                            Pantau status permohonan real-time
                                        </li>
                                        <li className="flex items-center">
                                            <span className="text-green-500 mr-2">✅</span>
                                            Notifikasi perkembangan proses
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Staff Features */}
                            <Card className="border-green-200 hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                        <span className="text-3xl">👨‍💼</span>
                                    </div>
                                    <CardTitle className="text-green-600">Untuk Staf KIP</CardTitle>
                                    <CardDescription>Verifikasi dan kelola permohonan efisien</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 text-sm text-gray-600">
                                        <li className="flex items-center">
                                            <span className="text-green-500 mr-2">✅</span>
                                            Verifikasi formal kelengkapan berkas
                                        </li>
                                        <li className="flex items-center">
                                            <span className="text-green-500 mr-2">✅</span>
                                            Validasi identitas dan legal standing
                                        </li>
                                        <li className="flex items-center">
                                            <span className="text-green-500 mr-2">✅</span>
                                            Terima atau minta kelengkapan data
                                        </li>
                                        <li className="flex items-center">
                                            <span className="text-green-500 mr-2">✅</span>
                                            Dashboard monitoring permohonan
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Commissioner Features */}
                            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                        <span className="text-3xl">⚖️</span>
                                    </div>
                                    <CardTitle className="text-purple-600">Majelis Komisioner</CardTitle>
                                    <CardDescription>Pengambilan keputusan dan putusan akhir</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 text-sm text-gray-600">
                                        <li className="flex items-center">
                                            <span className="text-green-500 mr-2">✅</span>
                                            Review permohonan yang sudah diverifikasi
                                        </li>
                                        <li className="flex items-center">
                                            <span className="text-green-500 mr-2">✅</span>
                                            Sidang dan pembahasan kasus
                                        </li>
                                        <li className="flex items-center">
                                            <span className="text-green-500 mr-2">✅</span>
                                            Penetapan putusan akhir
                                        </li>
                                        <li className="flex items-center">
                                            <span className="text-green-500 mr-2">✅</span>
                                            Dokumentasi dan arsip keputusan
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Process Flow Section */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Alur Proses Permohonan</h2>
                            <p className="text-lg text-gray-600">Proses yang terstruktur dan transparan</p>
                        </div>
                        
                        <div className="grid md:grid-cols-5 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white text-2xl">1</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Pendaftaran</h3>
                                <p className="text-sm text-gray-600">Pemohon mengisi data dan mengunggah dokumen</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white text-2xl">2</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Verifikasi</h3>
                                <p className="text-sm text-gray-600">Staf KIP melakukan verifikasi formal berkas</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white text-2xl">3</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Review</h3>
                                <p className="text-sm text-gray-600">Penerimaan atau permintaan kelengkapan</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white text-2xl">4</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Sidang</h3>
                                <p className="text-sm text-gray-600">Majelis komisioner membahas permohonan</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white text-2xl">5</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Putusan</h3>
                                <p className="text-sm text-gray-600">Keputusan akhir dan dokumentasi</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-blue-600">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Siap Menggunakan Sistem Persidangan KIP?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8">
                            Bergabunglah dengan sistem digital yang memudahkan akses informasi publik
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {!auth?.user && (
                                <>
                                    <Link 
                                        href="/register"
                                        className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold transition-colors"
                                    >
                                        📝 Daftar Sebagai Pemohon
                                    </Link>
                                    <Link 
                                        href="/login"
                                        className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors"
                                    >
                                        🔑 Masuk ke Sistem
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 text-gray-300 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <p className="mb-2">© 2024 Komisi Informasi Provinsi. Semua hak dilindungi.</p>
                            <p className="text-sm text-gray-400">
                                Dibangun dengan Laravel {laravelVersion} & PHP {phpVersion}
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}