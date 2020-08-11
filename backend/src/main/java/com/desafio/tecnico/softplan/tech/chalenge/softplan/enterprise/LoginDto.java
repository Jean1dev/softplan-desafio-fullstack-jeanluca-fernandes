package com.desafio.tecnico.softplan.tech.chalenge.softplan.enterprise;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LoginDto implements Serializable {

    private static final long serialVersionUID = 1L;

    private String login;

    private String senha;
}
