<?php

namespace Votaconsciente\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Storage;
use League\Csv\Reader;
use Votaconsciente\ServelVotante;
use Votaconsciente\ServelArchivo;
use League\Csv\ByteSequence;

class ProcessPadronElectoralFileJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $fileInfo;
    protected $separador;
    protected $csvFile;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(ServelArchivo $archivo, $separador = ',')
    {
      $this->fileInfo = $archivo;
      $this->separador = $separador;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
      $csvPath = Storage::path($this->fileInfo->path);
      $this->csvFile = Reader::createFromPath($csvPath);
      $this->csvFile->setDelimiter($this->separador);
      $this->fileInfo->update(['rows' => count($this->csvFile)]);
      foreach($this->csvFile as $index => $row){
        ServelVotante::create([
          'nombre' => $row[0],
          'ci' => $row[1],
          'sexo' => $row[2],
          'domicilio' => $row[3],
          'circunscripcion' => $row[4],
          'mesa' => $row[5],
          'servel_archivo_id' => $this->fileInfo->id
        ]);
      }

      $this->fileInfo->update(['completed' => true]);
      unset($this->csvFile);
      Storage::delete($this->fileInfo->path);
    }
}
