package dz.elit.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import dz.elit.jhipster.application.domain.enumeration.EtatMedecin;

/**
 * A Medecin.
 */
@Entity
@Table(name = "medecin")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Medecin implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "fax")
    private String fax;

    @Column(name = "email")
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "etat")
    private EtatMedecin etat;

    @ManyToOne
    @JsonIgnoreProperties("medecins")
    private Specialite specialite;

    @ManyToOne
    @JsonIgnoreProperties("medecins")
    private Clinique clinique;

    @OneToMany(mappedBy = "medecin")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Visite> visites = new HashSet<>();
    @ManyToMany(mappedBy = "medecins")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Clinique> cliniques = new HashSet<>();

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

    public Medecin nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getAdresse() {
        return adresse;
    }

    public Medecin adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getTelephone() {
        return telephone;
    }

    public Medecin telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getFax() {
        return fax;
    }

    public Medecin fax(String fax) {
        this.fax = fax;
        return this;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getEmail() {
        return email;
    }

    public Medecin email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public EtatMedecin getEtat() {
        return etat;
    }

    public Medecin etat(EtatMedecin etat) {
        this.etat = etat;
        return this;
    }

    public void setEtat(EtatMedecin etat) {
        this.etat = etat;
    }

    public Specialite getSpecialite() {
        return specialite;
    }

    public Medecin specialite(Specialite specialite) {
        this.specialite = specialite;
        return this;
    }

    public void setSpecialite(Specialite specialite) {
        this.specialite = specialite;
    }

    public Clinique getClinique() {
        return clinique;
    }

    public Medecin clinique(Clinique clinique) {
        this.clinique = clinique;
        return this;
    }

    public void setClinique(Clinique clinique) {
        this.clinique = clinique;
    }

    public Set<Visite> getVisites() {
        return visites;
    }

    public Medecin visites(Set<Visite> visites) {
        this.visites = visites;
        return this;
    }

    public Medecin addVisite(Visite visite) {
        this.visites.add(visite);
        visite.setMedecin(this);
        return this;
    }

    public Medecin removeVisite(Visite visite) {
        this.visites.remove(visite);
        visite.setMedecin(null);
        return this;
    }

    public void setVisites(Set<Visite> visites) {
        this.visites = visites;
    }

    public Set<Clinique> getCliniques() {
        return cliniques;
    }

    public Medecin cliniques(Set<Clinique> cliniques) {
        this.cliniques = cliniques;
        return this;
    }

    public Medecin addClinique(Clinique clinique) {
        this.cliniques.add(clinique);
        clinique.getMedecins().add(this);
        return this;
    }

    public Medecin removeClinique(Clinique clinique) {
        this.cliniques.remove(clinique);
        clinique.getMedecins().remove(this);
        return this;
    }

    public void setCliniques(Set<Clinique> cliniques) {
        this.cliniques = cliniques;
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
        Medecin medecin = (Medecin) o;
        if (medecin.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), medecin.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Medecin{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", fax='" + getFax() + "'" +
            ", email='" + getEmail() + "'" +
            ", etat='" + getEtat() + "'" +
            "}";
    }
}
