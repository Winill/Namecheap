import {test, expect} from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

let profileDataFromPreStep;

test.beforeEach(async ({page}) => {
    await page.goto(process.env.URL)
    await expect(page).toHaveURL(process.env.URL)
    const pm = new PageManager(page)
    await pm.onMainPage().clickLogIn()
    await pm.onAuthPage().loginWithCredentials(process.env.EMAIL, process.env.PASS)
    await pm.onMainPage().openUserDropDownMenu()
    await pm.onMainPage().openProfilePage()
    profileDataFromPreStep = await pm.onProfilePage().constructProfileData();
})

test('client area', async ({page}) => {
    const pm = new PageManager(page)
    await pm.onMainPage().openUserDropDownMenu()
    await pm.onMainPage().clickLogOut()

    await pm.onAuthPage().loginWithCredentials(process.env.EMAIL, process.env.PASS)
   
    await pm.onMainPage().openUserDropDownMenu();
    await pm.onMainPage().openProfilePage()

    const newProfileData = await pm.onProfilePage().constructProfileData();
    expect(profileDataFromPreStep).toEqual(newProfileData)
})

