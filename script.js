// script.js

let contadorExperiencias = 0;
let contadorFormacion = 0;
let contadorCursos = 0;
let contadorIdiomas = 0;
let contadorHabilidades = 0;
let contadorSeccionesPersonalizadas = 0;
let tecnologias = [];
let currentLanguage = 'es';
let fotoBase64 = ''; // Variable global para la foto

// --- Sistema de Internacionalización ---
const translations = {
    es: {
        // Títulos y textos generales
        "title": "Generador de CV",
        "exportJson": "Exportar JSON",
        "importJson": "Importar JSON",
        "previewPdf": "Previsualizar y Generar PDF",
        "clearAll": "Limpiar Todo",
        "personalInfo": "Información Personal",
        "professionalObjective": "Objetivo Profesional (Resumen)",
        "workExperience": "Experiencia Laboral",
        "education": "Formación Académica",
        "coursesCertifications": "Cursos y Certificaciones",
        "languages": "Idiomas",
        "skills": "Habilidades",
        "addNewSection": "+ Agregar Nueva Sección",
        "createNewSection": "Crear Nueva Sección",
        "sectionName": "Nombre de la Sección",
        "sectionFields": "Campos de la Sección",
        "createSection": "Crear Sección",
        "cancel": "Cancelar",
        "cvPreview": "Previsualización del CV",
        "downloadPdf": "Descargar PDF",
        "close": "Cerrar",
        "deleteSection": "Eliminar Sección",
        "add": "Agregar",
        
        // Placeholders y labels (Corregidos/Añadidos)
        "fullName": "Nombre Completo",
        "location": "Ubicación",
        "phone": "Teléfono",
        "email": "Email",
        "linkedin": "LinkedIn (URL)",
        "summary": "Extracto",
        "photoLabel": "Foto de Perfil",
        "photoButton": "Subir Foto",
        "photoPreviewText": "Previsualización de la foto",
        
        "addExperience": "+ Agregar Experiencia",
        "addEducation": "+ Agregar Formación",
        "addCourse": "+ Agregar Curso",
        "addLanguage": "+ Agregar Idioma",
        "addSkill": "+ Agregar Habilidad",
        "addField": "+ Agregar Campo",
        
        // Placeholders específicos
        "fullNamePlaceholder": "Tu nombre completo",
        "locationPlaceholder": "Ciudad, País (Ej: Buenos Aires, Argentina)",
        "phonePlaceholder": "Ej: +54 9 11 5555-5555",
        "emailPlaceholder": "ejemplo@email.com",
        "linkedinPlaceholder": "URL de tu perfil de LinkedIn",
        "objectivePlaceholder": "Breve resumen de tu carrera y metas profesionales...",
        "sectionNamePlaceholder": "Ej: Proyectos, Voluntariado, etc.",
        
        // Placeholders de Secciones Dinámicas
        "companyPlaceholder": "Nombre de la empresa",
        "positionPlaceholder": "Tu cargo o posición",
        "startDatePlaceholder": "Ej: Mayo 2022",
        "endDatePlaceholder": "Ej: Presente",
        "expLocationPlaceholder": "Ciudad, Estado, País",
        "descriptionPlaceholder": "Describe tus responsabilidades. Usa guiones (-) o viñetas para las tareas principales, separadas por nueva línea.",
        "institutionPlaceholder": "Nombre de la institución",
        "degreePlaceholder": "Ej: Técnico en Programación",
        "startYearPlaceholder": "2020",
        "endYearPlaceholder": "2024",
        "eduLocationPlaceholder": "Ciudad, País",
        "courseNamePlaceholder": "Ej: Java y Spring Boot",
        "platformPlaceholder": "Ej: Oracle ONE, Alura",
        "yearPlaceholder": "2024",
        "languagePlaceholder": "Ej: Español",
        "selectLevel": "Seleccione Nivel",
        "basicLevel": "Básico",
        "intermediateLevel": "Intermedio",
        "advancedLevel": "Avanzado",
        "nativeLevel": "Nativo",
        "selectCEFR": "Seleccione MCER",
        "skillPlaceholder": "Ej: Trabajo en equipo",
        "experienceCompany": "Empresa/Organización",
        "experiencePosition": "Cargo",
        "experienceStartDate": "Fecha Inicio",
        "experienceEndDate": "Fecha Fin",
        "experienceLocation": "Ubicación",
        "experienceDescription": "Descripción",
        "educationInstitution": "Institución",
        "educationDegree": "Título/Grado",
        "educationStartYear": "Año Inicio",
        "educationEndYear": "Año Fin",
        "educationLocation": "Ubicación",
        "courseName": "Nombre del Curso",
        "coursePlatform": "Plataforma/Institución",
        "courseYear": "Año",
        "languageName": "Idioma",
        "languageGeneralLevel": "Nivel General",
        "languageCEFRLevel": "Nivel Marco Común Europeo (MCER)",
        "skillName": "Habilidad"
    },
    pt: {
        // Títulos y textos generales
        "title": "Gerador de CV",
        "exportJson": "Exportar JSON",
        "importJson": "Importar JSON",
        "previewPdf": "Pré-visualizar e Gerar PDF",
        "clearAll": "Limpar Tudo",
        "personalInfo": "Informação Pessoal",
        "professionalObjective": "Objetivo Profissional (Resumo)",
        "workExperience": "Experiência Profissional",
        "education": "Formação Acadêmica",
        "coursesCertifications": "Cursos e Certificações",
        "languages": "Idiomas",
        "skills": "Habilidades",
        "addNewSection": "+ Adicionar Nova Seção",
        "createNewSection": "Criar Nova Seção",
        "sectionName": "Nome da Seção",
        "sectionFields": "Campos da Seção",
        "createSection": "Criar Seção",
        "cancel": "Cancelar",
        "cvPreview": "Pré-visualização do CV",
        "downloadPdf": "Baixar PDF",
        "close": "Fechar",
        "deleteSection": "Excluir Seção",
        "add": "Adicionar",
        
        // Placeholders e labels (Corregidos/Añadidos)
        "fullName": "Nome Completo",
        "location": "Localização",
        "phone": "Telefone",
        "email": "Email",
        "linkedin": "LinkedIn (URL)",
        "summary": "Resumo",
        "photoLabel": "Foto de Perfil",
        "photoButton": "Carregar Foto",
        "photoPreviewText": "Pré-visualização da foto",
        
        "addExperience": "+ Adicionar Experiência",
        "addEducation": "+ Adicionar Formação",
        "addCourse": "+ Adicionar Curso",
        "addLanguage": "+ Adicionar Idioma",
        "addSkill": "+ Adicionar Habilidade",
        "addField": "+ Adicionar Campo",
        
        // Placeholders específicos
        "fullNamePlaceholder": "Seu nome completo",
        "locationPlaceholder": "Cidade, País (Ex: São Paulo, Brasil)",
        "phonePlaceholder": "Ex: +55 11 99999-9999",
        "emailPlaceholder": "exemplo@email.com",
        "linkedinPlaceholder": "URL do seu perfil do LinkedIn",
        "objectivePlaceholder": "Breve resumo da sua carreira e metas profissionais...",
        "sectionNamePlaceholder": "Ex: Projetos, Voluntariado, etc.",
        
        // Placeholders de Seções Dinámicas
        "companyPlaceholder": "Nome da empresa",
        "positionPlaceholder": "Seu cargo ou posição",
        "startDatePlaceholder": "Ex: Maio 2022",
        "endDatePlaceholder": "Ex: Presente",
        "expLocationPlaceholder": "Cidade, Estado, País",
        "descriptionPlaceholder": "Descreva suas responsabilidades. Use traços (-) ou marcadores para as tarefas principais, separadas por nova linha.",
        "institutionPlaceholder": "Nome da instituição",
        "degreePlaceholder": "Ex: Técnico em Programação",
        "startYearPlaceholder": "2020",
        "endYearPlaceholder": "2024",
        "eduLocationPlaceholder": "Cidade, País",
        "courseNamePlaceholder": "Ex: Java e Spring Boot",
        "platformPlaceholder": "Ex: Oracle ONE, Alura",
        "yearPlaceholder": "2024",
        "languagePlaceholder": "Ex: Português",
        "selectLevel": "Selecione Nível",
        "basicLevel": "Básico",
        "intermediateLevel": "Intermediário",
        "advancedLevel": "Avançado",
        "nativeLevel": "Nativo",
        "selectCEFR": "Selecione MCER",
        "skillPlaceholder": "Ex: Trabalho em equipe",
        "experienceCompany": "Empresa/Organização",
        "experiencePosition": "Cargo",
        "experienceStartDate": "Data de Início",
        "experienceEndDate": "Data de Fim",
        "experienceLocation": "Localização",
        "experienceDescription": "Descrição",
        "educationInstitution": "Instituição",
        "educationDegree": "Título/Grau",
        "educationStartYear": "Ano de Início",
        "educationEndYear": "Ano de Fim",
        "educationLocation": "Localização",
        "courseName": "Nome do Curso",
        "coursePlatform": "Plataforma/Instituição",
        "courseYear": "Ano",
        "languageName": "Idioma",
        "languageGeneralLevel": "Nível Geral",
        "languageCEFRLevel": "Nível Quadro Comum Europeu (QCER)",
        "skillName": "Habilidade"
    },
    en: {
        // Títulos e textos gerais
        "title": "CV Generator",
        "exportJson": "Export JSON",
        "importJson": "Import JSON",
        "previewPdf": "Preview and Generate PDF",
        "clearAll": "Clear All",
        "personalInfo": "Personal Information",
        "professionalObjective": "Professional Objective (Summary)",
        "workExperience": "Work Experience",
        "education": "Education",
        "coursesCertifications": "Courses and Certifications",
        "languages": "Languages",
        "skills": "Skills",
        "addNewSection": "+ Add New Section",
        "createNewSection": "Create New Section",
        "sectionName": "Section Name",
        "sectionFields": "Section Fields",
        "createSection": "Create Section",
        "cancel": "Cancel",
        "cvPreview": "CV Preview",
        "downloadPdf": "Download PDF",
        "close": "Close",
        "deleteSection": "Delete Section",
        "add": "Add",
        
        // Placeholders e labels (Corregidos/Añadidos)
        "fullName": "Full Name",
        "location": "Location",
        "phone": "Phone",
        "email": "Email",
        "linkedin": "LinkedIn (URL)",
        "summary": "Summary",
        "photoLabel": "Profile Photo",
        "photoButton": "Upload Photo",
        "photoPreviewText": "Photo preview",

        "addExperience": "+ Add Experience",
        "addEducation": "+ Add Education",
        "addCourse": "+ Add Course",
        "addLanguage": "+ Add Language",
        "addSkill": "+ Add Skill",
        "addField": "+ Add Field",
        
        // Placeholders específicos
        "fullNamePlaceholder": "Your full name",
        "locationPlaceholder": "City, Country (Ex: New York, USA)",
        "phonePlaceholder": "Ex: +1 555-123-4567",
        "emailPlaceholder": "example@email.com",
        "linkedinPlaceholder": "Your LinkedIn profile URL",
        "objectivePlaceholder": "Brief summary of your career and professional goals...",
        "sectionNamePlaceholder": "Ex: Projects, Volunteering, etc.",

        // Placeholders de Secciones Dinámicas
        "companyPlaceholder": "Company name",
        "positionPlaceholder": "Your position or title",
        "startDatePlaceholder": "Ex: May 2022",
        "endDatePlaceholder": "Ex: Present",
        "expLocationPlaceholder": "City, State, Country",
        "descriptionPlaceholder": "Describe your responsibilities. Use bullets (-) for main tasks, separated by new line.",
        "institutionPlaceholder": "Institution name",
        "degreePlaceholder": "Ex: Software Engineering",
        "startYearPlaceholder": "2020",
        "endYearPlaceholder": "2024",
        "eduLocationPlaceholder": "City, Country",
        "courseNamePlaceholder": "Ex: Java and Spring Boot",
        "platformPlaceholder": "Ex: Oracle ONE, Coursera",
        "yearPlaceholder": "2024",
        "languagePlaceholder": "Ex: English",
        "selectLevel": "Select Level",
        "basicLevel": "Basic",
        "intermediateLevel": "Intermediate",
        "advancedLevel": "Advanced",
        "nativeLevel": "Native",
        "selectCEFR": "Select CEFR",
        "skillPlaceholder": "Ex: Teamwork",
        "experienceCompany": "Company/Organization",
        "experiencePosition": "Position",
        "experienceStartDate": "Start Date",
        "experienceEndDate": "End Date",
        "experienceLocation": "Location",
        "experienceDescription": "Description",
        "educationInstitution": "Institution",
        "educationDegree": "Degree/Title",
        "educationStartYear": "Start Year",
        "educationEndYear": "End Year",
        "educationLocation": "Location",
        "courseName": "Course Name",
        "coursePlatform": "Platform/Institution",
        "courseYear": "Year",
        "languageName": "Language",
        "languageGeneralLevel": "General Level",
        "languageCEFRLevel": "CEFR Level",
        "skillName": "Skill"
    }
};

