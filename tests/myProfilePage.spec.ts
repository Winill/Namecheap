import {expect} from '@playwright/test';
import {test} from '../test-fixtures'

let profileDataFromPreStep;

test.beforeEach(async ({page, pageManager}) => {
    await page.goto('/')
    await expect(page).toHaveURL('/')
    await pageManager.onMainPage().clickLogIn()
    await pageManager.onAuthPage().loginWithCredentials(process.env.EMAIL, process.env.PASS)
    await pageManager.onMainPage().openUserDropDownMenu()
    await pageManager.onMainPage().openProfilePage()
    profileDataFromPreStep = await pageManager.onProfilePage().constructProfileData();
})

test('client area', async ({pageManager}) => {
    await pageManager.onMainPage().openUserDropDownMenu()
    await pageManager.onMainPage().clickLogOut()

    await pageManager.onAuthPage().loginWithCredentials(process.env.EMAIL, process.env.PASS)
   
    await pageManager.onMainPage().openUserDropDownMenu();
    await pageManager.onMainPage().openProfilePage()

    const newProfileData = await pageManager.onProfilePage().constructProfileData();
    expect(profileDataFromPreStep).toEqual(newProfileData)
})

