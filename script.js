// script.js - VERSIÓN FINAL (DISEÑO CENTRADO Y LINEAL)

let contadores = {
    experiencias: 0,
    formacion: 0,
    cursos: 0,
    idiomas: 0,
    habilidades: 0
};
let fotoBase64 = ""; 

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    // Agregar campos vacíos al inicio
    agregarExperiencia();
    agregarFormacion();
    
    // Configurar listeners
    const inputImport = document.getElementById('import-json');
    if(inputImport) inputImport.addEventListener('change', importarJSON);

    const inputFoto = document.getElementById('inputFoto');
    if(inputFoto) {
        inputFoto.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    fotoBase64 = event.target.result;
                    actualizarVistaFoto();
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

function actualizarVistaFoto() {
    const preview = document.getElementById('img-preview');
    const placeholder = document.getElementById('img-placeholder');
    if(fotoBase64) {
        preview.src = fotoBase64;
        preview.style.display = 'block';
        if(placeholder) placeholder.style.display = 'none';
    } else {
        preview.style.display = 'none';
        if(placeholder) placeholder.style.display = 'block';
    }
}

// --- FUNCIONES PARA AGREGAR CAMPOS (DOM) ---

function agregarExperiencia() {
    const id = contadores.experiencias++;
    const html = `
    <div class="dynamic-item" id="exp-${id}">
        <div class="text-right"><button class="btn-remove" onclick="eliminar('exp-${id}')">×</button></div>
        <div class="grid-2">
            <div><label>Empresa</label><input type="text" class="form-control exp-empresa"></div>
            <div><label>Cargo</label><input type="text" class="form-control exp-cargo"></div>
            <div><label>Inicio</label><input type="text" class="form-control exp-inicio" placeholder="Ej: Ene 2022"></div>
            <div><label>Fin</label><input type="text" class="form-control exp-fin" placeholder="Ej: Actualidad"></div>
        </div>
        <div class="mt-2"><label>Ubicación</label><input type="text" class="form-control exp-ubicacion"></div>
        <div class="mt-2"><label>Descripción</label><textarea class="form-control exp-desc" rows="2"></textarea></div>
    </div>`;
    document.getElementById('experiencias-container').insertAdjacentHTML('beforeend', html);
}

function agregarFormacion() {
    const id = contadores.formacion++;
    const html = `
    <div class="dynamic-item" id="edu-${id}">
        <div class="text-right"><button class="btn-remove" onclick="eliminar('edu-${id}')">×</button></div>
        <div class="grid-2">
            <div><label>Institución</label><input type="text" class="form-control edu-inst"></div>
            <div><label>Título</label><input type="text" class="form-control edu-titulo"></div>
            <div><label>Inicio</label><input type="text" class="form-control edu-inicio"></div>
            <div><label>Fin</label><input type="text" class="form-control edu-fin"></div>
        </div>
        <div class="mt-2"><label>Ubicación</label><input type="text" class="form-control edu-ubicacion"></div>
    </div>`;
    document.getElementById('formacion-container').insertAdjacentHTML('beforeend', html);
}

function agregarCurso() {
    const id = contadores.cursos++;
    const html = `
    <div class="dynamic-item flex-row" id="cur-${id}">
        <input type="text" class="form-control cur-nombre" placeholder="Nombre Curso" style="flex:2">
        <input type="text" class="form-control cur-plat" placeholder="Plataforma" style="flex:1">
        <input type="text" class="form-control cur-anio" placeholder="Año" style="width:80px">
        <button class="btn-remove" onclick="eliminar('cur-${id}')">×</button>
    </div>`;
    document.getElementById('cursos-container').insertAdjacentHTML('beforeend', html);
}

function agregarIdioma() {
    const id = contadores.idiomas++;
    const html = `
    <div class="dynamic-item flex-row" id="lang-${id}">
        <input type="text" class="form-control lang-nombre" placeholder="Idioma" style="flex: 2;">
        
        <select class="form-control lang-nivel" style="flex: 1;">
            <option value="">Nivel</option>
            <option value="Básico">Básico</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
            <option value="Nativo">Nativo</option>
        </select>

        <select class="form-control lang-cefr" style="flex: 1;">
            <option value="">Grado</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
        </select>

        <button class="btn-remove" onclick="eliminar('lang-${id}')">×</button>
    </div>`;
    document.getElementById('idiomas-container').insertAdjacentHTML('beforeend', html);
}

function agregarHabilidad() {
    const id = contadores.habilidades++;
    const html = `
    <div class="skill-tag" id="skill-${id}">
        <input type="text" class="skill-nombre" placeholder="Habilidad">
        <button onclick="eliminar('skill-${id}')">×</button>
    </div>`;
    document.getElementById('habilidades-container').insertAdjacentHTML('beforeend', html);
}

function eliminar(id) {
    const el = document.getElementById(id);
    if(el) el.remove();
}

// --- IMPORTAR JSON ---

function importarJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const datos = JSON.parse(e.target.result);
            
            // Limpiar
            document.getElementById('experiencias-container').innerHTML = '';
            document.getElementById('formacion-container').innerHTML = '';
            document.getElementById('cursos-container').innerHTML = '';
            document.getElementById('idiomas-container').innerHTML = '';
            document.getElementById('habilidades-container').innerHTML = '';

            // Info Personal
            if(datos.informacionPersonal) {
                const info = datos.informacionPersonal;
                setValue('nombre', info.nombre);
                setValue('telefono', info.telefono);
                setValue('email', info.email);
                setValue('linkedin', info.linkedin);
                setValue('ubicacion', info.ubicacion);
                if(info.fotoBase64) {
                    fotoBase64 = info.fotoBase64;
                    actualizarVistaFoto();
                }
            }
            if(datos.objetivo) setValue('perfil', datos.objetivo);

            // Secciones
            (datos.experiencias || []).forEach(item => {
                agregarExperiencia();
                const el = document.getElementById('experiencias-container').lastElementChild;
                setVal(el, '.exp-empresa', item.empresa);
                setVal(el, '.exp-cargo', item.cargo);
                setVal(el, '.exp-inicio', item.fechaInicio);
                setVal(el, '.exp-fin', item.fechaFin);
                setVal(el, '.exp-ubicacion', item.ubicacion);
                setVal(el, '.exp-desc', item.descripcion);
            });

            (datos.formacion || []).forEach(item => {
                agregarFormacion();
                const el = document.getElementById('formacion-container').lastElementChild;
                setVal(el, '.edu-inst', item.institucion);
                setVal(el, '.edu-titulo', item.titulo);
                setVal(el, '.edu-inicio', item.anioInicio);
                setVal(el, '.edu-fin', item.anioFin);
                setVal(el, '.edu-ubicacion', item.ubicacion);
            });

            (datos.cursos || []).forEach(item => {
                agregarCurso();
                const el = document.getElementById('cursos-container').lastElementChild;
                setVal(el, '.cur-nombre', item.nombre);
                setVal(el, '.cur-plat', item.plataforma);
                setVal(el, '.cur-anio', item.anio);
            });

            (datos.idiomas || []).forEach(item => {
                agregarIdioma();
                const el = document.getElementById('idiomas-container').lastElementChild;
                setVal(el, '.lang-nombre', item.nombre);
                setVal(el, '.lang-nivel', item.nivelGeneral);
                setVal(el, '.lang-cefr', item.nivelCEFR);
            });

            (datos.habilidades || []).forEach(item => {
                agregarHabilidad();
                const el = document.getElementById('habilidades-container').lastElementChild;
                setVal(el, '.skill-nombre', item.nombre);
            });

            alert("Datos cargados correctamente.");

        } catch (err) {
            console.error(err);
            alert("Error al leer el JSON.");
        }
    };
    reader.readAsText(file);
}

