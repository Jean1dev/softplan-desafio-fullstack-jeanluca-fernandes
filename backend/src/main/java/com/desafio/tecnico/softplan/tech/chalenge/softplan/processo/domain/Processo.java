package com.desafio.tecnico.softplan.tech.chalenge.softplan.processo.domain;

import com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.domain.Usuario;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;

@Document
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Processo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    private String parecer;

    private List<Usuario> responsaveis;
}
