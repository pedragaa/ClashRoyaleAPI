import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(cors());

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImE2ODE3MzI3LTY2OWYtNDdjYi1hZjM4LTUyZGMwYzA5ODMzMiIsImlhdCI6MTc0Mzg2NTQ1Miwic3ViIjoiZGV2ZWxvcGVyL2YxNDE1MDQ2LWRjMWUtYjc4Zi1kYjRhLTllOThlZmFkNjA2NiIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxOTEuMTgzLjE4Ny4yMjUiXSwidHlwZSI6ImNsaWVudCJ9XX0.6OHj0FxS2L_FIzz_ht4U2sEAPKefPKDY2UkiTa928smJJ5D_IjyfoUFN1rltHuNlbhMfdkjHP1bwwV7MhbNe1g';

app.get('/cartas', async (req, res) => {
    try {
        const response = await axios.get('https://api.clashroyale.com/v1/cards', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Dados da API:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Erro no servidor:', error.message);
        res.status(500).json({ erro: 'Erro ao buscar cartas' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
