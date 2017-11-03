<?php

namespace Votaconsciente\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Storage;
use Votaconsciente\ServelArchivo;
use Votaconsciente\ServelCandidatura;
use League\Csv\Reader;

class ProcessCandidaturasFileJob implements ShouldQueue
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
        $path = Storage::path($this->fileInfo->path);
        $this->csvFile = Reader::createFromPath($path);
        $this->csvFile->setDelimiter($this->separador);
        $this->csvFile->setOutputBOM(Reader::BOM_UTF8);
        $this->fileInfo->update(['rows' => count($this->csvFile)]);

        foreach($this->csvFile as $row){
            ServelCandidatura::create([
                'tipo' => $row[0],
                'region' => $row[1],
                'territorio' => $row[2],
                'lista' => $row[3],
                'pacto' => $row[4],
                'subpacto' => $row[5],
                'nvoto' => $row[6],
                'nombre_candidato' => $row[7],
                'partido_politico' => $row[8],
                'servel_archivo_id' => $this->fileInfo->id
            ]);
        }

        $this->fileInfo->update(['completed' => true]);
        unset($this->csvFile);
        Storage::delete($this->fileInfo->path);
    }
}
