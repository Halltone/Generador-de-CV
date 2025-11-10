// script.js

let contadorExperiencias = 0;
let contadorFormacion = 0;
let contadorCursos = 0;
let contadorIdiomas = 0;
let contadorHabilidades = 0;
let contadorSeccionesPersonalizadas = 0;
let tecnologias = [];

// --- Funciones de Adición y Eliminación de Items Predefinidos (SIN CAMBIOS) ---

function agregarExperiencia() {
    const container = document.getElementById('experiencias-container');
    const id = contadorExperiencias++;
    const html = `
        <div class="dynamic-item" id="exp-${id}">
            <button class="btn btn-remove" onclick="eliminarElemento('exp-${id}')">✖</button>
            <div class="form-group">
                <label>Empresa/Organización</label>
                <input type="text" class="exp-empresa" placeholder="Nombre de la empresa">
            </div>
            <div class="form-group">
                <label>Cargo</label>
                <input type="text" class="exp-cargo" placeholder="Tu cargo o posición">
            </div>
            <div class="row">
                <div class="form-group">
                    <label>Fecha Inicio</label>
                    <input type="text" class="exp-inicio" placeholder="Ej: Mayo 2022">
                </div>
                <div class="form-group">
                    <label>Fecha Fin</label>
                    <input type="text" class="exp-fin" placeholder="Ej: Presente">
                </div>
            </div>
            <div class="form-group">
                <label>Ubicación</label>
                <input type="text" class="exp-ubicacion" placeholder="Ciudad, Estado, País">
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea class="exp-descripcion" placeholder="Describe tus responsabilidades. Usa guiones (-) o viñetas para las tareas principales, separadas por nueva línea."></textarea>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function agregarFormacion() {
    const container = document.getElementById('formacion-container');
    const id = contadorFormacion++;
    const html = `
        <div class="dynamic-item" id="form-${id}">
            <button class="btn btn-remove" onclick="eliminarElemento('form-${id}')">✖</button>
            <div class="form-group">
                <label>Institución</label>
                <input type="text" class="form-institucion" placeholder="Nombre de la institución">
            </div>
            <div class="form-group">
                <label>Título/Grado</label>
                <input type="text" class="form-titulo" placeholder="Ej: Técnico en Programación">
            </div>
            <div class="row">
                <div class="form-group">
                    <label>Año Inicio</label>
                    <input type="text" class="form-inicio" placeholder="2020">
                </div>
                <div class="form-group">
                    <label>Año Fin</label>
                    <input type="text" class="form-fin" placeholder="2024">
                </div>
            </div>
            <div class="form-group">
                <label>Ubicación</label>
                <input type="text" class="form-ubicacion" placeholder="Ciudad, País">
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function agregarCurso() {
    const container = document.getElementById('cursos-container');
    const id = contadorCursos++;
    const html = `
        <div class="dynamic-item" id="curso-${id}">
            <button class="btn btn-remove" onclick="eliminarElemento('curso-${id}')">✖</button>
            <div class="form-group">
                <label>Nombre del Curso</label>
                <input type="text" class="curso-nombre" placeholder="Ej: Java y Spring Boot">
            </div>
            <div class="row">
                <div class="form-group">
                    <label>Plataforma/Institución</label>
                    <input type="text" class="curso-plataforma" placeholder="Ej: Oracle ONE, Alura">
                </div>
                <div class="form-group">
                    <label>Año</label>
                    <input type="text" class="curso-anio" placeholder="2024">
                </div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function agregarIdioma() {
    const container = document.getElementById('idiomas-container');
    const id = contadorIdiomas++;
    const html = `
        <div class="dynamic-item" id="idioma-${id}">
            <button class="btn btn-remove" onclick="eliminarElemento('idioma-${id}')">✖</button>
            <div class="form-group">
                <label>Idioma</label>
                <input type="text" class="idioma-nombre" placeholder="Ej: Español">
            </div>
            <div class="row">
                <div class="form-group">
                    <label>Nivel General</label>
                    <select class="idioma-nivel-general">
                        <option value="">Seleccione Nivel</option>
                        <option value="Básico">Básico</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                        <option value="Natividad">Nativo</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Nivel Marco Común Europeo (MCER)</label>
                    <select class="idioma-nivel-mcer">
                        <option value="">Seleccione MCER</option>
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="B1">B1</option>
                        <option value="B2">B2</option>
                        <option value="C1">C1</option>
                        <option value="C2">C2</option>
                    </select>
                </div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function agregarHabilidad() {
    const container = document.getElementById('habilidades-container');
    const id = contadorHabilidades++;
    const html = `
        <div class="dynamic-item" id="hab-${id}">
            <button class="btn btn-remove" onclick="eliminarElemento('hab-${id}')">✖</button>
            <div class="form-group">
                <label>Habilidad</label>
                <input type="text" class="hab-nombre" placeholder="Ej: Trabajo en equipo">
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function eliminarElemento(id) {
    document.getElementById(id).remove();
}

// --- Lógica de Recolección y Carga de Datos (JSON) (SIN CAMBIOS) ---

function recolectarDatos() {
    const datos = {
        informacionPersonal: {
            nombre: document.getElementById('nombre').value,
            telefono: document.getElementById('telefono').value,
            email: document.getElementById('email').value,
            linkedin: document.getElementById('linkedin').value
        },
        objetivo: document.getElementById('objetivo').value,
        experiencias: [],
        formacion: [],
        cursos: [],
        idiomas: [],
        habilidades: [],
        seccionesPersonalizadas: {}
    };

    // Recolectar experiencias
    document.querySelectorAll('#experiencias-container .dynamic-item').forEach(item => {
        datos.experiencias.push({
            empresa: item.querySelector('.exp-empresa').value,
            cargo: item.querySelector('.exp-cargo').value,
            fechaInicio: item.querySelector('.exp-inicio').value, 
            fechaFin: item.querySelector('.exp-fin').value,       
            ubicacion: item.querySelector('.exp-ubicacion').value,
            descripcion: item.querySelector('.exp-descripcion').value
        });
    });

    // Recolectar formación
    document.querySelectorAll('#formacion-container .dynamic-item').forEach(item => {
        datos.formacion.push({
            institucion: item.querySelector('.form-institucion').value,
            titulo: item.querySelector('.form-titulo').value,
            anioInicio: item.querySelector('.form-inicio').value, 
            anioFin: item.querySelector('.form-fin').value,       
            ubicacion: item.querySelector('.form-ubicacion').value
        });
    });

    // Recolectar cursos
    document.querySelectorAll('#cursos-container .dynamic-item').forEach(item => {
        datos.cursos.push({
            nombre: item.querySelector('.curso-nombre').value,
            plataforma: item.querySelector('.curso-plataforma').value,
            anio: item.querySelector('.curso-anio').value
        });
    });

    // Recolectar idiomas
    document.querySelectorAll('#idiomas-container .dynamic-item').forEach(item => {
        datos.idiomas.push({
            idioma: item.querySelector('.idioma-nombre').value,
            nivelGeneral: item.querySelector('.idioma-nivel-general').value, 
            nivelMCER: item.querySelector('.idioma-nivel-mcer').value       
        });
    });

    // Recolectar habilidades
    document.querySelectorAll('#habilidades-container .dynamic-item').forEach(item => {
        datos.habilidades.push({
            nombre: item.querySelector('.hab-nombre').value
        });
    });

    // Recolectar secciones personalizadas (SIN CAMBIOS)
    document.querySelectorAll('.seccion-personalizada').forEach(seccion => {
        const nombreSeccion = seccion.dataset.nombre;
        const addButton = seccion.querySelector('.btn-add');
        if (!addButton) return;
        
        const onClickAttr = addButton.getAttribute('onclick');
        const match = onClickAttr.match(/\[.*?\]/);
        
        let camposGuardados = [];
        if (match) {
            try {
                const camposString = match[0].replace(/&quot;/g, '"');
                camposGuardados = JSON.parse(camposString);
            } catch (e) {
                console.error('Error al parsear campos de la sección:', e);
            }
        }
        
        datos.seccionesPersonalizadas[nombreSeccion] = {
            campos: camposGuardados,
            items: []
        };
        
        seccion.querySelectorAll('.dynamic-item').forEach(item => {
            const campos = {};
            item.querySelectorAll('[data-campo]').forEach(campo => {
                campos[campo.dataset.campo] = campo.value;
            });
            datos.seccionesPersonalizadas[nombreSeccion].items.push(campos);
        });
    });

    return datos;
}


// Función de Carga de Datos (con la corrección de fechas de la versión anterior)
function cargarDatos(datos) {
    limpiarFormulario();

    if (datos.informacionPersonal) {
        document.getElementById('nombre').value = datos.informacionPersonal.nombre || '';
        document.getElementById('telefono').value = datos.informacionPersonal.telefono || '';
        document.getElementById('email').value = datos.informacionPersonal.email || '';
        document.getElementById('linkedin').value = datos.informacionPersonal.linkedin || '';
    }
    document.getElementById('objetivo').value = datos.objetivo || '';

    // --- FUNCIÓN AUXILIAR DE CARGA ---
    function cargarSeccionDinamica(datosArray, containerId, agregarFn, selectorClase) {
        const container = document.getElementById(containerId);
        datosArray.forEach((data) => {
            agregarFn();
            const items = container.querySelectorAll('.dynamic-item');
            const item = items[items.length - 1];
            if (item) {
                Object.keys(data).forEach(key => {
                    let input = null; 

                    // 1. CASOS ESPECIALES (FECHAS y DESCRIPCIÓN)
                    if (containerId === 'experiencias-container') {
                        if (key === 'fechaInicio') {
                            input = item.querySelector('.exp-inicio');
                        } else if (key === 'fechaFin') {
                            input = item.querySelector('.exp-fin');
                        } else if (key === 'descripcion') {
                            input = item.querySelector('.exp-descripcion');
                        }
                    } else if (containerId === 'formacion-container') {
                        if (key === 'anioInicio') {
                            input = item.querySelector('.form-inicio');
                        } else if (key === 'anioFin') {
                            input = item.querySelector('.form-fin');
                        }
                    }
                    
                    // 2. CASO GENÉRICO (si input aún es null)
                    if (!input) {
                        // Intenta el selector genérico: exp-empresa, form-institucion, curso-nombre, etc.
                        input = item.querySelector(`.${selectorClase}-${key.toLowerCase()}`);
                    }

                    // 3. ASIGNAR VALOR
                    if (input) {
                        input.value = data[key] || '';
                    }
                });
            }
        });
    }
    // --- FIN FUNCIÓN AUXILIAR DE CARGA ---

    document.getElementById('experiencias-container').innerHTML = '';
    if (datos.experiencias && Array.isArray(datos.experiencias)) {
        cargarSeccionDinamica(datos.experiencias, 'experiencias-container', agregarExperiencia, 'exp');
    }

    document.getElementById('formacion-container').innerHTML = '';
    if (datos.formacion && Array.isArray(datos.formacion)) {
        cargarSeccionDinamica(datos.formacion, 'formacion-container', agregarFormacion, 'form');
    }

    document.getElementById('cursos-container').innerHTML = '';
    if (datos.cursos && Array.isArray(datos.cursos)) {
        cargarSeccionDinamica(datos.cursos, 'cursos-container', agregarCurso, 'curso');
    }

    document.getElementById('idiomas-container').innerHTML = '';
    if (datos.idiomas && Array.isArray(datos.idiomas)) {
        // Lógica de carga específica para idiomas 
        datos.idiomas.forEach(idiomaData => {
            agregarIdioma();
            const items = document.getElementById('idiomas-container').querySelectorAll('.dynamic-item');
            const item = items[items.length - 1];
            if (item) {
                item.querySelector('.idioma-nombre').value = idiomaData.idioma || '';
                item.querySelector('.idioma-nivel-general').value = idiomaData.nivelGeneral || '';
                item.querySelector('.idioma-nivel-mcer').value = idiomaData.nivelMCER || '';
            }
        });
    }

    document.getElementById('habilidades-container').innerHTML = '';
    if (datos.habilidades && Array.isArray(datos.habilidades)) {
        cargarSeccionDinamica(datos.habilidades, 'habilidades-container', agregarHabilidad, 'hab');
    }

    // Carga de secciones personalizadas (SIN CAMBIOS)
    if (datos.seccionesPersonalizadas && typeof datos.seccionesPersonalizadas === 'object') {
        document.querySelectorAll('.seccion-personalizada').forEach(seccion => seccion.remove());
        Object.entries(datos.seccionesPersonalizadas).forEach(([nombreSeccion, seccionData]) => {
            
            if (seccionData && Array.isArray(seccionData.items)) { 
                const campos = seccionData.campos || (seccionData.items.length > 0 ? Object.keys(seccionData.items[0]) : []);
                const items = seccionData.items;

                crearSeccionPersonalizadaDesdeImportacion(nombreSeccion, campos, items);
            }
        });
    }
}
// Resto de funciones de carga y exportación (SIN CAMBIOS)

function exportarJSON() {
    const datos = recolectarDatos();
    const json = JSON.stringify(datos, null, 2);
    
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cv-datos.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('✅ Archivo JSON exportado exitosamente!');
}

function importarJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const datos = JSON.parse(e.target.result);
            console.log('JSON importado correctamente:', datos);
            cargarDatos(datos);
            alert('✅ Datos importados exitosamente!');
        } catch (error) {
            alert('❌ Error al leer el archivo JSON. Asegúrate de que sea un archivo válido.');
            console.error('Error al importar JSON:', error);
        }
    };
    reader.readAsText(file);
    
    event.target.value = '';
}

function crearSeccionPersonalizadaDesdeImportacion(nombreSeccion, campos, items) {
    const id = contadorSeccionesPersonalizadas++;
    const seccionId = `seccion-personalizada-${id}`;
    const cleanName = nombreSeccion.replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9-]/g, '');
    const containerId = `container-${cleanName}`;
    
    const camposString = JSON.stringify(campos).replace(/"/g, '&quot;'); 
    
    const seccionHtml = `
        <div class="cubicle seccion-personalizada" data-nombre="${nombreSeccion}" id="${seccionId}">
            <div class="section-header">
                <h2 class="section-title">${nombreSeccion}</h2>
                <div>
                    <button type="button" class="btn btn-add" onclick="agregarItemSeccionPersonalizada('${nombreSeccion}', ${camposString})">+ Agregar</button>
                    <button type="button" class="btn btn-remove" onclick="eliminarSeccionPersonalizada('${seccionId}')">Eliminar Sección</button>
                </div>
            </div>
            <div id="${containerId}"></div>
        </div>
    `;

    const botonAgregar = document.querySelector('.btn-add-section');
    if (botonAgregar) {
        botonAgregar.insertAdjacentHTML('beforebegin', seccionHtml);
        
        items.forEach((itemData) => {
            agregarItemSeccionPersonalizadaConDatos(nombreSeccion, campos, itemData, containerId);
        });
    }
}

function agregarItemSeccionPersonalizadaConDatos(nombreSeccion, campos, itemData, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const itemId = Date.now() + Math.random();
    
    let camposHtml = '';
    campos.forEach((campo) => {
        const valor = itemData[campo] || '';
        const nombreMostrado = campo.replace(/_/g, ' ')
                                  .replace(/\b\w/g, l => l.toUpperCase());
        
        const tipoCampo = campo.toLowerCase().includes('descripcion') || 
                         campo.toLowerCase().includes('notas') || 
                         campo.toLowerCase().includes('detalles') ? 'textarea' : 'input';
        
        if (tipoCampo === 'textarea') {
            camposHtml += `
                <div class="form-group">
                    <label>${nombreMostrado}</label>
                    <textarea data-campo="${campo}" placeholder="${nombreMostrado}" rows="3">${valor}</textarea>
                </div>
            `;
        } else {
            camposHtml += `
                <div class="form-group">
                    <label>${nombreMostrado}</label>
                    <input type="text" data-campo="${campo}" placeholder="${nombreMostrado}" value="${valor}">
                </div>
            `;
        }
    });

    const html = `
        <div class="dynamic-item" id="item-${itemId}">
            <button class="btn btn-remove" onclick="eliminarElemento('item-${itemId}')">✖</button>
            ${camposHtml}
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', html);
}

function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('email').value = '';
    document.getElementById('linkedin').value = '';
    document.getElementById('objetivo').value = '';

    document.getElementById('experiencias-container').innerHTML = '';
    document.getElementById('formacion-container').innerHTML = '';
    document.getElementById('cursos-container').innerHTML = '';
    document.getElementById('idiomas-container').innerHTML = '';
    document.getElementById('habilidades-container').innerHTML = '';

    document.querySelectorAll('.seccion-personalizada').forEach(seccion => {
        seccion.remove();
    });
    
    // Re-agregar los items iniciales para usabilidad
    agregarExperiencia();
    agregarFormacion();
    agregarCurso();
    agregarIdioma();
    agregarHabilidad();
}

// --- LÓGICA DE PREVISUALIZACIÓN Y GENERACIÓN DE PDF ---

function abrirPreviewCV() {
    const datos = recolectarDatos();
    const cvHtml = generarHTMLCV(datos);

    const cvPreviewArea = document.getElementById('cv-preview-area');
    const previewModal = document.getElementById('previewModal');

    cvPreviewArea.innerHTML = cvHtml;
    previewModal.style.display = 'flex';
}

function cerrarPreviewModal() {
    document.getElementById('previewModal').style.display = 'none';
    document.getElementById('cv-preview-area').innerHTML = '';
}

// 🐛 FUNCIÓN CORREGIDA PARA GENERAR PDF
function confirmarGenerarPDF() {
    const datos = recolectarDatos();
    const cvPreviewArea = document.getElementById('cv-preview-area');

    // ✅ CORRECCIÓN CLAVE: Guardamos y removemos la clase 'cv-render-box' temporalmente.
    // Esta clase tiene 'max-height' y 'overflow-y: auto' en styles.css, lo que oculta el contenido
    // al motor html2canvas. Al removerla, el contenido se expande para ser completamente visible.
    const originalClasses = cvPreviewArea.className; 
    cvPreviewArea.classList.remove('cv-render-box');

    const options = {
        margin: [10, 10, 10, 10], // top, right, bottom, left
        filename: `${(datos.informacionPersonal.nombre || 'CV').replace(/\s+/g, '_')}_CV.pdf`, 
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    if (typeof html2pdf !== 'undefined') {
        // Se llama a la conversión con el elemento sin restricciones de altura
        html2pdf().from(cvPreviewArea).set(options).save()
            .then(() => {
                // Restauramos la clase después de la descarga exitosa
                cvPreviewArea.className = originalClasses; 
                alert('✅ PDF generado y descargado exitosamente!');
                cerrarPreviewModal();
            })
            .catch(error => {
                // Restauramos la clase y cerramos el modal en caso de error
                cvPreviewArea.className = originalClasses;
                console.error('Error al generar el PDF:', error);
                alert('❌ Ocurrió un error al generar el PDF.');
                cerrarPreviewModal();
            });
    } else {
        // Restaurar si falla la librería
        cvPreviewArea.className = originalClasses;
        alert('Error: La librería html2pdf.js no está cargada.');
        cerrarPreviewModal();
    }
}

function generarPDF() {
    // Esta función solo abre el modal de previsualización para luego confirmar la descarga
    abrirPreviewCV();
}


/**
 * Función que genera la estructura HTML del CV con el ESTILO DE REFERENCIA.
 */
function generarHTMLCV(datos) {
    // Definición de colores base basados en la imagen de referencia
    const COLOR_PRINCIPAL = '#4a4a4a'; // Color de títulos de sección
    const COLOR_TEXTO = '#333333';
    // Se mantiene el color negro según tu solicitud anterior
    const COLOR_SEGUNDARIO = '#000000'; 
    const LINE_COLOR = '#4a4a4a'; // Color para la línea divisoria

    // Función auxiliar para formatear la descripción con viñetas (SIN CAMBIOS)
    function formatDescription(text) {
        if (!text) return '';
        const points = text.split('\n').filter(p => p.trim() !== '');
        if (points.length > 1) {
            return `<ul style="list-style-type: disc; padding-left: 20px; margin-top: 5px; margin-bottom: 0; font-size: 0.95em; line-height: 1.5;">
                ${points.map(p => `<li>${p.trim().replace(/^-/, '').trim()}</li>`).join('')}
            </ul>`;
        }
        return `<p style="margin-top: 5px; font-size: 0.95em;">${text}</p>`;
    }
    
    // Función auxiliar para generar el título de sección con la línea (SIN CAMBIOS)
    function generarTituloSeccion(titulo) {
        return `
            <div style="margin-bottom: 10px;">
                <h2 style="margin: 0; font-size: 1.5em; color: ${COLOR_PRINCIPAL}; text-transform: uppercase; letter-spacing: 1px;">
                    ${titulo}
                </h2>
                <div style="height: 3px; background-color: ${LINE_COLOR}; width: 100%; margin-top: 5px;"></div>
            </div>
        `;
    }

    // --- Lógica para mostrar el Nivel de Idioma (SIN CAMBIOS) ---
    function formatNivelIdioma(general, mcer) {
        let nivelTexto = general;
        if (general === 'Natividad') nivelTexto = 'Nativo'; // Corrección simple de texto
        
        let mcerTexto = mcer.trim() !== '' ? ` (${mcer})` : '';
        
        if (nivelTexto.trim() === '' && mcerTexto.trim() === '') {
            return 'Nivel no especificado';
        }
        // Formato final: Español: Nativo (C2)
        return `${nivelTexto}${mcerTexto}`; 
    }

    // --- INICIO DEL TEMPLATE HTML DEL CV ---
    let html = `
        <div class="cv-document" style="font-family: 'Arial', sans-serif; font-size: 11pt; color: ${COLOR_TEXTO}; line-height: 1.4; padding: 40px;">
            
            <header style="text-align: center; margin-bottom: 30px;">
                <h1 style="margin: 0 0 5px 0; font-size: 2.5em; color: ${COLOR_SEGUNDARIO}; text-transform: uppercase;">
                    ${datos.informacionPersonal.nombre || 'NOMBRE COMPLETO'}
                </h1>
                <p style="margin: 0; font-size: 1em; color: ${COLOR_TEXTO};">
                    ${datos.informacionPersonal.telefono} | ${datos.informacionPersonal.email} | <a href="${datos.informacionPersonal.linkedin}" style="color: ${COLOR_SEGUNDARIO}; text-decoration: none;">LinkedIn</a>
                </p>
            </header>

            ${datos.objetivo ? `
                <section style="margin-bottom: 30px;">
                    ${generarTituloSeccion('Perfil Profesional')}
                    <p style="font-size: 1em;">${datos.objetivo}</p>
                </section>
            ` : ''}
            
            ${datos.experiencias.length > 0 ? `
                <section style="margin-bottom: 30px;">
                    ${generarTituloSeccion('Experiencia Laboral')}
                    ${datos.experiencias.map(exp => `
                        <div style="margin-bottom: 20px;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                <h3 style="margin: 0; font-size: 1.1em; color: ${COLOR_TEXTO};">
                                    <strong>${exp.cargo || 'Cargo'}</strong>, ${exp.empresa || 'Empresa'}
                                </h3>
                                <span style="font-size: 0.95em; color: ${COLOR_TEXTO}; font-style: italic; white-space: nowrap;">
                                    ${exp.fechaInicio} - ${exp.fechaFin}
                                </span>
                            </div>
                            <p style="margin: 0; font-size: 0.95em; color: #666;">
                                ${exp.ubicacion}
                            </p>
                            ${formatDescription(exp.descripcion)}
                        </div>
                    `).join('')}
                </section>
            ` : ''}

            ${datos.formacion.length > 0 ? `
                <section style="margin-bottom: 30px;">
                    ${generarTituloSeccion('Educación')}
                    ${datos.formacion.map(form => `
                        <div style="margin-bottom: 15px;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                <h3 style="margin: 0; font-size: 1.1em; color: ${COLOR_TEXTO};">
                                    <strong>${form.institucion}</strong>
                                </h3>
                                <span style="font-size: 0.95em; color: ${COLOR_TEXTO}; font-style: italic; white-space: nowrap;">
                                    ${form.anioInicio} - ${form.anioFin}
                                </span>
                            </div>
                            <p style="margin: 0; font-size: 1em; color: #666;">
                                ${form.titulo} | ${form.ubicacion}
                            </p>
                        </div>
                    `).join('')}
                </section>
            ` : ''}
            
            ${datos.habilidades.length > 0 ? `
                <section style="margin-bottom: 30px;">
                    ${generarTituloSeccion('Habilidades')}
                    <p style="font-size: 1em; line-height: 1.8;">
                        ${datos.habilidades.map(hab => `<strong>${hab.nombre}</strong>`).join(' | ')}
                    </p>
                </section>
            ` : ''}

            ${datos.cursos.length > 0 ? `
                <section style="margin-bottom: 30px;">
                    ${generarTituloSeccion('Cursos y Certificaciones')}
                    <ul style="list-style-type: disc; padding-left: 20px; margin: 0;">
                        ${datos.cursos.map(curso => `
                            <li style="margin-bottom: 5px; font-size: 0.95em;">
                                <strong>${curso.nombre}</strong> - ${curso.plataforma} (${curso.anio})
                            </li>
                        `).join('')}
                    </ul>
                </section>
            ` : ''}

            ${datos.idiomas.length > 0 ? `
                <section style="margin-bottom: 30px;">
                    ${generarTituloSeccion('Idiomas')}
                    <ul style="list-style-type: none; padding-left: 0; margin: 0;">
                        ${datos.idiomas.map(idioma => `
                            <li style="margin-bottom: 5px; font-size: 0.95em;">
                                <strong>${idioma.idioma}</strong>: ${formatNivelIdioma(idioma.nivelGeneral, idioma.nivelMCER)}
                            </li>
                        `).join('')}
                    </ul>
                </section>
            ` : ''}

            ${Object.entries(datos.seccionesPersonalizadas).map(([nombreSeccion, seccionData]) => {
                if (!seccionData || !seccionData.items || seccionData.items.length === 0) return '';
                
                return `
                    <section style="margin-bottom: 30px;">
                        ${generarTituloSeccion(nombreSeccion)}
                        ${seccionData.items.map(item => {
                            let itemHtml = '<div style="margin-bottom: 15px;">';
                            Object.entries(item).forEach(([key, value]) => {
                                const keyDisplay = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                                itemHtml += `<p style="margin: 2px 0; font-size: 0.95em;"><strong>${keyDisplay}</strong>: ${value}</p>`;
                            });
                            itemHtml += '</div>';
                            return itemHtml;
                        }).join('')}
                    </section>
                `;
            }).join('')}
            
        </div>
    `;
    return html;
}

// --- Inicialización, Modales y Secciones Personalizadas (SIN CAMBIOS) ---

document.addEventListener('DOMContentLoaded', function() {
    limpiarFormulario(); 
});

function abrirModalNuevaSeccion() {
    document.getElementById('modalNuevaSeccion').style.display = 'flex';
    document.getElementById('nombreSeccion').value = '';
    document.getElementById('campos-container').innerHTML = '';
    agregarCampo();
}

function cerrarModalNuevaSeccion() {
    document.getElementById('modalNuevaSeccion').style.display = 'none';
}

function agregarCampo() {
    const container = document.getElementById('campos-container');
    const campoId = Date.now() + Math.random();
    const html = `
        <div class="field-item" id="campo-${campoId}">
            <input type="text" placeholder="Nombre del campo" class="nombre-campo">
            <button type="button" class="btn-remove-field" onclick="eliminarCampo('campo-${campoId}')">✖</button>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function eliminarCampo(id) {
    document.getElementById(id).remove();
}

function crearNuevaSeccion() {
    const nombreSeccion = document.getElementById('nombreSeccion').value.trim();
    const campos = Array.from(document.querySelectorAll('.nombre-campo'))
        .map(input => input.value.trim())
        .filter(nombre => nombre !== '')
        .map(nombre => nombre.replace(/\s+/g, '_').toLowerCase().replace(/[^a-z0-9_]/g, ''));


    if (!nombreSeccion) {
        alert('Por favor, ingresa un nombre para la sección');
        return;
    }

    if (campos.length === 0) {
        alert('Por favor, agrega al menos un campo para la sección');
        return;
    }

    const id = contadorSeccionesPersonalizadas++;
    const cleanName = nombreSeccion.replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9-]/g, '');
    const containerId = `container-${cleanName}`;
    
    const camposString = JSON.stringify(campos).replace(/"/g, '&quot;');
    
    // El botón para eliminar la sección personalizada ya existe aquí.
    const seccionHtml = `
        <div class="cubicle seccion-personalizada" data-nombre="${nombreSeccion}" id="seccion-personalizada-${id}">
            <div class="section-header">
                <h2 class="section-title">${nombreSeccion}</h2>
                <div>
                    <button type="button" class="btn btn-add" onclick="agregarItemSeccionPersonalizada('${nombreSeccion}', ${camposString})">+ Agregar</button>
                    <button type="button" class="btn btn-remove" onclick="eliminarSeccionPersonalizada('seccion-personalizada-${id}')">Eliminar Sección</button>
                </div>
            </div>
            <div id="${containerId}"></div>
        </div>
    `;

    const botonAgregar = document.querySelector('.btn-add-section');
    botonAgregar.insertAdjacentHTML('beforebegin', seccionHtml);

    // Agregar un item inicial vacío para que el usuario pueda empezar a escribir
    agregarItemSeccionPersonalizada(nombreSeccion, campos);

    cerrarModalNuevaSeccion();
}

function agregarItemSeccionPersonalizada(nombreSeccion, campos) {
    const cleanName = nombreSeccion.replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9-]/g, '');
    const containerId = `container-${cleanName}`;
    agregarItemSeccionPersonalizadaConDatos(nombreSeccion, campos, {}, containerId);
}

function eliminarSeccionPersonalizada(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta sección?')) {
        document.getElementById(id).remove();
    }
}