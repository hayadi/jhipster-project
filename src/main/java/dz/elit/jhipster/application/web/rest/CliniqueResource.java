package dz.elit.jhipster.application.web.rest;
import dz.elit.jhipster.application.domain.Clinique;
import dz.elit.jhipster.application.repository.CliniqueRepository;
import dz.elit.jhipster.application.web.rest.errors.BadRequestAlertException;
import dz.elit.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Clinique.
 */
@RestController
@RequestMapping("/api")
public class CliniqueResource {

    private final Logger log = LoggerFactory.getLogger(CliniqueResource.class);

    private static final String ENTITY_NAME = "clinique";

    private final CliniqueRepository cliniqueRepository;

    public CliniqueResource(CliniqueRepository cliniqueRepository) {
        this.cliniqueRepository = cliniqueRepository;
    }

    /**
     * POST  /cliniques : Create a new clinique.
     *
     * @param clinique the clinique to create
     * @return the ResponseEntity with status 201 (Created) and with body the new clinique, or with status 400 (Bad Request) if the clinique has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cliniques")
    public ResponseEntity<Clinique> createClinique(@Valid @RequestBody Clinique clinique) throws URISyntaxException {
        log.debug("REST request to save Clinique : {}", clinique);
        if (clinique.getId() != null) {
            throw new BadRequestAlertException("A new clinique cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Clinique result = cliniqueRepository.save(clinique);
        return ResponseEntity.created(new URI("/api/cliniques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cliniques : Updates an existing clinique.
     *
     * @param clinique the clinique to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated clinique,
     * or with status 400 (Bad Request) if the clinique is not valid,
     * or with status 500 (Internal Server Error) if the clinique couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cliniques")
    public ResponseEntity<Clinique> updateClinique(@Valid @RequestBody Clinique clinique) throws URISyntaxException {
        log.debug("REST request to update Clinique : {}", clinique);
        if (clinique.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Clinique result = cliniqueRepository.save(clinique);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, clinique.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cliniques : get all the cliniques.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of cliniques in body
     */
    @GetMapping("/cliniques")
    public List<Clinique> getAllCliniques(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Cliniques");
        return cliniqueRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /cliniques/:id : get the "id" clinique.
     *
     * @param id the id of the clinique to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the clinique, or with status 404 (Not Found)
     */
    @GetMapping("/cliniques/{id}")
    public ResponseEntity<Clinique> getClinique(@PathVariable Long id) {
        log.debug("REST request to get Clinique : {}", id);
        Optional<Clinique> clinique = cliniqueRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(clinique);
    }

    /**
     * DELETE  /cliniques/:id : delete the "id" clinique.
     *
     * @param id the id of the clinique to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cliniques/{id}")
    public ResponseEntity<Void> deleteClinique(@PathVariable Long id) {
        log.debug("REST request to delete Clinique : {}", id);
        cliniqueRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
