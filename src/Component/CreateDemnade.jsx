import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, TextareaAutosize, Typography, Container, Grid, InputLabel } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import '../css/createdemande.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

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

    const userConnecterId = localStorage.getItem('usernameId');

    axios.post("http://localhost:8060/api/demande/save", {
      titre: titre,
      comite: comite,
      type: type,
      date_debut: dateDebut,
      date_fin: dateFin,
      description: description,
      besoins: besoins,
      user: { id: userConnecterId }
    }).then((response) => {
      setTitre("");
      setComite("");
      setBesoins("");
      setDescription("");
      setType("");
      setDateDebut("");
      setDateFin("");
      navigate("/ListUserDemande");
    });
  };

  return (
    <div>
      <Header />

      <Container maxWidth="md">
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" align="center" style={{ marginBottom: '20px' }}>
            Nouvelle Demande
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Titre de l'événement"
                variant="outlined"
                value={titre}
                onChange={(event) => setTitre(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                rowsMin={3}
                placeholder="Description de l'événement"
                fullWidth
                style={{ width: '100%', marginTop: '10px' }}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Comité d'organisation"
                variant="outlined"
                value={comite}
                onChange={(event) => setComite(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Type d'événement</InputLabel>
              <Select
                fullWidth
                value={type}
                onChange={(event) => setType(event.target.value)}
                label="Type d'événement"
                variant="outlined"
                style={{ marginTop: '10px' }}
              >
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="compétition">Compétition</MenuItem>
                <MenuItem value="fête">Fête</MenuItem>
                <MenuItem value="conférence">Conférence</MenuItem>
                <MenuItem value="congrès">Congrès</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                label="Date de début"
                variant="outlined"
                value={dateDebut}
                onChange={(event) => setDateDebut(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                label="Date de fin"
                variant="outlined"
                value={dateFin}
                onChange={(event) => setDateFin(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                rowsMin={3}
                placeholder="Besoins spécifiques"
                fullWidth
                style={{ width: '100%', marginTop: '10px' }}
                value={besoins}
                onChange={(event) => setBesoins(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} align="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                style={{ marginTop: '20px' }}
              >
                <b>Demander</b>
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}

