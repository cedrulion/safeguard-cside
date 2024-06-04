import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import Logo from '../Assets/LOGO.png';

const generatePDF = (data) => {
  const doc = new jsPDF();

  doc.setProperties({
    title: "Symptom Report",
    author: "SafeGuard",
    keywords: "symptom report",
  });

  doc.setFontSize(12);

  // Add logo and title to the header
  doc.addImage(Logo, "PNG", 10, 10, 30, 30);
  doc.text("SafeGuard", doc.internal.pageSize.width - 50, 25, null, null, "right");

  // Add current date and time
  const currentDate = new Date().toLocaleString();
  doc.text(`Date Printed: ${currentDate}`, doc.internal.pageSize.width - 10, 45, null, null, "right");

  // Add a title to the PDF
  doc.setFontSize(16);
  doc.text("Symptom Report", 10, 60);

  data.forEach((item, index) => {
    const { createdAt, teacherNames, studentName, ...questions } = item;
    console.log(item);
    // Add basic info
    doc.setFontSize(12);
    doc.text(`Report #${index + 1}`, 10, 75 + index * 120);
    doc.text(`Date Sent: ${new Date(createdAt).toLocaleDateString()}`, 10, 85 + index * 120);
    doc.text(`Teacher: ${teacherNames}`, 10, 95 + index * 120);
    doc.text(`Student: ${studentName}`, 10, 105 + index * 120);

    // Add questions and answers in a table format
    const tableHeader = ["Question", "Answer"];
    const tableRows = [];

    const questionsArray = [
      { name: "questionOne", question: "How often do they drink alcohol, including beer, wine, or liquor?" },
      { name: "questionTwo", question: "How many drinks containing alcohol do they have on a typical day when they are drinking?" },
      { name: "questionThree", question: "How often do they have six or more drinks on one occasion?" },
      { name: "questionFour", question: "How often during the last year have they found that they were not able to stop drinking once they had started?" },
      { name: "questionFive", question: "How often during the last year have they failed to do what was normally expected from them because of drinking?" },
      { name: "questionSix", question: "How often during the last year have they needed a first drink in the morning to get themselves going after a heavy drinking session?" },
      { name: "questionSeven", question: "How often during the last year have they had a feeling of guilt or remorse after drinking?" },
      { name: "questionEight", question: "How often during the last year have they been unable to remember what happened the night before because of their drinking?" },
      { name: "questionNine", question: "Have they or someone else been injured because of their drinking?" },
      { name: "questionTen", question: "Has a relative, friend, doctor, or another health worker been concerned about their drinking or suggested they cut down?" },
    ];

    questionsArray.forEach((q) => {
      tableRows.push([q.question, questions[q.name]]);
    });

    doc.autoTable({
      head: [tableHeader],
      body: tableRows,
      startY: 115 + index * 120,
    });
  });

  // Add footer with organization address and automatic report generation message
  doc.setFontSize(8);
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.text(`Page ${i} of ${totalPages}`, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10, null, null, "right");
    doc.text("SafeGuard Organization Address", 10, doc.internal.pageSize.height - 10);
    doc.text("This report was automatically generated.", 10, doc.internal.pageSize.height - 5);
  }

  doc.save("symptom_report.pdf");
};

export default generatePDF;
