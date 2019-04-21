package dz.elit.jhipster.application.web.rest;
import dz.elit.jhipster.application.domain.Specialite;
import dz.elit.jhipster.application.repository.SpecialiteRepository;
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
 * REST controller for managing Specialite.
 */
@RestController
@RequestMapping("/api")
public class SpecialiteResource {

    private final Logger log = LoggerFactory.getLogger(SpecialiteResource.class);

    private static final String ENTITY_NAME = "specialite";

    private final SpecialiteRepository specialiteRepository;

    public SpecialiteResource(SpecialiteRepository specialiteRepository) {
        this.specialiteRepository = specialiteRepository;
    }

    /**
     * POST  /specialites : Create a new specialite.
     *
     * @param specialite the specialite to create
     * @return the ResponseEntity with status 201 (Created) and with body the new specialite, or with status 400 (Bad Request) if the specialite has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/specialites")
    public ResponseEntity<Specialite> createSpecialite(@RequestBody Specialite specialite) throws URISyntaxException {
        log.debug("REST request to save Specialite : {}", specialite);
        if (specialite.getId() != null) {
            throw new BadRequestAlertException("A new specialite cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Specialite result = specialiteRepository.save(specialite);
        return ResponseEntity.created(new URI("/api/specialites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /specialites : Updates an existing specialite.
     *
     * @param specialite the specialite to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated specialite,
     * or with status 400 (Bad Request) if the specialite is not valid,
     * or with status 500 (Internal Server Error) if the specialite couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/specialites")
    public ResponseEntity<Specialite> updateSpecialite(@RequestBody Specialite specialite) throws URISyntaxException {
        log.debug("REST request to update Specialite : {}", specialite);
        if (specialite.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Specialite result = specialiteRepository.save(specialite);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, specialite.getId().toString()))
            .body(result);
    }

    /**
     * GET  /specialites : get all the specialites.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of specialites in body
     */
    @GetMapping("/specialites")
    public List<Specialite> getAllSpecialites() {
        log.debug("REST request to get all Specialites");
        return specialiteRepository.findAll();
    }

    /**
     * GET  /specialites/:id : get the "id" specialite.
     *
     * @param id the id of the specialite to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the specialite, or with status 404 (Not Found)
     */
    @GetMapping("/specialites/{id}")
    public ResponseEntity<Specialite> getSpecialite(@PathVariable Long id) {
        log.debug("REST request to get Specialite : {}", id);
        Optional<Specialite> specialite = specialiteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(specialite);
    }

    /**
     * DELETE  /specialites/:id : delete the "id" specialite.
     *
     * @param id the id of the specialite to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/specialites/{id}")
    public ResponseEntity<Void> deleteSpecialite(@PathVariable Long id) {
        log.debug("REST request to delete Specialite : {}", id);
        specialiteRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
