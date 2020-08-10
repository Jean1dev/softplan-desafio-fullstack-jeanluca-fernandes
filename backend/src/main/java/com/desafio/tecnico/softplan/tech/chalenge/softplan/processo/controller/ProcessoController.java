package com.desafio.tecnico.softplan.tech.chalenge.softplan.processo.controller;

import com.desafio.tecnico.softplan.tech.chalenge.softplan.processo.domain.Processo;
import com.desafio.tecnico.softplan.tech.chalenge.softplan.processo.service.ProcessoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/processo")
public class ProcessoController {

    @Autowired
    private ProcessoService service;

    @PostMapping
    public ResponseEntity criarProcesso(@RequestBody ProcessoDto processoDto) {
        service.criarProcesso(processoDto);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity atribuirResponsavel(@RequestBody ProcessoDto processoDto) {
        service.atribuirResponsaveis(processoDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<Processo> buscarProcessos() {
        return service.buscarProcessos();
    }
}
