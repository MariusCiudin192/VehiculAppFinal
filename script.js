document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.pass-button, .fail-button').forEach(button => {
        button.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.querySelectorAll('button').forEach(btn => btn.classList.remove('selected-pass', 'selected-fail'));
            this.classList.add(this.classList.contains('pass-button') ? 'selected-pass' : 'selected-fail');
        });
    });

    document.getElementById('generateReportBtn').addEventListener('click', () => {
        const driver = document.getElementById('driver').value;
        const vehicle = document.getElementById('vehicle').value;
        const notes = document.getElementById('notes').value;
        let checklistStatus = '';
        document.querySelectorAll('.check-item').forEach(item => {
            const name = item.querySelector('span').textContent;
            const status = item.querySelector('.selected-pass') ? 'Pass' : (item.querySelector('.selected-fail') ? 'Fail' : 'Not Checked');
            checklistStatus += `- ${name}: ${status}\n`;
        });

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("Vehicle Check Report", 20, 20);
        doc.text(`Driver: ${driver}`, 20, 30);
        doc.text(`Vehicle: ${vehicle}`, 20, 40);
        doc.text(checklistStatus, 20, 60);
        doc.save('Report.pdf');

        const email = '24156112@ardenuniversity.ac.uk';
        const subject = 'Vehicle Check Report';
        const body = `Driver: ${driver}\nVehicle: ${vehicle}\n\n${checklistStatus}\nNotes: ${notes}`;
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
});
