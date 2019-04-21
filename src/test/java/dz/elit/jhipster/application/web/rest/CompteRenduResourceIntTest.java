package dz.elit.jhipster.application.web.rest;

import dz.elit.jhipster.application.ProjectJHipsterApp;

import dz.elit.jhipster.application.domain.CompteRendu;
import dz.elit.jhipster.application.repository.CompteRenduRepository;
import dz.elit.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static dz.elit.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CompteRenduResource REST controller.
 *
 * @see CompteRenduResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjectJHipsterApp.class)
public class CompteRenduResourceIntTest {

    private static final LocalDate DEFAULT_DATE_COMPTE_RENDU = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_COMPTE_RENDU = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private CompteRenduRepository compteRenduRepository;

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

    private MockMvc restCompteRenduMockMvc;

    private CompteRendu compteRendu;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CompteRenduResource compteRenduResource = new CompteRenduResource(compteRenduRepository);
        this.restCompteRenduMockMvc = MockMvcBuilders.standaloneSetup(compteRenduResource)
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
    public static CompteRendu createEntity(EntityManager em) {
        CompteRendu compteRendu = new CompteRendu()
            .dateCompteRendu(DEFAULT_DATE_COMPTE_RENDU);
        return compteRendu;
    }

    @Before
    public void initTest() {
        compteRendu = createEntity(em);
    }

    @Test
    @Transactional
    public void createCompteRendu() throws Exception {
        int databaseSizeBeforeCreate = compteRenduRepository.findAll().size();

        // Create the CompteRendu
        restCompteRenduMockMvc.perform(post("/api/compte-rendus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(compteRendu)))
            .andExpect(status().isCreated());

        // Validate the CompteRendu in the database
        List<CompteRendu> compteRenduList = compteRenduRepository.findAll();
        assertThat(compteRenduList).hasSize(databaseSizeBeforeCreate + 1);
        CompteRendu testCompteRendu = compteRenduList.get(compteRenduList.size() - 1);
        assertThat(testCompteRendu.getDateCompteRendu()).isEqualTo(DEFAULT_DATE_COMPTE_RENDU);
    }

    @Test
    @Transactional
    public void createCompteRenduWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = compteRenduRepository.findAll().size();

        // Create the CompteRendu with an existing ID
        compteRendu.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompteRenduMockMvc.perform(post("/api/compte-rendus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(compteRendu)))
            .andExpect(status().isBadRequest());

        // Validate the CompteRendu in the database
        List<CompteRendu> compteRenduList = compteRenduRepository.findAll();
        assertThat(compteRenduList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateCompteRenduIsRequired() throws Exception {
        int databaseSizeBeforeTest = compteRenduRepository.findAll().size();
        // set the field null
        compteRendu.setDateCompteRendu(null);

        // Create the CompteRendu, which fails.

        restCompteRenduMockMvc.perform(post("/api/compte-rendus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(compteRendu)))
            .andExpect(status().isBadRequest());

        List<CompteRendu> compteRenduList = compteRenduRepository.findAll();
        assertThat(compteRenduList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCompteRendus() throws Exception {
        // Initialize the database
        compteRenduRepository.saveAndFlush(compteRendu);

        // Get all the compteRenduList
        restCompteRenduMockMvc.perform(get("/api/compte-rendus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(compteRendu.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateCompteRendu").value(hasItem(DEFAULT_DATE_COMPTE_RENDU.toString())));
    }
    
    @Test
    @Transactional
    public void getCompteRendu() throws Exception {
        // Initialize the database
        compteRenduRepository.saveAndFlush(compteRendu);

        // Get the compteRendu
        restCompteRenduMockMvc.perform(get("/api/compte-rendus/{id}", compteRendu.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(compteRendu.getId().intValue()))
            .andExpect(jsonPath("$.dateCompteRendu").value(DEFAULT_DATE_COMPTE_RENDU.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCompteRendu() throws Exception {
        // Get the compteRendu
        restCompteRenduMockMvc.perform(get("/api/compte-rendus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCompteRendu() throws Exception {
        // Initialize the database
        compteRenduRepository.saveAndFlush(compteRendu);

        int databaseSizeBeforeUpdate = compteRenduRepository.findAll().size();

        // Update the compteRendu
        CompteRendu updatedCompteRendu = compteRenduRepository.findById(compteRendu.getId()).get();
        // Disconnect from session so that the updates on updatedCompteRendu are not directly saved in db
        em.detach(updatedCompteRendu);
        updatedCompteRendu
            .dateCompteRendu(UPDATED_DATE_COMPTE_RENDU);

        restCompteRenduMockMvc.perform(put("/api/compte-rendus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCompteRendu)))
            .andExpect(status().isOk());

        // Validate the CompteRendu in the database
        List<CompteRendu> compteRenduList = compteRenduRepository.findAll();
        assertThat(compteRenduList).hasSize(databaseSizeBeforeUpdate);
        CompteRendu testCompteRendu = compteRenduList.get(compteRenduList.size() - 1);
        assertThat(testCompteRendu.getDateCompteRendu()).isEqualTo(UPDATED_DATE_COMPTE_RENDU);
    }

    @Test
    @Transactional
    public void updateNonExistingCompteRendu() throws Exception {
        int databaseSizeBeforeUpdate = compteRenduRepository.findAll().size();

        // Create the CompteRendu

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCompteRenduMockMvc.perform(put("/api/compte-rendus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(compteRendu)))
            .andExpect(status().isBadRequest());

        // Validate the CompteRendu in the database
        List<CompteRendu> compteRenduList = compteRenduRepository.findAll();
        assertThat(compteRenduList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCompteRendu() throws Exception {
        // Initialize the database
        compteRenduRepository.saveAndFlush(compteRendu);

        int databaseSizeBeforeDelete = compteRenduRepository.findAll().size();

        // Delete the compteRendu
        restCompteRenduMockMvc.perform(delete("/api/compte-rendus/{id}", compteRendu.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CompteRendu> compteRenduList = compteRenduRepository.findAll();
        assertThat(compteRenduList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CompteRendu.class);
        CompteRendu compteRendu1 = new CompteRendu();
        compteRendu1.setId(1L);
        CompteRendu compteRendu2 = new CompteRendu();
        compteRendu2.setId(compteRendu1.getId());
        assertThat(compteRendu1).isEqualTo(compteRendu2);
        compteRendu2.setId(2L);
        assertThat(compteRendu1).isNotEqualTo(compteRendu2);
        compteRendu1.setId(null);
        assertThat(compteRendu1).isNotEqualTo(compteRendu2);
    }
}