// --- EXPORTAR JSON ---

function exportarJSON() {
    const datos = {
        informacionPersonal: {
            nombre: getValue('nombre'),
            telefono: getValue('telefono'),
            email: getValue('email'),
            linkedin: getValue('linkedin'),
            ubicacion: getValue('ubicacion'),
            fotoBase64: fotoBase64
        },
        objetivo: getValue('perfil'),
        experiencias: [],
        formacion: [],
        cursos: [],
        idiomas: [],
        habilidades: []
    };

    // Recolectores
    document.querySelectorAll('#experiencias-container .dynamic-item').forEach(el => {
        datos.experiencias.push({
            empresa: el.querySelector('.exp-empresa').value,
            cargo: el.querySelector('.exp-cargo').value,
            fechaInicio: el.querySelector('.exp-inicio').value,
            fechaFin: el.querySelector('.exp-fin').value,
            ubicacion: el.querySelector('.exp-ubicacion').value,
            descripcion: el.querySelector('.exp-desc').value
        });
    });

    document.querySelectorAll('#formacion-container .dynamic-item').forEach(el => {
        datos.formacion.push({
            institucion: el.querySelector('.edu-inst').value,
            titulo: el.querySelector('.edu-titulo').value,
            anioInicio: el.querySelector('.edu-inicio').value,
            anioFin: el.querySelector('.edu-fin').value,
            ubicacion: el.querySelector('.edu-ubicacion').value
        });
    });

    document.querySelectorAll('#cursos-container .dynamic-item').forEach(el => {
        datos.cursos.push({
            nombre: el.querySelector('.cur-nombre').value,
            plataforma: el.querySelector('.cur-plat').value,
            anio: el.querySelector('.cur-anio').value
        });
    });

    document.querySelectorAll('#idiomas-container .dynamic-item').forEach(el => {
        datos.idiomas.push({
            nombre: el.querySelector('.lang-nombre').value,
            nivelGeneral: el.querySelector('.lang-nivel').value,
            nivelCEFR: el.querySelector('.lang-cefr').value
        });
    });

    document.querySelectorAll('#habilidades-container .skill-tag').forEach(el => {
        datos.habilidades.push({
            nombre: el.querySelector('.skill-nombre').value
        });
    });

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(datos, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = "mi_cv.json";
    a.click();
}

// --- GENERAR HTML Y PDF (DISEÑO CENTRADO Y LINEAL) ---

function generarHTMLCV() {
    const d = {
        nombre: getValue('nombre'),
        perfil: getValue('perfil'),
        email: getValue('email'),
        telefono: getValue('telefono'),
        ubicacion: getValue('ubicacion'),
        linkedin: getValue('linkedin')
    };

    // ESTILOS MODIFICADOS PARA DISEÑO CENTRADO Y LINEAL
    const css = `
        <style>
            .cv-body { 
                font-family: 'Helvetica', sans-serif; 
                color: #333; 
                line-height: 1.6; 
                padding: 40px; 
                background: white; 
                width: 100%; 
                height: 100%; 
                box-sizing: border-box; 
            }
            /* HEADER CENTRADO */
            .cv-header { 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                text-align: center;
                border-bottom: 2px solid #2c3e50; 
                padding-bottom: 25px; 
                margin-bottom: 25px; 
            }
            .cv-photo { 
                width: 130px; 
                height: 130px; 
                border-radius: 50%; 
                object-fit: cover; 
                border: 3px solid #eee; 
                margin-bottom: 15px; /* Separación de la foto al nombre */
            }
            .cv-name { 
                margin: 0; 
                font-size: 28px; 
                text-transform: uppercase; 
                color: #2c3e50; 
                font-weight: 800; 
                letter-spacing: 1px;
            }
            .cv-info { 
                font-size: 14px; 
                color: #555; 
                margin-top: 8px; 
            }
            
            /* TÍTULOS DE SECCIÓN */
            .cv-sec-title { 
                background: #f4f6f8; 
                color: #2c3e50; 
                font-size: 16px; 
                text-transform: uppercase; 
                font-weight: bold; 
                padding: 8px 15px; 
                border-left: 5px solid #2c3e50; 
                margin: 25px 0 15px 0; 
                /* Asegura que el título ocupe todo el ancho y limpie flotados anteriores */
                width: 100%;
                box-sizing: border-box;
            }

            .cv-item { margin-bottom: 15px; page-break-inside: avoid; }
            .cv-row { display: flex; justify-content: space-between; font-weight: bold; font-size: 14px; }
            .cv-sub { font-style: italic; color: #555; font-size: 13px; margin-bottom: 5px; }
            .cv-desc { font-size: 13px; text-align: justify; white-space: pre-wrap; color: #444; }
            
            .cv-tags { display: flex; flex-wrap: wrap; gap: 8px; }
            .cv-tag { background: #eef; padding: 4px 10px; border-radius: 4px; font-size: 12px; border: 1px solid #dde; }
            
            ul { margin: 0; padding-left: 20px; font-size: 13px; }
            li { margin-bottom: 3px; }
        </style>
    `;

    let html = `<div class="cv-body">${css}`;

    // HEADER (Estructura modificada para columna)
    html += `<div class="cv-header">`;
    if(fotoBase64) html += `<img src="${fotoBase64}" class="cv-photo">`;
    html += `
        <h1 class="cv-name">${d.nombre || 'Nombre Apellido'}</h1>
        <div class="cv-info">
            ${d.email} ${d.telefono ? ` | ${d.telefono}` : ''} <br>
            ${d.ubicacion} ${d.linkedin ? ` | ${d.linkedin}` : ''}
        </div>
    </div>`;

    if(d.perfil) html += `<div class="cv-sec-title">Perfil Profesional</div><div class="cv-desc">${d.perfil}</div>`;

    // Experiencia
    let hasExp = false;
    let expHTML = `<div class="cv-sec-title">Experiencia Laboral</div>`;
    document.querySelectorAll('#experiencias-container .dynamic-item').forEach(el => {
        const emp = el.querySelector('.exp-empresa').value;
        const car = el.querySelector('.exp-cargo').value;
        const ini = el.querySelector('.exp-inicio').value;
        const fin = el.querySelector('.exp-fin').value;
        const loc = el.querySelector('.exp-ubicacion').value;
        const desc = el.querySelector('.exp-desc').value;

        if(emp || car) {
            hasExp = true;
            expHTML += `
                <div class="cv-item">
                    <div class="cv-row"><span>${car}</span><span>${ini} - ${fin}</span></div>
                    <div class="cv-sub">${emp} ${loc ? `| ${loc}` : ''}</div>
                    <div class="cv-desc">${desc}</div>
                </div>`;
        }
    });
    if(hasExp) html += expHTML;

    // Formación
    let hasEdu = false;
    let eduHTML = `<div class="cv-sec-title">Formación Académica</div>`;
    document.querySelectorAll('#formacion-container .dynamic-item').forEach(el => {
        const inst = el.querySelector('.edu-inst').value;
        const tit = el.querySelector('.edu-titulo').value;
        const ini = el.querySelector('.edu-inicio').value;
        const fin = el.querySelector('.edu-fin').value;
        const loc = el.querySelector('.edu-ubicacion').value;

        if(inst || tit) {
            hasEdu = true;
            eduHTML += `
                <div class="cv-item">
                    <div class="cv-row"><span>${tit}</span><span>${ini} - ${fin}</span></div>
                    <div class="cv-sub">${inst} ${loc ? `| ${loc}` : ''}</div>
                </div>`;
        }
    });
    if(hasEdu) html += eduHTML;

    // Cursos
    let hasCur = false;
    let curHTML = `<div class="cv-sec-title">Cursos y Certificaciones</div>`;
    document.querySelectorAll('#cursos-container .dynamic-item').forEach(el => {
        const nom = el.querySelector('.cur-nombre').value;
        const plat = el.querySelector('.cur-plat').value;
        const anio = el.querySelector('.cur-anio').value;
        if(nom) {
            hasCur = true;
            curHTML += `<div class="cv-item">• <strong>${nom}</strong> - ${plat} (${anio})</div>`;
        }
    });
    if(hasCur) html += curHTML;

    // Idiomas (LINEAR - Uno debajo de otro)
    const langs = [];
    document.querySelectorAll('#idiomas-container .dynamic-item').forEach(el => {
        const n = el.querySelector('.lang-nombre').value;
        const l = el.querySelector('.lang-nivel').value;
        const c = el.querySelector('.lang-cefr').value;
        
        let nivelTexto = l;
        if(c) nivelTexto += ` (${c})`; 
        
        if(n) langs.push({n, nivelTexto});
    });

    if(langs.length > 0) {
        html += `<div class="cv-sec-title">Idiomas</div>`;
        html += `<ul>`;
        langs.forEach(e => html += `<li><strong>${e.n}:</strong> ${e.nivelTexto}</li>`);
        html += `</ul>`;
    }
    
    // Habilidades (LINEAR - Uno debajo de otro, o tags, pero ocupando el ancho completo)
    const skills = [];
    document.querySelectorAll('#habilidades-container .skill-tag').forEach(el => {
        const s = el.querySelector('.skill-nombre').value;
        if(s) skills.push(s);
    });

    if(skills.length > 0) {
        html += `<div class="cv-sec-title">Habilidades</div>`;
        html += `<div class="cv-tags">`;
        skills.forEach(e => html += `<span class="cv-tag">${e}</span>`);
        html += `</div>`;
    }

    html += `</div>`;
    return html;
}

// --- VISUALIZACIÓN Y DESCARGA ---

function abrirPreviewCV() {
    const html = generarHTMLCV();
    document.getElementById('cv-preview-area').innerHTML = html;
    document.getElementById('previewModal').style.display = 'flex';
}

function cerrarPreviewModal() {
    document.getElementById('previewModal').style.display = 'none';
}

function confirmarGenerarPDF() {
    const btn = document.querySelector('#previewModal .btn-primary');
    const textoOriginal = btn.innerText;
    btn.innerText = "⏳ Generando PDF...";
    btn.disabled = true;

    const element = document.getElementById('cv-preview-area');
    const nombre = getValue('nombre') || 'CV';
    
    const opt = {
        margin: [0, 0, 0, 0],
        filename: `CV_${nombre.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    setTimeout(() => {
        html2pdf().set(opt).from(element).save()
            .then(() => { btn.innerText = textoOriginal; btn.disabled = false; })
            .catch(err => { 
                console.error(err); 
                alert("Error generando PDF"); 
                btn.innerText = textoOriginal; 
                btn.disabled = false; 
            });
    }, 500);
}

function limpiarFormulario() {
    if(confirm("¿Borrar todo?")) location.reload();
}

function getValue(id) { return document.getElementById(id) ? document.getElementById(id).value : ''; }
function setValue(id, val) { if(document.getElementById(id)) document.getElementById(id).value = val || ''; }
function setVal(parent, selector, val) { 
    const el = parent.querySelector(selector); 
    if(el) el.value = val || ''; 
}