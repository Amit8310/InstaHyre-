# InstaHyre-
Playwright Automation for Instahyre using JavaScript and Page Object Model (POM). Automates login, candidate profile updates, resume upload, profile image upload, and profile section management with reusable page objects and assertions.

**Instahyre Profile Automation with Playwright**
A JavaScript end-to-end test automation project that uses Playwright
and the Page Object Model (POM) to log in to Instahyre and update
candidate profile sections.
**GitHub repository description**
Playwright automation for Instahyre using JavaScript and the Page
Object Model (POM). Automates login, profile-section saves, resume
upload, and profile-image update with reusable page objects and
assertions.

**Overview**
The project separates reusable browser actions, page-specific locators
and actions, test data, and the end-to-end test. This makes the
automation easier to maintain and extend.
Workflow at a glance
```mermaid
**flowchart** 
    A[Start Playwright test] --> B[Read testData/data.json]
    B --> C[Create InstahyreLoginPage]
    C --> D[Open Instahyre]
    D --> E[Continue with email]
    E --> F[Enter email and password]
    F --> G[Verify candidate opportunities URL]
    G --> H[Create Profile page object]
    H --> I[Open candidate profile]
    I --> J[Save Job Preferences]
    J --> K[Save Skills]
    K --> L[Save Work Experience]
    L --> M[Save Education]
    M --> N[Upload resume]
    N --> O[Update profile image]
    O --> P[Save Links]
    P --> Q[Save Diversity Information]
    Q --> R[Test complete]
```
**Project structure**
project-root/
├── POM/
│   ├── BasePage.js
│   ├── InstahyreLoginPage.js
│   |── Profile.js
├── testData/
│   |── data.json
├── tests/
   |── instahyre-Login.spec.js
├── playwright.config.js
|── README.md
Keep filenames and imports consistent. The test imports
../POM/InstahyreLoginPage, so the page-object file should be named
InstahyreLoginPage.js. The base-page file should be named
BasePage.js because the other page objects import ./BasePage. If
your actual filenames differ (for example, BasePase.js or
Instahyrelogin.js), either rename the files or update the
require() paths to match exactly. This matters on case-sensitive
systems.

**File responsibilities**
1. BasePage.js --- reusable browser actions
BasePage receives the Playwright page object and provides common
operations that other page objects can reuse, including:
- Click an element
- Hover over an element
- Type or fill text
- Read element text
- Check visibility
- Wait for a selector
- Navigate to a URL
- Get a locator
- Select an option
- Press a keyboard key
- Scroll an element into view
This avoids repeating common Playwright commands in every page object.
2. InstahyreLoginPage.js --- login page actions
InstahyreLoginPage extends BasePage and defines locators for the
login form.

**Its main methods are:**
- open(baseUrl) --- opens the Instahyre website.
- continueToLogin() --- selects the email login flow.
- login(username, password) --- enters credentials, verifies the
  input values, and clicks the login button.
The test then checks that the browser reaches the candidate
opportunities URL.
3. Profile.js --- candidate profile actions
Profile extends BasePage and groups the profile page locators and
actions.

**It supports:**
- Opening the candidate profile
- Editing and saving Job Preferences
- Editing and saving Skills
- Editing and saving Work Experience
- Editing and saving Education
- Uploading a resume
- Updating the profile image
- Editing and saving Links
- Editing and saving Diversity Information
The editAndSaveSection() helper is shared by profile sections that use
the same edit-and-save interaction.

**Resume upload:** updateResume(resumePath) clicks the resume upload
control and uses Playwright's setInputFiles() to supply the file path
to the file input. This does not open Windows File Explorer; the file is
selected programmatically. The method then waits for the site's
"Successfully uploaded resume" confirmation.

**Profile image update:** updateProfileImage(imagePath) checks whether
the target image is already displayed, uploads it if needed, and polls
for the image source to change.
4. testData/data.json --- test inputs
This file stores the base URL, login credentials, and local file paths
used by the test.

**Example structure:**
{
  "baseUrl": "https://www.instahyre.com/",
  "Email": "your-email@example.com",
  "password": "your-password",
  "resumePath": "C:\\Users\\YOUR_WINDOWS_USER\\OneDrive\\Desktop\\resume.pdf",
  "ImagePath": "C:\\Users\\YOUR_WINDOWS_USER\\OneDrive\\Desktop\\profile.jpg"
}
Replace the example values with your own. Use valid absolute paths for
files on your computer. In JSON on Windows, backslashes must be escaped
as \\.

npx playwright test
Run this spec in a visible browser:
npx playwright test tests/instahyre-Login.spec.js --headed
Adjust the test path to match your actual folder structure.