function cambiarIdioma() {
    currentLanguage = document.getElementById('languageSelect').value;
    aplicarIdioma();
}

function aplicarIdioma() {
    const lang = translations[currentLanguage];
    
    // 1. Actualizar textos con data-i18n (Títulos, Botones, Labels fijos)
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (lang[key]) {
            element.textContent = lang[key];
        }
    });
    
    // 2. Actualizar placeholders con data-i18n-placeholder (Placeholders fijos)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (lang[key]) {
            element.setAttribute('placeholder', lang[key]);
        }
    });
    
    // 3. Re-renderizar secciones dinámicas para traducir sus labels/placeholders
    // Se realiza una simulación de re-carga para asegurar la traducción en elementos dinámicos
    const expData = recolectarDatosSeccion('experiencias-container', ['empresa', 'cargo', 'fechaInicio', 'fechaFin', 'ubicacion', 'descripcion'], '.exp');
    document.getElementById('experiencias-container').innerHTML = '';
    expData.forEach(data => agregarExperiencia(data));
    
    const formData = recolectarDatosSeccion('formacion-container', ['institucion', 'titulo', 'anioInicio', 'anioFin', 'ubicacion'], '.form');
    document.getElementById('formacion-container').innerHTML = '';
    formData.forEach(data => agregarFormacion(data));
    
    const cursoData = recolectarDatosSeccion('cursos-container', ['nombre', 'plataforma', 'anio'], '.curso');
    document.getElementById('cursos-container').innerHTML = '';
    cursoData.forEach(data => agregarCurso(data));

    const idiomaData = recolectarDatosSeccionIdiomas(); // Función dedicada para idiomas
    document.getElementById('idiomas-container').innerHTML = '';
    idiomaData.forEach(data => agregarIdioma(data));
    
    const habData = recolectarDatosSeccion('habilidades-container', ['nombre'], '.hab');
    document.getElementById('habilidades-container').innerHTML = '';
    habData.forEach(data => agregarHabilidad(data));
    
    // Actualizar el texto del preview de la foto
    const previewText = document.querySelector('#foto-preview span');
    if (previewText && !fotoBase64) {
        previewText.textContent = lang['photoPreviewText'];
    }

    // Actualizar botones de secciones personalizadas
    document.querySelectorAll('.seccion-personalizada').forEach(seccion => {
        const addButton = seccion.querySelector('.btn-add');
        if (addButton) {
            addButton.textContent = `+ ${lang['add']}`;
            const onClickAttr = addButton.getAttribute('onclick');
            const match = onClickAttr.match(/agregarItemSeccionPersonalizada\('([^']*)', (\[.*?\])\)/);
            if (match) {
                const nombreSeccion = match[1];
                const camposString = match[2];
                addButton.setAttribute('onclick', `agregarItemSeccionPersonalizada('${nombreSeccion}', ${camposString})`);
            }
        }
        const removeButton = seccion.querySelector('.btn-remove');
        if (removeButton) {
            removeButton.textContent = lang['deleteSection'];
        }
        // Nota: Los campos dentro de las secciones personalizadas no se traducen automáticamente,
        // ya que el nombre lo define el usuario.
    });
}

