package dz.elit.jhipster.application.web.rest;

import dz.elit.jhipster.application.ProjectJHipsterApp;

import dz.elit.jhipster.application.domain.Clinique;
import dz.elit.jhipster.application.repository.CliniqueRepository;
import dz.elit.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static dz.elit.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CliniqueResource REST controller.
 *
 * @see CliniqueResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjectJHipsterApp.class)
public class CliniqueResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_DIRIGEANT = "AAAAAAAAAA";
    private static final String UPDATED_DIRIGEANT = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_FAX = "AAAAAAAAAA";
    private static final String UPDATED_FAX = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_HORAIRE_TRAVAIL = "AAAAAAAAAA";
    private static final String UPDATED_HORAIRE_TRAVAIL = "BBBBBBBBBB";

    @Autowired
    private CliniqueRepository cliniqueRepository;

    @Mock
    private CliniqueRepository cliniqueRepositoryMock;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCliniqueMockMvc;

    private Clinique clinique;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CliniqueResource cliniqueResource = new CliniqueResource(cliniqueRepository);
        this.restCliniqueMockMvc = MockMvcBuilders.standaloneSetup(cliniqueResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Clinique createEntity(EntityManager em) {
        Clinique clinique = new Clinique()
            .nom(DEFAULT_NOM)
            .dirigeant(DEFAULT_DIRIGEANT)
            .adresse(DEFAULT_ADRESSE)
            .telephone(DEFAULT_TELEPHONE)
            .fax(DEFAULT_FAX)
            .email(DEFAULT_EMAIL)
            .horaireTravail(DEFAULT_HORAIRE_TRAVAIL);
        return clinique;
    }

    @Before
    public void initTest() {
        clinique = createEntity(em);
    }

    @Test
    @Transactional
    public void createClinique() throws Exception {
        int databaseSizeBeforeCreate = cliniqueRepository.findAll().size();

        // Create the Clinique
        restCliniqueMockMvc.perform(post("/api/cliniques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clinique)))
            .andExpect(status().isCreated());

        // Validate the Clinique in the database
        List<Clinique> cliniqueList = cliniqueRepository.findAll();
        assertThat(cliniqueList).hasSize(databaseSizeBeforeCreate + 1);
        Clinique testClinique = cliniqueList.get(cliniqueList.size() - 1);
        assertThat(testClinique.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testClinique.getDirigeant()).isEqualTo(DEFAULT_DIRIGEANT);
        assertThat(testClinique.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
        assertThat(testClinique.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testClinique.getFax()).isEqualTo(DEFAULT_FAX);
        assertThat(testClinique.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testClinique.getHoraireTravail()).isEqualTo(DEFAULT_HORAIRE_TRAVAIL);
    }

    @Test
    @Transactional
    public void createCliniqueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cliniqueRepository.findAll().size();

        // Create the Clinique with an existing ID
        clinique.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCliniqueMockMvc.perform(post("/api/cliniques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clinique)))
            .andExpect(status().isBadRequest());

        // Validate the Clinique in the database
        List<Clinique> cliniqueList = cliniqueRepository.findAll();
        assertThat(cliniqueList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = cliniqueRepository.findAll().size();
        // set the field null
        clinique.setNom(null);

        // Create the Clinique, which fails.

        restCliniqueMockMvc.perform(post("/api/cliniques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clinique)))
            .andExpect(status().isBadRequest());

        List<Clinique> cliniqueList = cliniqueRepository.findAll();
        assertThat(cliniqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDirigeantIsRequired() throws Exception {
        int databaseSizeBeforeTest = cliniqueRepository.findAll().size();
        // set the field null
        clinique.setDirigeant(null);

        // Create the Clinique, which fails.

        restCliniqueMockMvc.perform(post("/api/cliniques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clinique)))
            .andExpect(status().isBadRequest());

        List<Clinique> cliniqueList = cliniqueRepository.findAll();
        assertThat(cliniqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAdresseIsRequired() throws Exception {
        int databaseSizeBeforeTest = cliniqueRepository.findAll().size();
        // set the field null
        clinique.setAdresse(null);

        // Create the Clinique, which fails.

        restCliniqueMockMvc.perform(post("/api/cliniques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clinique)))
            .andExpect(status().isBadRequest());

        List<Clinique> cliniqueList = cliniqueRepository.findAll();
        assertThat(cliniqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTelephoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = cliniqueRepository.findAll().size();
        // set the field null
        clinique.setTelephone(null);

        // Create the Clinique, which fails.

        restCliniqueMockMvc.perform(post("/api/cliniques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clinique)))
            .andExpect(status().isBadRequest());

        List<Clinique> cliniqueList = cliniqueRepository.findAll();
        assertThat(cliniqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFaxIsRequired() throws Exception {
        int databaseSizeBeforeTest = cliniqueRepository.findAll().size();
        // set the field null
        clinique.setFax(null);

        // Create the Clinique, which fails.

        restCliniqueMockMvc.perform(post("/api/cliniques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clinique)))
            .andExpect(status().isBadRequest());

        List<Clinique> cliniqueList = cliniqueRepository.findAll();
        assertThat(cliniqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = cliniqueRepository.findAll().size();
        // set the field null
        clinique.setEmail(null);

        // Create the Clinique, which fails.

        restCliniqueMockMvc.perform(post("/api/cliniques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clinique)))
            .andExpect(status().isBadRequest());

        List<Clinique> cliniqueList = cliniqueRepository.findAll();
        assertThat(cliniqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHoraireTravailIsRequired() throws Exception {
        int databaseSizeBeforeTest = cliniqueRepository.findAll().size();
        // set the field null
        clinique.setHoraireTravail(null);

        // Create the Clinique, which fails.

        restCliniqueMockMvc.perform(post("/api/cliniques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clinique)))
            .andExpect(status().isBadRequest());

        List<Clinique> cliniqueList = cliniqueRepository.findAll();
        assertThat(cliniqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCliniques() throws Exception {
        // Initialize the database
        cliniqueRepository.saveAndFlush(clinique);

        // Get all the cliniqueList
        restCliniqueMockMvc.perform(get("/api/cliniques?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clinique.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].dirigeant").value(hasItem(DEFAULT_DIRIGEANT.toString())))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE.toString())))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE.toString())))
            .andExpect(jsonPath("$.[*].fax").value(hasItem(DEFAULT_FAX.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].horaireTravail").value(hasItem(DEFAULT_HORAIRE_TRAVAIL.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllCliniquesWithEagerRelationshipsIsEnabled() throws Exception {
        CliniqueResource cliniqueResource = new CliniqueResource(cliniqueRepositoryMock);
        when(cliniqueRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restCliniqueMockMvc = MockMvcBuilders.standaloneSetup(cliniqueResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restCliniqueMockMvc.perform(get("/api/cliniques?eagerload=true"))
        .andExpect(status().isOk());

        verify(cliniqueRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllCliniquesWithEagerRelationshipsIsNotEnabled() throws Exception {
        CliniqueResource cliniqueResource = new CliniqueResource(cliniqueRepositoryMock);
            when(cliniqueRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restCliniqueMockMvc = MockMvcBuilders.standaloneSetup(cliniqueResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restCliniqueMockMvc.perform(get("/api/cliniques?eagerload=true"))
        .andExpect(status().isOk());

            verify(cliniqueRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getClinique() throws Exception {
        // Initialize the database
        cliniqueRepository.saveAndFlush(clinique);

        // Get the clinique
        restCliniqueMockMvc.perform(get("/api/cliniques/{id}", clinique.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(clinique.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.dirigeant").value(DEFAULT_DIRIGEANT.toString()))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE.toString()))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE.toString()))
            .andExpect(jsonPath("$.fax").value(DEFAULT_FAX.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.horaireTravail").value(DEFAULT_HORAIRE_TRAVAIL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingClinique() throws Exception {
        // Get the clinique
        restCliniqueMockMvc.perform(get("/api/cliniques/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClinique() throws Exception {
        // Initialize the database
        cliniqueRepository.saveAndFlush(clinique);

        int databaseSizeBeforeUpdate = cliniqueRepository.findAll().size();

        // Update the clinique
        Clinique updatedClinique = cliniqueRepository.findById(clinique.getId()).get();
        // Disconnect from session so that the updates on updatedClinique are not directly saved in db
        em.detach(updatedClinique);
        updatedClinique
            .nom(UPDATED_NOM)
            .dirigeant(UPDATED_DIRIGEANT)
            .adresse(UPDATED_ADRESSE)
            .telephone(UPDATED_TELEPHONE)
            .fax(UPDATED_FAX)
            .email(UPDATED_EMAIL)
            .horaireTravail(UPDATED_HORAIRE_TRAVAIL);

        restCliniqueMockMvc.perform(put("/api/cliniques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedClinique)))
            .andExpect(status().isOk());

        // Validate the Clinique in the database
        List<Clinique> cliniqueList = cliniqueRepository.findAll();
        assertThat(cliniqueList).hasSize(databaseSizeBeforeUpdate);
        Clinique testClinique = cliniqueList.get(cliniqueList.size() - 1);
        assertThat(testClinique.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testClinique.getDirigeant()).isEqualTo(UPDATED_DIRIGEANT);
        assertThat(testClinique.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testClinique.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testClinique.getFax()).isEqualTo(UPDATED_FAX);
        assertThat(testClinique.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testClinique.getHoraireTravail()).isEqualTo(UPDATED_HORAIRE_TRAVAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingClinique() throws Exception {
        int databaseSizeBeforeUpdate = cliniqueRepository.findAll().size();

        // Create the Clinique

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCliniqueMockMvc.perform(put("/api/cliniques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clinique)))
            .andExpect(status().isBadRequest());

        // Validate the Clinique in the database
        List<Clinique> cliniqueList = cliniqueRepository.findAll();
        assertThat(cliniqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteClinique() throws Exception {
        // Initialize the database
        cliniqueRepository.saveAndFlush(clinique);

        int databaseSizeBeforeDelete = cliniqueRepository.findAll().size();

        // Delete the clinique
        restCliniqueMockMvc.perform(delete("/api/cliniques/{id}", clinique.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Clinique> cliniqueList = cliniqueRepository.findAll();
        assertThat(cliniqueList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Clinique.class);
        Clinique clinique1 = new Clinique();
        clinique1.setId(1L);
        Clinique clinique2 = new Clinique();
        clinique2.setId(clinique1.getId());
        assertThat(clinique1).isEqualTo(clinique2);
        clinique2.setId(2L);
        assertThat(clinique1).isNotEqualTo(clinique2);
        clinique1.setId(null);
        assertThat(clinique1).isNotEqualTo(clinique2);
    }
}
