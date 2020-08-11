package com.desafio.tecnico.softplan.tech.chalenge.softplan.com.desafio.tecnico.softplan.tech.chalenge.softplan.processo.service;

import com.desafio.tecnico.softplan.tech.chalenge.softplan.processo.controller.ProcessoDto;
import com.desafio.tecnico.softplan.tech.chalenge.softplan.processo.domain.Processo;
import com.desafio.tecnico.softplan.tech.chalenge.softplan.processo.repository.ProcessoRepository;
import com.desafio.tecnico.softplan.tech.chalenge.softplan.processo.service.ProcessoService;
import com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.controller.UsuarioDto;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import sun.jvm.hotspot.utilities.Assert;

import java.util.Collections;
import java.util.List;

@SpringBootTest
public class ProcessoServiceTest {

    @MockBean
    private ProcessoRepository repository;

    @Autowired
    private ProcessoService processoService;

    @Test
    public void deveCriarUmProcesso() {
        ProcessoDto processoDto = new ProcessoDto();
        processoDto.setParecer("me parece bom");
        processoDto.setResponsaveis(criarListaResponsaveisMock());

        processoService.criarProcesso(processoDto);

        Mockito.verify(repository, Mockito.times(1)).save(ArgumentMatchers.any(Processo.class));
    }

    @Test
    public void deveRetornarUmaListaCom1Processo() {
        Processo processo = Processo.builder()
                .parecer("me parece bom")
                .id("id unico")
                .build();

        Mockito.when(repository.findAll()).thenReturn(Collections.singletonList(processo));

        List<Processo> processos = processoService.buscarProcessos();

        Assert.that(processos.size() == 1, "deveria conter apenas 1 titem na lista");
        Assert.that(processos.get(0).getParecer().equals(processo.getParecer()), "O parecer deveria ser igual");
    }

    @Test
    public void deveFinalizarUmProcesso() {
        final String ID_UNICO = "id unico";
        ProcessoDto processoDto = new ProcessoDto();
        processoDto.setParecer("me parece bom");
        processoDto.setId(ID_UNICO);
        processoDto.setResponsaveis(criarListaResponsaveisMock());

        Processo processo = Processo.builder()
                .parecer("me parece bom")
                .id(ID_UNICO)
                .finalizado(true)
                .build();

        Mockito.when(repository.findById(Mockito.eq(ID_UNICO))).thenReturn(java.util.Optional.ofNullable(processo));

        processoService.finalizarProcesso(processoDto);

        Mockito.verify(repository, Mockito.times(1)).findById(Mockito.eq(ID_UNICO));
        Mockito.verify(repository, Mockito.times(1)).save(ArgumentMatchers.any(Processo.class));
    }

    @Test
    public void deveRetornarApenasProcessosAbertos() {
        Processo processo = Processo.builder()
                .parecer("me parece bom")
                .id("id unico")
                .finalizado(false)
                .build();

        Mockito.when(repository.buscarAbertos()).thenReturn(Collections.singletonList(processo));

        List<Processo> processos = processoService.buscarAbertos();

        Assert.that(processos.size() == 1, "deveria conter apenas 1 item aberto");
    }

    @Test
    public void deveAtribuir1NovosResponsaveisNoProcesso() {
        final String ID_UNICO = "id unico";
        ProcessoDto processoDto = new ProcessoDto();
        processoDto.setParecer("me parece bom");
        processoDto.setId(ID_UNICO);
        processoDto.setResponsaveis(criarListaResponsaveisMock());

        Processo processo = Processo.builder()
                .parecer("me parece bom")
                .id(ID_UNICO)
                .build();

        Mockito.when(repository.findById(Mockito.eq(ID_UNICO))).thenReturn(java.util.Optional.ofNullable(processo));

        processoService.atribuirResponsaveis(processoDto);

        Mockito.verify(repository, Mockito.times(1)).findById(Mockito.eq(ID_UNICO));
        Mockito.verify(repository, Mockito.times(1)).save(ArgumentMatchers.any(Processo.class));
    }

    private List<UsuarioDto> criarListaResponsaveisMock() {
        UsuarioDto mock = Mockito.mock(UsuarioDto.class);
        Mockito.when(mock.getId()).thenReturn("id unico");

        return Collections.singletonList(mock);
    }
}
