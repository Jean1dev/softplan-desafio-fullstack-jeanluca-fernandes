package com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.controller;

import com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.domain.TipoUsuario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UsuarioDto implements Serializable {
    private static final long serialVersionUID = 1L;

    private TipoUsuario tipoUsuario;

    private String nome;

    private String login;

    private String senha;
}
