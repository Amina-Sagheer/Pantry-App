'use client';

import { Box, Stack, Typography, Button, TextField, Modal, IconButton } from '@mui/material';
import { collection, getDocs, query, setDoc, updateDoc, deleteDoc, increment, where, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { keyframes } from '@mui/system';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  padding: 3,
  backgroundColor: 'white',
  borderRadius: 2,
  boxShadow: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
};

const sectionStyle = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

const greenStyle = {
  ...sectionStyle,
  backgroundColor: '#1A4D2E',
};

const oliveGreenStyle = {
  ...sectionStyle,
  backgroundColor: '#4F6F52',
};


export default function Home() {
  const [pantryList, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updatePantry = async () => {
    try {
      const q = query(collection(firestore, 'pantry'));
      const snapshot = await getDocs(q);
      const pantryItems = [];
      snapshot.forEach((doc) => {
        pantryItems.push({ name: doc.data().name, quantity: doc.data().quantity || 0 });
      });
      setPantry(pantryItems);
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const handleAddItem = async () => {
    if (itemName.trim()) {
      try {
        const docRef = doc(firestore, 'pantry', itemName);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          await updateDoc(docRef, { quantity: increment(itemQuantity) });
        } else {
          await setDoc(docRef, { name: itemName, quantity: itemQuantity });
        }

        console.log(`Added/Updated item: ${itemName} with quantity: ${itemQuantity}`);
        setItemName('');
        setItemQuantity(1);
        handleClose();
        updatePantry();
      } catch (error) {
        console.error('Error adding item to Firestore:', error);
      }
    } else {
      alert('Item name cannot be empty!');
    }
  };

  const handleAdjustQuantity = async (itemName, adjustment) => {
    try {
      const docRef = doc(firestore, 'pantry', itemName);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentQuantity = docSnap.data().quantity || 0;

        if (currentQuantity + adjustment > 0) {
          await updateDoc(docRef, { quantity: increment(adjustment) });
        } else {
          await deleteDoc(docRef);
        }

        console.log(`Adjusted quantity for item: ${itemName}`);
        updatePantry();
      } else {
        console.log(`Item not found: ${itemName}`);
      }
    } catch (error) {
      console.error('Error adjusting item quantity in Firestore:', error);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const q = query(collection(firestore, 'pantry'), where('name', '==', searchQuery));
        const snapshot = await getDocs(q);
        const searchResults = [];
        snapshot.forEach((doc) => {
          searchResults.push({ name: doc.data().name, quantity: doc.data().quantity });
        });
        setPantry(searchResults);
      } catch (error) {
        console.error('Error searching items in Firestore:', error);
      }
    } else {
      updatePantry();
    }
  };

  const handleRemoveItem = async (itemName) => {
    try {
      const docRef = doc(firestore, 'pantry', itemName);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentQuantity = docSnap.data().quantity || 0;

        if (currentQuantity > 1) {
          await updateDoc(docRef, { quantity: increment(-1) });
        } else {
          await deleteDoc(docRef);
        }

        console.log(`Updated/Removed item: ${itemName}`);
        updatePantry();
      } else {
        console.log(`Item not found: ${itemName}`);
      }
    } catch (error) {
      console.error('Error removing item from Firestore:', error);
    }
  };

  return (
    <>
      <Box
    sx={{
    ...greenStyle,  // Include any other styles from greenStyle
    backgroundImage: 'url(./background.jpg)', // Path to your background image
    backgroundSize: 'cover', // Ensure the image covers the entire area
    backgroundPosition: 'center', // Center the background image
    backgroundRepeat: 'no-repeat' // Prevent the image from repeating
  }}
>
  <Typography variant="h3" color="#E1D8C9">
    Welcome to Your Magical Pantry
  </Typography>
</Box>


      <Box sx={oliveGreenStyle}>
        <Button variant="contained" onClick={handleOpen} sx={{marginBottom: 2,backgroundColor: '#708871'}}>
          ADD ITEM
        </Button>
        <Link href="/app.html">
          <Button variant="contained" sx={{marginBottom: 2,backgroundColor: '#708871'}} color="secondary">Capture Image</Button>
        </Link>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Item
            </Typography>
            <TextField
              id="item-name"
              label="Item Name"
              variant="outlined"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              fullWidth
            />
            <TextField
              id="item-quantity"
              label="Quantity"
              type="number"
              variant="outlined"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(parseInt(e.target.value))}
              fullWidth
            />
            <Button variant="contained" onClick={handleAddItem}>
              ADD
            </Button>
          </Box>
        </Modal>

        <Box width="800px" height="400px" bgcolor="#E8DFCA" sx={{ padding: 2, borderRadius: 2 }}>
          <Typography variant="h2" color="#333" textAlign="center">
            Pantry Items
          </Typography>
          <Stack direction="row" spacing={2} marginTop={2}>
            <TextField
              id="search-item"
              label="Search Item"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleSearch} sx={{backgroundColor: '#708871'}}>
              SEARCH
            </Button>
          </Stack>
        </Box>

        <Stack width="800px" spacing={0.5} marginTop={2} overflow="auto">
          {pantryList.map((item) => (
            <Box
              key={item.name}
              width="100%"
              height="auto"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgcolor="#E8DFCA"
              padding={1}
              borderRadius={1}
            >
              <Typography>{item.name}</Typography>
              <Box display="flex" alignItems="center">
                <Typography>Quantity: {item.quantity}</Typography>
              </Box>
              <Button onClick={() => handleRemoveItem(item.name)} sx={{backgroundColor: '#708871', color:"whitesmoke"}}>
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
}
