import jsPDF from "jspdf";
import Logo from '../Assets/LOGO.png';
import 'jspdf-autotable';

const generatePDF = (data) => {
  const doc = new jsPDF();

  doc.setProperties({
    title: "Symptom Report",
    author: "SafeGuard",
    keywords: "symptom report",
  });

  doc.setFontSize(12);

  doc.addImage(Logo, "PNG", 10, 10, 30, 30);
  doc.text("SAFEGUARD", doc.internal.pageSize.width - 50, 25, null, null, "right");

  const currentDate = new Date().toLocaleString();
  doc.text(`Date Printed: ${currentDate}`, doc.internal.pageSize.width - 10, 45, null, null, "right");

  doc.setFontSize(16);
  doc.text("Symptom Report", 10, 60);

  const tableHeader = ["Date Sent", "Teacher", "Student"];
  const tableRows = [];

  data.forEach((item, index) => {
    const { createdAt, teacher, studentName } = item;
    const row = [new Date(createdAt).toLocaleDateString(), `${teacher.firstname} ${teacher.lastname}`, studentName];
    tableRows.push(row);
  });

  doc.autoTable({
    head: [tableHeader],
    body: tableRows,
    startY: 80,
  });

  doc.setFontSize(12);


  doc.setFontSize(8);
  doc.text("Kigali,Ewanda P.O BOX ", 10, doc.internal.pageSize.height - 10);

  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.text(10, doc.internal.pageSize.height - 10, `Page ${i} of ${totalPages}`);
    doc.text(10, doc.internal.pageSize.height - 5, "This report was automatically generated.");
  }

  doc.save("symptom_report.pdf");
};

export default generatePDF;