function recolectarDatosSeccion(containerId, keys, classPrefix) {
    const dataArray = [];
    document.querySelectorAll(`#${containerId} .dynamic-item`).forEach(item => {
        const data = {};
        keys.forEach(key => {
            let input = item.querySelector(`${classPrefix}-${key.toLowerCase()}`);
            // Manejar casos especiales donde la clase no sigue la convención simple
            if (!input) {
                if (key === 'fechaInicio') input = item.querySelector('.exp-inicio');
                else if (key === 'fechaFin') input = item.querySelector('.exp-fin');
                else if (key === 'descripcion') input = item.querySelector('.exp-descripcion');
                else if (key === 'anioInicio') input = item.querySelector('.form-inicio');
                else if (key === 'anioFin') input = item.querySelector('.form-fin');
            }
            if (input) {
                data[key] = input.value;
            }
        });
        if (Object.keys(data).length > 0) {
            dataArray.push(data);
        }
    });
    return dataArray;
}

function recolectarDatosSeccionIdiomas() {
    const dataArray = [];
    document.querySelectorAll('#idiomas-container .dynamic-item').forEach(item => {
        dataArray.push({
            idioma: item.querySelector('.idioma-nombre').value,
            nivelGeneral: item.querySelector('.idioma-nivel-general').value,
            nivelMCER: item.querySelector('.idioma-nivel-mcer').value
        });
    });
    return dataArray;
}

