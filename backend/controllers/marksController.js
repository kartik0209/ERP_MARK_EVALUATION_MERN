const Student = require('../models/Student');
const Marks = require('../models/Marks');

const updateStudentMarks = async (req, res) => {
  const { studentId, subjectId } = req.params;
  const { mark, absent } = req.body;

  try {
    const student = await Student.findById(studentId).populate('marks');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    let marksDoc = await Marks.findOne({ studentId });

    if (!marksDoc) {
      // If no marks document exists, create one
      marksDoc = new Marks({ studentId, marks: [] });
    }

    const subjectIndex = marksDoc.marks.findIndex(markEntry => markEntry.subjectId.toString() === subjectId);

    if (subjectIndex > -1) {
      // Update existing entry
      marksDoc.marks[subjectIndex].mark = mark;
      marksDoc.marks[subjectIndex].absent = absent;
    } else {
      // Add new entry if it doesn't exist
      marksDoc.marks.push({ subjectId, mark, absent });
    }

    await marksDoc.save();
    res.status(200).json({ message: 'Marks and attendance updated successfully' });
  } catch (error) {
    console.error('Error updating marks:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getStudentMarks = async (req, res) => {
  const { studentId } = req.params;

  try {
    const marksDoc = await Marks.findOne({ studentId }).populate('marks.subjectId');
    if (!marksDoc) {
      return res.status(404).json({ message: 'No marks found for this student' });
    }

    const marksDetails = marksDoc.marks.map(mark => ({
      subject: mark.subjectId.name,
      mark: mark.mark,
      absent: mark.absent,
    }));

    res.status(200).json({
      studentId: marksDoc.studentId,
      marks: marksDetails,
    });
  } catch (error) {
    console.error('Error retrieving marks:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  updateStudentMarks,
  getStudentMarks,
};
