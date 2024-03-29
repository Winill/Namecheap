import {expect} from '@playwright/test';
import {test} from '../test-fixtures'
import { faker } from '@faker-js/faker';


test.beforeEach(async ({page, pageManager}) => {
    await page.goto('/')
    await expect(page).toHaveURL(process.env.URL)
    await pageManager.onMainPage().clickLogIn()
})

test('valid credentials test', async ({pageManager}) => {
    await pageManager.onAuthPage().loginWithCredentials(process.env.EMAIL, process.env.PASS)

    await expect(await pageManager.onMainPage().getUserLogInButtonValue()).toHaveText(process.env.EMAIL)
    expect(await pageManager.onMainPage().getDropDownMenu()).toBeTruthy()
})

test('user not registred test', async ({pageManager}) => {
    const randomEmail = faker.internet.email()
    const randomPass = faker.string.alphanumeric(6)
    await pageManager.onAuthPage().loginWithCredentials(randomEmail, randomPass)

    await expect(await pageManager.onAuthPage().getNotificationMessage()).toHaveText(`Uh oh! Email or password is incorrect`)
})

test('Invalid email', async ({pageManager}) => {
    await pageManager.onAuthPage().fillEmailInput(`test@@test.com`)

    expect(await pageManager.onAuthPage().getErrorWithText(`Uh oh! This isn’t an email`)).toBeTruthy()
})

// test.afterAll(async ({page}) => {
//     await page.close()
// })
