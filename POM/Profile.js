const path = require('node:path')
const fs = require('node:fs')
const { expect } = require('@playwright/test')
const BasePage = require('./BasePage')
const robot = require('robotjs');

class Profile extends BasePage {
    constructor(page){
        super(page)
        this.jobPreferencesSection = this.getSection('Job Preferences')
        this.skillsSection = this.getSection('Skills')
        this.workExperienceSection = this.getSection('Work Experience')
        this.educationSection = this.getSection('Education')
        this.resumeSection = this.getSection('Resume')
        this.linksSection = this.getSection('Links')
        this.diversityInformationSection = this.getSection('Diversity information')
        this.profileLink = this.page.locator('a[href="/candidate/profile/"]')
        this.resumeUploadButton = this.resumeSection.locator('#candidate-resume-modal')
        this.resumeFileInput = this.resumeSection.locator('#resume-input')
        this.resumeUploadConfirmation = this.page.getByText('Successfully uploaded resume', { exact: true })
        this.profileImageSection = this.page.locator('#profile-image')
        this.profileImage = this.profileImageSection.locator('img')
        this.profileImageUpdateButton = this.profileImageSection.getByRole('link', { name: /Update/ })
        this.profileImageFileInput = this.profileImageSection.locator('#image-input')
    }
    async selectFileThroughWindowsDialog(filePath) {

    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    const absolutePath = path.resolve(filePath);

    // Allow Windows file dialog to become active
    await this.page.waitForTimeout(1000);

    // Focus the File name field
    robot.keyTap('n', ['control']);

    await this.page.waitForTimeout(500);

    // Enter the complete file path
    robot.typeString(absolutePath);

    // Confirm file selection
    robot.keyTap('enter');

    await this.page.waitForTimeout(1500);
}

    getSection(heading) {
        return this.page.getByRole('heading', { name: heading, exact: true }).locator('..')
    }

    async openProfile(){
        await this.profileLink.click()
        await this.jobPreferencesSection.waitFor({ state: 'visible' })
    }

    async editAndSaveSection(section) {
        await section.scrollIntoViewIfNeeded()
        await section.getByRole('link', { name: /Edit/ }).click()
        const saveButton = section.getByRole('button', { name: 'Save Changes' })
        await saveButton.scrollIntoViewIfNeeded()
        await saveButton.click()
        await section.getByRole('link', { name: /Edit/ }).waitFor({ state: 'visible' })
    }

    async saveJobPreferences() {
        await this.editAndSaveSection(this.jobPreferencesSection)
    }

    async saveSkills() {
        await this.editAndSaveSection(this.skillsSection)
    }

    async saveWorkExperience() {
        await this.editAndSaveSection(this.workExperienceSection)
    }

    async saveEducation() {
        await this.editAndSaveSection(this.educationSection)
    }

    async updateResume(resumePath) {
        await this.resumeUploadButton.click()
        await this.resumeFileInput.setInputFiles(resumePath)
        await expect(this.resumeUploadConfirmation).toBeVisible({ timeout: 30000 })
    }

    async updateProfileImage(imagePath) {
        const previousImageSource = await this.profileImage.getAttribute('src')
        const targetImageName = path.parse(imagePath).name.toLowerCase()
        const targetImageIsDisplayed = async () => {
            const imageSource = await this.profileImage.getAttribute('src')
            const displayedImageName = imageSource
                ? path.parse(path.basename(decodeURIComponent(imageSource))).name.toLowerCase()
                : ''
            return displayedImageName === targetImageName
        }

        if (await targetImageIsDisplayed()) {
            return
        }

        await this.profileImage.hover()
        await this.profileImageUpdateButton.click({ force: true })
        await this.profileImageFileInput.setInputFiles(imagePath)
        await expect.poll(async () => {
            return (await this.profileImage.getAttribute('src')) !== previousImageSource ||
                await targetImageIsDisplayed()
        }, { timeout: 30000 }).toBe(true)
    }

    async saveLinks() {
        await this.editAndSaveSection(this.linksSection)
    }

    async saveDiversityInformation() {
        await this.editAndSaveSection(this.diversityInformationSection)
    }
}

module.exports = Profile