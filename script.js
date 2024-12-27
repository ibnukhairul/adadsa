const sheetAppUrl = "https://script.google.com/macros/s/AKfycbxl0IcWXudq_kDAA5i-_26V_tCKlHHapn2XYEq_0soveImZ3ire16B6DZo9CXuV5HOihA/exec";  // Ganti dengan URL Web App kamu

// Fungsi untuk menampilkan data di tabel
function displayData() {
    const sheetId = "1j2NIOFD5-4OFgY6wqklXPakploHxeN5coEg_Slxso6Q";  // Ganti dengan ID Google Sheets
    const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

    fetch(sheetURL)
        .then(response => response.text())
        .then(csv => {
            const rows = csv.split("\n").slice(1);  // Skip header
            const tableBody = document.querySelector("#data-table tbody");

            rows.forEach(row => {
                const cells = row.split(",");
                const tr = document.createElement("tr");

                cells.forEach(cell => {
                    const td = document.createElement("td");
                    td.textContent = cell.trim();
                    tr.appendChild(td);
                });

                tableBody.appendChild(tr);
            });
        })
        .catch(error => {
            console.log("Error: ", error);
        });
}

// Fungsi untuk menangani form submission
document.getElementById("product-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Mencegah reload halaman

    const formData = new FormData(event.target);
    const data = {
        id: formData.get("id"),
        nama: formData.get("nama"),
        tanggal: formData.get("tanggal"),
        harga: formData.get("harga")
    };

    // Kirim data ke Google Apps Script Web App
    fetch(sheetAppUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log("Success:", result);
        displayData();  // Update tabel setelah data dikirim
    })
    .catch(error => {
        console.error("Error:", error);
    });
});

// Menampilkan data saat halaman pertama kali dimuat
displayData();
