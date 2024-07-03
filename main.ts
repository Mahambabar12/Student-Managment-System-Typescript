#! /usr/bin/env node
import inquirer from "inquirer";

interface StudentInfo {
  name: string;
  age: number;
  courseEnrolled: string;
  studentId: string;
  balance: number;
}

const studentInfo: StudentInfo[] = [];

const generateStudentId = (): string => {
  const newId = Math.floor(10000 + Math.random() * 90000).toString();
  return studentInfo.some((student) => student.studentId === newId)
    ? generateStudentId()
    : newId;
};

const addStudent = async () => {
  const studentData = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter student name",
    },
    {
      type: "number",
      name: "age",
      message: "Enter student age",
    },
  ]);

  const newStudent: StudentInfo = {
    ...studentData,
    studentId: generateStudentId(),
    balance: 0,
  };
  studentInfo.push(newStudent);
  console.log("The student has been successfully added to the database.");
  console.log(newStudent);
};

const enroll = async (student: StudentInfo) => {
  const { course } = await inquirer.prompt([
    {
      type: "list",
      name: "course",
      message: "Select the course you want to enroll in",
      choices: [
        "Web Development",
        "Mobile Development",
        "AI",
        "Cloud Computing",
        "Blockchain",
        "Generative Ai",
      ],
    },
  ]);

  student.courseEnrolled = course;
  console.log(`${student.name} has been enrolled in ${course}.`);
};

const viewBalance = (student: StudentInfo) => {
  console.log(`Balance for ${student.name}: $${student.balance}`);
};

const addBalance = async (student: StudentInfo) => {
  const { amount } = await inquirer.prompt([
    {
      type: "number",
      name: "amount",
      message: "Enter the amount to add in you account.",
    },
  ]);
  student.balance += amount;
  console.log(`Balance for ${student.name}: $${student.balance}`);
};

const payTuition = async (student: StudentInfo) => {
  let amount = 4500;
  student.balance -= amount;
  console.log(`${student.name} has paid $${amount} towards tuition.`);
};

const showStatus = (student: StudentInfo) => {
  console.log("Student Details:");
  console.log(`Name: ${student.name}`);
  console.log(`Age: ${student.age}`);
  console.log(`Student ID: ${student.studentId}`);
  console.log(`Courses Enrolled: ${student.courseEnrolled}`);
  console.log(`Balance: $${student.balance}`);
};

const updateStudent = async (student: StudentInfo) => {
  const studentData = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter student name",
    },
    {
      type: "number",
      name: "age",
      message: "Enter student age",
    },
    {
      type: "number",
      name: "batch",
      message: "Enter student batch",
    },
    {
      type: "list",
      name: "courseEnrolled",
      message: "Enter student course enrolled",
      choices: [
        "Web Development",
        "Mobile Development",
        "AI",
        "Cloud Computing",
        "Blockchain",
        "Generative Ai",
      ],
    },
  ]);

  Object.assign(student, studentData);
  console.log("The student has been successfully updated in the database.");
  showStatus(student);
};

const deleteStudent = async () => {
  const { studentId } = await inquirer.prompt([
    {
      type: "input",
      name: "studentId",
      message: "Enter student ID",
    },
  ]);

  const index = studentInfo.findIndex(
    (student) => student.studentId === studentId
  );

  if (index !== -1) {
    studentInfo.splice(index, 1);
    console.log("The student has been successfully deleted from the database.");
  } else {
    console.log("Student not found with the given ID.");
  }
};

const showStudents = () => {
  console.log("Student Database:");
  console.log(studentInfo);
};

const main = async () => {
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What do you want to do?",
      choices: [
        "Show Students",
        "Add Student",
        "Update Student",
        "Delete Student",
        "Show Status",
        "Enroll",
        "View Balance",
        "Pay Tuition",
        "Add Balance",
        "Exit",
      ],
    },
  ]);

  switch (choice) {
    case "Add Student":
      await addStudent();
      break;
    case "Update Student":
      const { studentId } = await inquirer.prompt([
        {
          type: "input",
          name: "studentId",
          message: "Enter student ID",
        },
      ]);
      const studentToUpdate = studentInfo.find(
        (student) => student.studentId === studentId
      );
      if (studentToUpdate) {
        await updateStudent(studentToUpdate);
      } else {
        console.log("Student not found with the given ID.");
      }
      break;
    case "Delete Student":
      await deleteStudent();
      break;
    case "Enroll":
      const { studentId: enrollStudentId } = await inquirer.prompt([
        {
          type: "input",
          name: "studentId",
          message: "Enter student ID",
        },
      ]);
      const studentToEnroll = studentInfo.find(
        (student) => student.studentId === enrollStudentId
      );
      if (studentToEnroll) {
        await enroll(studentToEnroll);
      } else {
        console.log("Student not found with the given ID.");
      }
      break;
    case "View Balance":
      const { studentId: viewBalanceStudentId } = await inquirer.prompt([
        {
          type: "input",
          name: "studentId",
          message: "Enter student ID",
        },
      ]);
      const studentToViewBalance = studentInfo.find(
        (student) => student.studentId === viewBalanceStudentId
      );
      if (studentToViewBalance) {
        viewBalance(studentToViewBalance);
      } else {
        console.log("Student not found with the given ID.");
      }
      break;
    case "Pay Tuition":
      const { studentId: payTuitionStudentId } = await inquirer.prompt([
        {
          type: "input",
          name: "studentId",
          message: "Enter student ID",
        },
      ]);
      const studentToPayTuition = studentInfo.find(
        (student) => student.studentId === payTuitionStudentId
      );
      if (studentToPayTuition) {
        await payTuition(studentToPayTuition);
      } else {
        console.log("Student not found with the given ID.");
      }
      break;
    case "Add Balance":
      const { studentId: addBanalceStudentId } = await inquirer.prompt([
        {
          type: "input",
          name: "studentId",
          message: "Enter student ID",
        },
      ]);
      const studentToAddBalance = studentInfo.find(
        (student) => student.studentId === addBanalceStudentId
      );
      if (studentToAddBalance) {
        await addBalance(studentToAddBalance);
      } else {
        console.log("Student not found with the given ID.");
      }
      break;
    case "Show Students":
      showStudents();
      break;
    case "Show Status":
      const { studentId: showStatusStudentId } = await inquirer.prompt([
        {
          type: "input",
          name: "studentId",
          message: "Enter student ID",
        },
      ]);
      const showStatusOfStudend = studentInfo.find(
        (student) => student.studentId === showStatusStudentId
      );
      if (showStatusOfStudend) {
        await showStatus(showStatusOfStudend);
      } else {
        console.log("Student not found with the given ID.");
      }
      break;
    case "Exit":
      return;
  }

  await main();
};

main();