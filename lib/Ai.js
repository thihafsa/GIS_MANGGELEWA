const Groq = require('groq-sdk');

const groq = new Groq({
    apiKey: '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'
});

module.exports = async function Groqs({
    nama_instansi = '',
    kepala = '',
    fasilitas = '',
    layanan = '',
    alamat = '',
    jam_buka = '',
    jam_tutup = ''
} = {}) {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: "Kamu adalah seorang Bot pintar berbahasa Indonesia yang dibuat oleh Muh. Deni Setiawan" },
                {
                    role: "user",
                    content: `Buatkan deskripsi singkat tentang ${nama_instansi}, ${kepala}, ${fasilitas}, ${layanan}, ${alamat}, ${jam_buka}, ${jam_tutup}. Jawab dengan diawali ${nama_instansi} adalah`
                },
            ],
            model: "llama3-8b-8192",
            temperature: 0.5,
            max_tokens: 1024,
            top_p: 1,
            stop: null,
            stream: false,
        });

        const response = chatCompletion.choices[0]?.message?.content || "";
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
