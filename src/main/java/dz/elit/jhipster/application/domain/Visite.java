package dz.elit.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Visite.
 */
@Entity
@Table(name = "visite")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Visite implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "date_visite", nullable = false)
    private LocalDate dateVisite;

    @ManyToOne
    @JsonIgnoreProperties("visites")
    private Medecin medecin;

    @ManyToOne
    @JsonIgnoreProperties("visites")
    private Clinique clinique;

    @OneToOne(mappedBy = "visite")
    @JsonIgnore
    private CompteRendu compteRendu;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateVisite() {
        return dateVisite;
    }

    public Visite dateVisite(LocalDate dateVisite) {
        this.dateVisite = dateVisite;
        return this;
    }

    public void setDateVisite(LocalDate dateVisite) {
        this.dateVisite = dateVisite;
    }

    public Medecin getMedecin() {
        return medecin;
    }

    public Visite medecin(Medecin medecin) {
        this.medecin = medecin;
        return this;
    }

    public void setMedecin(Medecin medecin) {
        this.medecin = medecin;
    }

    public Clinique getClinique() {
        return clinique;
    }

    public Visite clinique(Clinique clinique) {
        this.clinique = clinique;
        return this;
    }

    public void setClinique(Clinique clinique) {
        this.clinique = clinique;
    }

    public CompteRendu getCompteRendu() {
        return compteRendu;
    }

    public Visite compteRendu(CompteRendu compteRendu) {
        this.compteRendu = compteRendu;
        return this;
    }

    public void setCompteRendu(CompteRendu compteRendu) {
        this.compteRendu = compteRendu;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Visite visite = (Visite) o;
        if (visite.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), visite.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Visite{" +
            "id=" + getId() +
            ", dateVisite='" + getDateVisite() + "'" +
            "}";
    }
}
