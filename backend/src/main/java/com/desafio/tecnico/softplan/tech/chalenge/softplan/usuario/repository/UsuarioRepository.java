package com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.repository;

import com.desafio.tecnico.softplan.tech.chalenge.softplan.usuario.domain.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends MongoRepository<Usuario, String> {

    @Query("{ 'login': ?0, 'senha': ?1 }")
    Usuario login(String login, String senha);
}
