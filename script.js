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

// --- Configuración de Campos Dinámicos (MODIFICADO para I18N) ---
let currentSectionToConfigure = '';

// Definición de campos predefinidos usando claves de traducción (labelKey)
const predefinedFields = {
    experiencias: [
        { key: 'empresa', labelKey: 'experienceCompany', visible: true, type: 'text' },
        { key: 'cargo', labelKey: 'experiencePosition', visible: true, type: 'text' },
        { key: 'fechaInicio', labelKey: 'experienceStartDate', visible: true, type: 'text' },
        { key: 'fechaFin', labelKey: 'experienceEndDate', visible: true, type: 'text' },
        { key: 'ubicacion', labelKey: 'experienceLocation', visible: true, type: 'text' },
        { key: 'descripcion', labelKey: 'experienceDescription', visible: true, type: 'textarea' }
    ],
    formacion: [
        { key: 'institucion', labelKey: 'educationInstitution', visible: true, type: 'text' },
        { key: 'titulo', labelKey: 'educationDegree', visible: true, type: 'text' },
        { key: 'anioInicio', labelKey: 'educationStartYear', visible: true, type: 'text' },
        { key: 'anioFin', labelKey: 'educationEndYear', visible: true, type: 'text' },
        { key: 'ubicacion', labelKey: 'educationLocation', visible: true, type: 'text' }
    ],
    cursos: [
        { key: 'nombre', labelKey: 'courseName', visible: true, type: 'text' },
        { key: 'plataforma', labelKey: 'coursePlatform', visible: true, type: 'text' },
        { key: 'anio', labelKey: 'courseYear', visible: true, type: 'text' }
    ],
    idiomas: [
        { key: 'nombre', labelKey: 'languageName', visible: true, type: 'text' },
        { key: 'nivelGeneral', labelKey: 'languageGeneralLevel', visible: true, type: 'selectGeneral' },
        { key: 'nivelCEFR', labelKey: 'languageCEFRLevel', visible: true, type: 'selectCEFR' }
    ],
    habilidades: [
        { key: 'nombre', labelKey: 'skillName', visible: true, type: 'text' }
    ]
};

// Almacena la configuración activa (incluye customLabel si el usuario lo modifica)
let customFieldLabels = {};

// Inicializa o resetea la configuración de campos (CORREGIDO)
function initializeCustomFieldLabels(configCargada = null) {
    const configBase = configCargada || JSON.parse(localStorage.getItem('customFieldLabels'));
    customFieldLabels = {}; // Limpiar

    Object.keys(predefinedFields).forEach(section => {
        customFieldLabels[section] = predefinedFields[section].map(defaultField => {
            // Buscar si hay una configuración personalizada cargada para este campo
            const loadedField = (configBase && configBase[section] || []).find(f => f.key === defaultField.key);
            
            if (loadedField) {
                // Si se cargó una configuración (de JSON o localStorage), usarla
                return {
                    ...defaultField, // Tomar el 'type' de la base
                    ...loadedField   // Sobrescribir con lo guardado (visible, customLabel, labelKey)
                };
            } else {
                // Si no hay nada cargado, usar la configuración predeterminada (con labelKey)
                return {
                    ...defaultField,
                    customLabel: null // Asegurar que no hay etiqueta personalizada
                };
            }
        });
    });
    // Guardar la configuración reseteada o cargada en localStorage
    localStorage.setItem('customFieldLabels', JSON.stringify(customFieldLabels));
}
// --- FIN Configuración de Campos ---


// --- Sistema de Internacionalización (Traducciones) ---
const translations = {
    es: {
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
        "fullNamePlaceholder": "Tu nombre completo",
        "locationPlaceholder": "Ciudad, País (Ej: Buenos Aires, Argentina)",
        "phonePlaceholder": "Ej: +54 9 11 5555-5555",
        "emailPlaceholder": "ejemplo@email.com",
        "linkedinPlaceholder": "URL de tu perfil de LinkedIn",
        "objectivePlaceholder": "Breve resumen de tu carrera y metas profesionales...",
        "sectionNamePlaceholder": "Ej: Proyectos, Voluntariado, etc.",
        "companyPlaceholder": "Nombre de la empresa",
        "positionPlaceholder": "Tu cargo o posición",
        "startDatePlaceholder": "Ej: Mayo 2022",
        "endDatePlaceholder": "Ej: Presente",
        "expLocationPlaceholder": "Ciudad, Estado, País",
        "descriptionPlaceholder": "Describe tus responsabilidades. Usa guiones (-) o viñetas...",
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
        "languageCEFRLevel": "Nivel MCER",
        "skillName": "Habilidad",
        "notSpecifiedLevel": "Nivel no especificado",
        // Claves NUEVAS para Configuración y Borrado
        "confirmDeleteSection": "¿Estás seguro de que quieres eliminar esta sección?",
        "configureFields": "Configurar Campos", 
        "fieldLabel": "Etiqueta", 
        "isVisible": "Visible", 
        "save": "Guardar",
        "workExperienceSectionTitle": "Experiencia Laboral",
        "educationSectionTitle": "Formación Académica",
        "coursesSectionTitle": "Cursos y Certificaciones",
        "languagesSectionTitle": "Idiomas",
        "skillsSectionTitle": "Habilidades"
    },
    pt: {
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
        "fullNamePlaceholder": "Seu nome completo",
        "locationPlaceholder": "Cidade, País (Ex: São Paulo, Brasil)",
        "phonePlaceholder": "Ex: +55 11 99999-9999",
        "emailPlaceholder": "exemplo@email.com",
        "linkedinPlaceholder": "URL do seu perfil do LinkedIn",
        "objectivePlaceholder": "Breve resumo da sua carreira e metas profissionais...",
        "sectionNamePlaceholder": "Ex: Projetos, Voluntariado, etc.",
        "companyPlaceholder": "Nome da empresa",
        "positionPlaceholder": "Seu cargo ou posição",
        "startDatePlaceholder": "Ex: Maio 2022",
        "endDatePlaceholder": "Ex: Presente",
        "expLocationPlaceholder": "Cidade, Estado, País",
        "descriptionPlaceholder": "Descreva suas responsabilidades. Use traços (-) ou marcadores...",
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
        "languageCEFRLevel": "Nível MCER",
        "skillName": "Habilidade",
        "notSpecifiedLevel": "Nível não especificado",
        "confirmDeleteSection": "Tem certeza de que deseja excluir esta seção?",
        "configureFields": "Configurar Campos", 
        "fieldLabel": "Rótulo", 
        "isVisible": "Visível", 
        "save": "Salvar",
        "workExperienceSectionTitle": "Experiência Profissional",
        "educationSectionTitle": "Formação Acadêmica",
        "coursesSectionTitle": "Cursos e Certificações",
        "languagesSectionTitle": "Idiomas",
        "skillsSectionTitle": "Habilidades"
    },
    en: {
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
        "fullNamePlaceholder": "Your full name",
        "locationPlaceholder": "City, Country (Ex: New York, USA)",
        "phonePlaceholder": "Ex: +1 555-123-4567",
        "emailPlaceholder": "example@email.com",
        "linkedinPlaceholder": "Your LinkedIn profile URL",
        "objectivePlaceholder": "Brief summary of your career and professional goals...",
        "sectionNamePlaceholder": "Ex: Projects, Volunteering, etc.",
        "companyPlaceholder": "Company name",
        "positionPlaceholder": "Your position or title",
        "startDatePlaceholder": "Ex: May 2022",
        "endDatePlaceholder": "Ex: Present",
        "expLocationPlaceholder": "City, State, Country",
        "descriptionPlaceholder": "Describe your responsibilities. Use bullets (-)...",
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
        "skillName": "Skill",
        "notSpecifiedLevel": "Level not specified",
        "confirmDeleteSection": "Are you sure you want to delete this section?",
        "configureFields": "Configure Fields", 
        "fieldLabel": "Label", 
        "isVisible": "Visible", 
        "save": "Save",
        "workExperienceSectionTitle": "Work Experience",
        "educationSectionTitle": "Education",
        "coursesSectionTitle": "Courses and Certifications",
        "languagesSectionTitle": "Languages",
        "skillsSectionTitle": "Skills"
    }
};

