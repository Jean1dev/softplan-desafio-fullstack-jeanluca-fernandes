package com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.controller;

import com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.domain.Usuario;
import com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @PostMapping
    public ResponseEntity criarUsuario(@RequestBody UsuarioDto usuarioDto) {
        service.criarUsuario(usuarioDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<Usuario> buscarUsuarios() {
        return service.buscarUsuarios();
    }
}
