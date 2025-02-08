import React, { useState, useEffect } from 'react';
import { addSubject, getAllSubject } from '../api/subjectApi'; // Ensure the import names match the function names

const SubjectManager = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({
    name: '',
    code: '',
    course: '',
    sem: '',
  });
  const [editingSubject, setEditingSubject] = useState(null);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getAllSubject(); // Ensure function name is correct
        setSubjects(data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    fetchSubjects();
  }, []);

  const handleAddSubject = async () => {
    setFormError('');
    try {
      const data = await addSubject(newSubject);
      setSubjects([...subjects, data.subject]);
      setNewSubject({ name: '', code: '', course: '', sem: '' });
    } catch (error) {
      console.error('Error adding subject:', error);
      setFormError('Error adding subject');
    }
  };

  const handleUpdateSubject = async () => {
    // Code for updating subject (if needed)
  };

  const handleDeleteSubject = async id => {
    // Code for deleting subject (if needed)
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Subject Manager</h1>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Add / Edit Subject</h2>
        {formError && <p className="text-red-500 mb-4">{formError}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={editingSubject ? editingSubject.name : newSubject.name}
            onChange={e =>
              editingSubject
                ? setEditingSubject({ ...editingSubject, name: e.target.value })
                : setNewSubject({ ...newSubject, name: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Code:</label>
          <input
            type="text"
            value={editingSubject ? editingSubject.code : newSubject.code}
            onChange={e =>
              editingSubject
                ? setEditingSubject({ ...editingSubject, code: e.target.value })
                : setNewSubject({ ...newSubject, code: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Course:</label>
          <input
            type="text"
            value={editingSubject ? editingSubject.course : newSubject.course}
            onChange={e =>
              editingSubject
                ? setEditingSubject({
                    ...editingSubject,
                    course: e.target.value,
                  })
                : setNewSubject({ ...newSubject, course: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Semester:</label>
          <input
            type="number"
            value={editingSubject ? editingSubject.sem : newSubject.sem}
            onChange={e =>
              editingSubject
                ? setEditingSubject({ ...editingSubject, sem: e.target.value })
                : setNewSubject({ ...newSubject, sem: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button
          onClick={editingSubject ? handleUpdateSubject : handleAddSubject}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          {editingSubject ? 'Update Subject' : 'Add Subject'}
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Subject List</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Code</th>
            <th className="py-2 px-4 border-b">Course</th>
            <th className="py-2 px-4 border-b">Semester</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map(subject => (
            <tr key={subject._id}>
              <td className="py-2 px-4 border-b">{subject._id}</td>
              <td className="py-2 px-4 border-b">{subject.name}</td>
              <td className="py-2 px-4 border-b">{subject.code}</td>
              <td className="py-2 px-4 border-b">{subject.course}</td>
              <td className="py-2 px-4 border-b">{subject.sem}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => setEditingSubject(subject)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteSubject(subject._id)}
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

export default SubjectManager;
