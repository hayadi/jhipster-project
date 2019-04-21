package dz.elit.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Clinique.
 */
@Entity
@Table(name = "clinique")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Clinique implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "dirigeant", nullable = false)
    private String dirigeant;

    @NotNull
    @Column(name = "adresse", nullable = false)
    private String adresse;

    @NotNull
    @Column(name = "telephone", nullable = false)
    private String telephone;

    @NotNull
    @Column(name = "fax", nullable = false)
    private String fax;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Column(name = "horaire_travail", nullable = false)
    private String horaireTravail;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "clinique_medecin",
               joinColumns = @JoinColumn(name = "clinique_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "medecin_id", referencedColumnName = "id"))
    private Set<Medecin> medecins = new HashSet<>();

    @OneToMany(mappedBy = "clinique")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Medecin> medecins = new HashSet<>();
    @OneToMany(mappedBy = "clinique")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Patient> patients = new HashSet<>();
    @OneToMany(mappedBy = "clinique")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Visite> visites = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Clinique nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDirigeant() {
        return dirigeant;
    }

    public Clinique dirigeant(String dirigeant) {
        this.dirigeant = dirigeant;
        return this;
    }

    public void setDirigeant(String dirigeant) {
        this.dirigeant = dirigeant;
    }

    public String getAdresse() {
        return adresse;
    }

    public Clinique adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getTelephone() {
        return telephone;
    }

    public Clinique telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getFax() {
        return fax;
    }

    public Clinique fax(String fax) {
        this.fax = fax;
        return this;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getEmail() {
        return email;
    }

    public Clinique email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getHoraireTravail() {
        return horaireTravail;
    }

    public Clinique horaireTravail(String horaireTravail) {
        this.horaireTravail = horaireTravail;
        return this;
    }

    public void setHoraireTravail(String horaireTravail) {
        this.horaireTravail = horaireTravail;
    }

    public Set<Medecin> getMedecins() {
        return medecins;
    }

    public Clinique medecins(Set<Medecin> medecins) {
        this.medecins = medecins;
        return this;
    }

    public Clinique addMedecin(Medecin medecin) {
        this.medecins.add(medecin);
        medecin.getCliniques().add(this);
        return this;
    }

    public Clinique removeMedecin(Medecin medecin) {
        this.medecins.remove(medecin);
        medecin.getCliniques().remove(this);
        return this;
    }

    public void setMedecins(Set<Medecin> medecins) {
        this.medecins = medecins;
    }

    public Set<Medecin> getMedecins() {
        return medecins;
    }

    public Clinique medecins(Set<Medecin> medecins) {
        this.medecins = medecins;
        return this;
    }

    public Clinique addMedecin(Medecin medecin) {
        this.medecins.add(medecin);
        medecin.setClinique(this);
        return this;
    }

    public Clinique removeMedecin(Medecin medecin) {
        this.medecins.remove(medecin);
        medecin.setClinique(null);
        return this;
    }

    public void setMedecins(Set<Medecin> medecins) {
        this.medecins = medecins;
    }

    public Set<Patient> getPatients() {
        return patients;
    }

    public Clinique patients(Set<Patient> patients) {
        this.patients = patients;
        return this;
    }

    public Clinique addPatient(Patient patient) {
        this.patients.add(patient);
        patient.setClinique(this);
        return this;
    }

    public Clinique removePatient(Patient patient) {
        this.patients.remove(patient);
        patient.setClinique(null);
        return this;
    }

    public void setPatients(Set<Patient> patients) {
        this.patients = patients;
    }

    public Set<Visite> getVisites() {
        return visites;
    }

    public Clinique visites(Set<Visite> visites) {
        this.visites = visites;
        return this;
    }

    public Clinique addVisite(Visite visite) {
        this.visites.add(visite);
        visite.setClinique(this);
        return this;
    }

    public Clinique removeVisite(Visite visite) {
        this.visites.remove(visite);
        visite.setClinique(null);
        return this;
    }

    public void setVisites(Set<Visite> visites) {
        this.visites = visites;
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
        Clinique clinique = (Clinique) o;
        if (clinique.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), clinique.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Clinique{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", dirigeant='" + getDirigeant() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", fax='" + getFax() + "'" +
            ", email='" + getEmail() + "'" +
            ", horaireTravail='" + getHoraireTravail() + "'" +
            "}";
    }
}
