document.getElementById('stages').addEventListener('click', e => {
        const btn = e.target.closest('.stage-pill');
        if (!btn) return;
        document.querySelectorAll('.stage-pill').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('panel-' + btn.dataset.panel).classList.add('active');
    });
