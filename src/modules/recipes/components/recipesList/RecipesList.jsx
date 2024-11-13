import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Header from '../../../shared/components/header/Header';
import noData from '../../../../assets/images/no-data.svg';
import axios from 'axios';

export default function () {
  const [recipesList, setRecipesList] = useState([]);
  const [selectedId, setSelectedId] = useState(0)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id)
    setShow(true)};

    let getRecipes = async() => {
      try {
       let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1',
         {
         headers: {Authorization: localStorage.getItem("token")},
       });
       console.log(response.data.data)
   
       setRecipesList(response.data.data);
      } catch (error) {
       console.log(error)
      }
     };

     let deleteRecipe = () => {
      try {
        let response = axios.delete(`https://upskilling-egypt.com:3006/api/v1/Recipe/${selectedId}`,
          {
            headers: {Authorization: localStorage.getItem("token")},
          }
        );
        toast.success('Item deleted successfuly');
        getRecipes()
      } catch (error) {
  
        console.log(error);
        toast.error(error.response.data.message);
      }
      
      handleClose()
    }

     useEffect(() => {
      getRecipes()
      
    }, []);
  return (
    <>
     
    <Header title={'Recipes Items'} 
    description={'You can now add your items that any user can order it from the Application and you can edit'}/>
    

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='text-center'>
          <img src={noData} alt=''/>
          <h5>Delete This Category ?</h5>
          <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
          </div>
          
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={deleteRecipe}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
    <div className=' d-flex justify-content-between p-4'>
      <h5>Recipes Table Details</h5>
      <button className='btn btn-success'>Add New Recipe</button>
    </div>
    <div className='p-4'>
    <table className="table table-striped">
  <thead >
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Image</th>
      <th scope="col">Price</th>
      <th scope="col">Description</th>
      <th scope="col">Tag</th>
      <th scope="col">category</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {recipesList.map(recipe => 
      <tr key={recipe.id}>
      <td>{recipe.name}</td>
      <td><img src={recipe.imagePath} alt='recipe-img'/></td>
      <td>{recipe.price}</td>
      <td>{recipe.description}</td>
      <td>{recipe.tag.name}</td>
      <td>{recipe.category.name}</td>
      <td>{recipe.creationDate}</td>
      <td>
      <i className="fa-solid fa-trash mx-3 text-success" onClick={()=> handleShow(recipe.id)} ></i>
      <i className="fa-regular fa-pen-to-square text-success"></i>
      </td>
    </tr>
    )}
    
  </tbody>
    </table>
    </div>
    

    </>
    
  )
}
