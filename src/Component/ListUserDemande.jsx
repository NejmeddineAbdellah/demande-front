    import React, { useState, useEffect } from 'react';
    import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, IconButton, DialogActions, DialogTitle, Dialog, DialogContent, Button } from '@mui/material';
    import DeleteIcon from '@mui/icons-material/Delete';
    import EditIcon from '@mui/icons-material/Edit';
    import axios from 'axios';
    import '../App.css';
    import authService from "../services/auth.service";
    import Header from './Header';

    const DemandUser = () => {
        const [demandes, setDemandes] = useState([]);
        const [filteredDemandes, setFilteredDemandes] = useState([]);
        const [globalFilterValue, setGlobalFilterValue] = useState('');
        const [confirmDelete, setConfirmDelete] = useState(false);
        const [deleteId, setDeleteId] = useState(null);
        const user = authService.getCurrentUser();
        const [selectedDemand, setSelectedDemand] = useState(null);
        const [openModal, setOpenModal] = useState(false);

        useEffect(() => {
            axios.get('http://localhost:8060/api/demande/findbyuser/' + user.username)
                .then(response => {
                    setDemandes(response.data);
                    setFilteredDemandes(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }, []);

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




        const handleEdit = (demandeId) => {
            // Find the selected demand based on its ID
            const selected = demandes.find((demande) => demande.id === demandeId);
            setSelectedDemand(selected);

            // Open the modal
            setOpenModal(true);
        };

        const handleModalClose = () => {
            // Close the modal and reset the selected demand
            setOpenModal(false);
            setSelectedDemand(null);
        };

        const handleUpdateDemand = () => {
            if (!selectedDemand) {
                return;
            }
        
            const updatedDemand = { ...selectedDemand };
        
            axios.put(`http://localhost:8060/api/demande/update/${selectedDemand.id}`, updatedDemand)
                .then(() => {
                    console.log(`Demand with id ${selectedDemand.id} updated successfully`);
        
                    // Fetch the updated data after the update is successful
                    axios.get('http://localhost:8060/api/demande/findbyuser/' + user.username)
                        .then(response => {
                            setDemandes(response.data);
                            setFilteredDemandes(response.data);
                        })
                        .catch(error => {
                            console.error('Error fetching updated data:', error);
                        });
        
                    setOpenModal(false);
                    setSelectedDemand(null);
                })
                .catch(error => {
                    console.error('Error updating demand:', error);
                });
        };
        

        const handleDelete = (demandeId) => {
            setDeleteId(demandeId);
            setConfirmDelete(true);
        };

        const handleConfirmDelete = () => {
            axios.delete(`http://localhost:8060/api/demande/delete/${deleteId}`)
                .then(() => {
                    console.log(`Demand with id ${deleteId} deleted successfully`);
                    const updatedDemandes = demandes.filter(demande => demande.id !== deleteId);
                    setDemandes(updatedDemandes);
                    setConfirmDelete(false);
                    console.log('Updated demandes:', updatedDemandes);
                })
                .catch(error => {
                    console.error('Error deleting demand:', error);
                    setConfirmDelete(false);
                });
        };
        

        const handleCancelDelete = () => {
            setConfirmDelete(false);
            setDeleteId(null);
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
                                    <TableCell>
                                        <IconButton onClick={() => handleEdit(demande.id)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(demande.id)} color="secondary">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                        <Dialog open={openModal} onClose={handleModalClose} PaperProps={{ style: { maxHeight: '80vh', width: '60vw', margin: 0 } }}>
                            <DialogTitle>Edit Demand</DialogTitle>
                            <DialogContent>
                                {/* Form fields for editing */}
                                <br />
                                <TextField
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                    value={selectedDemand?.titre || ''}
                                    onChange={(e) => setSelectedDemand({ ...selectedDemand, titre: e.target.value })}
                                />
                                <br /><br />
                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    value={selectedDemand?.description || ''}
                                    onChange={(e) => setSelectedDemand({ ...selectedDemand, description: e.target.value })}
                                />
                                <br /><br />
                                <TextField
                                    label="Comite"
                                    variant="outlined"
                                    fullWidth
                                    value={selectedDemand?.comite || ''}
                                    onChange={(e) => setSelectedDemand({ ...selectedDemand, comite: e.target.value })}
                                />
                                <br /><br />
                                <TextField
                                    label="Type"
                                    variant="outlined"
                                    fullWidth
                                    value={selectedDemand?.type || ''}
                                    onChange={(e) => setSelectedDemand({ ...selectedDemand, type: e.target.value })}
                                />
                                <br /><br />
                                <TextField
                                    label="Etat"
                                    variant="outlined"
                                    fullWidth
                                    value={selectedDemand?.etat || ''}
                                    onChange={(e) => setSelectedDemand({ ...selectedDemand, etat: e.target.value })}
                                />
                                <br /><br />
                                <TextField
                                    label="Date Debut"
                                    variant="outlined"
                                    fullWidth
                                    value={selectedDemand?.date_debut || ''}
                                    onChange={(e) => setSelectedDemand({ ...selectedDemand, date_debut: e.target.value })}
                                />
                                <br /><br />
                                <TextField
                                    label="Date Fin"
                                    variant="outlined"
                                    fullWidth
                                    value={selectedDemand?.date_fin || ''}
                                    onChange={(e) => setSelectedDemand({ ...selectedDemand, date_fin: e.target.value })}
                                />
                                {/* Add more fields as needed */}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleModalClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleUpdateDemand} color="primary">
                                    Update
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog open={confirmDelete} onClose={handleCancelDelete}>
                            <DialogTitle>Confirmation</DialogTitle>
                            <DialogContent>
                                Are you sure you want to delete this demand?
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCancelDelete} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleConfirmDelete} color="secondary">
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Table>
                </TableContainer>
            </div>
        );
    };

    export default DemandUser;
