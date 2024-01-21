<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'folder_id', 'name', 'color', 'order'];

    public function folders()
    {
        return $this->belongsTo(Folder::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
