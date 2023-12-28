import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import '../App.css';
import { Padding } from '@mui/icons-material';

const DemandList = () => {
    const [demandes, setDemandes] = useState([]);
    const [filteredDemandes, setFilteredDemandes] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        loadDemande();
    }, []);

    const loadDemande = async () => {
        axios.get('http://localhost:8060/api/demande/all')
        .then(response => {
            setDemandes(response.data);
            setFilteredDemandes(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };
    

  
    
    const handleReject = (id) => (event) => {
        event.preventDefault();
      
        // Rest of your code ...
      
        axios
          .put(`http://localhost:8060/api/demande/reject/${id}`)
          .then((response) => {
            loadDemande();
          });
      };

      const handleAccept = (id) => (event) => {
        event.preventDefault();
      
        // Rest of your code ...
      
        axios
          .put(`http://localhost:8060/api/demande/accept/${id}`)
          .then((response) => {
            loadDemande();
          });
      };
      
    
     
    

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);

        const filteredData = demandes.filter((demande) => {
            return (
                demande.titre.toLowerCase().includes(value.toLowerCase()) ||
                demande.description.toLowerCase().includes(value.toLowerCase()) ||
                demande.comite.toLowerCase().includes(value.toLowerCase()) ||
                demande.type.toLowerCase().includes(value.toLowerCase()) ||
                demande.etat.toLowerCase().includes(value.toLowerCase()) ||
                demande.date_debut.toLowerCase().includes(value.toLowerCase()) ||
                demande.date_fin.toLowerCase().includes(value.toLowerCase())
            );
        });

        setFilteredDemandes(filteredData);
    };

    const actionBodyTemplate = (demandeId,etat) => {
        if (etat === 'accepted' || etat === 'rejected') {
            return null; // Don't render the icons for accepted or rejected demands
          }
        return (
            <div className="d-flex align-items-center justify-content-center">
                <IconButton color="error" onClick={handleReject(demandeId)}>
                    <ClearIcon />
                </IconButton>
                <IconButton color="success" onClick={handleAccept(demandeId)}>
                    <CheckIcon />
                </IconButton>
            </div>
        );
    };
    

    return (
        <div>
            <Typography variant="h4" className="mb-4">Liste des demandes</Typography>

            <TextField
                label="Rechercher"
                variant="outlined"
                className="mb-4"
                value={globalFilterValue}
                onChange={onGlobalFilterChange}
            />

            <TableContainer component={Paper} className="mt-4">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Titre</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Comite</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Etat</TableCell>
                            <TableCell>Date Debut</TableCell>
                            <TableCell>Date Fin</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDemandes.map((demande) => (
                            <TableRow key={demande.id}>
                                <TableCell>{demande.titre}</TableCell>
                                <TableCell>{demande.description}</TableCell>
                                <TableCell>{demande.comite}</TableCell>
                                <TableCell>{demande.type}</TableCell>
                                <TableCell>{demande.etat}</TableCell>
                                <TableCell>{demande.date_debut}</TableCell>
                                <TableCell>{demande.date_fin}</TableCell>
                                <TableCell className="align-items-center">
    {actionBodyTemplate(demande.id,demande.etat)}
</TableCell>                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DemandList;
