package com.desafio.tecnico.softplan.tech.chalenge.softplan.processo.repository;

import com.desafio.tecnico.softplan.tech.chalenge.softplan.processo.domain.Processo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcessoRepository extends MongoRepository<Processo, String> {
}