function cambiarIdioma() {
    currentLanguage = document.getElementById('languageSelect').value;
    localStorage.setItem('cvLanguage', currentLanguage); // Guardar idioma
    aplicarIdioma();
}

function aplicarIdioma() {
    const lang = translations[currentLanguage];
    
    // 1. Actualizar textos estáticos
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (lang[key]) {
            element.textContent = lang[key];
        }
    });
    
    // 2. Actualizar placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (lang[key]) {
            element.setAttribute('placeholder', lang[key]);
        }
    });
    
    // 3. (CORREGIDO) Recargar las secciones dinámicas para aplicar las etiquetas (labels)
    const datosActuales = recolectarDatos(false); // false = no guardar en localstorage
    
    // Recargar secciones predefinidas
    cargarSeccionDinamica(datosActuales.experiencias || [], 'experiencias-container', agregarExperiencia);
    cargarSeccionDinamica(datosActuales.formacion || [], 'formacion-container', agregarFormacion);
    cargarSeccionDinamica(datosActuales.cursos || [], 'cursos-container', agregarCurso);
    cargarSeccionDinamica(datosActuales.idiomas || [], 'idiomas-container', agregarIdioma);
    cargarSeccionDinamica(datosActuales.habilidades || [], 'habilidades-container', agregarHabilidad);
    
    // 4. (CORREGIDO) Actualizar el modal de configuración si está abierto
    if (document.getElementById('fieldConfigModal').style.display === 'flex' && currentSectionToConfigure) {
        // Volver a abrir el modal refrescará las etiquetas al idioma actual
        abrirModalConfiguracionCampos(currentSectionToConfigure);
    }
    
    // 5. Actualizar preview de foto
    const previewText = document.querySelector('#foto-preview span');
    if (previewText && !fotoBase64) {
        previewText.textContent = lang['photoPreviewText'];
    }

    // 6. Actualizar botones de secciones personalizadas
    document.querySelectorAll('.seccion-personalizada').forEach(seccion => {
        seccion.querySelector('.btn-add').textContent = `+ ${lang['add']}`;
        seccion.querySelector('.btn-remove-section').textContent = `✖ ${lang['deleteSection']}`;
    });
}

// Función auxiliar para recargar secciones dinámicas
function cargarSeccionDinamica(data, containerId, funcAgregar) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Limpiar
    if (data.length > 0) {
        // Resetear contador para que los IDs coincidan
        if (containerId === 'experiencias-container') contadorExperiencias = 0;
        if (containerId === 'formacion-container') contadorFormacion = 0;
        if (containerId === 'cursos-container') contadorCursos = 0;
        if (containerId === 'idiomas-container') contadorIdiomas = 0;
        if (containerId === 'habilidades-container') contadorHabilidades = 0;
        
        data.forEach(item => funcAgregar(item));
    } else {
        funcAgregar(); // Agregar un item vacío si no hay datos
    }
}

// --- Lógica de Recolección y Carga de Datos (JSON) ---

// Función auxiliar para obtener la configuración de un campo (visible, label)
function obtenerConfigCampo(sectionKey, fieldKey) {
    const lang = translations[currentLanguage];
    // Asegurarse de que customFieldLabels[sectionKey] exista
    if (!customFieldLabels[sectionKey]) {
        initializeCustomFieldLabels(); // Inicializar si no existe
    }
    
    const fieldConfig = customFieldLabels[sectionKey].find(f => f.key === fieldKey);
    
    if (!fieldConfig) {
        // Fallback por si el campo no se encuentra en la config (ej. error)
        return { visible: false, label: fieldKey };
    }

    return {
        visible: fieldConfig.visible,
        label: fieldConfig.customLabel || lang[fieldConfig.labelKey] || fieldConfig.key // Usa custom, o I18N, o la clave
    };
}


function recolectarDatosSeccion(containerId, keys, classPrefix) {
    const dataArray = [];
    document.querySelectorAll(`#${containerId} .dynamic-item`).forEach(item => {
        const data = {};
        keys.forEach(key => {
            const config = obtenerConfigCampo(classPrefix, key);
            // Solo recolectar si el campo estaba visible
            if (config.visible) {
                const input = item.querySelector(`.${classPrefix}-${key}`);
                if (input) {
                    data[key] = input.value;
                }
            }
        });
        // No agregar items vacíos
        if (Object.values(data).some(v => v && v.trim() !== '')) {
            dataArray.push(data);
        }
    });
    return dataArray;
}

