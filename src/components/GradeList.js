import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./GradeList.css";

function GradesList() {
	const [grades, setGrades] = useState([]);

	useEffect(() => {
		fetchGrades();
	}, []);

	const fetchGrades = async () => {
		try {
			const response = await fetch("http://localhost:8080/grades");
			if (!response.ok) {
				throw new Error("Veri çekilemedi");
			}
			const gradesData = await response.json();
			const gradesWithNames = gradesData.map((grade) => ({
				...grade,
				studentName: `${grade.firstName} ${grade.lastName}`,
				gradeId: grade.grade_id 
			}));
			setGrades(gradesWithNames);
		} catch (error) {
			console.error("Bir hata oluştu: ", error);
		}
	};

	const handleDelete = async (id) => {
		if (window.confirm("Notu silmek istediğinize emin misiniz?")) {
			try {
				const response = await fetch(`http://localhost:8080/grades/${id}`, {
					method: "DELETE",
				});

				if (!response.ok) {
					throw new Error("Silme işlemi başarısız");
				}
				fetchGrades(); // Listeyi güncelle
			} catch (error) {
				console.error("Silme işlemi sırasında bir hata oluştu: ", error);
			}
		}
	};

	const handleUpdate = async (grade) => {
		const newGrade = prompt("Yeni notu giriniz:", grade.grade);
		if (newGrade != null && newGrade !== "") {
			const gradeData = {
				gradeId: grade.grade_id, // Bu alanı doğru şekilde kullanıyoruz
				grade: parseInt(newGrade, 10), // Notu integer'a çeviriyoruz
				studentId: grade.studentId,
				courseId: grade.courseId,
			};

			try {
				const response = await fetch(
					`http://localhost:8080/grades/${gradeData.gradeId}`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(gradeData),
					}
				);

				if (!response.ok) {
					throw new Error("Not güncellenemedi.");
				}
				fetchGrades();
			} catch (error) {
				console.error(
					"Güncelleme işlemi sırasında bir hata oluştu: ",
					error
				);
			}
		}
	};

	return (
		<div className="table-container">
			<h2>Not Listesi</h2>
			<table>
				<thead>
					<tr>
						<th>Öğrenci Adı</th>
						<th>Not</th>
						<th>İşlemler</th>
					</tr>
				</thead>
				<tbody>
					{grades.map((grade) => (
						<tr key={grade.gradeId}>
							{" "}
							{/* Unique key olarak gradeId kullanıyoruz */}
							<td>{grade.studentName}</td>
							<td>{grade.grade}</td>
							<td>
								<button
									className="button update-button"
									onClick={() => handleUpdate(grade)}
								>
									<EditOutlined className="icon" />
									Güncelle
								</button>
								<button
									className="button delete-button"
									onClick={() => handleDelete(grade.gradeId)}
								>
									<DeleteOutlined className="icon" />
									Sil
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default GradesList;
