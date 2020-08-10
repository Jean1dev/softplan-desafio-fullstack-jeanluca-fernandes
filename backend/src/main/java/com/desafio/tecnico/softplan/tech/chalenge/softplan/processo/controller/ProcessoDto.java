package com.desafio.tecnico.softplan.tech.chalenge.softplan.processo.controller;

import com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.controller.UsuarioDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProcessoDto implements Serializable {
    private static final long serialVersionUID = 1L;

    private String id;

    private String parecer;

    private List<UsuarioDto> responsaveis;
}
