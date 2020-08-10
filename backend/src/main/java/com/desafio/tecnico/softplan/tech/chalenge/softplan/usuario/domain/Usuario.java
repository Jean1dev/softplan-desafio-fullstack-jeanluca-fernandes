package com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    private TipoUsuario tipoUsuario;

    private String nome;

    private String login;

    private String senha;
}
