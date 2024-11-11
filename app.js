"use strict";
var ResumeBuilder = /** @class */ (function () {
    function ResumeBuilder() {
        this.resumeData = {
            name: '',
            email: '',
            phone: '',
            location: '',
            education: [],
            experience: [],
            skills: []
        };
        this.resumeForm = document.getElementById('resumeBuilderForm');
        this.resumePreview = document.getElementById('resumePreview');
        this.resumeContent = document.getElementById('resumeContent');
        this.initEventListeners();
    }
    ResumeBuilder.prototype.initEventListeners = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h;
        (_a = document.getElementById('createResumeBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return _this.showForm(); });
        (_b = document.getElementById('editResumeBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return _this.editResume(); });
        (_c = document.getElementById('shareResumeBtn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return _this.shareResume(); });
        this.resumeForm.addEventListener('submit', function (e) { return _this.handleFormSubmit(e); });
        (_d = document.getElementById('addEducation')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () { return _this.addEducationField(); });
        (_e = document.getElementById('addExperience')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () { return _this.addExperienceField(); });
        (_f = document.getElementById('editResume')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', function () { return _this.editResume(); });
        (_g = document.getElementById('downloadResume')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', function () { return _this.downloadResume(); });
        (_h = document.getElementById('copyLink')) === null || _h === void 0 ? void 0 : _h.addEventListener('click', function () { return _this.copyResumeLink(); });
    };
    ResumeBuilder.prototype.showForm = function () {
        var _a;
        (_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
        this.resumePreview.classList.add('hidden');
    };
    ResumeBuilder.prototype.editResume = function () {
        this.showForm();
        this.populateFormWithData();
    };
    ResumeBuilder.prototype.shareResume = function () {
        var currentUrl = window.location.href;
        alert("Share your resume using this link: ".concat(currentUrl));
    };
    ResumeBuilder.prototype.handleFormSubmit = function (e) {
        var _a;
        e.preventDefault();
        this.collectFormData();
        this.generateResume();
        this.resumeForm.reset();
        (_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
        this.resumePreview.classList.remove('hidden');
    };
    ResumeBuilder.prototype.collectFormData = function () {
        var formData = new FormData(this.resumeForm);
        this.resumeData.name = formData.get('name');
        this.resumeData.email = formData.get('email');
        this.resumeData.phone = formData.get('phone');
        this.resumeData.location = formData.get('location');
        this.resumeData.skills = formData.get('skills').split(',').map(function (skill) { return skill.trim(); });
        this.resumeData.education = this.collectEducationData();
        this.resumeData.experience = this.collectExperienceData();
    };
    ResumeBuilder.prototype.collectEducationData = function () {
        var _this = this;
        var educationEntries = document.querySelectorAll('.education-entry');
        return Array.from(educationEntries).map(function (entry) {
            return {
                id: entry.dataset.id || _this.generateUniqueId(),
                school: entry.querySelector('[name="school"]').value,
                degree: entry.querySelector('[name="degree"]').value,
                graduationYear: entry.querySelector('[name="graduationYear"]').value
            };
        });
    };
    ResumeBuilder.prototype.collectExperienceData = function () {
        var _this = this;
        var experienceEntries = document.querySelectorAll('.experience-entry');
        return Array.from(experienceEntries).map(function (entry) {
            return {
                id: entry.dataset.id || _this.generateUniqueId(),
                company: entry.querySelector('[name="company"]').value,
                position: entry.querySelector('[name="position"]').value,
                startDate: entry.querySelector('[name="startDate"]').value,
                endDate: entry.querySelector('[name="endDate"]').value,
                description: entry.querySelector('[name="description"]').value
            };
        });
    };
    ResumeBuilder.prototype.generateResume = function () {
        this.resumeContent.innerHTML = "\n            <div class=\"resume-container\">\n                <div class=\"resume-header\">\n                    <h1 class=\"resume-name\">".concat(this.resumeData.name, "</h1>\n                    <div class=\"resume-contact\">\n                        ").concat(this.resumeData.email, " | ").concat(this.resumeData.phone, " | ").concat(this.resumeData.location, "\n                    </div>\n                </div>\n\n                <div class=\"resume-section\">\n                    <h2>Education</h2>\n                    <div class=\"education-list\">\n                        ").concat(this.resumeData.education.map(function (edu) { return "\n                            <div class=\"education-item\">\n                                <div class=\"education-header\">\n                                    <span class=\"school\">".concat(edu.school, "</span>\n                                    <span class=\"graduation-year\">").concat(edu.graduationYear, "</span>\n                                </div>\n                                <div class=\"degree\">").concat(edu.degree, "</div>\n                            </div>\n                        "); }).join(''), "\n                    </div>\n                </div>\n\n                <div class=\"resume-section\">\n                    <h2>Professional Experience</h2>\n                    <div class=\"experience-list\">\n                        ").concat(this.resumeData.experience.map(function (exp) { return "\n                            <div class=\"experience-item\">\n                                <div class=\"experience-header\">\n                                    <span class=\"company\">".concat(exp.company, "</span>\n                                    <span class=\"dates\">").concat(exp.startDate, " - ").concat(exp.endDate, "</span>\n                                </div>\n                                <div class=\"position\">").concat(exp.position, "</div>\n                                <div class=\"description\">").concat(exp.description, "</div>\n                            </div>\n                        "); }).join(''), "\n                    </div>\n                </div>\n\n                <div class=\"resume-section\">\n                    <h2>Skills</h2>\n                    <ul class=\"skills-list\">\n                        ").concat(this.resumeData.skills.map(function (skill) { return "\n                            <li>".concat(skill, "</li>\n                        "); }).join(''), "\n                    </ul>\n                </div>\n            </div>\n        ");
    };
    ResumeBuilder.prototype.addEducationField = function () {
        var educationEntries = document.getElementById('educationEntries');
        var newEntry = document.createElement('div');
        var id = this.generateUniqueId();
        newEntry.classList.add('education-entry');
        newEntry.dataset.id = id;
        newEntry.innerHTML = "\n            <div class=\"entry-content\">\n                <input type=\"text\" name=\"school\" placeholder=\"School Name\" required class=\"form-input\">\n                <input type=\"text\" name=\"degree\" placeholder=\"Degree\" required class=\"form-input\">\n                <input type=\"text\" name=\"graduationYear\" placeholder=\"Graduation Year\" required class=\"form-input\">\n                <div class=\"entry-actions\">\n                    <button type=\"button\" class=\"btn btn-delete\" onclick=\"this.closest('.education-entry').remove()\">\n                        Delete Entry\n                    </button>\n                </div>\n            </div>\n        ";
        educationEntries === null || educationEntries === void 0 ? void 0 : educationEntries.appendChild(newEntry);
    };
    ResumeBuilder.prototype.addExperienceField = function () {
        var experienceEntries = document.getElementById('experienceEntries');
        var newEntry = document.createElement('div');
        var id = this.generateUniqueId();
        newEntry.classList.add('experience-entry');
        newEntry.dataset.id = id;
        newEntry.innerHTML = "\n            <div class=\"entry-content\">\n                <input type=\"text\" name=\"company\" placeholder=\"Company Name\" required class=\"form-input\">\n                <input type=\"text\" name=\"position\" placeholder=\"Position\" required class=\"form-input\">\n                <input type=\"text\" name=\"startDate\" placeholder=\"Start Date\" required class=\"form-input\">\n                <input type=\"text\" name=\"endDate\" placeholder=\"End Date\" required class=\"form-input\">\n                <textarea name=\"description\" placeholder=\"Job Description\" required class=\"form-input\"></textarea>\n                <div class=\"entry-actions\">\n                    <button type=\"button\" class=\"btn btn-delete\" onclick=\"this.closest('.experience-entry').remove()\">\n                        Delete Entry\n                    </button>\n                </div>\n            </div>\n        ";
        experienceEntries === null || experienceEntries === void 0 ? void 0 : experienceEntries.appendChild(newEntry);
    };
    ResumeBuilder.prototype.generateUniqueId = function () {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };
    ResumeBuilder.prototype.downloadResume = function () {
        var element = document.getElementById('resumeContent');
        if (element) {
            var filename = "".concat(this.resumeData.name.replace(/\s+/g, '_'), "_resume.pdf");
            var worker = html2pdf().set({
                margin: 1,
                filename: filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            });
            worker.from(element).save();
        }
    };
    ResumeBuilder.prototype.copyResumeLink = function () {
        var currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(function () {
            alert('Resume link copied to clipboard!');
        }).catch(function (err) {
            console.error('Failed to copy link: ', err);
        });
    };
    ResumeBuilder.prototype.populateFormWithData = function () {
        var _this = this;
        document.getElementById('name').value = this.resumeData.name;
        document.getElementById('email').value = this.resumeData.email;
        document.getElementById('phone').value = this.resumeData.phone;
        document.getElementById('location').value = this.resumeData.location;
        var educationEntries = document.getElementById('educationEntries');
        educationEntries.innerHTML = '';
        this.resumeData.education.forEach(function (edu) {
            _this.addEducationField();
            var lastEntry = educationEntries === null || educationEntries === void 0 ? void 0 : educationEntries.lastElementChild;
            (lastEntry === null || lastEntry === void 0 ? void 0 : lastEntry.querySelector('[name="school"]')).value = edu.school;
            (lastEntry === null || lastEntry === void 0 ? void 0 : lastEntry.querySelector('[name="degree"]')).value = edu.degree;
            (lastEntry === null || lastEntry === void 0 ? void 0 : lastEntry.querySelector('[name="graduationYear"]')).value = edu.graduationYear;
        });
        var experienceEntries = document.getElementById('experienceEntries');
        experienceEntries.innerHTML = '';
        this.resumeData.experience.forEach(function (exp) {
            _this.addExperienceField();
            var lastEntry = experienceEntries === null || experienceEntries === void 0 ? void 0 : experienceEntries.lastElementChild;
            (lastEntry === null || lastEntry === void 0 ? void 0 : lastEntry.querySelector('[name="company"]')).value = exp.company;
            (lastEntry === null || lastEntry === void 0 ? void 0 : lastEntry.querySelector('[name="position"]')).value = exp.position;
            (lastEntry === null || lastEntry === void 0 ? void 0 : lastEntry.querySelector('[name="startDate"]')).value = exp.startDate;
            (lastEntry === null || lastEntry === void 0 ? void 0 : lastEntry.querySelector('[name="endDate"]')).value = exp.endDate;
            (lastEntry === null || lastEntry === void 0 ? void 0 : lastEntry.querySelector('[name="description"]')).value = exp.description;
        });
        document.getElementById('skills').value = this.resumeData.skills.join(', ');
    };
    return ResumeBuilder;
}());
// Initialize the ResumeBuilder when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    new ResumeBuilder();
});
