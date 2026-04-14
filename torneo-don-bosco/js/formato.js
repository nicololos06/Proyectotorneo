class PredictorPerfecto {
    constructor() {
        this.seleccionados = { A: [], B: [], C: [], D: [] };
        this.ganadoresQF = {};
        this.ganadoresSF = {};
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadData();
    }

    bindEvents() {
        // Grupos
        document.querySelectorAll('input[data-equipo]').forEach(cb => {
            cb.addEventListener('change', e => this.grupoChange(e));
        });

        // Cuartos
        document.querySelectorAll('.qf-match .equipo-slot').forEach(slot => {
            slot.addEventListener('click', e => this.qfGanador(e.target.dataset.slot));
        });

        // Semis
        document.querySelectorAll('.sf-match .equipo-slot').forEach(slot => {
            slot.addEventListener('click', e => this.sfGanador(e.target.dataset.slot));
        });
    }

    grupoChange(e) {
        const grupo = e.target.dataset.equipo[0];
        const pos = e.target.dataset.equipo;
        const nombre = e.target.dataset.nombre;

        // MAX 2
        const count = document.querySelectorAll(`[data-grupo="${grupo}"] input:checked`).length;
        if (count > 2) {
            e.target.checked = false;
            return alert('¡Máximo 2 por grupo!');
        }

        // Actualizar
        if (e.target.checked) {
            this.seleccionados[grupo].push({pos, nombre});
        } else {
            this.seleccionados[grupo] = this.seleccionados[grupo].filter(x => x.pos !== pos);
        }

        this.seleccionados[grupo].sort((a, b) => a.pos.localeCompare(b.pos));
        this.updateGrupoUI(grupo);
        this.updateCuartos();
        this.save();
    }

    updateCuartos() {
        // ✅ CRUCES CORRECTOS
        // QF1: 1°A vs 2°B
        if (this.seleccionados.A[0]) document.querySelector('[data-slot="QF1_1A"]').textContent = this.seleccionados.A[0].nombre;
        if (this.seleccionados.B[1]) document.querySelector('[data-slot="QF1_2B"]').textContent = this.seleccionados.B[1].nombre;

        // QF2: 2°A vs 1°B
        if (this.seleccionados.A[1]) document.querySelector('[data-slot="QF2_2A"]').textContent = this.seleccionados.A[1].nombre;
        if (this.seleccionados.B[0]) document.querySelector('[data-slot="QF2_1B"]').textContent = this.seleccionados.B[0].nombre;

        // QF3: 1°C vs 2°D
        if (this.seleccionados.C[0]) document.querySelector('[data-slot="QF3_1C"]').textContent = this.seleccionados.C[0].nombre;
        if (this.seleccionados.D[1]) document.querySelector('[data-slot="QF3_2D"]').textContent = this.seleccionados.D[1].nombre;

        // QF4: 2°C vs 1°D
        if (this.seleccionados.C[1]) document.querySelector('[data-slot="QF4_2C"]').textContent = this.seleccionados.C[1].nombre;
        if (this.seleccionados.D[0]) document.querySelector('[data-slot="QF4_1D"]').textContent = this.seleccionados.D[0].nombre;

        // Mostrar cuartos
        const cuartosListos = document.querySelectorAll('.cuartos [data-slot]').length === 
                            Array.from(document.querySelectorAll('.cuartos [data-slot]'))
                            .filter(slot => slot.textContent).length;
        
        if (cuartosListos > 0) {
            document.querySelector('.cuartos').classList.remove('hidden');
        }
    }

    qfGanador(slot) {
        const equipo = document.querySelector(`[data-slot="${slot}"]`).textContent;
        if (!equipo) return;

        // Reset QF
        document.querySelectorAll('.cuartos .equipo-slot').forEach(s => s.classList.remove('ganador-slot'));
        document.querySelector(`[data-slot="${slot}"]`).classList.add('ganador-slot');

        this.ganadoresQF[slot] = equipo;
        this.updateSemis();
        this.save();
    }

    updateSemis() {
        // SF1: Ganador QF1 vs Ganador QF2
        const qf1 = document.querySelector('.cuartos [data-slot="QF1_1A"], [data-slot="QF1_2B"]').classList.contains('ganador-slot') ? 
                   document.querySelector('.qf-match[data-qf="1"] .ganador-slot').textContent : null;
        
        const qf2 = document.querySelector('.cuartos [data-slot="QF2_2A"], [data-slot="QF2_1B"]').classList.contains('ganador-slot') ? 
                   document.querySelector('.qf-match[data-qf="2"] .ganador-slot').textContent : null;

        if (qf1) document.querySelector('[data-slot="SF1_QF1"]').textContent = qf1;
        if (qf2) document.querySelector('[data-slot="SF1_QF2"]').textContent = qf2;

        // SF2: Ganador QF3 vs QF4
        const qf3 = document.querySelector('.qf-match[data-qf="3"] .ganador-slot')?.textContent;
        const qf4 = document.querySelector('.qf-match[data-qf="4"] .ganador-slot')?.textContent;

        if (qf3) document.querySelector('[data-slot="SF2_QF3"]').textContent = qf3;
        if (qf4) document.querySelector('[data-slot="SF2_QF4"]').textContent = qf4;

        document.querySelector('.semis').classList.remove('hidden');
    }

    sfGanador(slot) {
        const equipo = document.querySelector(`[data-slot="${slot}"]`).textContent;
        if (!equipo) return;

        // Reset SF
        document.querySelectorAll('.semis .equipo-slot').forEach(s => s.classList.remove('campeon'));
        document.querySelector(`[data-slot="${slot}"]`).classList.add('campeon');

        this.ganadoresSF[slot] = equipo;
        this.updateFinal();
        this.save();
    }

    updateFinal() {
        const sf1 = document.querySelector('.sf-match[data-sf="1"] .campeon')?.textContent;
        const sf2 = document.querySelector('.sf-match[data-sf="2"] .campeon')?.textContent;

        if (sf1) document.querySelector('[data-slot="FINAL_SF1"]').textContent = sf1;
        if (sf2) document.querySelector('[data-slot="FINAL_SF2"]').textContent = sf2;

        document.querySelector('.final').classList.remove('hidden');
    }

    updateGrupoUI(grupo) {
        const count = this.seleccionados[grupo].length;
        document.querySelector(`[data-grupo="${grupo}"] .clasificados`).textContent = `(Seleccionados: ${count}/2)`;
    }

    save() {
        localStorage.setItem('predictorV2', JSON.stringify({
            seleccionados: this.seleccionados,
            ganadoresQF: this.ganadoresQF,
            ganadoresSF: this.ganadoresSF
        }));
    }

    loadData() {
        const data = localStorage.getItem('predictorV2');
        if (data) {
            const parsed = JSON.parse(data);
            Object.assign(this.seleccionados, parsed.seleccionados || {});
            Object.assign(this.ganadoresQF, parsed.ganadoresQF || {});
            Object.assign(this.ganadoresSF, parsed.ganadoresSF || {});
            this.updateCuartos();
            this.updateSemis();
            this.updateFinal();
        }
    }
}

new PredictorPerfecto();