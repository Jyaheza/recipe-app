
import React, { useState, useEffect } from 'react';
import {Container,Grid,Card,CardContent,Typography,Button,Dialog,DialogTitle,DialogContent,TextField,DialogActions,IconButton,FormControl,InputLabel,Select,MenuItem,Chip,Box} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';


const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openCreateIngredientDialog, setOpenCreateIngredientDialog] = useState(false);
    const [newRecipe, setNewRecipe] = useState({ name: '', ingredients: [], instructions: '' });
    const [editRecipe, setEditRecipe] = useState(null);
    const [newIngredient, setNewIngredient] = useState('');

useEffect(() => {
    fetchRecipes();
    fetchIngredients();
}, []);

const fetchRecipes = async () => {
    try {
        const response = await axios.get('/api/recipes/');
        setRecipes(response.data);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
};

const fetchIngredients = async () => {
    try {
        const response = await axios.get('/api/ingredients/');
        setIngredients(response.data);
    } catch (error) {
        console.error('Error fetching ingredients:', error);
    }
};

const handleAddRecipe = async () => {
    try {
        const formattedIngredients = newRecipe.ingredients.join(', ');
        await axios.post('/api/recipes/', { ...newRecipe, ingredients: formattedIngredients });
        fetchRecipes();
        setOpenAddDialog(false);
        setNewRecipe({ name: '', ingredients: [], instructions: '' });
    } catch (error) {
        console.error('Error adding recipe:', error);
    }
};

const handleDelete = async (recipeId) => {
    try {
        await axios.delete(`/api/recipes/${recipeId}/`);
        fetchRecipes();
    } catch (error) {
        console.error('Error deleting recipe:', error);
    }
};

const handleEdit = async () => {
    if (editRecipe) {
        try {
            const formattedIngredients = editRecipe.ingredients.join(', ');
            await axios.put(`/api/recipes/${editRecipe.id}/`, { ...editRecipe, ingredients: formattedIngredients });
            fetchRecipes();
            setOpenEditDialog(false);
            setEditRecipe(null);
        } catch (error) {
            console.error('Error editing recipe:', error);
        }
    }
};

const handleCreateIngredient = async () => {
    try {
        await axios.post('/api/ingredients/', { name: newIngredient });
        fetchIngredients();
        setOpenCreateIngredientDialog(false);
        setNewIngredient('');
    } catch (error) {
        console.error('Error creating ingredient:', error);
    }
};

return (
    <Container>
        <Typography variant="h4" component="h1" gutterBottom>
            Recipe List
        </Typography>
        <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenAddDialog(true)}
        >
            Add New Recipe
        </Button>
        <Button
            variant="contained"
            color="secondary"
            style={{ position: 'absolute', top: 16, right: 160 }}
            onClick={() => setOpenCreateIngredientDialog(true)}
        >
            Create Ingredient
        </Button>
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
            {recipes.map((recipe) => (
                <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h2">
                                {recipe.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <i><b>Ingredients:</b></i> {recipe.ingredients}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {recipe.instructions}
                            </Typography>
                        </CardContent>
                        <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={() => {
                                setEditRecipe({
                                    ...recipe,
                                    ingredients: recipe.ingredients.split(', '),
                                });
                                setOpenEditDialog(true);
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(recipe.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Card>
                </Grid>
            ))}
        </Grid>

        {/* Add Recipe Dialog */}
        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
            <DialogTitle>Add New Recipe</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Recipe Name"
                    fullWidth
                    value={newRecipe.name}
                    onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Ingredients</InputLabel>
                    <Select
                        multiple
                        value={newRecipe.ingredients}
                        onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                    >
                        {ingredients.map((ingredient) => (
                            <MenuItem key={ingredient.id} value={ingredient.name}>
                                {ingredient.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    label="Instructions"
                    fullWidth
                    multiline
                    value={newRecipe.instructions}
                    onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenAddDialog(false)} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleAddRecipe} color="primary">
                    Add Recipe
                </Button>
            </DialogActions>
        </Dialog>

        {/* Edit Recipe Dialog */}
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
            <DialogTitle>Edit Recipe</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Recipe Name"
                    fullWidth
                    value={editRecipe?.name || ''}
                    onChange={(e) => setEditRecipe({ ...editRecipe, name: e.target.value })}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Ingredients</InputLabel>
                    <Select
                        multiple
                        value={editRecipe?.ingredients || []}
                        onChange={(e) => setEditRecipe({ ...editRecipe, ingredients: e.target.value })}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                    >
                        {ingredients.map((ingredient) => (
                            <MenuItem key={ingredient.id} value={ingredient.name}>
                                {ingredient.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    label="Instructions"
                    fullWidth
                    multiline
                    value={editRecipe?.instructions || ''}
                    onChange={(e) => setEditRecipe({ ...editRecipe, instructions: e.target.value })}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenEditDialog(false)} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleEdit} color="primary">
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
       
       {/* Add  Ingredient Dialog */}
        <Dialog open={openCreateIngredientDialog} onClose={() => setOpenCreateIngredientDialog(false)}>
                <DialogTitle>Create Ingredient</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Ingredient Name"
                        fullWidth
                        value={newIngredient}
                        onChange={(e) => setNewIngredient(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCreateIngredientDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateIngredient} color="primary">
                        Create Ingredient
                    </Button>
                </DialogActions>
            </Dialog>
    </Container>
);
};


export default RecipeList;
