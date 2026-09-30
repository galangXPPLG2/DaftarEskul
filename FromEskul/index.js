let DataSiswa = [];

function InputData() {

    let nama = document.getElementById("Nama").value.trim();
    let kelas = document.querySelector('input[name="kelas"]:checked');
    let jurusan = document.getElementById("Jurusan").value;
    let eskul = document.getElementById("Eskul").value;

    if (nama === "") {

        Swal.fire({
            title: "Peringatan",
            text: "Nama belum diisi!",
            icon: "warning",
            confirmButtonText: "OK"
        });

        return;
    }

    else if (!kelas) {

        Swal.fire({
            title: "Peringatan",
            text: "Silakan pilih kelas!",
            icon: "warning",
            confirmButtonText: "OK"
        });

        return;
    }

    else if (jurusan === "") {
        Swal.fire({
            title: "Peringatan",
            text: "Silakan pilih jurusan!",
            icon: "warning",
            confirmButtonText: "OK"
        });
        return;
    }

    else if (eskul === "") {

        Swal.fire({
            title: "Peringatan",
            text: "Silakan pilih ekstrakurikuler!",
            icon: "warning",
            confirmButtonText: "OK"
        });

        return;
    }

    DataSiswa.push({
        nama: nama,
        kelas: kelas.value,
        jurusan: jurusan,
        eskul: eskul
    });

    TampilkanData();

    Swal.fire({
        title: "Berhasil",
        text: `Nama ${nama} berhasil di tambahkan`,
        icon: "success",
        confirmButtonText: "Confirm"
    });


    document.getElementById("Nama").value = "";

    document.querySelectorAll(
        'input[name="kelas"]'
    ).forEach(radio => {
        radio.checked = false;
    });

    document.getElementById("Jurusan").selectedIndex = 0;
    document.getElementById("Eskul").selectedIndex = 0;
}


function TampilkanData() {

    let tabel = document.getElementById("tabelData");

    tabel.innerHTML = `
        <table id="tableSiswa" border="1">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Kelas</th>
                    <th>Jurusan</th>
                    <th>Ekskul</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody id="isiTabel"></tbody>
        </table>
    `;

    let isiTabel = document.getElementById("isiTabel");
    DataSiswa.forEach((data, index) => {
        isiTabel.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${data.nama}</td>
                <td>${data.kelas}</td>
                <td>${data.jurusan}</td>
                <td>${data.eskul}</td>
                <td>
                    <button
                        type="button"
                        onclick="EditData(${index})">
                        Edit
                    </button>
                    <button
                        type="button"
                        onclick="DeleteData(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function EditData(index) {

    let data = DataSiswa[index];

    document.getElementById("Nama").value = data.nama;

    document.querySelectorAll(
        'input[name="kelas"]'
    ).forEach(radio => {
        radio.checked = radio.value === data.kelas;
    });

    document.getElementById("Jurusan").value = data.jurusan;
    document.getElementById("Eskul").value = data.eskul;

    DataSiswa.splice(index, 1);
    TampilkanData();

    Swal.fire({
        title: "Edit Data",
        text: "Data sudah masuk kembali ke form",
        icon: "info",
        confirmButtonText: "Confirm"
    });
}



function DeleteData(index) {

    let nama = DataSiswa[index].nama;

    Swal.fire({
        title: "Hapus Data?",
        text: `Data ${nama} akan dihapus`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal"

    }).then((result) => {

        if (result.isConfirmed) {
            DataSiswa.splice(index, 1);
            TampilkanData();
            Swal.fire({
                title: "Berhasil",
                text: `Data ${nama} berhasil di hapus`,
                icon: "success",
                confirmButtonText: "Confirm"
            });

        }

    });

}

