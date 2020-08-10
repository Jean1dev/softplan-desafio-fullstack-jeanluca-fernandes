package com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.service;

import com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.controller.UsuarioDto;
import com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.domain.TipoUsuario;
import com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.domain.Usuario;
import com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public void criarUsuario(UsuarioDto usuarioDto) {
        Usuario usuario = Usuario.builder()
                .login(usuarioDto.getLogin())
                .senha(usuarioDto.getSenha())
                .tipoUsuario(usuarioDto.getTipoUsuario())
                .build();

        repository.save(usuario);
    }

    public List<Usuario> buscarUsuarios() {
        return repository.findAll().stream()
                .filter(usuario -> !TipoUsuario.ADMIN.equals(usuario.getTipoUsuario()))
                .collect(Collectors.toList());
    }
}
