import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();

	return (
		<div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
			<h1>Hoş Geldiniz</h1>
			<p>Bu, Öğretmen Bilgi Sistemi'nin Ana Sayfasıdır.</p>
			<button onClick={() => navigate('/gradeList')} style={{ padding: "10px 20px", marginTop: "20px" }}>
				Notları Listele
			</button>
		</div>
	);
};

export default Home;
