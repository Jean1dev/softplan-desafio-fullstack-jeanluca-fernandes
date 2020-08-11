package com.desafio.tecnico.softplan.tech.chalenge.softplan.processo.service;

import com.desafio.tecnico.softplan.tech.chalenge.softplan.processo.controller.ProcessoDto;
import com.desafio.tecnico.softplan.tech.chalenge.softplan.processo.domain.Processo;
import com.desafio.tecnico.softplan.tech.chalenge.softplan.processo.repository.ProcessoRepository;
import com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.controller.UsuarioDto;
import com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.domain.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProcessoService {

    @Autowired
    private ProcessoRepository repository;

    public void criarProcesso(ProcessoDto processoDto) {
        Processo processo = Processo.builder()
                .parecer(processoDto.getParecer())
                .responsaveis(remapearResponsaveis(processoDto.getResponsaveis()))
                .finalizado(false)
                .build();

        repository.save(processo);
    }

    public void atribuirResponsaveis(ProcessoDto processoDto) {
        Optional<Processo> processo = repository.findById(processoDto.getId());
        if (processo.isPresent()) {
            Processo processoReal = processo.get();
            processoReal.setResponsaveis(remapearResponsaveis(processoDto.getResponsaveis()));
            repository.save(processoReal);
        }
    }

    public void finalizarProcesso(ProcessoDto processoDto) {
        Optional<Processo> processo = repository.findById(processoDto.getId());
        if (processo.isPresent()) {
            Processo processoReal = processo.get();
            processoReal.setParecer(processoDto.getParecer());
            processoReal.setFinalizado(true);
            repository.save(processoReal);
        }
    }

    public List<Processo> buscarAbertos() {
        return repository.buscarAbertos();
    }

    public List<Processo> buscarProcessos() {
        return repository.findAll();
    }

    private List<Usuario> remapearResponsaveis(List<UsuarioDto> responsaveis) {
        return responsaveis.stream()
                .map(usuarioDto -> {
                    return Usuario.builder()
                            .id(usuarioDto.getId())
                            .nome(usuarioDto.getNome())
                            .build();
                }).collect(Collectors.toList());
    }
}
