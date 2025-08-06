<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\PublicBody
 *
 * @property int $id
 * @property string $name
 * @property string $code
 * @property string|null $address
 * @property string|null $phone
 * @property string|null $email
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\InformationRequest> $informationRequests
 * @property-read int|null $information_requests_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|PublicBody newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PublicBody newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PublicBody query()
 * @method static \Illuminate\Database\Eloquent\Builder|PublicBody whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PublicBody whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PublicBody whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PublicBody whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PublicBody whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PublicBody whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PublicBody wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PublicBody whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PublicBody whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PublicBody active()
 * @method static \Database\Factories\PublicBodyFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class PublicBody extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'code',
        'address',
        'phone',
        'email',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include active public bodies.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Get all information requests for this public body.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function informationRequests(): HasMany
    {
        return $this->hasMany(InformationRequest::class);
    }
}