package dz.elit.jhipster.application.web.rest;
import dz.elit.jhipster.application.domain.CompteRendu;
import dz.elit.jhipster.application.repository.CompteRenduRepository;
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
 * REST controller for managing CompteRendu.
 */
@RestController
@RequestMapping("/api")
public class CompteRenduResource {

    private final Logger log = LoggerFactory.getLogger(CompteRenduResource.class);

    private static final String ENTITY_NAME = "compteRendu";

    private final CompteRenduRepository compteRenduRepository;

    public CompteRenduResource(CompteRenduRepository compteRenduRepository) {
        this.compteRenduRepository = compteRenduRepository;
    }

    /**
     * POST  /compte-rendus : Create a new compteRendu.
     *
     * @param compteRendu the compteRendu to create
     * @return the ResponseEntity with status 201 (Created) and with body the new compteRendu, or with status 400 (Bad Request) if the compteRendu has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/compte-rendus")
    public ResponseEntity<CompteRendu> createCompteRendu(@Valid @RequestBody CompteRendu compteRendu) throws URISyntaxException {
        log.debug("REST request to save CompteRendu : {}", compteRendu);
        if (compteRendu.getId() != null) {
            throw new BadRequestAlertException("A new compteRendu cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CompteRendu result = compteRenduRepository.save(compteRendu);
        return ResponseEntity.created(new URI("/api/compte-rendus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /compte-rendus : Updates an existing compteRendu.
     *
     * @param compteRendu the compteRendu to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated compteRendu,
     * or with status 400 (Bad Request) if the compteRendu is not valid,
     * or with status 500 (Internal Server Error) if the compteRendu couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/compte-rendus")
    public ResponseEntity<CompteRendu> updateCompteRendu(@Valid @RequestBody CompteRendu compteRendu) throws URISyntaxException {
        log.debug("REST request to update CompteRendu : {}", compteRendu);
        if (compteRendu.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CompteRendu result = compteRenduRepository.save(compteRendu);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, compteRendu.getId().toString()))
            .body(result);
    }

    /**
     * GET  /compte-rendus : get all the compteRendus.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of compteRendus in body
     */
    @GetMapping("/compte-rendus")
    public List<CompteRendu> getAllCompteRendus() {
        log.debug("REST request to get all CompteRendus");
        return compteRenduRepository.findAll();
    }

    /**
     * GET  /compte-rendus/:id : get the "id" compteRendu.
     *
     * @param id the id of the compteRendu to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the compteRendu, or with status 404 (Not Found)
     */
    @GetMapping("/compte-rendus/{id}")
    public ResponseEntity<CompteRendu> getCompteRendu(@PathVariable Long id) {
        log.debug("REST request to get CompteRendu : {}", id);
        Optional<CompteRendu> compteRendu = compteRenduRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(compteRendu);
    }

    /**
     * DELETE  /compte-rendus/:id : delete the "id" compteRendu.
     *
     * @param id the id of the compteRendu to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/compte-rendus/{id}")
    public ResponseEntity<Void> deleteCompteRendu(@PathVariable Long id) {
        log.debug("REST request to delete CompteRendu : {}", id);
        compteRenduRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