function recolectarDatosSeccionIdiomas() {
    const dataArray = [];
    document.querySelectorAll('#idiomas-container .dynamic-item').forEach(item => {
        const data = {};
        if (obtenerConfigCampo('idiomas', 'nombre').visible) {
            data.nombre = item.querySelector('.idiomas-nombre')?.value || '';
        }
        if (obtenerConfigCampo('idiomas', 'nivelGeneral').visible) {
            data.nivelGeneral = item.querySelector('.idiomas-nivelGeneral')?.value || '';
        }
        if (obtenerConfigCampo('idiomas', 'nivelCEFR').visible) {
            data.nivelCEFR = item.querySelector('.idiomas-nivelCEFR')?.value || '';
        }
        if (data.nombre || data.nivelGeneral || data.nivelCEFR) {
            dataArray.push(data);
        }
    });
    return dataArray;
}

function recolectarDatos(guardar = true) {
    const datos = {
        informacionPersonal: {
            nombre: document.getElementById('nombre').value,
            telefono: document.getElementById('telefono').value,
            email: document.getElementById('email').value,
            linkedin: document.getElementById('linkedin').value,
            ubicacion: document.getElementById('ubicacion').value,
            fotoBase64: fotoBase64
        },
        objetivo: document.getElementById('objetivo').value,
        experiencias: recolectarDatosSeccion('experiencias-container', ['empresa', 'cargo', 'fechaInicio', 'fechaFin', 'ubicacion', 'descripcion'], 'experiencias'),
        formacion: recolectarDatosSeccion('formacion-container', ['institucion', 'titulo', 'anioInicio', 'anioFin', 'ubicacion'], 'formacion'),
        cursos: recolectarDatosSeccion('cursos-container', ['nombre', 'plataforma', 'anio'], 'cursos'),
        idiomas: recolectarDatosSeccionIdiomas(),
        habilidades: recolectarDatosSeccion('habilidades-container', ['nombre'], 'habilidades'),
        seccionesPersonalizadas: {},
        
        // (CORREGIDO) Guardar la configuración de campos y el orden
        customFieldConfig: customFieldLabels,
        seccionesOrden: Array.from(document.querySelectorAll('#sections-container > .movable-section')).map(s => s.id)
    };

    // (CORRECCIÓN) Recolectar secciones personalizadas (Lógica robusta)
    document.querySelectorAll('.seccion-personalizada').forEach(seccion => {
        const nombreSeccion = seccion.dataset.nombre;
        const camposGuardados = JSON.parse(seccion.dataset.camposJson || '[]');
        
        const items = [];
        // Buscar items *directamente* en la sección
        seccion.querySelectorAll('.dynamic-item').forEach(item => {
            const campos = {};
            item.querySelectorAll('[data-campo]').forEach(campoEl => {
                campos[campoEl.dataset.campo] = campoEl.value;
            });
            // Solo agregar si el item tiene datos
            if (Object.values(campos).some(v => v && v.trim() !== '')) {
                items.push(campos);
            }
        });

        datos.seccionesPersonalizadas[nombreSeccion] = {
            campos: camposGuardados,
            items: items
        };
    });
    
    // Guardar en localStorage si se solicita
    if (guardar) {
        localStorage.setItem('cvData', JSON.stringify(datos));
    }

    return datos;
}

// Función de Carga de Datos
function cargarDatos(datos) {
    
    // (CORREGIDO) Cargar la configuración PRIMERO
    if (datos.customFieldConfig) {
        initializeCustomFieldLabels(datos.customFieldConfig);
    } else {
        // Si el JSON no tiene config (es antiguo), usar la default
        initializeCustomFieldLabels(null);
    }

    // Limpiar el formulario antes de cargar
    limpiarFormulario(false); // false = no preguntar

    if (datos.informacionPersonal) {
        document.getElementById('nombre').value = datos.informacionPersonal.nombre || '';
        document.getElementById('telefono').value = datos.informacionPersonal.telefono || '';
        document.getElementById('email').value = datos.informacionPersonal.email || '';
        document.getElementById('linkedin').value = datos.informacionPersonal.linkedin || '';
        document.getElementById('ubicacion').value = datos.informacionPersonal.ubicacion || '';
        fotoBase64 = datos.informacionPersonal.fotoBase64 || '';
        if (fotoBase64) {
            previsualizarFoto(fotoBase64);
        }
    }
    document.getElementById('objetivo').value = datos.objetivo || '';

    // Carga de secciones dinámicas
    cargarSeccionDinamica(datos.experiencias || [], 'experiencias-container', agregarExperiencia);
    cargarSeccionDinamica(datos.formacion || [], 'formacion-container', agregarFormacion);
    cargarSeccionDinamica(datos.cursos || [], 'cursos-container', agregarCurso);
    cargarSeccionDinamica(datos.idiomas || [], 'idiomas-container', agregarIdioma);
    cargarSeccionDinamica(datos.habilidades || [], 'habilidades-container', agregarHabilidad);

    // Carga de secciones personalizadas
    document.querySelectorAll('.seccion-personalizada').forEach(seccion => seccion.remove());
    if (datos.seccionesPersonalizadas) {
        Object.entries(datos.seccionesPersonalizadas).forEach(([nombreSeccion, seccionData]) => {
            if (seccionData.campos && seccionData.items) {
                crearSeccionPersonalizadaDesdeImportacion(nombreSeccion, seccionData.campos, seccionData.items);
            }
        });
    }
    
    // Restaurar orden de secciones (CORREGIDO)
    if (datos.seccionesOrden && Array.isArray(datos.seccionesOrden)) {
        const container = document.getElementById('sections-container');
        const sectionsMap = new Map();
        container.querySelectorAll('.movable-section').forEach(s => sectionsMap.set(s.id, s));

        datos.seccionesOrden.forEach(id => {
            const section = sectionsMap.get(id);
            if (section) {
                container.appendChild(section); // Mover al final en el orden correcto
                sectionsMap.delete(id);
            }
        });
        // Adjuntar secciones no encontradas (quizás nuevas)
        sectionsMap.forEach(section => container.appendChild(section));
    }
    
    aplicarIdioma();
}

function exportarJSON() {
    const datos = recolectarDatos(true); // true = guardar en localStorage
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
    alert(translations[currentLanguage]['exportJson'] + ' ' + (currentLanguage === 'es' ? 'exitosamente' : 'success'));
}

function importarJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const datos = JSON.parse(e.target.result);
            cargarDatos(datos); // Cargar los datos (esto ahora incluye la config)
            alert(translations[currentLanguage]['importJson'] + ' ' + (currentLanguage === 'es' ? 'exitosamente' : 'success'));
        } catch (error) {
            alert('Error al leer el archivo JSON.');
            console.error('Error al importar JSON:', error);
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function limpiarFormulario(confirmar = true) {
    const lang = translations[currentLanguage];
    if (confirmar && !confirm(lang['clearAll'] + '?')) {
        return;
    }

    // 1. (CORREGIDO) Limpiar localStorage
    localStorage.removeItem('cvData');
    localStorage.removeItem('customFieldLabels');
    
    // 2. Limpiar campos fijos
    document.getElementById('nombre').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('email').value = '';
    document.getElementById('linkedin').value = '';
    document.getElementById('ubicacion').value = '';
    document.getElementById('objetivo').value = '';
    
    // 3. Limpiar foto
    fotoBase64 = '';
    document.getElementById('foto-perfil').value = '';
    previsualizarFoto('');

    // 4. (CORREGIDO) Resetear configuración de campos a predeterminada
    initializeCustomFieldLabels(null); // null = usar predeterminados

    // 5. Limpiar contenedores dinámicos
    document.getElementById('experiencias-container').innerHTML = '';
    document.getElementById('formacion-container').innerHTML = '';
    document.getElementById('cursos-container').innerHTML = '';
    document.getElementById('idiomas-container').innerHTML = '';
    document.getElementById('habilidades-container').innerHTML = '';

    // 6. Limpiar secciones personalizadas
    document.querySelectorAll('.seccion-personalizada').forEach(seccion => {
        seccion.remove();
    });
    
    // 7. Resetear contadores
    contadorExperiencias = 0;
    contadorFormacion = 0;
    contadorCursos = 0;
    contadorIdiomas = 0;
    contadorHabilidades = 0;
    contadorSeccionesPersonalizadas = 0;
    
    // 8. Añadir un item inicial vacío para cada sección predefinida
    agregarExperiencia();
    agregarFormacion();
    agregarCurso();
    agregarIdioma();
    agregarHabilidad();

    // 9. Re-aplicar traducciones a los nuevos items
    aplicarIdioma();
}


// --- Lógica de Manejo de Foto ---
function handleFotoUpload(event) {
    const file = event.target.files[0];
    const previewDiv = document.getElementById('foto-preview');
    const lang = translations[currentLanguage];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) { // Límite 2MB
        alert('El archivo es demasiado grande (Máx 2MB).');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        fotoBase64 = e.target.result;
        previsualizarFoto(fotoBase64);
    };
    reader.readAsDataURL(file);
}

function previsualizarFoto(base64) {
    const previewDiv = document.getElementById('foto-preview');
    if (base64) {
        previewDiv.innerHTML = `<img src="${base64}" alt="Foto de Perfil" style="max-width: 100%; max-height: 100%; object-fit: cover;">`;
    } else {
        const lang = translations[currentLanguage];
        previewDiv.innerHTML = `<span style="color: #999;" data-i18n="photoPreviewText">${lang['photoPreviewText']}</span>`;
    }
}


// --- Funciones del Modal de Configuración (CORREGIDAS para I18N) ---

