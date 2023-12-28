
import React, { useEffect, useState } from 'react';
import { useForm } from "react-cool-form";

import '../css/createdemande.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

export const Demandes = () => {
  const [titre, setTitre] = useState("");
  const [comite, setComite] = useState("");
  const [type, setType] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [besoins, setBesoins] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  


  const handleSubmit = (event) => {
    event.preventDefault();

    const userConnecterId =   localStorage.getItem('usernameId');

    axios.post("http://localhost:8060/api/demande/save",{
      titre: titre,
      comite: comite,
      type: type,
      date_debut: dateDebut,
      date_fin:dateFin,
      description: description,
      besoins:besoins,
      user: { id: userConnecterId }  
      
    }).then((response) => {
      setTitre("");
      setComite("");
      setBesoins("");
      setDescription("");
      setType("");
      setDateDebut("");
      setDateFin("");
      navigate("/ListDemande");
    });
  };


  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h1>Nouvelle Demande</h1>
        <label>Titre de l'événement</label>
        <input name="titre" id="titre" value={titre} onChange={(event) => setTitre(event.target.value)} />

        <label>Description de l'événement</label>
        <textarea name="description" id="description" value={description}  onChange={(event) => setDescription(event.target.value)}></textarea>

        <label>Comité d'organisation</label>
        <input name="comite" id="comite" value={comite}  onChange={(event) => setComite(event.target.value)} />

        <label>Type d'événement</label>
        <select name="type" id="type" value={type}  onChange={(event) => setType(event.target.value)}>
          <option value="competition">Compétition</option>
          <option value="fete">Fête</option>
        </select>

        <label>Date de début</label>
        <input type="date" name="dateDebut" id="dateDebut" value={dateDebut}  onChange={(event) => setDateDebut(event.target.value)} />

        <label>Date de fin</label>
        <input type="date" name="dateFin" id="dateFin" value={dateFin}  onChange={(event) => setDateFin(event.target.value)} />

        <label>Besoins spécifiques</label>
        <textarea name="besoins" id="besoins" value={besoins}  onChange={(event) => setBesoins(event.target.value)}></textarea>

        <button type="submit" className="btn btn-primary" style={{ width: 'auto', height: 'auto',margin:'auto', marginTop:'10%' }}>
            <b>Demander</b>
          </button>
      </form>

    </div>

  );
}
