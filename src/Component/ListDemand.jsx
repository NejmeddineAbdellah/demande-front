import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, IconButton
    , DialogActions, DialogTitle, Dialog, DialogContent, Button, TextareaAutosize, Badge
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';
import '../App.css';
import Header from './Header';

const DemandList = () => {
    const [demandes, setDemandes] = useState([]);
    const [filteredDemandes, setFilteredDemandes] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [confirmReject, setConfirmReject] = useState(false);
    const [id, setId] = useState(0);
    const [motif, setMotif] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const openModalReject = (id) => (event) => {
        event.preventDefault();
        setConfirmReject(true);
        setId(id);
    };

    const handleReject = (rejectionReason) => (event) => {
        event.preventDefault();

        axios
            .put(`http://localhost:8060/api/demande/reject/${id}/${rejectionReason}`)
            .then(() => {
                loadDemande();
                setConfirmReject(false);
            });
    };

    const handleCancelReject = () => {
        setConfirmReject(false);
    };

    const handleAccept = (id) => (event) => {
        event.preventDefault();

        axios
            .put(`http://localhost:8060/api/demande/accept/${id}`)
            .then(() => {
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

    const actionBodyTemplate = (demandeId, etat) => {
        if (etat === 'accepted' || etat === 'rejected') {
            return null;
        }
        return (
            <div className="d-flex align-items-center justify-content-center">
                <IconButton color="error" onClick={openModalReject(demandeId)}>
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
            <Header />
            <Typography variant="h4" className="mb-4">Liste des demandes</Typography>

            <TextField
                label="Rechercher"
                variant="outlined"
                className="mb-4"
                value={globalFilterValue}
                onChange={onGlobalFilterChange}
            />

            <TableContainer component={Paper} className="mt-4" style={{ maxWidth: '80%', margin: 'auto' }}>
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
                            <TableCell>Motif</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDemandes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((demande) => (
                            <TableRow key={demande.id}>
                                <TableCell>{demande.titre}</TableCell>
                                <TableCell>{demande.description}</TableCell>
                                <TableCell>{demande.comite}</TableCell>
                                <TableCell>{demande.type}</TableCell>
                                <TableCell>
                                    {demande.etat === 'inprogress' && (
                                        <Badge color="primary" badgeContent="InProgress"></Badge>
                                    )}
                                    {demande.etat === 'accepted' && (
                                        <Badge color="success" badgeContent="Accepted"></Badge>
                                    )}
                                    {demande.etat === 'rejected' && (
                                        <Badge color="error" badgeContent="Rejected"></Badge>
                                    )}
                                </TableCell>
                                <TableCell>{demande.date_debut}</TableCell>
                                <TableCell>{demande.date_fin}</TableCell>
                                <TableCell>{demande.motif}</TableCell>
                                <TableCell className="align-items-center">
                                    {actionBodyTemplate(demande.id, demande.etat)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        count={filteredDemandes.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

<Dialog open={confirmReject} onClose={handleCancelReject} maxWidth="xs">
                        <DialogTitle style={{ backgroundColor: '#f5424e', color: '#fff' }}>
                            <Typography  variant="h6">Reject</Typography>
                        </DialogTitle>
                        <DialogContent>
                            <TextareaAutosize
                                required
                                rowsMin={3}
                                placeholder="Enter the rejection reason"
                                onChange={(event) => setMotif(event.target.value)}
                                style={{ width: '100%', margin: '10px 0' }}
                            />
                        </DialogContent>
                        <DialogActions style={{ backgroundColor: '#f5f5f5' }}>
                            <Button onClick={handleCancelReject} style={{ backgroundColor: '#432cf2' }} variant="contained" >
                                Cancel
                            </Button>
                            <Button onClick={handleReject(motif)} style={{ backgroundColor: '#f5424e' }}  startIcon={<CloseIcon />} variant="contained">
                                Reject
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DemandList;
