"use strict";
class ResumeBuilder {
    constructor() {
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
    initEventListeners() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        (_a = document.getElementById('createResumeBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => this.showForm());
        (_b = document.getElementById('editResumeBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => this.editResume());
        (_c = document.getElementById('shareResumeBtn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => this.shareResume());
        this.resumeForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        (_d = document.getElementById('addEducation')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => this.addEducationField());
        (_e = document.getElementById('addExperience')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', () => this.addExperienceField());
        (_f = document.getElementById('editResume')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', () => this.editResume());
        (_g = document.getElementById('downloadResume')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', () => this.downloadResume());
        (_h = document.getElementById('copyLink')) === null || _h === void 0 ? void 0 : _h.addEventListener('click', () => this.copyResumeLink());
    }
    showForm() {
        var _a;
        (_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
        this.resumePreview.classList.add('hidden');
    }
    editResume() {
        this.showForm();
        // Populate form with existing data
        this.populateFormWithData();
    }
    shareResume() {
        const username = this.resumeData.name.toLowerCase().replace(/\s+/g, '-');
        const uniqueUrl = `${window.location.origin}/${username}/resume`;
        alert(`Share your resume using this link: ${uniqueUrl}`);
    }
    handleFormSubmit(e) {
        var _a;
        e.preventDefault();
        this.collectFormData();
        this.generateResume();
        this.resumeForm.reset();
        (_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
        this.resumePreview.classList.remove('hidden');
    }
    collectFormData() {
        const formData = new FormData(this.resumeForm);
        this.resumeData.name = formData.get('name');
        this.resumeData.email = formData.get('email');
        this.resumeData.phone = formData.get('phone');
        this.resumeData.location = formData.get('location');
        this.resumeData.skills = formData.get('skills').split(',').map(skill => skill.trim());
        // Collect education and experience data
        this.resumeData.education = this.collectEducationData();
        this.resumeData.experience = this.collectExperienceData();
    }
    collectEducationData() {
        const educationEntries = document.querySelectorAll('.education-entry');
        return Array.from(educationEntries).map(entry => {
            return {
                school: entry.querySelector('[name="school"]').value,
                degree: entry.querySelector('[name="degree"]').value,
                graduationYear: entry.querySelector('[name="graduationYear"]').value
            };
        });
    }
    collectExperienceData() {
        const experienceEntries = document.querySelectorAll('.experience-entry');
        return Array.from(experienceEntries).map(entry => {
            return {
                company: entry.querySelector('[name="company"]').value,
                position: entry.querySelector('[name="position"]').value,
                startDate: entry.querySelector('[name="startDate"]').value,
                endDate: entry.querySelector('[name="endDate"]').value,
                description: entry.querySelector('[name="description"]').value
            };
        });
    }
    generateResume() {
        this.resumeContent.innerHTML = `
            <h2>${this.resumeData.name}</h2>
            <p>${this.resumeData.email} | ${this.resumeData.phone} | ${this.resumeData.location}</p>
            <h3>Education</h3>
            <ul>
                ${this.resumeData.education.map(edu => `
                    <li>${edu.school} - ${edu.degree} (${edu.graduationYear})</li>
                `).join('')}
            </ul>
            <h3>Work Experience</h3>
            <ul>
                ${this.resumeData.experience.map(exp => `
                    <li>
                        <h4>${exp.position} at ${exp.company}</h4>
                        <p>${exp.startDate} - ${exp.endDate}</p>
                        <p>${exp.description}</p>
                    </li>
                `).join('')}
            </ul>
            <h3>Skills</h3>
            <p>${this.resumeData.skills.join(', ')}</p>
        `;
    }
    addEducationField() {
        const educationEntries = document.getElementById('educationEntries');
        const newEntry = document.createElement('div');
        newEntry.classList.add('education-entry');
        newEntry.innerHTML = `
            <input type="text" name="school" placeholder="School Name" required>
            <input type="text" name="degree" placeholder="Degree" required>
            <input type="text" name="graduationYear" placeholder="Graduation Year" required>
        `;
        educationEntries === null || educationEntries === void 0 ? void 0 : educationEntries.appendChild(newEntry);
    }
    addExperienceField() {
        const experienceEntries = document.getElementById('experienceEntries');
        const newEntry = document.createElement('div');
        newEntry.classList.add('experience-entry');
        newEntry.innerHTML = `
            <input type="text" name="company" placeholder="Company Name" required>
            <input type="text" name="position" placeholder="Position" required>
            <input type="text" name="startDate" placeholder="Start Date" required>
            <input type="text" name="endDate" placeholder="End Date" required>
            <textarea name="description" placeholder="Job Description" required></textarea>
        `;
        experienceEntries === null || experienceEntries === void 0 ? void 0 : experienceEntries.appendChild(newEntry);
    }
    populateFormWithData() {
        // Populate personal information
        document.getElementById('name').value = this.resumeData.name;
        document.getElementById('email').value = this.resumeData.email;
        document.getElementById('phone').value = this.resumeData.phone;
        document.getElementById('location').value = this.resumeData.location;
        // Populate education
        const educationEntries = document.getElementById('educationEntries');
        educationEntries.innerHTML = '';
        this.resumeData.education.forEach(edu => {
            this.addEducationField();
            const lastEntry = educationEntries === null || educationEntries === void 0 ? void 0 : educationEntries.lastElementChild;
            (lastEntry === null || lastEntry === void 0 ? void 0 : lastEntry.querySelector('[name="school"]')).value = edu.school;
            (lastEntry === null || lastEntry === void 0 ? void 0 : lastEntry.querySelector('[name="degree"]')).value = edu.degree;
            (lastEntry === null || lastEntry === void 0 ? void 0 : lastEntry.querySelector('[name="graduationYear"]')).value = edu.graduationYear;
        });
        // Populate experience
        const experienceEntries = document.getElementById('experienceEntries');
        experienceEntries.innerHTML = '';
        this.resumeData.experience.forEach(exp => {
            this.addExperienceField();
            const lastEntry = experienceEntries === null || experienceEntries === void 0 ? void 0 : experienceEntries.lastElementChild;
            (lastEntry === null || lastEntry === void 0 ? void 0 : lastEntry.querySelector('[name="company"]')).value = exp.company;
            (lastEntry === null || lastEntry === void 0 ? void 0 : lastEntry.querySelector('[name="position"]')).value = exp.position;
            (lastEntry === null || lastEntry === void 0 ? void 0 : lastEntry.querySelector('[name="startDate"]')).value = exp.startDate;
            (lastEntry === null || lastEntry === void 0 ? void 0 : lastEntry.querySelector('[name="endDate"]')).value = exp.endDate;
            (lastEntry === null || lastEntry === void 0 ? void 0 : lastEntry.querySelector('[name="description"]')).value = exp.description;
        });
        // Populate skills
        document.getElementById('skills').value = this.resumeData.skills.join(', ');
    }
    downloadResume() {
        const resumeContent = this.resumeContent.innerHTML;
        const blob = new Blob([`<html><body>${resumeContent}</body></html>`], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.resumeData.name.replace(/\s+/g, '_')}_resume.html`;
        a.click();
        URL.revokeObjectURL(url);
    }
    copyResumeLink() {
        const username = this.resumeData.name.toLowerCase().replace(/\s+/g, '-');
        const uniqueUrl = `${window.location.origin}/${username}/resume`;
        navigator.clipboard.writeText(uniqueUrl).then(() => {
            alert('Resume link copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy link: ', err);
        });
    }
}
// Initialize the ResumeBuilder when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ResumeBuilder();
});