// --- Lógica de Manejo de Foto ---

function handleFileSelect(evt) {
    const file = evt.target.files[0];
    const previewDiv = document.getElementById('foto-preview');

    if (!file) {
        fotoBase64 = '';
        previewDiv.innerHTML = `<span style="color: #999;" data-i18n="photoPreviewText">${translations[currentLanguage]['photoPreviewText']}</span>`;
        return;
    }

    if (file.size > 2 * 1024 * 1024) { // Limitar el tamaño a 2MB
        alert(currentLanguage === 'en' ? 'File size exceeds 2MB limit.' : 
              currentLanguage === 'pt' ? 'O tamanho do arquivo excede o limite de 2MB.' : 
              'El tamaño del archivo excede el límite de 2MB.');
        evt.target.value = '';
        fotoBase64 = '';
        previewDiv.innerHTML = `<span style="color: #999;" data-i18n="photoPreviewText">${translations[currentLanguage]['photoPreviewText']}</span>`;
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        fotoBase64 = e.target.result; // Almacena la imagen en Base64
        previsualizarFoto(fotoBase64); // Muestra la foto en el formulario
    };
    reader.readAsDataURL(file);
}

function previsualizarFoto(base64) {
    const previewDiv = document.getElementById('foto-preview');
    if (base64) {
        // Aseguramos que la foto se vea bien en la previsualización del formulario
        previewDiv.innerHTML = `<img src="${base64}" alt="${translations[currentLanguage]['photoLabel']}" style="max-width: 100%; max-height: 100%; object-fit: cover;">`;
    } else {
        previewDiv.innerHTML = `<span style="color: #999;" data-i18n="photoPreviewText">${translations[currentLanguage]['photoPreviewText']}</span>`;
    }
}

// --- Funciones de Adición y Eliminación de Items Predefinidos (Añadiendo parámetros opcionales para carga) ---

