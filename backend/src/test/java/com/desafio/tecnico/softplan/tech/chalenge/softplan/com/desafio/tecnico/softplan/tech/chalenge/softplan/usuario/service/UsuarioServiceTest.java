package com.desafio.tecnico.softplan.tech.chalenge.softplan.com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.service;

import com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.controller.UsuarioDto;
import com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.domain.TipoUsuario;
import com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.domain.Usuario;
import com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.repository.UsuarioRepository;
import com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.service.UsuarioService;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import sun.jvm.hotspot.utilities.Assert;

import java.util.Arrays;
import java.util.List;

@SpringBootTest
public class UsuarioServiceTest {

    @MockBean
    private UsuarioRepository repository;

    @Autowired
    private UsuarioService usuarioService;

    @Test
    public void deveCriarUsuario() {
        UsuarioDto usuarioDto = new UsuarioDto();
        usuarioDto.setLogin("login");
        usuarioDto.setSenha("senha");
        usuarioDto.setNome("nome");
        usuarioDto.setTipoUsuario(TipoUsuario.ADMIN);

        usuarioService.criarUsuario(usuarioDto);

        Mockito.verify(repository, Mockito.times(1)).save(ArgumentMatchers.any(Usuario.class));
    }

    @Test
    public void deveTrazerUmaListaCom2Usuarios() {
        Usuario u1 = Usuario.builder()
                .tipoUsuario(TipoUsuario.ADMIN)
                .build();

        Usuario u2 = Usuario.builder()
                .tipoUsuario(TipoUsuario.FINALIZADOR)
                .build();

        Usuario u3 = Usuario.builder()
                .tipoUsuario(TipoUsuario.TRIADOR)
                .build();

        List<Usuario> usuarioList = Arrays.asList(u1, u2, u3);

        Mockito.when(repository.findAll()).thenReturn(usuarioList);
        List<Usuario> usuarios = usuarioService.buscarUsuarios();

        Assert.that(usuarios.size() == 2, "deveria ter apenas 2 usuarios na lista");
    }

    @Test
    public void deveRemoverUsuario() {
        usuarioService.remover("ID UNICO");
        Mockito.verify(repository, Mockito.times(1)).deleteById(ArgumentMatchers.eq("ID UNICO"));
    }

    @Test
    public void deveAtualizarUsuario() {
        final String ID = "id unico";
        UsuarioDto usuarioDto = new UsuarioDto();
        usuarioDto.setLogin("login");
        usuarioDto.setSenha("senha");
        usuarioDto.setId(ID);
        usuarioDto.setNome("nome");
        usuarioDto.setTipoUsuario(TipoUsuario.ADMIN);

        Usuario usuario = Usuario.builder()
                .nome("jeanluca")
                .tipoUsuario(TipoUsuario.FINALIZADOR)
                .build();

        Mockito.when(repository.findById(ArgumentMatchers.eq(ID))).thenReturn(java.util.Optional.ofNullable(usuario));

        usuarioService.atualizar(usuarioDto);
        Mockito.verify(repository, Mockito.times(1)).save(ArgumentMatchers.any(Usuario.class));
    }
}
