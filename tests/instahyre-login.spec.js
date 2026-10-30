const { test, expect } = require('@playwright/test');
const InstahyreLoginPage = require('../POM/InstahyreLoginPage');
const Profile = require('../POM/Profile');
const testData = require('../testData/data.json');

test.use({
    launchOptions: {
        args: ['--start-maximized'],
    },

});

test('login to Instahyre using credentials from data.json', async ({ page }) => {
    const loginPage = new InstahyreLoginPage(page);

    await loginPage.open(testData.baseUrl);
    await loginPage.continueToLogin();
    await loginPage.login(testData.Email, testData.password);
    await expect(page).toHaveURL(/\/candidate\/opportunities\//, { timeout: 15000 });

    const profile = new Profile(page);
    await profile.openProfile();
    await profile.saveJobPreferences();
    await profile.saveSkills();
    await profile.saveWorkExperience();
    await profile.saveEducation();
    await profile.updateResume(testData.resumePath);
    await profile.updateProfileImage(testData.ImagePath);
    await profile.saveLinks();
    await profile.saveDiversityInformation();
});
