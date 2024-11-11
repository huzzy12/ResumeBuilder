interface ResumeData {
    name: string;
    email: string;
    phone: string;
    location: string;
    education: EducationEntry[];
    experience: ExperienceEntry[];
    skills: string[];
}

interface EducationEntry {
    id: string;
    school: string;
    degree: string;
    graduationYear: string;
}

interface ExperienceEntry {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
}

class ResumeBuilder {
    private resumeData: ResumeData;
    private resumeForm: HTMLFormElement;
    private resumePreview: HTMLElement;
    private resumeContent: HTMLElement;

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

        this.resumeForm = document.getElementById('resumeBuilderForm') as HTMLFormElement;
        this.resumePreview = document.getElementById('resumePreview') as HTMLElement;
        this.resumeContent = document.getElementById('resumeContent') as HTMLElement;

        this.initEventListeners();
    }

    private initEventListeners(): void {
        document.getElementById('createResumeBtn')?.addEventListener('click', () => this.showForm());
        document.getElementById('editResumeBtn')?.addEventListener('click', () => this.editResume());
        document.getElementById('shareResumeBtn')?.addEventListener('click', () => this.shareResume());

        this.resumeForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        document.getElementById('addEducation')?.addEventListener('click', () => this.addEducationField());
        document.getElementById('addExperience')?.addEventListener('click', () => this.addExperienceField());

        document.getElementById('editResume')?.addEventListener('click', () => this.editResume());
        document.getElementById('downloadResume')?.addEventListener('click', () => this.downloadResume());
        document.getElementById('copyLink')?.addEventListener('click', () => this.copyResumeLink());
    }

    private showForm(): void {
        document.getElementById('resumeForm')?.classList.remove('hidden');
        this.resumePreview.classList.add('hidden');
    }

    private editResume(): void {
        this.showForm();
        this.populateFormWithData();
    }

    private shareResume(): void {
        const currentUrl = window.location.href;
        alert(`Share your resume using this link: ${currentUrl}`);
    }

    private handleFormSubmit(e: Event): void {
        e.preventDefault();
        this.collectFormData();
        this.generateResume();
        this.resumeForm.reset();
        document.getElementById('resumeForm')?.classList.add('hidden');
        this.resumePreview.classList.remove('hidden');
    }

    private collectFormData(): void {
        const formData = new FormData(this.resumeForm);
        this.resumeData.name = formData.get('name') as string;
        this.resumeData.email = formData.get('email') as string;
        this.resumeData.phone = formData.get('phone') as string;
        this.resumeData.location = formData.get('location') as string;
        this.resumeData.skills = (formData.get('skills') as string).split(',').map(skill => skill.trim());

        this.resumeData.education = this.collectEducationData();
        this.resumeData.experience = this.collectExperienceData();
    }

    private collectEducationData(): EducationEntry[] {
        const educationEntries = document.querySelectorAll('.education-entry');
        return Array.from(educationEntries).map((entry): EducationEntry => {
            return {
                id: (entry as HTMLElement).dataset.id || this.generateUniqueId(),
                school: (entry.querySelector('[name="school"]') as HTMLInputElement).value,
                degree: (entry.querySelector('[name="degree"]') as HTMLInputElement).value,
                graduationYear: (entry.querySelector('[name="graduationYear"]') as HTMLInputElement).value
            };
        });
    }

    private collectExperienceData(): ExperienceEntry[] {
        const experienceEntries = document.querySelectorAll('.experience-entry');
        return Array.from(experienceEntries).map((entry): ExperienceEntry => {
            return {
                id: (entry as HTMLElement).dataset.id || this.generateUniqueId(),
                company: (entry.querySelector('[name="company"]') as HTMLInputElement).value,
                position: (entry.querySelector('[name="position"]') as HTMLInputElement).value,
                startDate: (entry.querySelector('[name="startDate"]') as HTMLInputElement).value,
                endDate: (entry.querySelector('[name="endDate"]') as HTMLInputElement).value,
                description: (entry.querySelector('[name="description"]') as HTMLTextAreaElement).value
            };
        });
    }

    private generateResume(): void {
        this.resumeContent.innerHTML = `
            <div class="resume-container">
                <div class="resume-header">
                    <h1 class="resume-name">${this.resumeData.name}</h1>
                    <div class="resume-contact">
                        ${this.resumeData.email} | ${this.resumeData.phone} | ${this.resumeData.location}
                    </div>
                </div>

                <div class="resume-section">
                    <h2>Education</h2>
                    <div class="education-list">
                        ${this.resumeData.education.map((edu: EducationEntry) => `
                            <div class="education-item">
                                <div class="education-header">
                                    <span class="school">${edu.school}</span>
                                    <span class="graduation-year">${edu.graduationYear}</span>
                                </div>
                                <div class="degree">${edu.degree}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="resume-section">
                    <h2>Professional Experience</h2>
                    <div class="experience-list">
                        ${this.resumeData.experience.map((exp: ExperienceEntry) => `
                            <div class="experience-item">
                                <div class="experience-header">
                                    <span class="company">${exp.company}</span>
                                    <span class="dates">${exp.startDate} - ${exp.endDate}</span>
                                </div>
                                <div class="position">${exp.position}</div>
                                <div class="description">${exp.description}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="resume-section">
                    <h2>Skills</h2>
                    <ul class="skills-list">
                        ${this.resumeData.skills.map((skill: string) => `
                            <li>${skill}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    private addEducationField(): void {
        const educationEntries = document.getElementById('educationEntries');
        const newEntry = document.createElement('div');
        const id = this.generateUniqueId();
        newEntry.classList.add('education-entry');
        newEntry.dataset.id = id;
        newEntry.innerHTML = `
            <div class="entry-content">
                <input type="text" name="school" placeholder="School Name" required class="form-input">
                <input type="text" name="degree" placeholder="Degree" required class="form-input">
                <input type="text" name="graduationYear" placeholder="Graduation Year" required class="form-input">
                <div class="entry-actions">
                    <button type="button" class="btn btn-delete" onclick="this.closest('.education-entry').remove()">
                        Delete Entry
                    </button>
                </div>
            </div>
        `;
        educationEntries?.appendChild(newEntry);
    }

    private addExperienceField(): void {
        const experienceEntries = document.getElementById('experienceEntries');
        const newEntry = document.createElement('div');
        const id = this.generateUniqueId();
        newEntry.classList.add('experience-entry');
        newEntry.dataset.id = id;
        newEntry.innerHTML = `
            <div class="entry-content">
                <input type="text" name="company" placeholder="Company Name" required class="form-input">
                <input type="text" name="position" placeholder="Position" required class="form-input">
                <input type="text" name="startDate" placeholder="Start Date" required class="form-input">
                <input type="text" name="endDate" placeholder="End Date" required class="form-input">
                <textarea name="description" placeholder="Job Description" required class="form-input"></textarea>
                <div class="entry-actions">
                    <button type="button" class="btn btn-delete" onclick="this.closest('.experience-entry').remove()">
                        Delete Entry
                    </button>
                </div>
            </div>
        `;
        experienceEntries?.appendChild(newEntry);
    }

    private generateUniqueId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    private downloadResume(): void {
        const element = document.getElementById('resumeContent');
        if (element) {
            const filename = `${this.resumeData.name.replace(/\s+/g, '_')}_resume.pdf`;
            const worker = html2pdf().set({
                margin: 1,
                filename: filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            });
            
            worker.from(element).save();
        }
    }

    private copyResumeLink(): void {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            alert('Resume link copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy link: ', err);
        });
    }

    private populateFormWithData(): void {
        (document.getElementById('name') as HTMLInputElement).value = this.resumeData.name;
        (document.getElementById('email') as HTMLInputElement).value = this.resumeData.email;
        (document.getElementById('phone') as HTMLInputElement).value = this.resumeData.phone;
        (document.getElementById('location') as HTMLInputElement).value = this.resumeData.location;

        const educationEntries = document.getElementById('educationEntries');
        educationEntries!.innerHTML = '';
        this.resumeData.education.forEach(edu => {
            this.addEducationField();
            const lastEntry = educationEntries?.lastElementChild;
            (lastEntry?.querySelector('[name="school"]') as HTMLInputElement).value = edu.school;
            (lastEntry?.querySelector('[name="degree"]') as HTMLInputElement).value = edu.degree;
            (lastEntry?.querySelector('[name="graduationYear"]') as HTMLInputElement).value = edu.graduationYear;
        });

        const experienceEntries = document.getElementById('experienceEntries');
        experienceEntries!.innerHTML = '';
        this.resumeData.experience.forEach(exp => {
            this.addExperienceField();
            const lastEntry = experienceEntries?.lastElementChild;
            (lastEntry?.querySelector('[name="company"]') as HTMLInputElement).value = exp.company;
            (lastEntry?.querySelector('[name="position"]') as HTMLInputElement).value = exp.position;
            (lastEntry?.querySelector('[name="startDate"]') as HTMLInputElement).value = exp.startDate;
            (lastEntry?.querySelector('[name="endDate"]') as HTMLInputElement).value = exp.endDate;
            (lastEntry?.querySelector('[name="description"]') as HTMLTextAreaElement).value = exp.description;
        });

        (document.getElementById('skills') as HTMLInputElement).value = this.resumeData.skills.join(', ');
    }
}

// Initialize the ResumeBuilder when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ResumeBuilder();
});