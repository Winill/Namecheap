import {test, expect} from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { faker } from '@faker-js/faker';


test.beforeEach(async ({page}) => {
    await page.goto(process.env.URL)
    await expect(page).toHaveURL(process.env.URL)
    const pm = new PageManager(page)
    await pm.onMainPage().clickLogIn()
})

test('valid credentials test', async ({page}) => {
    const pm = new PageManager(page)
    await pm.onAuthPage().loginWithCredentials(process.env.EMAIL, process.env.PASS)

    await expect(await pm.onMainPage().getUserLogInButtonValue()).toHaveText(process.env.EMAIL)
    expect(await pm.onMainPage().getDropDownMenu()).toBeTruthy()
})

test('user not registred test', async ({page}) => {
    const pm = new PageManager(page)
    const randomEmail = faker.internet.email()
    const randomPass = faker.string.alphanumeric(6)
    await pm.onAuthPage().loginWithCredentials(randomEmail, randomPass)

    await expect(await pm.onAuthPage().getNotificationMessage()).toHaveText(`Uh oh! Email or password is incorrect`)
})

test('Invalid email', async ({page}) => {
    const pm = new PageManager(page)
    await pm.onAuthPage().fillEmailInput(`test@@test.com`)

    expect(await pm.onAuthPage().getErrorWithText(`Uh oh! This isn’t an email`)).toBeTruthy()
})

// test.afterAll(async ({page}) => {
//     await page.close()
// })
