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

export default function TeacherValidation() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch('http://localhost:2325/index.php?route=admin/teachers');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched Teachers:', data.data);
      setTeachers(data.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      alert('Failed to fetch teachers. Please try again later.');
    }
  };

  const handleValidate = async (teacherId) => {
    try {
      const response = await fetch('http://localhost:2325/index.php?route=admin/teachers/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teacher_id: teacherId }),
      });
      if (response.ok) {
        console.log('Teacher validated successfully');
        fetchTeachers();
      }
    } catch (error) {
      console.error('Error validating teacher:', error);
    }
  };

  const handleInvalidate = async (teacherId) => {
    try {
      const response = await fetch('http://localhost:2325/index.php?route=admin/teachers/invalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teacher_id: teacherId }),
      });
      if (response.ok) {
        console.log('Teacher invalidated successfully');
        fetchTeachers();
      }
    } catch (error) {
      console.error('Error invalidating teacher:', error);
    }
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Teacher Validation</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.user_id}>
                <TableCell>{teacher.user_id}</TableCell>
                <TableCell>{teacher.username}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.is_active === 1 ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleValidate(teacher.user_id)}
                    disabled={teacher.is_active === 1}
                  >
                    Validate
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleInvalidate(teacher.user_id)}
                    disabled={teacher.is_active === 0}
                    style={{ marginLeft: '10px' }}
                  >
                    Invalidate
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
