import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png'; // Adjust the path as necessary

const API_URL = import.meta.env.VITE_API_URL;

const FacultyDashboard = () => {
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [division, setDivision] = useState('');
  const [subject, setSubject] = useState('');
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  const navigate = useNavigate(); // Hook for navigation

  // Fetch course and subject data from the API
  const getAllCoursesAndSubjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/faculty/allsub`);
      const data = response.data;

      // Extract unique courses and subjects
      const uniqueCourses = [...new Set(data.map(subject => subject.course))];
      setCourses(uniqueCourses);
      setSubjects(data);
    } catch (error) {
      console.error('Error fetching courses and subjects:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getAllCoursesAndSubjects();
  }, []);

  // Filter subjects based on selected course and semester
  useEffect(() => {
    if (course && semester) {
      const filtered = subjects.filter(
        subject =>
          subject.course === course && subject.sem.toString() === semester,
      );
      setFilteredSubjects(filtered);
    } else {
      setFilteredSubjects([]); // No subjects to display if course or semester is not selected
    }
  }, [course, semester, subjects]);

  const handleSubmit = e => {
    e.preventDefault();
    navigate('/marks', {
      state: {
        course,
        semester,
        division,
        subject,
      },
    });
  };

  const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      minHeight: '100vh',
      paddingTop: '100px',
    },
    logoContainer: {
      position: 'absolute',
      top: '20px',
      left: '20px',
    },
    logo: {
      width: '100px',
    },
    card: {
      backgroundColor: '#efe8e6',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '800px',
      textAlign: 'center',
      marginTop: '50px',
    },
    heading: {
      color: '#31708f',
      marginBottom: '30px',
      fontFamily: 'Arial, sans-serif',
      fontSize: '28px',
      fontWeight: 'bold',
    },
    formGroup: {
      marginBottom: '20px',
      textAlign: 'left',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: 'bold',
      fontSize: '16px',
      color: '#5d5d5d',
    },
    select: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
      backgroundColor: '#f9f9f9',
      color: '#333',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#31708f',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '18px',
      fontFamily: 'Arial, sans-serif',
    },
    buttonHover: {
      backgroundColor: '#26597c',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" style={styles.logo} />
      </div>
      <div style={styles.card}>
        <h2 style={styles.heading}>FACULTY DASHBOARD</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="course">
              Course
            </label>
            <select
              id="course"
              style={styles.select}
              value={course}
              onChange={e => setCourse(e.target.value)}
            >
              <option value="" disabled>
                Select Course
              </option>
              {courses.map(courseOption => (
                <option key={courseOption} value={courseOption}>
                  {courseOption}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="semester">
              Semester
            </label>
            <select
              id="semester"
              style={styles.select}
              value={semester}
              onChange={e => setSemester(e.target.value)}
            >
              <option value="" disabled>
                Select Semester
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="division">
              Division
            </label>
            <select
              id="division"
              style={styles.select}
              value={division}
              onChange={e => setDivision(e.target.value)}
            >
              <option value="" disabled>
                Select Division
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="subject">
              Subject
            </label>
            <select
              id="subject"
              style={styles.select}
              value={subject}
              onChange={e => setSubject(e.target.value)}
              disabled={!course || !semester} // Disable if course or semester is not selected
            >
              <option value="" disabled>
                Select Subject
              </option>
              {filteredSubjects.map(subjectOption => (
                <option key={subjectOption._id} value={subjectOption.name}>
                  {subjectOption.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            style={styles.button}
            onMouseOver={e =>
              (e.target.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseOut={e =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FacultyDashboard;
