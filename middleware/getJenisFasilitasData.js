const JenisFasilitas = require('../models/JenisFasilitas');
const Fasilitas = require('../models/Fasilitas');

async function getJenisFasilitasData(req) {
    try {
        // Ambil jenisFasilitasList dari database
        const jenisFasilitasList = await JenisFasilitas.findAll();

        // Membuat array untuk menyimpan jumlah fasilitas tiap jenis
        const jenisFasilitasData = await Promise.all(jenisFasilitasList.map(async (jenisFasilitas) => {
            // Mengambil jumlah fasilitas dari jenis fasilitas saat ini
            const countFasilitas = await Fasilitas.count({
                where: {
                    idjenis: jenisFasilitas.id
                }
            });

            return {
                id: jenisFasilitas.id,
                nama: jenisFasilitas.nama,
                iconUrl: `${req.protocol}://${req.get('host')}/icons/${jenisFasilitas.icon}`,
                jumlahFasilitas: countFasilitas,
            };
        }));

        return jenisFasilitasData;
    } catch (error) {
        throw new Error('Gagal mengambil data jenis fasilitas');
    }
}

async function getListFasilitasData(jenisFasilitas) {
    try {
        const jenisFasilitasData = await JenisFasilitas.findOne({
            where: {
                nama: jenisFasilitas
            } // Sesuaikan dengan cara Anda untuk mencocokkan jenis fasilitas
        });

        if (!jenisFasilitasData) {
            throw new Error('Jenis fasilitas tidak ditemukan');
        }

        return jenisFasilitasData.list_fasilitas.split(',').map(fasilitas => fasilitas.trim());
    } catch (error) {
        console.error('Error mengambil jenis fasilitas:', error.message);
        return []; // Atau sesuaikan dengan respons error yang sesuai
    }
}

async function getFasilitasByJenisId(idjenis) {
    try {
        const fasilitasData = await Fasilitas.findAll({
            where: {
                idjenis: idjenis
            },
            include: [{
                model: JenisFasilitas,
                attributes: ['nama']
            }]
        });
        return fasilitasData;
    } catch (error) {
        console.error('Error fetching fasilitas by jenis id:', error);
        throw new Error('Could not fetch fasilitas data');
    }
}

module.exports = {
    getJenisFasilitasData,
    getListFasilitasData,
    getFasilitasByJenisId
};