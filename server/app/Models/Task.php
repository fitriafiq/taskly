<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'collection_id', 'content', 'due_date', 'status', 'order'];

    public function collections()
    {
        return $this->belongsTo(Collection::class);
    }
}