function abrirModalConfiguracionCampos(sectionKey) {
    currentSectionToConfigure = sectionKey;
    const lang = translations[currentLanguage];
    const fields = customFieldLabels[sectionKey];
    const container = document.getElementById('config-fields-area');
    container.innerHTML = '';

    // Traducir el título del modal
    const sectionTitleKey = sectionKey.replace(/-/g, '') + 'SectionTitle'; // ej. "workExperienceSectionTitle"
    const titleKey = predefinedFields[sectionKey] ? predefinedFields[sectionKey][0].labelKey.split('Company')[0].split('Institution')[0].split('Name')[0].split('Name')[0] : sectionKey;
    const title = lang[sectionTitleKey] || lang[titleKey] || sectionKey;
    document.querySelector('#fieldConfigModal .modal-title').textContent = `${lang['configureFields']} - ${title}`;

    fields.forEach(field => {
        // (CORREGIDO) Obtener la etiqueta actual (personalizada o traducida)
        const currentLabel = field.customLabel || lang[field.labelKey] || field.key;
        
        const itemHtml = `
            <div class="field-config-item">
                <label for="config-label-${field.key}">${lang['fieldLabel']}:</label>
                <input type="text" id="config-label-${field.key}" value="${currentLabel}">
                
                <div class="label-checkbox">
                    <label for="config-visible-${field.key}">${lang['isVisible']}:</label>
                    <input type="checkbox" id="config-visible-${field.key}" ${field.visible ? 'checked' : ''}>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', itemHtml);
    });

    document.getElementById('fieldConfigModal').style.display = 'flex';
}

function cerrarModalConfiguracionCampos() {
    document.getElementById('fieldConfigModal').style.display = 'none';
    currentSectionToConfigure = '';
}

function guardarConfiguracionCampos() {
    if (!currentSectionToConfigure) return;

    const lang = translations[currentLanguage];

    customFieldLabels[currentSectionToConfigure] = customFieldLabels[currentSectionToConfigure].map(field => {
        const inputElement = document.getElementById(`config-label-${field.key}`);
        const checkboxElement = document.getElementById(`config-visible-${field.key}`);
        
        const newLabel = inputElement.value.trim();
        const defaultLabel = lang[field.labelKey] || field.key;
        
        let customLabel = null; // (CORRECCIÓN)
        if (newLabel !== defaultLabel) {
            customLabel = newLabel; // Solo guardar si es diferente
        }

        return {
            ...field,
            labelKey: field.labelKey, // Mantener la key
            customLabel: customLabel, // Guardar solo si es custom
            visible: checkboxElement.checked
        };
    });

    // Guardar en localStorage
    localStorage.setItem('customFieldLabels', JSON.stringify(customFieldLabels));
    
    // Recargar el formulario para aplicar los cambios (labels y visibilidad)
    const datosActuales = recolectarDatos(true); // Guardar
    cargarDatos(datosActuales); // Recargar
    
    cerrarModalConfiguracionCampos();
}

// --- Funciones de Adición de Items (CORREGIDAS para I18N y Config) ---

// Función auxiliar para generar HTML de campos
function generarCampoHTML(sectionKey, fieldKey, id, value, placeholderKey) {
    const config = obtenerConfigCampo(sectionKey, fieldKey);
    if (!config.visible) return ''; // No renderizar si no es visible

    const lang = translations[currentLanguage];
    const placeholder = lang[placeholderKey] || config.label;
    const inputId = `${sectionKey}-${fieldKey}-${id}`;
    
    const fieldType = (predefinedFields[sectionKey].find(f => f.key === fieldKey) || {}).type || 'text';

    if (fieldType === 'textarea') {
        return `
            <div class="form-group">
                <label for="${inputId}">${config.label}</label>
                <textarea id="${inputId}" class="${sectionKey}-${fieldKey}" placeholder="${placeholder}">${value}</textarea>
            </div>
        `;
    }
    
    return `
        <div class="form-group">
            <label for="${inputId}">${config.label}</label>
            <input type="${fieldType === 'text' ? 'text' : 'text'}" id="${inputId}" class="${sectionKey}-${fieldKey}" placeholder="${placeholder}" value="${value}">
        </div>
    `;
}

function agregarExperiencia(initialData = {}) {
    const container = document.getElementById('experiencias-container');
    const id = contadorExperiencias++;
    const sKey = 'experiencias';

    const html = `
        <div class="dynamic-item" id="${sKey}-${id}">
            <button class="btn btn-remove" onclick="eliminarElemento('${sKey}-${id}')">✖</button>
            <div class="row">
                ${generarCampoHTML(sKey, 'empresa', id, initialData.empresa || '', 'companyPlaceholder')}
                ${generarCampoHTML(sKey, 'cargo', id, initialData.cargo || '', 'positionPlaceholder')}
            </div>
            <div class="row">
                ${generarCampoHTML(sKey, 'fechaInicio', id, initialData.fechaInicio || '', 'startDatePlaceholder')}
                ${generarCampoHTML(sKey, 'fechaFin', id, initialData.fechaFin || '', 'endDatePlaceholder')}
            </div>
            ${generarCampoHTML(sKey, 'ubicacion', id, initialData.ubicacion || '', 'expLocationPlaceholder')}
            ${generarCampoHTML(sKey, 'descripcion', id, initialData.descripcion || '', 'descriptionPlaceholder')}
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function agregarFormacion(initialData = {}) {
    const container = document.getElementById('formacion-container');
    const id = contadorFormacion++;
    const sKey = 'formacion';

    const html = `
        <div class="dynamic-item" id="${sKey}-${id}">
            <button class="btn btn-remove" onclick="eliminarElemento('${sKey}-${id}')">✖</button>
            <div class="row">
                ${generarCampoHTML(sKey, 'institucion', id, initialData.institucion || '', 'institutionPlaceholder')}
                ${generarCampoHTML(sKey, 'titulo', id, initialData.titulo || '', 'degreePlaceholder')}
            </div>
            <div class="row">
                ${generarCampoHTML(sKey, 'anioInicio', id, initialData.anioInicio || '', 'startYearPlaceholder')}
                ${generarCampoHTML(sKey, 'anioFin', id, initialData.anioFin || '', 'endYearPlaceholder')}
            </div>
            ${generarCampoHTML(sKey, 'ubicacion', id, initialData.ubicacion || '', 'eduLocationPlaceholder')}
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function agregarCurso(initialData = {}) {
    const container = document.getElementById('cursos-container');
    const id = contadorCursos++;
    const sKey = 'cursos';

    const html = `
        <div class="dynamic-item" id="${sKey}-${id}">
            <button class="btn btn-remove" onclick="eliminarElemento('${sKey}-${id}')">✖</button>
            <div class="row">
                ${generarCampoHTML(sKey, 'nombre', id, initialData.nombre || '', 'courseNamePlaceholder')}
                ${generarCampoHTML(sKey, 'plataforma', id, initialData.plataforma || '', 'platformPlaceholder')}
            </div>
            ${generarCampoHTML(sKey, 'anio', id, initialData.anio || '', 'yearPlaceholder')}
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function agregarIdioma(initialData = {}) {
    const container = document.getElementById('idiomas-container');
    const id = contadorIdiomas++;
    const sKey = 'idiomas';
    const lang = translations[currentLanguage];

    // HTML para selects (no usan generarCampoHTML estándar)
    const configNivelG = obtenerConfigCampo(sKey, 'nivelGeneral');
    let selectGeneralHTML = '';
    if (configNivelG.visible) {
        const nivelOptions = `
            <option value="">${lang['selectLevel']}</option>
            <option value="Basic" ${initialData.nivelGeneral === 'Basic' || initialData.nivelGeneral === 'Básico' ? 'selected' : ''}>${lang['basicLevel']}</option>
            <option value="Intermediate" ${initialData.nivelGeneral === 'Intermediate' || initialData.nivelGeneral === 'Intermedio' ? 'selected' : ''}>${lang['intermediateLevel']}</option>
            <option value="Advanced" ${initialData.nivelGeneral === 'Advanced' || initialData.nivelGeneral === 'Avanzado' ? 'selected' : ''}>${lang['advancedLevel']}</option>
            <option value="Native" ${initialData.nivelGeneral === 'Native' || initialData.nivelGeneral === 'Nativo' ? 'selected' : ''}>${lang['nativeLevel']}</option>
        `;
        selectGeneralHTML = `
            <div class="form-group">
                <label>${configNivelG.label}</label>
                <select class="${sKey}-nivelGeneral">
                    ${nivelOptions}
                </select>
            </div>
        `;
    }

    const configNivelC = obtenerConfigCampo(sKey, 'nivelCEFR');
    let selectCEFRHTML = '';
    if (configNivelC.visible) {
        const mcerOptions = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(level => 
            `<option value="${level}" ${initialData.nivelCEFR === level ? 'selected' : ''}>${level}</option>`
        ).join('');
        selectCEFRHTML = `
            <div class="form-group">
                <label>${configNivelC.label}</label>
                <select class="${sKey}-nivelCEFR">
                    <option value="">${lang['selectCEFR']}</option>
                    ${mcerOptions}
                </select>
            </div>
        `;
    }

    const html = `
        <div class="dynamic-item" id="${sKey}-${id}">
            <button class="btn btn-remove" onclick="eliminarElemento('${sKey}-${id}')">✖</button>
            <div class="row">
                ${generarCampoHTML(sKey, 'nombre', id, initialData.nombre || '', 'languagePlaceholder')}
            </div>
            <div class="row">
                ${selectGeneralHTML}
                ${selectCEFRHTML}
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function agregarHabilidad(initialData = {}) {
    const container = document.getElementById('habilidades-container');
    const id = contadorHabilidades++;
    const sKey = 'habilidades';

    const html = `
        <div class="dynamic-item" id="${sKey}-${id}">
            <button class="btn btn-remove" onclick="eliminarElemento('${sKey}-${id}')">✖</button>
            ${generarCampoHTML(sKey, 'nombre', id, initialData.nombre || '', 'skillPlaceholder')}
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function eliminarElemento(id) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.remove();
    }
}


// --- Funciones de Secciones Personalizadas (con Borrado) ---

function abrirModalNuevaSeccion() {
    document.getElementById('newSectionModal').style.display = 'flex';
    document.getElementById('nombre-nueva-seccion').value = '';
    document.getElementById('campos-container').innerHTML = ''; // Limpiar campos
    agregarCampo(); // Añadir un campo inicial
}

function cerrarModalNuevaSeccion() {
    document.getElementById('newSectionModal').style.display = 'none';
}

function agregarCampo() {
    const container = document.getElementById('campos-container');
    const campo = document.createElement('div');
    campo.className = 'row campo-item';
    campo.innerHTML = `
        <input type="text" placeholder="Nombre del Campo (Ej: Título)" class="nombre-campo" style="flex: 2;">
        <button class="btn btn-danger" onclick="this.parentNode.remove()">✖</button>
    `;
    container.appendChild(campo);
}

function crearNuevaSeccion() {
    const nombreSeccion = document.getElementById('nombre-nueva-seccion').value.trim();
    if (!nombreSeccion) {
        alert(translations[currentLanguage]['sectionNamePlaceholder']);
        return;
    }

    const campos = Array.from(document.querySelectorAll('#campos-container .nombre-campo'))
        .map(input => input.value.trim())
        .filter(value => value !== '');

    if (campos.length === 0) {
        alert(translations[currentLanguage]['addField']);
        return;
    }

    // Usar la función de importación para crear la sección
    crearSeccionPersonalizadaDesdeImportacion(nombreSeccion, campos, [{}]); // [{}]=un item vacío
    cerrarModalNuevaSeccion();
}

function crearSeccionPersonalizadaDesdeImportacion(nombreSeccion, campos, items) {
    const id = contadorSeccionesPersonalizadas++;
    const seccionId = `custom-section-${id}`;
    const containerId = `container-custom-${id}`;
    const lang = translations[currentLanguage];

    // --- INICIO DE LA CORRECCIÓN ---
    
    // 1. String JSON crudo (para el dataset)
    const camposJsonString = JSON.stringify(campos); 
    
    // 2. String JSON escapado (para inyectar en el HTML del onclick)
    const camposJsonHtmlEscaped = camposJsonString.replace(/"/g, '&quot;');

    const nuevaSeccion = document.createElement('div');
    nuevaSeccion.className = 'cubicle dynamic-section movable-section seccion-personalizada';
    nuevaSeccion.id = seccionId;
    nuevaSeccion.dataset.nombre = nombreSeccion;
    
    // 3. (CORREGIDO) Usar el string JSON crudo para el dataset
    nuevaSeccion.dataset.camposJson = camposJsonString; 

    // --- FIN DE LA CORRECCIÓN ---

    nuevaSeccion.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">${nombreSeccion}</h2>
            
            <div>
                <div class="section-controls-move">
                    <button class="btn btn-move" onclick="moverSeccion('${seccionId}', 'up')">▲</button>
                    <button class="btn btn-move" onclick="moverSeccion('${seccionId}', 'down')">▼</button>
                </div>
                <button class="btn btn-danger btn-remove-section" onclick="eliminarSeccionPersonalizada('${seccionId}')" title="${lang['deleteSection']}">✖</button>
            </div>
        </div>
        <div id="${containerId}">
            </div>
        <button class="btn btn-add" onclick="agregarItemSeccionPersonalizada('${containerId}', ${camposJsonHtmlEscaped})">+ ${lang['add']}</button>
    `;

    document.getElementById('sections-container').appendChild(nuevaSeccion);

    // Agregar los items (cargados o uno vacío)
    if (items && items.length > 0) {
        items.forEach(itemData => agregarItemSeccionPersonalizada(containerId, campos, itemData));
    }
}


function agregarItemSeccionPersonalizada(containerId, campos, initialData = {}) {
    const container = document.getElementById(containerId);
    if (!container) return; // Añadido chequeo de seguridad
    
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    let camposHTML = '';

    campos.forEach(campo => {
        // Usar el nombre del campo como clave
        const valor = initialData[campo] || '';
        camposHTML += `
            <div class="form-group">
                <label>${campo}</label>
                <input type="text" data-campo="${campo}" value="${valor}" placeholder="${campo}">
            </div>
        `;
    });

    const item = document.createElement('div');
    item.className = 'dynamic-item';
    item.id = `custom-item-${id}`;
    item.innerHTML = `
        <button class="btn btn-remove" onclick="eliminarElemento('custom-item-${id}')">✖</button>
        ${camposHTML}
    `;
    container.appendChild(item);
}

function eliminarSeccionPersonalizada(idSeccion) {
    const lang = translations[currentLanguage];
    if (confirm(lang['confirmDeleteSection'])) {
        document.getElementById(idSeccion)?.remove();
    }
}


// --- Lógica de Arrastre (Mover Secciones) ---

function moverSeccion(id, direccion) {
    const seccion = document.getElementById(id);
    if (!seccion) return;
    const contenedor = document.getElementById('sections-container');
    
    if (direccion === 'up') {
        const anterior = seccion.previousElementSibling;
        // Solo mover si el anterior existe y es una sección movible
        if (anterior && anterior.classList.contains('movable-section')) {
            contenedor.insertBefore(seccion, anterior);
        }
    } else if (direccion === 'down') {
        const siguiente = seccion.nextElementSibling;
        // Mover solo si el siguiente existe y es una sección movible
        if (siguiente && siguiente.classList.contains('movable-section')) {
            contenedor.insertBefore(siguiente, seccion);
        }
    }
    // Guardar el nuevo orden
    recolectarDatos(true);
}


// --- Lógica de Previsualización y PDF ---

function abrirPreviewCV() {
    const datos = recolectarDatos(true); // Guardar antes de previsualizar
    const cvPreviewArea = document.getElementById('cv-preview-area');
    cvPreviewArea.innerHTML = generarHTMLCV(datos);
    document.getElementById('previewModal').style.display = 'flex';
}

function cerrarPreviewModal() {
    document.getElementById('previewModal').style.display = 'none';
    document.getElementById('cv-preview-area').innerHTML = '';
}

function confirmarGenerarPDF() {
    const cvPreviewArea = document.getElementById('cv-preview-area');
    const datos = recolectarDatos(true);
    
    // (Asegura el B&N para el PDF)
    cvPreviewArea.innerHTML = generarHTMLCV(datos, true); // true = modo PDF B&N

    const options = {
        margin: [10, 10, 10, 10],
        filename: `${(datos.informacionPersonal.nombre || 'CV').replace(/\s+/g, '_')}_CV.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(cvPreviewArea).set(options).save()
        .then(() => {
            alert('PDF generado exitosamente.');
            // Restaurar la vista previa a color
            cvPreviewArea.innerHTML = generarHTMLCV(datos, false);
            cerrarPreviewModal();
        })
        .catch(error => {
            alert('Error al generar el PDF.');
            console.error(error);
            // Restaurar la vista previa a color
            cvPreviewArea.innerHTML = generarHTMLCV(datos, false);
            cerrarPreviewModal();
        });
}

// Función que genera el HTML del CV (MODIFICADA para B&N en PDF)
function generarHTMLCV(datos, modoPDF = false) {
    
    // (CORREGIDO) Forzar B&N solo en modo PDF
    const COLOR_PRINCIPAL = modoPDF ? '#000000' : '#4a4a4a';
    const COLOR_TEXTO = modoPDF ? '#000000' : '#333333';
    const COLOR_SEGUNDARIO = modoPDF ? '#000000' : '#000000';
    const LINE_COLOR = modoPDF ? '#000000' : '#4a4a4a';
    const FOTO_STYLE = modoPDF ? 'filter: grayscale(100%); border: 3px solid #000000;' : 'border: 3px solid #4a4a4a;';
    
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
    const titles = translations[currentLanguage];

    // --- INICIO DEL TEMPLATE HTML DEL CV ---
    
    // --- Header ---
    let headerHTML = `
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
                    <div style="width: 100px; height: 120px; border-radius: 5px; overflow: hidden; flex-shrink: 0; margin-left: 20px; ${FOTO_STYLE}">
                        <img src="${datos.informacionPersonal.fotoBase64}" alt="Foto" 
                            style="width: 100%; height: 100%; object-fit: cover; display: block;"/>
                    </div>
                ` : ''}
            </div>
            <hr style="border: none; border-top: 1px solid #ccc; margin-top: 10px;"/>
        </header>
    `;

    // --- Preparar el HTML de las secciones (usando la configuración de visibilidad) ---
    
    let objetivoHTML = '';
    if (datos.objetivo) {
        objetivoHTML = `
            <section style="margin-bottom: 30px;" id="cv-objetivo">
                ${generarTituloSeccion(titles.professionalObjective)}
                <p style="font-size: 1em;">${datos.objetivo}</p>
            </section>
        `;
    }

    let experienciaHTML = '';
    if (datos.experiencias.length > 0 && datos.experiencias.some(e => e.empresa || e.cargo)) {
        experienciaHTML = `
            <section style="margin-bottom: 30px;" id="cv-experiencia">
                ${generarTituloSeccion(titles.workExperience)}
                ${datos.experiencias.map(exp => {
                    let item = '<div style="display: flex; justify-content: space-between; align-items: flex-start;">';
                    let titulo = '';
                    if (obtenerConfigCampo('experiencias', 'cargo').visible) titulo += `<strong>${exp.cargo || ''}</strong>`;
                    if (obtenerConfigCampo('experiencias', 'empresa').visible) titulo += `, ${exp.empresa || ''}`;
                    item += `<h3 style="margin: 0; font-size: 1.1em; color: ${COLOR_TEXTO};">${titulo}</h3>`;

                    let fechas = '';
                    if (obtenerConfigCampo('experiencias', 'fechaInicio').visible) fechas += exp.fechaInicio;
                    if (obtenerConfigCampo('experiencias', 'fechaFin').visible) fechas += ` - ${exp.fechaFin}`;
                    item += `<span style="font-size: 0.95em; color: ${COLOR_TEXTO}; font-style: italic; white-space: nowrap; padding-left: 10px;">${fechas}</span>`;
                    
                    item += '</div>'; // Cierre del div flex
                    
                    if (obtenerConfigCampo('experiencias', 'ubicacion').visible && exp.ubicacion) {
                        item += `<p style="margin: 0; font-size: 0.95em; color: #666;">${exp.ubicacion}</p>`;
                    }
                    if (obtenerConfigCampo('experiencias', 'descripcion').visible && exp.descripcion) {
                        item += formatDescription(exp.descripcion);
                    }
                    return `<div style="margin-bottom: 20px;">${item}</div>`;
                }).join('')}
            </section>
        `;
    }
    
    let formacionHTML = '';
    if (datos.formacion.length > 0 && datos.formacion.some(f => f.institucion || f.titulo)) {
        formacionHTML = `
            <section style="margin-bottom: 30px;" id="cv-formacion">
                ${generarTituloSeccion(titles.education)}
                ${datos.formacion.map(form => {
                    let item = '<div style="display: flex; justify-content: space-between; align-items: flex-start;">';
                    let titulo = '';
                    if (obtenerConfigCampo('formacion', 'institucion').visible) titulo += `<strong>${form.institucion}</strong>`;
                    item += `<h3 style="margin: 0; font-size: 1.1em; color: ${COLOR_TEXTO};">${titulo}</h3>`;

                    let fechas = '';
                    if (obtenerConfigCampo('formacion', 'anioInicio').visible) fechas += form.anioInicio;
                    if (obtenerConfigCampo('formacion', 'anioFin').visible) fechas += ` - ${form.anioFin}`;
                    item += `<span style="font-size: 0.95em; color: ${COLOR_TEXTO}; font-style: italic; white-space: nowrap; padding-left: 10px;">${fechas}</span>`;
                    
                    item += '</div>'; // Cierre del div flex

                    let subtitulo = '';
                    if (obtenerConfigCampo('formacion', 'titulo').visible) subtitulo += form.titulo;
                    if (obtenerConfigCampo('formacion', 'ubicacion').visible) subtitulo += ` | ${form.ubicacion}`;
                    item += `<p style="margin: 0; font-size: 1em; color: #666;">${subtitulo}</p>`;

                    return `<div style="margin-bottom: 15px;">${item}</div>`;
                }).join('')}
            </section>
        `;
    }

    let habilidadesHTML = '';
    if (datos.habilidades.length > 0 && obtenerConfigCampo('habilidades', 'nombre').visible) {
        habilidadesHTML = `
            <section style="margin-bottom: 30px;" id="cv-habilidades">
                ${generarTituloSeccion(titles.skills)}
                <p style="font-size: 1em; line-height: 1.8;">
                    ${datos.habilidades.map(hab => `<strong>${hab.nombre}</strong>`).join(' | ')}
                </p>
            </section>
        `;
    }
    
    let cursosHTML = '';
    if (datos.cursos.length > 0 && datos.cursos.some(c => c.nombre)) {
        cursosHTML = `
            <section style="margin-bottom: 30px;" id="cv-cursos">
                ${generarTituloSeccion(titles.coursesCertifications)}
                <ul style="list-style-type: disc; padding-left: 20px; margin: 0;">
                    ${datos.cursos.map(curso => {
                        let item = '';
                        if (obtenerConfigCampo('cursos', 'nombre').visible) item += `<strong>${curso.nombre}</strong>`;
                        if (obtenerConfigCampo('cursos', 'plataforma').visible) item += ` - ${curso.plataforma}`;
                        if (obtenerConfigCampo('cursos', 'anio').visible) item += ` (${curso.anio})`;
                        return `<li style="margin-bottom: 5px; font-size: 0.95em;">${item}</li>`;
                    }).join('')}
                </ul>
            </section>
        `;
    }

    let idiomasHTML = '';
    if (datos.idiomas.length > 0 && datos.idiomas.some(i => i.nombre)) {
        idiomasHTML = `
            <section style="margin-bottom: 30px;" id="cv-idiomas">
                ${generarTituloSeccion(titles.languages)}
                <ul style="list-style-type: none; padding-left: 0; margin: 0;">
                    ${datos.idiomas.map(idioma => {
                         let item = '';
                         if (obtenerConfigCampo('idiomas', 'nombre').visible) item += `<strong>${idioma.nombre}</strong>: `;
                         item += formatNivelIdioma(
                             obtenerConfigCampo('idiomas', 'nivelGeneral').visible ? idioma.nivelGeneral : '',
                             obtenerConfigCampo('idiomas', 'nivelCEFR').visible ? idioma.nivelCEFR : ''
                         );
                        return `<li style="margin-bottom: 5px; font-size: 0.95em;">${item}</li>`;
                    }).join('')}
                </ul>
            </section>
        `;
    }

    // Mapear las secciones a sus IDs para el orden
    const seccionesHTML = {
        'objetivo-cubicle': objetivoHTML,
        'experiencias-main-cubicle': experienciaHTML,
        'formacion-main-cubicle': formacionHTML,
        'habilidades-main-cubicle': habilidadesHTML,
        'cursos-main-cubicle': cursosHTML,
        'idiomas-main-cubicle': idiomasHTML
    };
    
    // Añadir secciones personalizadas al mapa
    Object.entries(datos.seccionesPersonalizadas).forEach(([nombreSeccion, seccionData]) => {
        // Encontrar el ID de la sección en el DOM para el orden
        const seccionDOM = Array.from(document.querySelectorAll('.seccion-personalizada')).find(s => s.dataset.nombre === nombreSeccion);
        const seccionId = seccionDOM ? seccionDOM.id : `custom-${nombreSeccion}`;
        
        let itemsHTML = seccionData.items.map(item => {
            let itemHtml = '<div style="margin-bottom: 15px;">';
            seccionData.campos.forEach(campo => {
                 const valor = item[campo] || '';
                 if (valor) {
                    itemHtml += `<p style="margin: 2px 0; font-size: 0.95em;"><strong>${campo}</strong>: ${valor}</p>`;
                 }
            });
            itemHtml += '</div>';
            return itemHtml;
        }).join('');

        if(itemsHTML.trim() !== ''){
            seccionesHTML[seccionId] = `
                <section style="margin-bottom: 30px;" id="cv-${seccionId}">
                    ${generarTituloSeccion(nombreSeccion)}
                    ${itemsHTML}
                </section>
            `;
        }
    });
    
    let cuerpoCVHTML = '';
    // Construir el cuerpo del CV usando el orden guardado
    datos.seccionesOrden.forEach(id => {
        if (id !== 'personal-info-cubicle' && seccionesHTML[id]) {
            cuerpoCVHTML += seccionesHTML[id];
        }
    });


    // --- TEMPLATE HTML DEL CV ---
    let html = `
        <div class="cv-document" style="font-family: 'Arial', sans-serif; font-size: 11pt; color: ${COLOR_TEXTO}; line-height: 1.4; padding: 40px; position: relative;">
            ${headerHTML}
            <main>
                ${cuerpoCVHTML}
            </main>
        </div>
    `;
    return html;
}

// --- Inicialización ---
document.addEventListener('DOMContentLoaded', function() {
    // (CORREGIDO) Cargar config desde localStorage PRIMERO
    const savedConfig = JSON.parse(localStorage.getItem('customFieldLabels'));
    initializeCustomFieldLabels(savedConfig);

    const datosGuardados = localStorage.getItem('cvData');
    
    // (CORREGIDO) Cargar idioma antes de cargar datos (para que los labels se carguen bien)
    currentLanguage = localStorage.getItem('cvLanguage') || 'es';
    document.getElementById('languageSelect').value = currentLanguage;
    aplicarIdioma(); // Aplicar idioma ANTES de cargar datos

    if (datosGuardados) {
        // Si hay datos guardados, cargarlos
        cargarDatos(JSON.parse(datosGuardados));
    } else {
        // Si no hay datos, inicializar con un item vacío
        limpiarFormulario(false); // false = no preguntar
    }
    
    // Aplicar idioma de nuevo por si acaso (asegura labels de items)
    aplicarIdioma();
});