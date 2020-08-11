package com.desafio.tecnico.softplan.tech.chalenge.softplan.enterprise;

import com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.domain.Usuario;
import com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/login")
public class LoginController {

    @Autowired
    private UsuarioRepository repository;

    @PostMapping
    public Usuario login(@RequestBody LoginDto loginDto) {
        return repository.login(loginDto.getLogin(), loginDto.getSenha());
    }
}
