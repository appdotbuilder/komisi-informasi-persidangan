<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\InformationRequest
 *
 * @property int $id
 * @property string $request_number
 * @property string $applicant_name
 * @property string $applicant_address
 * @property string $applicant_phone
 * @property string|null $applicant_email
 * @property string $applicant_nik
 * @property int $public_body_id
 * @property string $request_subject
 * @property string $request_purpose
 * @property array|null $documents
 * @property string $status
 * @property string|null $staff_notes
 * @property string|null $completion_notes
 * @property int|null $user_id
 * @property int|null $assigned_staff_id
 * @property \Illuminate\Support\Carbon|null $submitted_at
 * @property \Illuminate\Support\Carbon|null $reviewed_at
 * @property \Illuminate\Support\Carbon|null $decided_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $applicant
 * @property-read \App\Models\User|null $assignedStaff
 * @property-read \App\Models\PublicBody $publicBody
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest whereApplicantAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest whereApplicantEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest whereApplicantName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest whereApplicantNik($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest whereApplicantPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest whereAssignedStaffId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest whereDecidedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest whereDocuments($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest wherePublicBodyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest whereRequestNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest whereRequestPurpose($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest whereRequestSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest whereReviewedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest whereStaffNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest whereCompletionNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest whereSubmittedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InformationRequest whereUserId($value)
 * @method static \Database\Factories\InformationRequestFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class InformationRequest extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'request_number',
        'applicant_name',
        'applicant_address',
        'applicant_phone',
        'applicant_email',
        'applicant_nik',
        'public_body_id',
        'request_subject',
        'request_purpose',
        'documents',
        'status',
        'staff_notes',
        'completion_notes',
        'user_id',
        'assigned_staff_id',
        'submitted_at',
        'reviewed_at',
        'decided_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'documents' => 'array',
        'submitted_at' => 'datetime',
        'reviewed_at' => 'datetime',
        'decided_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the applicant user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function applicant(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the assigned staff member.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function assignedStaff(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_staff_id');
    }

    /**
     * Get the public body for this request.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function publicBody(): BelongsTo
    {
        return $this->belongsTo(PublicBody::class);
    }

    /**
     * Generate a unique request number.
     *
     * @return string
     */
    public static function generateRequestNumber(): string
    {
        $year = now()->year;
        $month = now()->format('m');
        $count = static::whereYear('created_at', $year)->count() + 1;
        
        return sprintf('KIP-%s%s-%04d', $year, $month, $count);
    }

    /**
     * Get the status label for display.
     *
     * @return string
     */
    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            'draft' => 'Konsep',
            'submitted' => 'Diajukan',
            'under_review' => 'Sedang Ditinjau',
            'needs_completion' => 'Perlu Dilengkapi',
            'accepted' => 'Diterima',
            'in_process' => 'Sedang Diproses',
            'decided' => 'Diputus',
            'closed' => 'Ditutup',
            default => 'Tidak Diketahui',
        };
    }
}