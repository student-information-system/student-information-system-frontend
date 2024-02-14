import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(""); 
	const navigate = useNavigate(); 

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:8080/teacher-auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			if (response.ok) {
				navigate('/home');
			} else {
				const errorText = await response.text(); 
				setErrorMessage("Giriş başarısız. Kullanıcı adı veya şifre hatalı.");
			}
		} catch (error) {
			setErrorMessage("Bir hata oluştu. Lütfen tekrar deneyin."); 
		}
	};

	return (
		<div
			style={{
				maxWidth: "300px",
				margin: "150px auto",
				padding: "20px",
				textAlign: "center",
				display: "block",
			}}
		>
			<h2>Öğretmen Girişi</h2>
			<form onSubmit={handleLogin}>
				<div>
					<input
						type="email"
						placeholder="E-posta adresi"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						style={{
							padding: "10px",
							marginBottom: "10px",
							width: "100%",
						}}
					/>
				</div>
				<div>
					<input
						type="password"
						placeholder="Şifre"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						style={{
							padding: "10px",
							marginBottom: "20px",
							width: "100%",
						}}
					/>
				</div>
				<button onClick={handleLogin} style={{ padding: "10px 20px" }}>
					Giriş Yap
				</button>
			</form>
		</div>
	);
};

export default Login;
