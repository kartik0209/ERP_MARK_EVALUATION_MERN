import React, { useState, useEffect } from 'react';
import {
  addStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
} from '../api/studentApi';

const StudentManager = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    enrollmentNumber: '',
    name: '',
    email: '',
    password: '',
    department: '',
    sem: '', // Added field for semester
    division: '', // Added field for division
    marks: [],
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const [formError, setFormError] = useState('');
  const [newMark, setNewMark] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const handleAddStudent = async () => {
    setFormError('');
    try {
      const data = await addStudent(newStudent);
      setStudents([...students, data.student]);
      setNewStudent({
        enrollmentNumber: '',
        name: '',
        email: '',
        password: '',
        department: '',
        sem: '', // Reset sem
        division: '', // Reset division
        marks: [],
      });
    } catch (error) {
      console.error('Error adding student:', error);
      setFormError('Error adding student');
    }
  };

  const handleUpdateStudent = async () => {
    if (!editingStudent) return;
    setFormError('');
    try {
      const data = await updateStudent(editingStudent._id, editingStudent);
      setStudents(
        students.map(student =>
          student._id === data.student._id ? data.student : student,
        ),
      );
      setEditingStudent(null);
    } catch (error) {
      console.error('Error updating student:', error);
      setFormError('Error updating student');
    }
  };

  const handleDeleteStudent = async id => {
    try {
      await deleteStudent(id);
      setStudents(students.filter(student => student._id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
      setFormError('Error deleting student');
    }
  };

  const handleAddMark = () => {
    if (newMark) {
      setNewStudent({ ...newStudent, marks: [...newStudent.marks, newMark] });
      setNewMark('');
    }
  };

  const handleUpdateMarks = () => {
    if (!editingStudent) return;
    setFormError('');
    try {
      const updatedStudent = {
        ...editingStudent,
        marks: [...editingStudent.marks, newMark],
      };
      updateStudent(editingStudent._id, updatedStudent);
      setStudents(
        students.map(student =>
          student._id === updatedStudent._id ? updatedStudent : student,
        ),
      );
      setEditingStudent(updatedStudent);
      setNewMark('');
    } catch (error) {
      console.error('Error updating marks:', error);
      setFormError('Error updating marks');
    }
  };

  const handleDeleteMark = (studentId, markIndex) => {
    if (!editingStudent) return;
    setFormError('');
    try {
      const updatedMarks = editingStudent.marks.filter(
        (_, index) => index !== markIndex,
      );
      const updatedStudent = { ...editingStudent, marks: updatedMarks };
      updateStudent(studentId, updatedStudent);
      setStudents(
        students.map(student =>
          student._id === updatedStudent._id ? updatedStudent : student,
        ),
      );
    } catch (error) {
      console.error('Error deleting mark:', error);
      setFormError('Error deleting mark');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Student Manager</h1>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Add / Edit Student</h2>
        {formError && <p className="text-red-500 mb-4">{formError}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Enrollment Number:</label>
          <input
            type="text"
            value={
              editingStudent
                ? editingStudent.enrollmentNumber
                : newStudent.enrollmentNumber
            }
            onChange={e =>
              editingStudent
                ? setEditingStudent({
                    ...editingStudent,
                    enrollmentNumber: e.target.value,
                  })
                : setNewStudent({
                    ...newStudent,
                    enrollmentNumber: e.target.value,
                  })
            }
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={editingStudent ? editingStudent.name : newStudent.name}
            onChange={e =>
              editingStudent
                ? setEditingStudent({ ...editingStudent, name: e.target.value })
                : setNewStudent({ ...newStudent, name: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={editingStudent ? editingStudent.email : newStudent.email}
            onChange={e =>
              editingStudent
                ? setEditingStudent({
                    ...editingStudent,
                    email: e.target.value,
                  })
                : setNewStudent({ ...newStudent, email: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={
              editingStudent ? editingStudent.password : newStudent.password
            }
            onChange={e =>
              editingStudent
                ? setEditingStudent({
                    ...editingStudent,
                    password: e.target.value,
                  })
                : setNewStudent({ ...newStudent, password: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Department:</label>
          <input
            type="text"
            value={
              editingStudent ? editingStudent.department : newStudent.department
            }
            onChange={e =>
              editingStudent
                ? setEditingStudent({
                    ...editingStudent,
                    department: e.target.value,
                  })
                : setNewStudent({ ...newStudent, department: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Semester:</label>
          <input
            type="number"
            value={editingStudent ? editingStudent.sem : newStudent.sem}
            onChange={e =>
              editingStudent
                ? setEditingStudent({
                    ...editingStudent,
                    sem: e.target.value,
                  })
                : setNewStudent({ ...newStudent, sem: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Division:</label>
          <input
            type="text"
            value={
              editingStudent ? editingStudent.division : newStudent.division
            }
            onChange={e =>
              editingStudent
                ? setEditingStudent({
                    ...editingStudent,
                    division: e.target.value,
                  })
                : setNewStudent({ ...newStudent, division: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button
          onClick={editingStudent ? handleUpdateStudent : handleAddStudent}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          {editingStudent ? 'Update Student' : 'Add Student'}
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Student List</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Enrollment Number</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Department</th>
            <th className="py-2 px-4 border-b">Semester</th>
            <th className="py-2 px-4 border-b">Division</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td className="py-2 px-4 border-b">{student._id}</td>
              <td className="py-2 px-4 border-b">{student.enrollmentNumber}</td>
              <td className="py-2 px-4 border-b">{student.name}</td>
              <td className="py-2 px-4 border-b">{student.email}</td>
              <td className="py-2 px-4 border-b">{student.department}</td>
              <td className="py-2 px-4 border-b">{student.sem}</td>
              <td className="py-2 px-4 border-b">{student.division}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => setEditingStudent(student)}
                  className="bg-green-500 text-white py-1 px-2 rounded-lg hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteStudent(student._id)}
                  className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600 ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentManager;
