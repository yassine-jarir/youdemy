'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    console.log('Fetching users...');
    try {
      const response = await fetch('http://localhost:2325/index.php?route=admin/users');
      console.log('Response:', response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched Users:', data.data);
      setUsers(data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users. Please try again later.');
    }
  };

  const handleActivate = async (userId) => {
    try {
      const response = await fetch('http://localhost:2325/index.php?route=admin/user/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });
      if (response.ok) {
        console.log('User activated successfully');
        fetchUsers();
      }
    } catch (error) {
      console.error('Error activating user:', error);
    }
  };

  const handleSuspend = async (userId) => {
    try {
      const response = await fetch('http://localhost:2325/index.php?route=admin/user/suspend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });
      if (response.ok) {
        console.log('User suspended successfully');
        fetchUsers();
      }
    } catch (error) {
      console.error('Error suspending user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch('http://localhost:2325/index.php?route=admin/user/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });
      if (response.ok) {
        console.log('User deleted successfully');
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4">User Management</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.user_id}>
                <TableCell>{user.user_id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.is_active === 1 ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleActivate(user.user_id)}
                    disabled={user.is_active === 1}
                  >
                    Activate
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleSuspend(user.user_id)}
                    disabled={user.is_active === 0}
                    style={{ marginLeft: '10px' }}
                  >
                    Suspend
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(user.user_id)}
                    style={{ marginLeft: '10px' }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
