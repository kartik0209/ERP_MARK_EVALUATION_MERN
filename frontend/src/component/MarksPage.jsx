import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const MarksPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { course, semester, division, subject } = location.state || {};

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${API_URL}/faculty/allstudent`);
        const allStudents = response.data;
        setStudents(allStudents);
        filterStudents(allStudents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [course, semester, division]);

  const filterStudents = students => {
    const filtered = students.filter(
      student =>
        student.department === course &&
        student.sem.toString() === semester &&
        student.division.toUpperCase() === division,
    );
    setFilteredStudents(filtered);
  };

  const handleMarksChange = (index, value) => {
    const updatedStudents = [...filteredStudents];
    updatedStudents[index].marks = value;
    setFilteredStudents(updatedStudents);
  };

  const handleAbsentChange = (index, isChecked) => {
    const updatedStudents = [...filteredStudents];
    if (isChecked) {
      updatedStudents[index].marks = '0';
    } else {
      updatedStudents[index].marks = '';
    }
    updatedStudents[index].absent = isChecked ? 'Y' : 'N';
    setFilteredStudents(updatedStudents);
  };

  const handleSubmit = async () => {
    const updatedStudents = filteredStudents.map(student => ({
      enrollmentNumber: student.enrollmentNumber,
      marks: student.marks,
      absent: student.absent,
      subjectName: subject,
    }));

    try {
      const response = await fetch(`${API_URL}/faculty/update-marks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ students: updatedStudents }),
      });

      if (response.ok) {
        alert('Marks and attendance updated successfully!');
      } else {
        alert('Failed to update data.');
      }
    } catch (error) {
      console.error('Error updating data:', error);
      alert('An error occurred while updating data.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>FACULTY DASHBOARD / MARKS</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Enrollment no.</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Subject</th>
            <th style={styles.th}>Mark</th>
            <th style={styles.th}>Absent</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr
              key={student.enrollmentNumber}
              style={index % 2 === 0 ? styles.tr : { ...styles.tr, backgroundColor: '#f9f9f9' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e0e0e0'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'white' : '#f9f9f9'}
            >
              <td style={styles.td}>{student.enrollmentNumber}</td>
              <td style={styles.td}>{student.name}</td>
              <td style={styles.td}>{subject}</td>
              <td style={styles.td}>
                <input
                  type="text"
                  // value={student.marks || ''}
                  onChange={e => handleMarksChange(index, e.target.value)}
                  placeholder="Enter marks"
                  style={styles.input}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="checkbox"
                  checked={student.absent === 'Y'}
                  onChange={e => handleAbsentChange(index, e.target.checked)}
                  style={styles.checkbox}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit} style={styles.submitButton}>
        Submit
      </button>
    </div>
  );
};

// Basic styling
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    color: '#31708f',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'center',
  },
  th: {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    borderBottom: '2px solid #ddd',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  },
  tr: {
    transition: 'background-color 0.3s',
  },
  input: {
    width: '100px',
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  checkbox: {
    cursor: 'pointer',
  },
  submitButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#31708f',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default MarksPage;
