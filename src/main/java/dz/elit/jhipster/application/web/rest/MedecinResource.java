package dz.elit.jhipster.application.web.rest;
import dz.elit.jhipster.application.domain.Medecin;
import dz.elit.jhipster.application.repository.MedecinRepository;
import dz.elit.jhipster.application.web.rest.errors.BadRequestAlertException;
import dz.elit.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Medecin.
 */
@RestController
@RequestMapping("/api")
public class MedecinResource {

    private final Logger log = LoggerFactory.getLogger(MedecinResource.class);

    private static final String ENTITY_NAME = "medecin";

    private final MedecinRepository medecinRepository;

    public MedecinResource(MedecinRepository medecinRepository) {
        this.medecinRepository = medecinRepository;
    }

    /**
     * POST  /medecins : Create a new medecin.
     *
     * @param medecin the medecin to create
     * @return the ResponseEntity with status 201 (Created) and with body the new medecin, or with status 400 (Bad Request) if the medecin has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/medecins")
    public ResponseEntity<Medecin> createMedecin(@RequestBody Medecin medecin) throws URISyntaxException {
        log.debug("REST request to save Medecin : {}", medecin);
        if (medecin.getId() != null) {
            throw new BadRequestAlertException("A new medecin cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Medecin result = medecinRepository.save(medecin);
        return ResponseEntity.created(new URI("/api/medecins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /medecins : Updates an existing medecin.
     *
     * @param medecin the medecin to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated medecin,
     * or with status 400 (Bad Request) if the medecin is not valid,
     * or with status 500 (Internal Server Error) if the medecin couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/medecins")
    public ResponseEntity<Medecin> updateMedecin(@RequestBody Medecin medecin) throws URISyntaxException {
        log.debug("REST request to update Medecin : {}", medecin);
        if (medecin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Medecin result = medecinRepository.save(medecin);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, medecin.getId().toString()))
            .body(result);
    }

    /**
     * GET  /medecins : get all the medecins.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of medecins in body
     */
    @GetMapping("/medecins")
    public List<Medecin> getAllMedecins() {
        log.debug("REST request to get all Medecins");
        return medecinRepository.findAll();
    }

    /**
     * GET  /medecins/:id : get the "id" medecin.
     *
     * @param id the id of the medecin to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the medecin, or with status 404 (Not Found)
     */
    @GetMapping("/medecins/{id}")
    public ResponseEntity<Medecin> getMedecin(@PathVariable Long id) {
        log.debug("REST request to get Medecin : {}", id);
        Optional<Medecin> medecin = medecinRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(medecin);
    }

    /**
     * DELETE  /medecins/:id : delete the "id" medecin.
     *
     * @param id the id of the medecin to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/medecins/{id}")
    public ResponseEntity<Void> deleteMedecin(@PathVariable Long id) {
        log.debug("REST request to delete Medecin : {}", id);
        medecinRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
