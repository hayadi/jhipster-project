package dz.elit.jhipster.application.repository;

import dz.elit.jhipster.application.domain.Clinique;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Clinique entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CliniqueRepository extends JpaRepository<Clinique, Long> {

    @Query(value = "select distinct clinique from Clinique clinique left join fetch clinique.medecins",
        countQuery = "select count(distinct clinique) from Clinique clinique")
    Page<Clinique> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct clinique from Clinique clinique left join fetch clinique.medecins")
    List<Clinique> findAllWithEagerRelationships();

    @Query("select clinique from Clinique clinique left join fetch clinique.medecins where clinique.id =:id")
    Optional<Clinique> findOneWithEagerRelationships(@Param("id") Long id);

}