function agregarExperiencia(initialData = {}) {
    const container = document.getElementById('experiencias-container');
    const id = contadorExperiencias++;
    const lang = translations[currentLanguage];
    
    const html = `
        <div class="dynamic-item" id="exp-${id}">
            <button class="btn btn-remove" onclick="eliminarElemento('exp-${id}')">✖</button>
            <div class="form-group">
                <label>${lang['experienceCompany']}</label>
                <input type="text" class="exp-empresa" placeholder="${lang['companyPlaceholder']}" value="${initialData.empresa || ''}">
            </div>
            <div class="form-group">
                <label>${lang['experiencePosition']}</label>
                <input type="text" class="exp-cargo" placeholder="${lang['positionPlaceholder']}" value="${initialData.cargo || ''}">
            </div>
            <div class="row">
                <div class="form-group">
                    <label>${lang['experienceStartDate']}</label>
                    <input type="text" class="exp-inicio" placeholder="${lang['startDatePlaceholder']}" value="${initialData.fechaInicio || ''}">
                </div>
                <div class="form-group">
                    <label>${lang['experienceEndDate']}</label>
                    <input type="text" class="exp-fin" placeholder="${lang['endDatePlaceholder']}" value="${initialData.fechaFin || ''}">
                </div>
            </div>
            <div class="form-group">
                <label>${lang['experienceLocation']}</label>
                <input type="text" class="exp-ubicacion" placeholder="${lang['expLocationPlaceholder']}" value="${initialData.ubicacion || ''}">
            </div>
            <div class="form-group">
                <label>${lang['experienceDescription']}</label>
                <textarea class="exp-descripcion" placeholder="${lang['descriptionPlaceholder']}">${initialData.descripcion || ''}</textarea>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function agregarFormacion(initialData = {}) {
    const container = document.getElementById('formacion-container');
    const id = contadorFormacion++;
    const lang = translations[currentLanguage];
    
    const html = `
        <div class="dynamic-item" id="form-${id}">
            <button class="btn btn-remove" onclick="eliminarElemento('form-${id}')">✖</button>
            <div class="form-group">
                <label>${lang['educationInstitution']}</label>
                <input type="text" class="form-institucion" placeholder="${lang['institutionPlaceholder']}" value="${initialData.institucion || ''}">
            </div>
            <div class="form-group">
                <label>${lang['educationDegree']}</label>
                <input type="text" class="form-titulo" placeholder="${lang['degreePlaceholder']}" value="${initialData.titulo || ''}">
            </div>
            <div class="row">
                <div class="form-group">
                    <label>${lang['educationStartYear']}</label>
                    <input type="text" class="form-inicio" placeholder="${lang['startYearPlaceholder']}" value="${initialData.anioInicio || ''}">
                </div>
                <div class="form-group">
                    <label>${lang['educationEndYear']}</label>
                    <input type="text" class="form-fin" placeholder="${lang['endYearPlaceholder']}" value="${initialData.anioFin || ''}">
                </div>
            </div>
            <div class="form-group">
                <label>${lang['educationLocation']}</label>
                <input type="text" class="form-ubicacion" placeholder="${lang['eduLocationPlaceholder']}" value="${initialData.ubicacion || ''}">
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function agregarCurso(initialData = {}) {
    const container = document.getElementById('cursos-container');
    const id = contadorCursos++;
    const lang = translations[currentLanguage];
    
    const html = `
        <div class="dynamic-item" id="curso-${id}">
            <button class="btn btn-remove" onclick="eliminarElemento('curso-${id}')">✖</button>
            <div class="form-group">
                <label>${lang['courseName']}</label>
                <input type="text" class="curso-nombre" placeholder="${lang['courseNamePlaceholder']}" value="${initialData.nombre || ''}">
            </div>
            <div class="row">
                <div class="form-group">
                    <label>${lang['coursePlatform']}</label>
                    <input type="text" class="curso-plataforma" placeholder="${lang['platformPlaceholder']}" value="${initialData.plataforma || ''}">
                </div>
                <div class="form-group">
                    <label>${lang['courseYear']}</label>
                    <input type="text" class="curso-anio" placeholder="${lang['yearPlaceholder']}" value="${initialData.anio || ''}">
                </div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function agregarIdioma(initialData = {}) {
    const container = document.getElementById('idiomas-container');
    const id = contadorIdiomas++;
    const lang = translations[currentLanguage];
    
    const nivelOptions = `
        <option value="">${lang['selectLevel']}</option>
        <option value="Basic" ${initialData.nivelGeneral === 'Basic' || initialData.nivelGeneral === 'Básico' ? 'selected' : ''}>${lang['basicLevel']}</option>
        <option value="Intermediate" ${initialData.nivelGeneral === 'Intermediate' || initialData.nivelGeneral === 'Intermedio' ? 'selected' : ''}>${lang['intermediateLevel']}</option>
        <option value="Advanced" ${initialData.nivelGeneral === 'Advanced' || initialData.nivelGeneral === 'Avanzado' ? 'selected' : ''}>${lang['advancedLevel']}</option>
        <option value="Native" ${initialData.nivelGeneral === 'Native' || initialData.nivelGeneral === 'Nativo' ? 'selected' : ''}>${lang['nativeLevel']}</option>
    `;

    const mcerOptions = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(level => 
        `<option value="${level}" ${initialData.nivelMCER === level ? 'selected' : ''}>${level}</option>`
    ).join('');
    
    const html = `
        <div class="dynamic-item" id="idioma-${id}">
            <button class="btn btn-remove" onclick="eliminarElemento('idioma-${id}')">✖</button>
            <div class="form-group">
                <label>${lang['languageName']}</label>
                <input type="text" class="idioma-nombre" placeholder="${lang['languagePlaceholder']}" value="${initialData.idioma || ''}">
            </div>
            <div class="row">
                <div class="form-group">
                    <label>${lang['languageGeneralLevel']}</label>
                    <select class="idioma-nivel-general">
                        ${nivelOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label>${lang['languageCEFRLevel']}</label>
                    <select class="idioma-nivel-mcer">
                        <option value="">${lang['selectCEFR']}</option>
                        ${mcerOptions}
                    </select>
                </div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function agregarHabilidad(initialData = {}) {
    const container = document.getElementById('habilidades-container');
    const id = contadorHabilidades++;
    const lang = translations[currentLanguage];
    
    const html = `
        <div class="dynamic-item" id="hab-${id}">
            <button class="btn btn-remove" onclick="eliminarElemento('hab-${id}')">✖</button>
            <div class="form-group">
                <label>${lang['skillName']}</label>
                <input type="text" class="hab-nombre" placeholder="${lang['skillPlaceholder']}" value="${initialData.nombre || ''}">
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function eliminarElemento(id) {
    document.getElementById(id).remove();
}

// --- Lógica de Recolección y Carga de Datos (JSON) ---

function recolectarDatos() {
    const datos = {
        informacionPersonal: {
            nombre: document.getElementById('nombre').value,
            telefono: document.getElementById('telefono').value,
            email: document.getElementById('email').value,
            linkedin: document.getElementById('linkedin').value,
            ubicacion: document.getElementById('ubicacion').value, // NUEVO
            fotoBase64: fotoBase64 // NUEVO
        },
        objetivo: document.getElementById('objetivo').value,
        experiencias: recolectarDatosSeccion('experiencias-container', ['empresa', 'cargo', 'fechaInicio', 'fechaFin', 'ubicacion', 'descripcion'], '.exp'),
        formacion: recolectarDatosSeccion('formacion-container', ['institucion', 'titulo', 'anioInicio', 'anioFin', 'ubicacion'], '.form'),
        cursos: recolectarDatosSeccion('cursos-container', ['nombre', 'plataforma', 'anio'], '.curso'),
        idiomas: recolectarDatosSeccionIdiomas(),
        habilidades: recolectarDatosSeccion('habilidades-container', ['nombre'], '.hab'),
        seccionesPersonalizadas: {}
    };

    // Recolectar secciones personalizadas
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
        
        const items = [];
        seccion.querySelectorAll('.dynamic-item').forEach(item => {
            const campos = {};
            item.querySelectorAll('[data-campo]').forEach(campo => {
                campos[campo.dataset.campo] = campo.value;
            });
            items.push(campos);
        });

        datos.seccionesPersonalizadas[nombreSeccion] = {
            campos: camposGuardados,
            items: items
        };
    });

    return datos;
}

// Función de Carga de Datos
function cargarDatos(datos) {
    limpiarFormulario();

    if (datos.informacionPersonal) {
        document.getElementById('nombre').value = datos.informacionPersonal.nombre || '';
        document.getElementById('telefono').value = datos.informacionPersonal.telefono || '';
        document.getElementById('email').value = datos.informacionPersonal.email || '';
        document.getElementById('linkedin').value = datos.informacionPersonal.linkedin || '';
        document.getElementById('ubicacion').value = datos.informacionPersonal.ubicacion || ''; // NUEVO
        
        // Carga de la foto
        fotoBase64 = datos.informacionPersonal.fotoBase64 || ''; // NUEVO
        if (fotoBase64) {
            previsualizarFoto(fotoBase64);
        }
    }
    document.getElementById('objetivo').value = datos.objetivo || '';

    // Carga de secciones dinámicas (usando la función de agregar con datos)
    if (datos.experiencias && Array.isArray(datos.experiencias)) {
        datos.experiencias.forEach(data => agregarExperiencia(data));
    }
    if (datos.formacion && Array.isArray(datos.formacion)) {
        datos.formacion.forEach(data => agregarFormacion(data));
    }
    if (datos.cursos && Array.isArray(datos.cursos)) {
        datos.cursos.forEach(data => agregarCurso(data));
    }
    if (datos.idiomas && Array.isArray(datos.idiomas)) {
        datos.idiomas.forEach(data => agregarIdioma(data));
    }
    if (datos.habilidades && Array.isArray(datos.habilidades)) {
        datos.habilidades.forEach(data => agregarHabilidad(data));
    }

    // Carga de secciones personalizadas
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
    
    alert(currentLanguage === 'en' ? '✅ JSON file exported successfully!' : 
          currentLanguage === 'pt' ? '✅ Arquivo JSON exportado com sucesso!' : 
          '✅ Archivo JSON exportado exitosamente!');
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
            alert(currentLanguage === 'en' ? '✅ Data imported successfully!' : 
                  currentLanguage === 'pt' ? '✅ Dados importados com sucesso!' : 
                  '✅ Datos importados exitosamente!');
        } catch (error) {
            alert(currentLanguage === 'en' ? '❌ Error reading JSON file. Make sure it is a valid file.' : 
                  currentLanguage === 'pt' ? '❌ Erro ao ler o arquivo JSON. Certifique-se de que é um arquivo válido.' : 
                  '❌ Error al leer el archivo JSON. Asegúrate de que sea un archivo válido.');
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
    const lang = translations[currentLanguage];
    
    const seccionHtml = `
        <div class="cubicle seccion-personalizada" data-nombre="${nombreSeccion}" id="${seccionId}">
            <div class="section-header">
                <h2 class="section-title">${nombreSeccion}</h2>
                <div>
                    <button type="button" class="btn btn-add" onclick="agregarItemSeccionPersonalizada('${nombreSeccion}', ${camposString})">+ ${lang['add']}</button>
                    <button type="button" class="btn btn-remove" onclick="eliminarSeccionPersonalizada('${seccionId}')">${lang['deleteSection']}</button>
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
    document.getElementById('ubicacion').value = ''; // NUEVO
    document.getElementById('objetivo').value = '';

    document.getElementById('experiencias-container').innerHTML = '';
    document.getElementById('formacion-container').innerHTML = '';
    document.getElementById('cursos-container').innerHTML = '';
    document.getElementById('idiomas-container').innerHTML = '';
    document.getElementById('habilidades-container').innerHTML = '';

    document.querySelectorAll('.seccion-personalizada').forEach(seccion => {
        seccion.remove();
    });
    
    // Limpiar foto
    fotoBase64 = '';
    const fileInput = document.getElementById('foto-perfil');
    if (fileInput) fileInput.value = '';
    const previewDiv = document.getElementById('foto-preview');
    if (previewDiv) {
        previewDiv.innerHTML = `<span style="color: #999;">${translations[currentLanguage]['photoPreviewText'] || 'Photo preview'}</span>`;
    }
    
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

function confirmarGenerarPDF() {
    const datos = recolectarDatos();
    const cvPreviewArea = document.getElementById('cv-preview-area');

    // Desactivar temporalmente el scroll y altura máxima para la generación de PDF
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
        html2pdf().from(cvPreviewArea).set(options).save()
            .then(() => {
                cvPreviewArea.className = originalClasses; 
                alert(currentLanguage === 'en' ? '✅ PDF generated and downloaded successfully!' : 
                      currentLanguage === 'pt' ? '✅ PDF gerado e baixado com sucesso!' : 
                      '✅ PDF generado y descargado exitosamente!');
                cerrarPreviewModal();
            })
            .catch(error => {
                cvPreviewArea.className = originalClasses;
                console.error('Error al generar el PDF:', error);
                alert(currentLanguage === 'en' ? '❌ An error occurred while generating the PDF.' : 
                      currentLanguage === 'pt' ? '❌ Ocorreu um erro ao gerar o PDF.' : 
                      '❌ Ocurrió un error al generar el PDF.');
                cerrarPreviewModal();
            });
    } else {
        cvPreviewArea.className = originalClasses;
        alert(currentLanguage === 'en' ? 'Error: html2pdf.js library is not loaded.' : 
              currentLanguage === 'pt' ? 'Erro: A biblioteca html2pdf.js não está carregada.' : 
              'Error: La librería html2pdf.js no está cargada.');
        cerrarPreviewModal();
    }
}

/**
 * Función que genera la estructura HTML del CV con el ESTILO DE REFERENCIA.
 */
function generarHTMLCV(datos) {
    // Definición de colores base basados en la imagen de referencia
    const COLOR_PRINCIPAL = '#4a4a4a'; // Color de títulos de sección
    const COLOR_TEXTO = '#333333';
    const COLOR_SEGUNDARIO = '#000000'; 
    const LINE_COLOR = '#4a4a4a'; 

    // Función auxiliar para formatear la descripción con viñetas
    function formatDescription(text) {
        if (!text) return '';
        const points = text.split('\n').filter(p => p.trim() !== '');
        if (points.length > 0) {
            return `<ul style="list-style-type: disc; padding-left: 20px; margin-top: 5px; margin-bottom: 0; font-size: 0.95em; line-height: 1.5;">
                ${points.map(p => `<li>${p.trim().replace(/^-/, '').trim()}</li>`).join('')}
            </ul>`;
        }
        return `<p style="margin-top: 5px; font-size: 0.95em;">${text}</p>`;
    }
    
    // Función auxiliar para generar el título de sección con la línea
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

    // --- Lógica para mostrar el Nivel de Idioma ---
    function formatNivelIdioma(general, mcer) {
        let nivelTexto = general.trim() !== '' ? general : '';
        let mcerTexto = mcer.trim() !== '' ? ` (${mcer})` : '';
        
        if (nivelTexto.trim() === '' && mcerTexto.trim() === '') {
            return translations[currentLanguage]['notSpecifiedLevel'] || 'Nivel no especificado';
        }
        return `${nivelTexto}${mcerTexto}`; 
    }

    // Traducciones para títulos de secciones en el CV
    const sectionTitles = {
        es: {
            professionalProfile: 'Perfil Profesional',
            workExperience: 'Experiencia Laboral',
            education: 'Educación',
            skills: 'Habilidades',
            courses: 'Cursos y Certificaciones',
            languages: 'Idiomas',
            location: 'Ubicación'
        },
        pt: {
            professionalProfile: 'Perfil Profissional',
            workExperience: 'Experiência Profissional',
            education: 'Educação',
            skills: 'Habilidades',
            courses: 'Cursos e Certificações',
            languages: 'Idiomas',
            location: 'Localização'
        },
        en: {
            professionalProfile: 'Professional Profile',
            workExperience: 'Work Experience',
            education: 'Education',
            skills: 'Skills',
            courses: 'Courses and Certifications',
            languages: 'Languages',
            location: 'Location'
        }
    };
    
    const titles = sectionTitles[currentLanguage] || sectionTitles.es;

    // --- INICIO DEL TEMPLATE HTML DEL CV ---
    let html = `
        <div class="cv-document" style="font-family: 'Arial', sans-serif; font-size: 11pt; color: ${COLOR_TEXTO}; line-height: 1.4; padding: 40px; position: relative;">
            
            <header style="margin-bottom: 30px; position: relative; min-height: 100px;">
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    
                    <div style="flex-grow: 1;">
                        <h1 style="margin: 0 0 5px 0; font-size: 2.5em; color: ${COLOR_SEGUNDARIO}; text-transform: uppercase;">
                            ${datos.informacionPersonal.nombre || 'NOMBRE COMPLETO'}
                        </h1>
                        <p style="margin: 0; font-size: 1em; color: ${COLOR_TEXTO};">
                            ${datos.informacionPersonal.telefono} | ${datos.informacionPersonal.email}
                        </p>
                        ${datos.informacionPersonal.ubicacion ? `<p style="margin: 0; font-size: 1em; color: ${COLOR_TEXTO};">${datos.informacionPersonal.ubicacion}</p>` : ''}
                        ${datos.informacionPersonal.linkedin ? `<p style="margin: 0; font-size: 1em; color: ${COLOR_TEXTO};"><a href="${datos.informacionPersonal.linkedin}" style="color: ${COLOR_SEGUNDARIO}; text-decoration: none;">LinkedIn</a></p>` : ''}
                    </div>
                    
                    ${datos.informacionPersonal.fotoBase64 ? `
                        <div style="width: 100px; height: 120px; border: 1px solid #ccc; border-radius: 5px; overflow: hidden; flex-shrink: 0; margin-left: 20px;">
                            <img src="${datos.informacionPersonal.fotoBase64}" alt="${translations[currentLanguage]['photoLabel'] || 'Profile Photo'}" 
                                style="width: 100%; height: 100%; object-fit: cover; display: block;"/>
                        </div>
                    ` : ''}
                </div>
                
                <hr style="border: none; border-top: 1px solid #ccc; margin-top: 10px;"/>
            </header>

            ${datos.objetivo ? `
                <section style="margin-bottom: 30px;">
                    ${generarTituloSeccion(titles.professionalProfile)}
                    <p style="font-size: 1em;">${datos.objetivo}</p>
                </section>
            ` : ''}
            
            ${datos.experiencias.length > 0 ? `
                <section style="margin-bottom: 30px;">
                    ${generarTituloSeccion(titles.workExperience)}
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
                    ${generarTituloSeccion(titles.education)}
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
                    ${generarTituloSeccion(titles.skills)}
                    <p style="font-size: 1em; line-height: 1.8;">
                        ${datos.habilidades.map(hab => `<strong>${hab.nombre}</strong>`).join(' | ')}
                    </p>
                </section>
            ` : ''}

            ${datos.cursos.length > 0 ? `
                <section style="margin-bottom: 30px;">
                    ${generarTituloSeccion(titles.courses)}
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
                    ${generarTituloSeccion(titles.languages)}
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

// --- Inicialización, Modales y Secciones Personalizadas ---

document.addEventListener('DOMContentLoaded', function() {
    limpiarFormulario();
    aplicarIdioma(); // Aplicar idioma por defecto al cargar
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
    const lang = translations[currentLanguage];
    
    const html = `
        <div class="field-item" id="campo-${campoId}">
            <input type="text" placeholder="${lang['sectionName'] || 'Nombre del campo'}" class="nombre-campo">
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
        alert(currentLanguage === 'en' ? 'Please enter a name for the section' : 
              currentLanguage === 'pt' ? 'Por favor, insira um nome para a seção' : 
              'Por favor, ingresa un nombre para la sección');
        return;
    }

    if (campos.length === 0) {
        alert(currentLanguage === 'en' ? 'Please add at least one field for the section' : 
              currentLanguage === 'pt' ? 'Por favor, adicione pelo menos um campo para a seção' : 
              'Por favor, agrega al menos un campo para la sección');
        return;
    }

    const id = contadorSeccionesPersonalizadas++;
    const cleanName = nombreSeccion.replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9-]/g, '');
    const containerId = `container-${cleanName}`;
    
    const camposString = JSON.stringify(campos).replace(/"/g, '&quot;');
    const lang = translations[currentLanguage];
    
    // El botón para eliminar la sección personalizada ya existe aquí.
    const seccionHtml = `
        <div class="cubicle seccion-personalizada" data-nombre="${nombreSeccion}" id="seccion-personalizada-${id}">
            <div class="section-header">
                <h2 class="section-title">${nombreSeccion}</h2>
                <div>
                    <button type="button" class="btn btn-add" onclick="agregarItemSeccionPersonalizada('${nombreSeccion}', ${camposString})">+ ${lang['add']}</button>
                    <button type="button" class="btn btn-remove" onclick="eliminarSeccionPersonalizada('seccion-personalizada-${id}')">${lang['deleteSection']}</button>
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
    const message = currentLanguage === 'en' ? 'Are you sure you want to delete this section?' : 
                   currentLanguage === 'pt' ? 'Tem certeza de que deseja excluir esta seção?' : 
                   '¿Estás seguro de que quieres eliminar esta sección?';
    
    if (confirm(message)) {
        document.getElementById(id).remove();
    }
}